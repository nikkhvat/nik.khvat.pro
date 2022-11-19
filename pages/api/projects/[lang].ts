// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import data from "../../../data.json"
import { Project } from '../project/project'

type Data = {
  // Replace any on Project
  projects: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let lang: string = req.query.lang as string

  if (!data.supported_languages.includes(lang)) {
    lang = 'en'
  }

  const projects = []

  for (let i = 0; i < data.projects.length; i++) {
    const project = data.projects[i];
    
    projects.push({
      id: project.id,
      url: project.url,
      title: project.title,
      categories: project.categories,
      sub_title: project.sub_title[lang as 'ru' | 'en'],
    })
  }

  res.status(200).json({projects})
}
