import { ArrowUpRight, Calendar, Clock } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { client, urlFor } from '@/lib/sanity'
import { Post } from '@/types/sanity'
import Navbar from "@/components/Navbar"

async function getPosts(): Promise<Post[]> {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      title,
      excerpt,
      "image": image.asset->url,
      publishedAt,
      readTime,
      tags,
      "slug": slug.current
    }
  `)
}

export const revalidate = 60 // revalidate every minute

export default async function Blog() {
  const posts = await getPosts()
  
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-8 pt-24 flex items-center justify-center">
        <p>No blog posts found. Please add content in Sanity Studio.</p>
      </div>
    )
  }

  const featuredPost = posts[0] || null

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8 pt-24">
      <Navbar />
      {/* Blog Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-7xl font-bold mb-4">
          LATEST
          <br />
          <span className="text-[#FF5733]">ARTICLES</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Thoughts, learnings, and insights about design, development, 
          and the future of digital experiences.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="max-w-6xl mx-auto mb-16">
          <div className="group relative overflow-hidden rounded-3xl bg-[#1A1A1A] hover:bg-[#222222] transition-colors duration-300">
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {featuredPost.image && (
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(featuredPost.image).url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.publishedAt}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(featuredPost.tags || []).map((tag: string, i: number) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#FF5733] flex items-center gap-2">
                    Read More
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(1).map((post: Post, i: number) => (
            <div 
              key={i}
              className="group bg-[#1A1A1A] rounded-3xl overflow-hidden hover:bg-[#222222] transition-colors duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                {post.image ? (
                  <div className="relative h-[240px]">
                    <Image
                      src={urlFor(post.image).url()}
                      alt={post.title}
                      fill
                      className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="relative h-[240px] bg-[#222222] flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="p-8">
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
                  <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                  <p className="text-gray-400 mb-6">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {(post.tags || []).map((tag: string, j: number) => (
                      <span 
                        key={j}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-20" />
    </div>
  )
} 