import type { NextApiRequest, NextApiResponse } from 'next'

import data from "../../../data.json"
import { Project } from '../project/project'

type Data = {
  projects: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let lang: any = req.query.lang as string
  
  const projects = []

  for (let i = 0; i < data.projects.length; i++) {
    const project: any = data.projects[i];
    
    projects.push({
      id: project.id,
      url: project.url,
      title: project.title,
      categories: project.categories,
      sub_title: project.sub_title[lang] ? project.sub_title[lang] : project.sub_title['en'],
    })
  }

  res.status(200).json({projects})
}
