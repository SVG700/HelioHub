import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { SiteShell } from '@/components/site-shell';
import './globals.css';

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body'
});

const displayFont = Orbitron({
  subsets: ['latin'],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'HelioHub – Smart Solar Charging Station',
  description: 'HelioHub is a futuristic smart solar charging station powered by Helios AI.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

