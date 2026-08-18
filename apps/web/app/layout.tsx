import "@/app/globals.css";
import { buildEnv } from "@cap/env";
import { OpenPanelComponent } from "@openpanel/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import type { PropsWithChildren } from "react";

const defaultFont = localFont({
	src: [
		{
			path: "../public/fonts/NeueMontreal-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/NeueMontreal-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/NeueMontreal-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/NeueMontreal-MediumItalic.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "../public/fonts/NeueMontreal-Italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../public/fonts/NeueMontreal-BoldItalic.woff2",
			weight: "700",
			style: "italic",
		},
	],
	preload: false,
});

const BRAND_NAME = "HAKI Video";
const BRAND_URL = "https://video.usehaki.com";
const BRAND_TITLE = "HAKI Video — Screen recordings, shared instantly.";
const BRAND_DESCRIPTION =
	"Record your screen and share it with a link. Private video sharing by HAKI.";

export const metadata: Metadata = {
	metadataBase: new URL(BRAND_URL),
	title: BRAND_TITLE,
	description: BRAND_DESCRIPTION,
	openGraph: {
		title: BRAND_TITLE,
		description: BRAND_DESCRIPTION,
		type: "website",
		url: BRAND_URL,
		siteName: BRAND_NAME,
		images: [
			{
				url: "/api/og",
				width: 1200,
				height: 630,
				alt: BRAND_TITLE,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: BRAND_TITLE,
		description: BRAND_DESCRIPTION,
		images: ["/api/og"],
	},
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		// suppressHydrationWarning: the Cap Chrome extension stamps
		// data-cap-chrome-extension-installed on <html> at document_idle,
		// which can land before hydration finishes.
		<html className={defaultFont.className} lang="en" suppressHydrationWarning>
			<head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body suppressHydrationWarning>
				<Script src="/theme-script.js" strategy="beforeInteractive" />
				{buildEnv.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ? (
					<OpenPanelComponent
						apiUrl="/api/op"
						clientId={buildEnv.NEXT_PUBLIC_OPENPANEL_CLIENT_ID}
						scriptUrl="/api/op/op1.js"
						trackOutgoingLinks
						trackScreenViews
					/>
				) : null}
				<main className="w-full">{children}</main>
			</body>
		</html>
	);
}
