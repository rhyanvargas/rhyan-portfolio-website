import { getPortfolioConfig } from "@/lib/config"

export function Footer() {
  const config = getPortfolioConfig()

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-muted-foreground text-sm font-mono">{config.footer.text}</p>
          <p className="text-muted-foreground text-xs mt-2">© {config.footer.year} All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
