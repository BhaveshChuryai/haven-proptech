import "./globals.css";

export const metadata = {
  title: "Haven Group | Premium Land Matchmaking Platform",
  description:
    "A premium PropTech platform connecting buyers directly with verified land owners across Maharashtra and Goa.",
  keywords: [
    "PropTech India",
    "Land Matchmaking",
    "Direct Owner Land",
    "Off-Market Land",
    "Goa Land",
    "Karjat Land",
    "Lonavala Land",
    "Igatpuri Land",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
