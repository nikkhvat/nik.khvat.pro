const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

let lines = ``

const data = JSON.parse(fs.readFileSync("./data.json").toString())

const writeLines = (query) => lines = lines + query + '\n'

const queries = {
  project: (i, u, t, c) => `INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('${i}', '${u}', '${t}', '${c.join()}');`,
  cards: (i, t, s) => `INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('${i}', '${uuidv4()}', '${t}', '${s}');`,
  descriptions: (i, k, d) => `INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('${i}', '${uuidv4()}', '${k}', '${d}');`,
  features: (i, l, n) => `INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('${i}', '${uuidv4()}', '${l}', '${n.replaceAll("'", "''")}');`,
  photos: (i, p) => `INSERT INTO photos (project_uuid, uuid, path) VALUES ('${i}', '${uuidv4()}', '${p}');`,
  subtitles: (i, k, s) => `INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('${i}', '${uuidv4()}', '${k}', '${s}');`
}

for (let i = 0; i < data.projects.length; i++) {
  const project = data.projects[i];
  
  writeLines('\n')
  writeLines(`-- Project "${project.title}"`)
  
  writeLines(queries.project(project.id, project.url, project.title, project.categories))
  
  for (let j = 0; j < project.cards.length; j++) writeLines(queries.cards(project.id, project.cards[j].title, project.cards[j].sub_title))
  for (const key in project.description) writeLines(queries.descriptions(project.id, key, project.description[key]))
  for (let j = 0; j < project.features.length; j++) writeLines(queries.features(project.id, project.features[j].lang, project.features[j].name))
  for (let j = 0; j < project.photos.length; j++) writeLines(queries.photos(project.id, project.photos[j]))
  for (const key in project.sub_title) writeLines(queries.subtitles(project.id, key, project.sub_title[key]))
}

fs.writeFileSync('dump.sql', lines)