import { Card } from "@/components/ui/card"
import { getPortfolioConfig } from "@/lib/config"

export function ExperienceSection() {
  const config = getPortfolioConfig()

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-accent font-mono text-lg">02.</span> Where I've Worked
          </h2>
          <div className="w-20 h-px bg-accent"></div>
        </div>

        <div className="space-y-8">
          {config.experience.map((exp, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-accent/50 transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {exp.position} <span className="text-accent">@ {exp.company}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">{exp.location}</p>
                </div>
                <div className="text-sm font-mono text-muted-foreground mt-1 sm:mt-0">{exp.duration}</div>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-muted-foreground leading-relaxed flex items-start">
                    <span className="text-accent mr-2 mt-2">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
