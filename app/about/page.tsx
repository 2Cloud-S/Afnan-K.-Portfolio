import { client } from '@/lib/sanity'
import { AboutData } from '@/types/sanity'
import Navbar from "@/components/Navbar"
import AnimatedAboutContent from "@/components/AnimatedAboutContent"

async function getAboutData(): Promise<AboutData | null> {
  return await client.fetch(`
    *[_type == "about"][0] {
      name,
      bio,
      "profileImage": profileImage.asset->url,
      skills,
      education,
      experience
    }
  `)
}

export const revalidate = 60 // revalidate every minute

export default async function About() {
  const aboutData = await getAboutData()
  
  if (!aboutData) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-8 pt-24 flex items-center justify-center">
        <p>No about data found. Please add content in Sanity Studio.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8 pt-24">
      <Navbar />
      <AnimatedAboutContent aboutData={aboutData} />
      {/* Bottom Padding */}
      <div className="h-20" />
    </div>
  )
} 