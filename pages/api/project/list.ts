// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import data from "../../../data.json"
import { Project } from './project'

type Data = {
  // Replace any on Project
  projects: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  res.status(200).json(data)
}
