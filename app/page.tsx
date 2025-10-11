import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
// import { ComingSoon } from "@/components/coming-soon"
// import { Navigation } from "@/components/navigation"
// import { ExperienceSection } from "@/components/experience-section"
// import { ContactSection } from "@/components/contact-section"
// import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <ComingSoon /> */}
      {/* <Navigation /> */}
      <HeroSection />
      <AboutSection />
      {/* <ExperienceSection /> */}
      <ProjectsSection />
      {/* <ContactSection /> */}
      {/* <Footer /> */}
    </main>
  )
}