import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "UniBlind — Speak Freely. Stay Anonymous.",
  description:
    "The verified anonymous community for university students. Rate professors, review courses, share opportunities — no judgment, no exposure.",
  openGraph: {
    title: "UniBlind — Speak Freely. Stay Anonymous.",
    description:
      "Verified anonymous community for university students. Campus-first.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniBlind — Speak Freely. Stay Anonymous.",
    description:
      "Verified anonymous community for university students. Campus-first.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable}`}>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#08080F",
          color: "#E8E6F0",
          fontFamily: "var(--font-body), system-ui, sans-serif",
          WebkitFontSmoothing: "antialiased",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
