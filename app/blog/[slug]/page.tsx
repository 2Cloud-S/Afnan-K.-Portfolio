import { client, urlFor } from '@/lib/sanity'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Navbar from "@/components/Navbar"

// Define the Post type with content
interface Post {
  title: string;
  excerpt: string;
  image: string | null;
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: any[];
}

async function getPost(slug: string): Promise<Post> {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt,
      image,
      publishedAt,
      readTime,
      tags,
      content
    }
  `, { slug })
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-8 pt-24 flex items-center justify-center">
        <p>Blog post not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8 pt-24">
      <Navbar />
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
          <p className="text-xl text-gray-400 mb-6">{post.excerpt}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {post.image && (
            <div className="relative h-[400px] rounded-3xl overflow-hidden">
              <Image
                src={urlFor(post.image).url()}
                alt={post.title}
                fill
                className="object-cover object-center"
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content && (
            <PortableText 
              value={post.content}
              components={{
                block: {
                  h2: ({children}) => <h2 className="text-3xl font-bold mt-12 mb-6">{children}</h2>,
                  normal: ({children}) => <p className="mb-6 text-gray-300">{children}</p>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc pl-6 mb-6 text-gray-300">{children}</ul>,
                  number: ({children}) => <ol className="list-decimal pl-6 mb-6 text-gray-300">{children}</ol>,
                },
              }}
            />
          )}
        </div>
      </article>

      {/* Bottom Padding */}
      <div className="h-20" />
    </div>
  )
} 