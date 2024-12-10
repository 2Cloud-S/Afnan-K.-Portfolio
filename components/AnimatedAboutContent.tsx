"use client"

import { AboutData } from '@/types/sanity'
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { useEffect, useState } from 'react'

// Enhanced keyframes for animations
const animations = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(255, 87, 51, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 87, 51, 0.4); }
  100% { box-shadow: 0 0 5px rgba(255, 87, 51, 0.2); }
}
`;

export default function AnimatedAboutContent({ aboutData }: { aboutData: AboutData }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style jsx global>{animations}</style>
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Left Column */}
        <div className="space-y-12">
          {/* Profile Section */}
          <div className="bg-[#1A1A1A] rounded-3xl p-8 hover:bg-[#222222] transition-all duration-300 hover:scale-[1.02]"
               style={{ animation: 'scaleIn 0.6s ease-out, glow 3s infinite' }}>
            {aboutData.profileImage && (
              <div className="relative group">
                <Image
                  src={urlFor(aboutData.profileImage).url()}
                  alt={`Profile photo of ${aboutData.name || 'Me'}`}
                  width={400}
                  height={400}
                  className="rounded-2xl w-full aspect-square object-cover mb-8 transition-all duration-500 group-hover:scale-105 group-hover:rotate-2"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{aboutData.name || 'AFNAN K.'}</h2>
              <p className="text-gray-400">{aboutData.bio}</p>
              <div className="flex items-center gap-6 pt-4">
                {/* Social links with floating animation */}
                {[
                  { href: "https://github.com/2Cloud-S", Icon: Github },
                  { href: "https://www.linkedin.com/in/afnankhan-ak/", Icon: Linkedin },
                  { href: "https://x.com/Afnanxkhan_ak", Icon: Twitter },
                  { href: "mailto:inbox.afnankhan@gmail.com", Icon: Mail }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF5733] hover:text-white transition-all duration-300 hover:scale-110"
                    style={{ animation: `float 3s ease-in-out ${index * 0.2}s infinite` }}
                  >
                    <social.Icon className="w-6 h-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section with staggered animation */}
          {aboutData.skills && aboutData.skills.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold" style={{ animation: 'slideIn 0.6s ease-out' }}>SKILLS</h2>
              {aboutData.skills.map((skill, i) => (
                <div 
                  key={i}
                  className="bg-[#1A1A1A] p-6 rounded-2xl hover:bg-[#222222] transition-all duration-300 hover:scale-[1.01]"
                  style={{ animation: `slideIn ${0.3 + i * 0.1}s ease-out` }}
                >
                  <h3 className="text-xl font-bold mb-4 text-[#FF5733]">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items?.map((item, j) => (
                      <span 
                        key={j}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        style={{ animation: `fadeIn ${0.5 + j * 0.1}s ease-out` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* Experience Section with slide animations */}
          {aboutData.experience && aboutData.experience.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold" style={{ animation: 'slideIn 0.8s ease-out' }}>EXPERIENCE</h2>
              {aboutData.experience.map((exp, i) => (
                <div 
                  key={i}
                  className="group bg-[#1A1A1A] p-6 rounded-2xl hover:bg-[#222222] transition-all duration-300 hover:translate-x-2"
                  style={{ animation: `slideIn ${0.6 + i * 0.2}s ease-out` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <span className="text-sm text-gray-400">{exp.period}</span>
                  </div>
                  <p className="text-[#FF5733] mb-2">{exp.role}</p>
                  <p className="text-gray-400">{exp.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education Section with scale animations */}
          {aboutData.education && aboutData.education.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold" style={{ animation: 'slideIn 1s ease-out' }}>EDUCATION</h2>
              {aboutData.education.map((edu, i) => (
                <div 
                  key={i}
                  className="group bg-[#1A1A1A] p-6 rounded-2xl hover:bg-[#222222] transition-all duration-300 hover:scale-[1.02]"
                  style={{ animation: `scaleIn ${0.8 + i * 0.2}s ease-out` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{edu.school}</h3>
                    <span className="text-sm text-gray-400">{edu.period}</span>
                  </div>
                  <p className="text-[#FF5733] mb-2">{edu.degree}</p>
                  <p className="text-gray-400">{edu.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
} 