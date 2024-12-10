import { ArrowUpRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { client, urlFor } from '@/lib/sanity'
import Navbar from "@/components/Navbar"

interface Project {
  slug: string;
  name: string;
  desc: string;
  image: string;
  tags?: string[];
  link?: string;
}

async function getProjects() {
  return await client.fetch(`
    *[_type == "project"] {
      name,
      desc,
      "image": image.asset->url,
      tags,
      link,
      "slug": slug.current
    }
  `)
}

export const revalidate = 60 // revalidate every minute

export default async function Projects() {
  const projects = await getProjects()
  
  return (
    <div className="min-h-screen bg-[#111111] text-white p-8 pt-24">
      <Navbar />
      {/* Projects Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-7xl font-bold mb-4">
          SELECTED
          <br />
          <span className="text-[#FF5733]">PROJECTS</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          A showcase of my best work across various domains including UI/UX design, 
          development, and branding solutions.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project: Project) => (
            <div 
              key={project.slug} 
              className="group relative overflow-hidden rounded-3xl bg-[#1A1A1A] hover:bg-[#222222] transition-colors duration-300"
            >
              <Link href={project.link || '#'}>
                <div className="flex flex-col md:flex-row md:items-center justify-between p-8 gap-8">
                  <div className="flex-1">
                    <h3 className="text-4xl font-bold mb-4">{project.name}</h3>
                    <p className="text-gray-400 mb-6">{project.desc}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, j: number) => (
                          <span 
                            key={j}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {project.image && (
                    <div className="relative w-full md:w-[400px] h-[300px] rounded-2xl overflow-hidden">
                      <Image
                        src={urlFor(project.image).url()}
                        alt={project.name}
                        fill
                        className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
                <ArrowUpRight className="absolute top-8 right-8 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
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