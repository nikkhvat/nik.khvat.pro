-- Получение Карточек 
SELECT title, sub_title FROM cards WHERE project_uuid = '8cbad396-598e-435a-a225-822ec541531a';

-- Получение Features
SELECT content, lang FROM features WHERE project_uuid = '8cbad396-598e-435a-a225-822ec541531a';

-- Получение фото 
SELECT path FROM photos WHERE project_uuid = '8cbad396-598e-435a-a225-822ec541531a';

-- Получение проекта
SELECT 
  uuid,
  photo_url,
  title,
  string_to_array(categories, ',')::int[] AS categories,

  CASE 
    WHEN (SELECT count(*) FROM subtitles WHERE project_uuid = projects.uuid AND lang = 'ru')=1 THEN (SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = 'ru')
    ELSE (SELECT content FROM subtitles WHERE project_uuid = projects.uuid AND lang = 'en')
  END AS sub_title,

  CASE 
    WHEN (SELECT count(*) FROM descriptions WHERE project_uuid = projects.uuid AND lang = 'ru')=1 THEN (SELECT content FROM descriptions WHERE project_uuid = projects.uuid AND lang = 'ru')
    ELSE (SELECT content FROM descriptions WHERE project_uuid = projects.uuid AND lang = 'en')
  END AS descriptions

  FROM projects
  WHERE uuid = '8cbad396-598e-435a-a225-822ec541531a';
