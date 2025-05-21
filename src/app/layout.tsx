'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Language effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, [lang]);

  // Logout handler
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Nav links
  const navLinks = [
    { href: '/dashboard', label: lang === 'ms' ? 'Papan Pemuka' : 'Dashboard' },
    { href: '/vehicles', label: lang === 'ms' ? 'Kenderaan' : 'Vehicles' },
    { href: '/appointments', label: lang === 'ms' ? 'Temujanji' : 'Appointments' },
    { href: '/service-history', label: lang === 'ms' ? 'Sejarah Servis' : 'Service History' },
    { href: '/profile', label: lang === 'ms' ? 'Profil' : 'Profile' },
  ];

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
        <nav className="w-full bg-white dark:bg-gray-900 border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2">
            <a href="/dashboard" className="font-bold text-lg text-primary">Workshop1Manager</a>
            <button
              className="md:hidden p-2 focus:outline-none"
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
                  className={`hover:text-primary ${pathname === link.href ? 'text-primary font-semibold underline' : ''}`}
                >
                  {link.label}
                </a>
              ))}
              <button
                className="ml-2 px-2 py-1 rounded border text-xs hover:bg-muted"
                onClick={() => setLang(lang === 'en' ? 'ms' : 'en')}
                aria-label="Toggle language"
              >
                {lang === 'en' ? 'BM' : 'EN'}
              </button>
              <button
                className="ml-2 px-2 py-1 rounded border text-xs hover:bg-muted"
                onClick={() => setDarkMode(d => !d)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button
                className="ml-2 px-2 py-1 rounded border text-xs hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-300"
                onClick={handleLogout}
              >
                {lang === 'ms' ? 'Log Keluar' : 'Logout'}
              </button>
            </div>
          </div>
          {navOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t shadow-sm px-4 pb-4 flex flex-col gap-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`hover:text-primary ${pathname === link.href ? 'text-primary font-semibold underline' : ''}`}
                  onClick={() => setNavOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-2">
                <button
                  className="px-2 py-1 rounded border text-xs hover:bg-muted"
                  onClick={() => setLang(lang === 'en' ? 'ms' : 'en')}
                  aria-label="Toggle language"
                >
                  {lang === 'en' ? 'BM' : 'EN'}
                </button>
                <button
                  className="px-2 py-1 rounded border text-xs hover:bg-muted"
                  onClick={() => setDarkMode(d => !d)}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
                <button
                  className="px-2 py-1 rounded border text-xs hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-300"
                  onClick={handleLogout}
                >
                  {lang === 'ms' ? 'Log Keluar' : 'Logout'}
                </button>
              </div>
            </div>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
