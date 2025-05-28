'use client'

// import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider } from '../lib/AuthContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navOpen, setNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<'en' | 'ms'>(typeof window !== 'undefined' && localStorage.getItem('lang') === 'ms' ? 'ms' : 'en');
  const pathname = usePathname();
  const router = useRouter();

  // Dark mode effect
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Language effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, [lang]);

  // Nav links
  const navLinks = [
    { href: '/dashboard', label: lang === 'ms' ? 'Papan Pemuka' : 'Dashboard' },
    { href: '/vehicles', label: lang === 'ms' ? 'Kenderaan' : 'Vehicles' },
    { href: '/appointments', label: lang === 'ms' ? 'Temujanji' : 'Appointments' },
    { href: '/service-history', label: lang === 'ms' ? 'Sejarah Servis' : 'Service History' },
    { href: '/profile', label: lang === 'ms' ? 'Profil' : 'Profile' },
  ];

  return (
    <html lang={lang} className={`${inter.variable} ${robotoMono.variable} ${darkMode ? 'dark' : ''}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>
          <nav className="w-full bg-card border-border border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2">
              <a href="/dashboard" className="font-bold text-lg text-accent">Workshop1Manager</a>
              <button
                className="md:hidden p-2 hover:bg-accent/10 rounded-md focus:outline-none"
                aria-label="Toggle navigation"
                onClick={() => setNavOpen((open) => !open)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="hidden md:flex gap-4 text-sm items-center">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`hover:text-accent transition-colors ${pathname === link.href ? 'text-accent font-semibold' : ''}`}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  className="ml-2 px-2 py-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground text-xs transition-colors"
                  onClick={() => setLang(lang === 'en' ? 'ms' : 'en')}
                  aria-label="Toggle language"
                >
                  {lang === 'en' ? 'BM' : 'EN'}
                </button>
                <button
                  className="ml-2 px-2 py-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground text-xs transition-colors"
                  onClick={() => setDarkMode(d => !d)}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
            {navOpen && (
              <div className="md:hidden bg-card border-t border-border px-4 pb-4 flex flex-col gap-2">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`hover:text-accent transition-colors ${pathname === link.href ? 'text-accent font-semibold' : ''}`}
                    onClick={() => setNavOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-2 py-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground text-xs transition-colors"
                    onClick={() => setLang(lang === 'en' ? 'ms' : 'en')}
                    aria-label="Toggle language"
                  >
                    {lang === 'en' ? 'BM' : 'EN'}
                  </button>
                  <button
                    className="px-2 py-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground text-xs transition-colors"
                    onClick={() => setDarkMode(d => !d)}
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? '☀️' : '🌙'}
                  </button>
                </div>
              </div>
            )}
          </nav>
          <main className="flex-1">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
