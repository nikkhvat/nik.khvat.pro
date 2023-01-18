package postgres

import (
	"database/sql"
	"nik19ta/backend/models"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r UserRepository) GetProjects(lang string) ([]models.ProjectsResponse, error) {
	var resp []models.ProjectsResponse

	result := r.db.Raw(`SELECT
		uuid AS id,
		photo_url AS url,
		title,
		
		string_to_array(categories, ',')::int[] AS categories,
		
		CASE WHEN (SELECT count(*) FROM subtitles WHERE project_uuid = projects.uuid AND lang = @lang) = 1
			THEN (SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = @lang)
			ELSE (SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = 'en')
		END AS sub_title
		
	FROM projects`, sql.Named("lang", lang)).Scan(&resp)

	return resp, result.Error
}

func (r UserRepository) GetProject(lang string, uuid string) (*models.ProjectResponse, error) {
	var resp models.ProjectResponse

	result := r.db.Raw(`SELECT 
		uuid AS id,
		photo_url AS url,
		title,
		string_to_array(categories, ',')::int[] AS categories,

		(SELECT 
				array_agg(path) 
			FROM photos WHERE project_uuid = @id) AS photos,

		(SELECT 
				jsonb_agg(jsonb_build_object('title', cards.title, 'sub_title', cards.sub_title)) 
			FROM cards WHERE project_uuid = @id) AS cards,
		
		CASE 
			WHEN (SELECT count(*) FROM features WHERE project_uuid = projects.uuid AND lang = @lang) > 0 THEN 
				(SELECT 
					jsonb_agg(jsonb_build_object('title', features.content, 'lang', features.lang)) 
				FROM features WHERE project_uuid = @id AND lang = @lang)
			ELSE 
				(SELECT 
					jsonb_agg(jsonb_build_object('title', features.content, 'lang', features.lang)) 
				FROM features WHERE project_uuid = @id AND lang = 'en')
		END AS features,

		CASE 
			WHEN (SELECT count(*) FROM subtitles WHERE project_uuid = projects.uuid AND lang = @lang) > 0 THEN 
				(SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = @lang)
			ELSE 
				(SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = 'en')
		END AS sub_title,

		CASE 
			WHEN (SELECT count(*) FROM descriptions WHERE project_uuid = projects.uuid AND lang = @lang) > 0 THEN 
				(SELECT content FROM descriptions WHERE project_uuid = projects.uuid AND lang = @lang)
			ELSE 
			(SELECT content FROM descriptions WHERE project_uuid = projects.uuid AND lang = 'en')
		END AS description

		FROM projects
		WHERE uuid = @id;`, sql.Named("lang", lang), sql.Named("id", uuid)).Scan(&resp)

	return &resp, result.Error
}
