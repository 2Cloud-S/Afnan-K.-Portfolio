"use client"

import { Home, Briefcase, FileText, FileEdit } from 'lucide-react'
import Link from "next/link"
import { useScrollDirection } from "@/hooks/useScrollDirection"

export default function Navbar() {
  const isNavVisible = useScrollDirection()

  const navItems = [
    { icon: Home, href: "/", label: "Home" },
    { icon: Briefcase, href: "/projects", label: "Projects" },
    { icon: FileText, href: "/about", label: "About" },
    { icon: FileEdit, href: "/blog", label: "Blog" },
  ]

  return (
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
  )
} 