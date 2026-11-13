import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Galeri', href: '#gallery' },
  { label: 'Reservasi', href: '#reservation' },
  { label: 'Kontak', href: '#contact' },
];

function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); scrollToSection(href); }}
      className="text-xs tracking-widest uppercase text-parchment-200 hover:text-gold-300 font-medium transition-colors duration-200 py-1"
    >
      {label}
    </a>
  );
}

function NavBrand() {
  return (
    <a
      href="#home"
      onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
      className="flex flex-col items-center group md:static absolute left-1/2 -translate-x-1/2 pointer-events-auto"
    >
      <div className="w-11 h-11 rounded-full border border-gold-500/50 overflow-hidden flex items-center justify-center group-hover:border-gold-400 transition-colors bg-void-900/60 shadow-sm">
        <img src="/logo.jpeg" alt="Logo One Pool and Coffee" className="w-full h-full object-cover" />
      </div>
      <span className="font-display text-sm text-parchment-100 tracking-widest mt-1.5 leading-none">
        ONE POOL & COFFEE
      </span>
    </a>
  );
}

function MobileLinks({ onClose }: { onClose: () => void }) {
  return (
    <ul className="flex flex-col gap-1">
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollToSection(link.href); onClose(); }}
            className="flex items-center min-h-[44px] px-3 py-2 text-sm tracking-wide text-parchment-200 hover:text-gold-300 transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="md:hidden border-t border-gold-600/20 bg-void-950/95 backdrop-blur-md px-4 pb-6 pt-3 animate-fade-in">
      <MobileLinks onClose={onClose} />
      <div className="pt-3">
        <a
          href="#reservation"
          onClick={(e) => { e.preventDefault(); scrollToSection('#reservation'); onClose(); }}
          className="block text-center py-3 border border-gold-500 text-gold-300 text-xs tracking-widest uppercase font-semibold hover:bg-gold-500/10 transition-colors"
        >
          Reservasi Meja
        </a>
      </div>
    </div>
  );
}

function DesktopLinks({ start, end }: { start: number; end: number }) {
  return (
    <ul className="hidden md:flex items-center gap-8">
      {navLinks.slice(start, end).map((link) => (
        <li key={link.href}>
          <NavLink href={link.href} label={link.label} />
        </li>
      ))}
    </ul>
  );
}

function DesktopRight() {
  return (
    <div className="hidden md:flex items-center gap-8">
      <DesktopLinks start={3} end={6} />
      <a
        href="#reservation"
        onClick={(e) => { e.preventDefault(); scrollToSection('#reservation'); }}
        className="px-5 py-2.5 border border-gold-500 text-gold-300 text-xs tracking-widest uppercase font-semibold hover:bg-gold-500 hover:text-void-950 transition-all duration-200"
      >
        Reservasi
      </a>
    </div>
  );
}

function DesktopNav({ onToggle, open }: { onToggle: () => void; open: boolean }) {
  return (
    <div className="relative flex items-center justify-between h-20">
      <DesktopLinks start={0} end={3} />
      <NavBrand />
      <DesktopRight />
      <button
        onClick={onToggle}
        className="md:hidden ml-auto text-parchment-100 p-2.5 rounded hover:bg-void-900 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
        aria-label="Toggle navigation menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void-950/90 backdrop-blur-md border-b border-void-800/80 shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <DesktopNav onToggle={() => setMobileOpen(!mobileOpen)} open={mobileOpen} />
      </nav>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
