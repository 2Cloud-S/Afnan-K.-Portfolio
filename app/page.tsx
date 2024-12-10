import { client } from '@/lib/sanity'
import { Post } from '@/types/sanity'
import Portfolio from '@/components/portfolio'

async function getPosts(): Promise<Post[]> {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      title,
      excerpt,
      publishedAt,
      "slug": slug.current
    }
  `)
}

async function getProjects() {
  return await client.fetch(`
    *[_type == "project"] | order(_createdAt desc)[0...2] {
      name,
      desc,
      "slug": slug.current,
      image,
      tags
    }
  `)
}

export default async function Home() {
  const [posts, projects] = await Promise.all([
    getPosts(),
    getProjects()
  ])
  
  return <Portfolio posts={posts} projects={projects} />
}