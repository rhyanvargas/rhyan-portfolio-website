import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
	title: "Rhyan Vargas - AI-First Full Stack Engineer",
	description:
		"Rhyan Vargas is an AI-First Full Stack Engineer specializing in Integrating APIs, LLMs, and cloud systems into production apps with real user impact.",
	generator: "Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
				<Suspense fallback={null}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
					<Analytics />
				</Suspense>
			</body>
		</html>
	);
}
