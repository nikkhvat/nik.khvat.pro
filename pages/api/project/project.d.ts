export interface Project {
  categories: number[]
  id: string
  url: string
  title: string
  sub_title: {
    [key: string]: string
  },
  description: {
    [key: string]: string
  },
  cards: {
    title: string, sub_title: string 
  }[],
  features: { 
    name: string
    lang: string
  }[]
  photos: string[]
}