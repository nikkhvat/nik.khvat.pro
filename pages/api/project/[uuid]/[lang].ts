import type { NextApiRequest, NextApiResponse } from 'next'

import data from "../../../../data.json"
import { Project } from '../project'

const getProjectById = (id: string) => {
  for (let i = 0; i < data.projects.length; i++) {
    if (data.projects[i].id === id) return data.projects[i]
  }

  return null
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (!req.query.uuid) return res.status(400)

  const id: string = req.query.uuid as string
  let lang: string = req.query.lang as string
  const project: any = getProjectById(id)  

  if (project === null) return res.status(404)

  const currentProject = {
    categories: project.categories,
    id: project.id,
    url: project.url,
    title: project.title,
    lang: lang,
    sub_title: project.sub_title[lang] ? project.sub_title[lang] : project.sub_title['en'],
    description: project.description[lang] ? project.description[lang] : project.description['en'],
    cards: project.cards,
    features: [] as any,
    photos: project.photos,
  }

  const getFeatures = (currentLang: string) => {
    const features = []
    for (let index = 0; index < project.features.length; index++) {
      const feature = project.features[index];
      
      if (feature.lang === currentLang) features.push(feature)
    }

    return features
  }

  let currentFeatures = getFeatures(lang)

  currentProject.features = currentFeatures.length !== 0 ? currentFeatures : getFeatures('en')


  res.status(200).json(currentProject)
}
