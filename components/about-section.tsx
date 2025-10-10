import { Card } from "@/components/ui/card"
import { getPortfolioConfig } from "@/lib/config"
import Image from "next/image"

export function AboutSection() {
  const config = getPortfolioConfig()

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-accent font-mono text-lg">01.</span> {config.about.title}
          </h2>
          <div className="w-20 h-px bg-accent"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            {config.about.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}

            <div className="mt-8">
              <p className="text-muted-foreground mb-4">Here are a few technologies I've been working with recently:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {config.about.technologies.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <span className="text-accent">▹</span>
                    <span className="text-sm font-mono text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 bg-card border-border">
              <div className="relative group">
                <div className="w-full aspect-square bg-accent/10 rounded-lg overflow-hidden">
                  <Image
                    src={config.personal.avatar}
                    alt={`${config.personal.firstName} ${config.personal.lastName}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
