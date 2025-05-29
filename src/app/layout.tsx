'use client'

// import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { AuthProvider } from '../lib/AuthContext';
import { LanguageProvider, useLanguage } from '../lib/LanguageContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

function MainLayout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/verify-email';

  const navLinks = [
    { href: '/dashboard', label: language === 'ms' ? 'Papan Pemuka' : 'Dashboard' },
    { href: '/vehicles', label: language === 'ms' ? 'Kenderaan' : 'Vehicles' },
    { href: '/appointments', label: language === 'ms' ? 'Temujanji' : 'Appointments' },
    { href: '/service-history', label: language === 'ms' ? 'Sejarah Servis' : 'Service History' },
    { href: '/profile', label: language === 'ms' ? 'Profil' : 'Profile' },
  ];

  return (
    <html lang={language} className={`${inter.variable} ${robotoMono.variable} ${darkMode ? 'dark' : ''}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>
          <nav className="w-full bg-card border-border border-b shadow-sm sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4 py-2 lg:px-8">              <a href={isAuthPage ? '/login' : '/dashboard'} className="font-black text-xl sm:text-2xl text-accent shrink-0 hover:text-accent tracking-tight">
                <span>WORKSHOP1</span>{' '}<span>MANAGER</span>
              </a>
              {!isAuthPage && (
                <button
                  className="md:hidden p-2 hover:bg-accent/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20"
                  aria-label={t('toggleNav')}
                  onClick={() => setNavOpen((open) => !open)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <div className="flex items-center gap-2">
                {!isAuthPage && (
                  <div className="hidden md:flex md:items-center md:gap-6 text-sm mr-4">
                    {navLinks.map(link => (
                      <a
                        key={link.href}
                        href={link.href}                        className={`relative transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full ${
                          pathname === link.href ? 'text-accent font-semibold after:w-full' : ''
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                <div className={`flex items-center gap-2 ${!isAuthPage && 'border-l border-border pl-4'}`}>
                  <button
                    className="p-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground text-xs transition-colors"
                    onClick={() => setLanguage(language === 'en' ? 'ms' : 'en')}
                    aria-label={t('language')}
                  >
                    {language === 'en' ? 'BM' : 'EN'}
                  </button>
                  <button
                    className="p-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground text-xs transition-colors"
                    onClick={() => setDarkMode(d => !d)}
                    aria-label={darkMode ? t('lightMode') : t('darkMode')}
                  >
                    {darkMode ? '☀️' : '🌙'}
                  </button>
                </div>
              </div>
            </div>
            {!isAuthPage && navOpen && (              <div className="md:hidden bg-card border-t border-border transform transition-transform duration-300 ease-in-out">
                <div className="container mx-auto px-4 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                  {navLinks.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-base hover:text-accent transition-colors ${
                        pathname === link.href ? 'text-accent font-semibold' : ''
                      }`}
                      onClick={() => setNavOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>
          <main className="container mx-auto px-4 py-6 lg:px-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainLayout>{children}</MainLayout>
      </AuthProvider>
    </LanguageProvider>
  );
}
