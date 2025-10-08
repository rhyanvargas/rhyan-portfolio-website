import { ComingSoon } from "@/components/coming-soon"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      {/* <AboutSection /> */}
      {/* <ExperienceSection /> */}
      {/* <ProjectsSection /> */}
      {/* <ContactSection /> */}
      {/* <Footer /> */}
      <ComingSoon />
    </main>
  )
}