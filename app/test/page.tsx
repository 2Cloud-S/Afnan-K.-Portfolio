import { client } from '@/sanity/lib/client'

async function TestPage() {
  const projects = await client.fetch(`
    *[_type == "project"] {
      name,
      desc,
      "imageUrl": image.asset->url,
      tags,
      link
    }
  `)

  return (
    <div>
      <h1>Test Projects</h1>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </div>
  )
}

export default TestPage 