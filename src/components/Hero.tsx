import { ArrowRight, Calendar } from 'lucide-react';

const heroBg =
  'https://images.pexels.com/photos/13240964/pexels-photo-13240964.jpeg?auto=compress&cs=tinysrgb&w=1600';
const coffeeBeans =
  'https://images.pexels.com/photos/19162213/pexels-photo-19162213.jpeg?auto=compress&cs=tinysrgb&w=1600';

function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Interior suasana One Pool and Coffee"
        className="w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void-950/95 via-void-950/80 to-void-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-transparent to-void-950/70" />
    </div>
  );
}

function HeroCta() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <a
        href="#menu"
        className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold-500 text-void-950 text-xs tracking-widest uppercase font-semibold hover:bg-gold-400 transition-all duration-200 shadow-lg shadow-gold-500/10 group"
      >
        Lihat Menu
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </a>
      <a
        href="#reservation"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-gold-500/60 text-gold-300 text-xs tracking-widest uppercase font-semibold hover:bg-gold-500/10 transition-colors"
      >
        <Calendar className="w-3.5 h-3.5" />
        Reservasi Meja
      </a>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 sm:pt-32 sm:pb-24 w-full">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-parchment-100 font-bold leading-[1.1] tracking-tight">
          One Pool and Coffee
          <span className="block italic text-gold-300 font-normal mt-2 text-3xl sm:text-5xl lg:text-6xl">
            Billiard &amp; Kopi Terbaik
          </span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-parchment-200 leading-relaxed font-normal">
          Nikmati meja billiard premium dan berbagai pilihan kopi spesial dalam satu tempat yang nyaman.
          Cocok untuk bersantai, nongkrong bareng, atau melepas penat bersama orang-orang terbaik.
        </p>
        <HeroCta />
      </div>
    </div>
  );
}

function IntroStoryBand() {
  return (
    <section className="relative py-12 sm:py-16 bg-void-900 border-y border-void-800/80 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={coffeeBeans}
          alt="Suasana One Pool and Coffee"
          className="w-full h-full object-cover opacity-15"
        />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="text-parchment-200 text-sm sm:text-base leading-relaxed font-light">
          Satu tempat untuk semua momen santai terbaikmu. Dari meja billiard berkualitas tinggi
          hingga kopi spesial yang diseduh dengan penuh dedikasi semuanya hadir di{' '}
          <span className="text-gold-300 italic font-display font-medium">One Pool and Coffee</span>.
        </p>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative min-h-[85dvh] sm:min-h-[90dvh] flex items-center overflow-hidden bg-void-950"
      >
        <HeroBackground />
        <HeroContent />
      </section>
      <IntroStoryBand />
    </>
  );
}
