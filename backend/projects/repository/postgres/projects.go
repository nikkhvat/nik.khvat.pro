package postgres

import (
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

	r.db.Raw(`SELECT
		uuid AS id,
		photo_url AS url,
		title,
		
		string_to_array(categories, ',')::int[] AS categories,
		
		CASE WHEN (SELECT count(*) FROM subtitles WHERE project_uuid = projects.uuid AND lang = ?) = 1
			THEN (SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = ?)
			ELSE (SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = 'en')
		END AS sub_title
		
	FROM projects`, lang, lang).Scan(&resp)

	return resp, nil
}

func (r UserRepository) GetProject(lang string, uuid string) ([]models.ProjectsResponse, error) {
	return nil, nil
}

func (r UserRepository) GetPhotos(uuid string) ([]models.ProjectsResponse, error) {
	return nil, nil
}

func (r UserRepository) GetFeatures(uuid string) ([]models.ProjectsResponse, error) {
	return nil, nil
}

func (r UserRepository) GetCards(uuid string) ([]models.ProjectsResponse, error) {
	return nil, nil
}
