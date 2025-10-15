"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { getPortfolioConfig } from "@/lib/config";

export function HeroSection() {
	const config = getPortfolioConfig();

	const scrollToSection = (sectionId: string) => {
		const element = document.querySelector(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section id="home" className="bg-[url(/design-element-pixel-white.svg)] bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto text-center">
				<div className="mb-8">
					<p className="text-accent font-mono text-sm mb-4">Hi, my name is</p>
					<h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4">
						<span className="text-balance">
							{config.personal.firstName} {config.personal.lastName}
						</span>
					</h1>
					<h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-muted-foreground mb-8">
					</h2>
				</div>

				<p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-pretty">
					{config.personal.tagline}
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
					<Button
						size="lg"
						className="bg-accent hover:bg-accent/90 text-accent-foreground font-mono"
						onClick={() => scrollToSection("#work")}
					>
						Check out my work
					</Button>
					<div className="flex flex-wrap items-center justify-center gap-6 text-sm">
						<a
							href={config.social.github}
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-accent underline transition-colors"
						>
							GitHub
						</a>
						<a
							href={config.social.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-accent underline transition-colors"
						>
							LinkedIn
						</a>
						<a
							href={`mailto:${config.personal.email}`}
							className="text-muted-foreground hover:text-accent underline transition-colors"
						>
							Email
						</a>
					</div>
				</div>

				<Button
					variant="ghost"
					size="icon"
					onClick={() => scrollToSection("#about")}
					className="animate-bounce"
				>
					<ArrowDown className="h-5 w-5" />
				</Button>
			</div>
		</section>

	);
}
