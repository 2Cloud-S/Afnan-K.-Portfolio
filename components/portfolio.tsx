"use client"

import { Home, Briefcase, FileText, FileEdit, Mail, ArrowUpRight, Twitter, Github, Linkedin, Palette, Code } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useScrollDirection } from "@/hooks/useScrollDirection"
import { useEffect, useState } from 'react'
import { Post } from '@/types/sanity'
import { client, urlFor } from '@/lib/sanity'

// Add this keyframe animation at the top of the file, after imports
const movingDotKeyframes = `
@keyframes moveDot {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 20;
  }
}
`;

// Update image paths
const PLACEHOLDER_IMAGES = {
  nav: "/images/icons/nav-icon.svg",
  profile: "/images/profile/PLACEHOLDER_IMAGES.svg",
  featureIcons: {
    animation: "/images/icons/animation-icon.svg",
    tools: "/images/icons/tools-icon.svg"
  },
  projects: {
    najmAI: "/images/projects/najm-ai.png",
    nashra: "/images/projects/nashra.png",
    ruya: "/images/projects/ruya.png"
  }
}

interface RecentProject {
  name: string;
  desc: string;
  image: string;
  slug: string;
  tags?: string[];
}

async function getRecentProjects(): Promise<RecentProject[]> {
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

interface PortfolioProps {
  posts: Post[];
  projects: RecentProject[];
}

export default function Portfolio({ posts, projects }: PortfolioProps) {
  const isNavVisible = useScrollDirection()
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isForward, setIsForward] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const text = "LET'S WORK TOGETHER"
    const interval = setInterval(() => {
      if (isForward) {
        if (cursorPosition < text.length) {
          setCursorPosition(prev => prev + 1)
        } else {
          setIsForward(false)
        }
      } else {
        if (cursorPosition > 0) {
          setCursorPosition(prev => prev - 1)
        } else {
          setIsForward(true)
        }
      }
    }, 200)

    return () => clearInterval(interval)
  }, [cursorPosition, isForward])

  const navItems = [
    { icon: Home, href: "#", label: "Home" },
    { icon: Briefcase, href: "/projects", label: "Projects" },
    { icon: FileText, href: "/about", label: "About" },
    { icon: FileEdit, href: "/blog", label: "Blog" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setFormStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8 pt-24">
      {/* Add the keyframes style */}
      <style jsx global>{movingDotKeyframes}</style>

      {/* Top Navigation Icons */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-full transition-transform duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-28'
      }`}>
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto max-w-[calc(100vw-4rem)] scrollbar-hide">
          {navItems.map((item, i) => {
            const Icon = item.icon
            return (
              <Link 
                key={i} 
                href={item.href} 
                className="p-2.5 hover:bg-white/10 rounded-full transition-colors shrink-0"
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" strokeWidth={1.3} />
              </Link>
            )
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card - Left Column */}
        <div className="relative">
          {/* Top Dotted Line Decoration - Updated */}
          <div className="absolute -top-8 right-0 w-32 h-32">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <path 
                d="M0,50 Q25,0 50,50 T100,50" 
                stroke="white" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
                fill="none"
                style={{
                  animation: 'moveDot 1s linear infinite'
                }}
              />
            </svg>
          </div>

          <div className="bg-[#1A1A1A] rounded-3xl p-8 relative">
            {/* Profile Image */}
            <div className="relative mb-8">
              <Image
                src={PLACEHOLDER_IMAGES.profile}
                alt="Profile photo of Mark Smith"
                width={400}
                height={400}
                className="rounded-2xl w-full aspect-square object-cover bg-gradient-to-br from-[#FF5733] to-[#FF8C33]"
              />
              {/* Bottom Dotted Line - Updated */}
              <div className="absolute -bottom-4 left-0 w-32 h-16">
                <svg width="100%" height="100%" viewBox="0 0 100 50" fill="none">
                  <path 
                    d="M0,25 Q25,50 50,25 T100,25" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                    fill="none"
                    style={{
                      animation: 'moveDot 1s linear infinite'
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Name and Description */}
            <h1 className="text-4xl font-bold mb-4">AFNAN K.</h1>
            <p className="text-gray-400 mb-8">
              A Dev and Designer who has developed countless innovative solutions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <Link 
                href="https://github.com/2Cloud-S" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5733] hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/afnankhan-ak/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5733] hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link 
                href="https://x.com/Afnanxkhan_ak" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5733] hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link 
                href="mailto:inbox.afnankhan@gmail.com" 
                className="text-[#FF5733] hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Name and Title Section - Moved here */}
          <div>
            <h1 className="text-2xl font-bold mb-1">AFNAN K.</h1>
            <h2 className="text-7xl font-bold mb-4">DEV AND<br/>DESIGNER</h2>
            <p className="text-gray-400 text-lg">
              Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              A Dev and Designer who has developed countless innovative solutions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="text-4xl font-bold">+6</h3>
              <p className="text-sm text-gray-400">YEARS OF<br />EXPERIENCE</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">+46</h3>
              <p className="text-sm text-gray-400">PROJECTS<br />COMPLETED</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">+4</h3>
              <p className="text-sm text-gray-400">WORLDWIDE<br />CLIENTS</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FF5733] p-6 rounded-3xl relative group cursor-pointer">
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <Palette className="w-10 h-10 text-white" strokeWidth={1.5} />
                  <p className="text-white/60 text-sm">Design &<br/>Animation</p>
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-2">DESIGNS THAT<br/>SPEAK</h3>
              <ArrowUpRight className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="bg-[#BFFF00] p-6 rounded-3xl relative group cursor-pointer">
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <Code className="w-10 h-10 text-black" strokeWidth={1.5} />
                  <p className="text-black/60 text-sm">Development<br/>& Tools</p>
                </div>
              </div>
              <h3 className="font-bold text-2xl text-black mb-2">MY TECH<br/>ARSENAL</h3>
              <ArrowUpRight className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-4xl font-bold">
            RECENT
            <br />
            PROJECTS
          </h2>
          <Link 
            href="/projects" 
            className="text-[#FF5733] hover:text-white transition-colors flex items-center gap-2"
          >
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {projects.map((project, i) => (
            <div 
              key={project.slug} 
              className="group bg-[#1A1A1A] hover:bg-[#222222] transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="p-8 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[#FF5733] text-sm">0{i + 1}</span>
                      <div className="h-[1px] w-12 bg-[#FF5733]"></div>
                      {project.tags && project.tags.length > 0 && (
                        <span className="text-sm text-gray-400">
                          {project.tags[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-[#FF5733] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 pr-8">{project.desc}</p>
                  </div>
                  <div className="transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-4xl font-bold mb-8">
          LATEST
          <br />
          ARTICLES
        </h2>
        <div className="space-y-6">
          {posts.map((post, i) => (
            <Link 
              href={`/blog/${post.slug}`}
              key={i} 
              className="flex items-start justify-between p-4 border-t border-gray-800 group cursor-pointer"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-400 mb-2">{post.excerpt}</p>
                <p className="text-sm text-gray-600">{post.publishedAt}</p>
              </div>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="mb-16">
          <h2 className="text-7xl font-bold mb-4 relative">
            <span className="relative">
              {"LET'S WORK".slice(0, cursorPosition)}
              <span className="absolute -right-1 top-0 w-[3px] h-full bg-[#FF5733] animate-pulse" />
            </span>
            <br />
            <span className="text-white/20">
              {"TOGETHER".slice(0, Math.max(0, cursorPosition - "LET'S WORK".length))}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#1A1A1A] p-8 rounded-2xl hover:bg-[#222222] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:inbox.afnankhan@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>inbox.afnankhan@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 pt-4">
                  <Link 
                    href="https://github.com/2Cloud-S"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="https://www.linkedin.com/in/afnankhan-ak/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="https://x.com/Afnanxkhan_ak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-[#1A1A1A] rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#FF5733] transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full bg-[#1A1A1A] rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#FF5733] transition-all"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={6}
                className="w-full bg-[#1A1A1A] rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#FF5733] transition-all resize-none"
              />
            </div>
            
            {formStatus.message && (
              <div className={`p-4 rounded-xl ${
                formStatus.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {formStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#FF5733] text-white py-4 rounded-xl font-bold hover:bg-[#FF5733]/90 transition-all ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Add some bottom padding */}
      <div className="h-20" />
    </div>
  )
}

