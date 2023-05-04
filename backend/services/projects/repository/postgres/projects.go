package postgres

import (
	"database/sql"

	projects "nik19ta/backend/services/projects"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r UserRepository) GetProjects(lang string) ([]projects.ProjectsResponse, error) {
	var projects []projects.ProjectsResponse

	result := r.db.Table("projects").
		Select("uuid AS id, photo_url AS url, title, string_to_array(categories, ',')::int[] AS categories, "+
			"CASE WHEN (SELECT count(*) FROM subtitles WHERE project_uuid = projects.uuid AND lang = ?) = 1 "+
			"THEN (SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = ?) "+
			"ELSE (SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = 'en') "+
			"END AS sub_title", lang, lang).
		Find(&projects)

	return projects, result.Error
}

func (r UserRepository) GetProject(lang string, uuid string) (*projects.ProjectResponse, error) {
	var project projects.ProjectResponse

	result := r.db.Raw(`
		SELECT 
			uuid AS id,
			photo_url AS url,
			title,
			string_to_array(categories, ',')::int[] AS categories,
			(SELECT array_agg(path) FROM photos WHERE project_uuid = @id) AS photos,
			(SELECT jsonb_agg(jsonb_build_object('title', title, 'sub_title', sub_title)) FROM cards WHERE project_uuid = @id) AS cards,
			COALESCE(
					(SELECT jsonb_agg(jsonb_build_object('title', content, 'lang', lang)) FROM features WHERE project_uuid = @id AND lang = @lang),
					(SELECT jsonb_agg(jsonb_build_object('title', content, 'lang', lang)) FROM features WHERE project_uuid = @id AND lang = 'en')
			) AS features,
			COALESCE(
					(SELECT content FROM subtitles WHERE project_uuid = @id AND lang = @lang),
					(SELECT content FROM subtitles WHERE project_uuid = @id AND lang = 'en')
			) AS sub_title,
			COALESCE(
					(SELECT content FROM descriptions WHERE project_uuid = @id AND lang = @lang),
					(SELECT content FROM descriptions WHERE project_uuid = @id AND lang = 'en')
			) AS description
		FROM projects
		WHERE uuid = @id;`, sql.Named("lang", lang), sql.Named("id", uuid)).Scan(&project)

	return &project, result.Error
}
