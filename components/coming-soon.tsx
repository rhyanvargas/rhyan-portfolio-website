"use client";

import { useState, useEffect, useRef } from "react";
import {
	Mail,
	Code,
	Palette,
	Rocket,
	Zap,
	Database,
	Globe,
} from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Badge } from "./ui/badge";

function BuildingProgress() {
	const containerRef = useRef<HTMLDivElement>(null);

	// Refs for each development stage
	const ideaRef = useRef<HTMLDivElement>(null);
	const designRef = useRef<HTMLDivElement>(null);
	const codeRef = useRef<HTMLDivElement>(null);
	const launchRef = useRef<HTMLDivElement>(null);
	const duration = 4;

	const stages = [
		{
			ref: ideaRef,
			icon: Zap,
			label: "Ideation",
			status: "completed",
			color: "text-white/75",
		},
		{
			ref: designRef,
			icon: Palette,
			label: "Design",
			status: "completed",
			color: "text-white/75",
		},
		{
			ref: codeRef,
			icon: Code,
			label: "Development",
			status: "active",
			color: "text-white/75",
		},
		{
			ref: launchRef,
			icon: Rocket,
			label: "Launch",
			status: "pending",
			color: "text-white/75",
		},
	];

	return (
		<div
			ref={containerRef}
			className="relative w-full max-w-4xl mx-auto p-4 sm:p-6"
		>
			{/* Development stages - Responsive Layout */}
			<div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-12 md:gap-4">
				{stages.map((stage, index) => (
					<div
						key={stage.label}
						className="relative z-20 flex flex-col items-center space-y-2"
					>
						<div
							ref={stage.ref}
							className={`relative z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 backdrop-blur-3xl   ${stage.status === "completed"
								? "bg-green-500/60 border-green-500 shadow-sm shadow-green-500/50"
								: stage.status === "active"
									? "bg-purple-500/60 border-purple-500 animate-pulse shadow-lg shadow-purple-500/30 "
									: "bg-muted border-muted-foreground/30"
								}`}
						>
							<stage.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stage.color}`} />
						</div>
						<span className="text-xs sm:text-sm font-medium">
							{stage.label}
						</span>
					</div>
				))}
			</div>

			{/* Animated Beams - Sequential Flow */}
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={ideaRef}
				toRef={designRef}
				curvature={-75}
				gradientStartColor="#3b82f6"
				gradientStopColor="#3b82f6"
				delay={0}
				duration={duration}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={designRef}
				toRef={codeRef}
				curvature={75}
				gradientStartColor="#3b82f6"
				gradientStopColor="#3b82f6"
				delay={duration}
				duration={duration}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={codeRef}
				toRef={launchRef}
				curvature={-75}
				gradientStartColor="#3b82f6"
				gradientStopColor="#3b82f6"
				delay={duration * 2}
				duration={duration}
			/>
		</div>
	);
}

export function ComingSoon() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 py-4 sm:py-8">
			<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				{/* Animated gradient background */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 animate-pulse" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
				</div>

				{/* Main content */}
				<div className="relative z-10 space-y-6 sm:space-y-8 md:space-y-10">
					{/* Hero Section */}
					<div className="space-y-4 sm:space-y-6">
						{/* Coming Soon Badge */}
						<Badge
							variant="default"
							className="inline-flex items-center justify-center py-1 px-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm shadow-xs shadow-purple-500/50"
						>

							🚀 Coming Soon

						</Badge>
						{/* Name and Title */}
						<div className="space-y-3 sm:space-y-4">
							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent leading-tight">
								{portfolioConfig.personal.firstName}{" "}
								{portfolioConfig.personal.lastName}
							</h1>

							<div className="max-w-2xl mx-auto">
								<p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
									{portfolioConfig.personal.description}
								</p>
							</div>
						</div>
					</div>

					{/* Animated Development Progress */}
					<div className="space-y-4">
						<div className="space-y-1">
							<h3 className="text-base sm:text-lg font-semibold text-foreground">
								👷🏽‍♂️ Building in Progress
							</h3>
							<p className="text-xs text-muted-foreground">
								Expected launch: Q4 2025
							</p>
						</div>
						<div className="py-2">
							<BuildingProgress />
						</div>
					</div>

					{/* Social Links */}
					<div className="space-y-3 pb-4">
						<p className="text-xs sm:text-sm text-muted-foreground">
							Connect with me while you wait
						</p>
						<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
							<a
								href={portfolioConfig.social.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground underline transition-colors"
							>
								GitHub
							</a>
							<a
								href={portfolioConfig.social.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground underline transition-colors"
							>
								LinkedIn
							</a>
							<a
								href={portfolioConfig.social.twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground underline transition-colors"
							>
								Twitter
							</a>
							<a
								href={`mailto:${portfolioConfig.personal.email}`}
								className="text-muted-foreground hover:text-foreground underline transition-colors"
							>
								Email
							</a>
						</div>
					</div>
				</div>

				{/* Floating elements */}
				<div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
				<div className="absolute bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
				<div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-500" />
			</div>
		</div>
	);
}
