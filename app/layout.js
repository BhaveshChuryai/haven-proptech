import "./globals.css";

export const metadata = {
  title: "Haven Group – Premium Real Estate",
  description:
    "HAVEN GROUP – Premium land and property investment across Khopoli and Mumbai. Requirement-based real estate platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
