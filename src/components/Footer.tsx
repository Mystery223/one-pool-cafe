import { Instagram, Facebook, Twitter } from 'lucide-react';

const footerLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Galeri', href: '#gallery' },
  { label: 'Reservasi', href: '#reservation' },
  { label: 'Kontak', href: '#contact' },
];

function FooterNav() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8">
      {footerLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-xs tracking-wider uppercase text-parchment-300 hover:text-gold-300 font-medium transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function FooterBrand() {
  return (
    <div className="flex flex-col items-center gap-2 mb-6">
      <div className="w-12 h-12 rounded-full border border-gold-500/40 bg-void-900 overflow-hidden flex items-center justify-center shadow-sm">
        <img src="/logo.jpeg" alt="Logo One Pool and Coffee" className="w-full h-full object-cover" />
      </div>
      <span className="font-display text-sm tracking-widest text-parchment-100 font-semibold">
        ONE POOL & COFFEE
      </span>
      <p className="text-xs text-parchment-300">Billiard &amp; Coffee Experience</p>
    </div>
  );
}

function FooterSocials() {
  const socials = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram One Pool and Coffee' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook One Pool and Coffee' },
    { icon: Twitter, href: 'https://x.com', label: 'X (Twitter) One Pool and Coffee' },
  ];
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {socials.map((s, idx) => (
        <a
          key={idx}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="w-9 h-9 border border-void-800 rounded flex items-center justify-center hover:border-gold-500 hover:text-gold-300 text-parchment-300 transition-colors"
        >
          <s.icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-void-950 border-t border-void-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 text-center">
        <FooterNav />
        <FooterBrand />
        <FooterSocials />
        <p className="text-xs text-parchment-300 tracking-wider">
          &copy; {new Date().getFullYear()} One Pool and Coffee. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
