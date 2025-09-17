import { portfolioConfig, type PortfolioConfig } from "@/config/portfolio"

export type { PortfolioConfig }

export function getPortfolioConfig(): PortfolioConfig {
  return portfolioConfig
}
