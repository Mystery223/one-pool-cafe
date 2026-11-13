import { Coffee, Wifi, Clock, CircleDot } from 'lucide-react';

const baristaImg =
  'https://images.pexels.com/photos/15190560/pexels-photo-15190560.jpeg?auto=compress&cs=tinysrgb&w=900';

const values = [
  {
    icon: CircleDot,
    title: 'Meja Billiard Premium',
    text: 'Tersedia meja billiard berkualitas tinggi untuk Anda nikmati bersama teman dan keluarga.',
  },
  {
    icon: Coffee,
    title: 'Kopi Spesial',
    text: 'Berbagai pilihan kopi dan minuman segar yang siap menemani sesi bermain Anda.',
  },
  {
    icon: Clock,
    title: 'Buka Setiap Hari',
    text: 'Kami buka setiap hari dari pagi hingga malam untuk menyambut Anda kapan saja.',
  },
  {
    icon: Wifi,
    title: 'Ruang Nyaman & WiFi Cepat',
    text: 'Suasana santai dengan koneksi WiFi cepat sangat cocok untuk bersantai atau nongkrong bareng.',
  },
];

function ValueGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {values.map((v) => (
        <div key={v.title} className="flex flex-col gap-1.5 p-3.5 rounded bg-void-900/60 border border-void-800/80">
          <div className="flex items-center gap-2">
            <v.icon className="w-4 h-4 text-gold-400" />
            <h3 className="text-parchment-100 font-semibold text-sm">{v.title}</h3>
          </div>
          <p className="text-parchment-300 text-xs leading-relaxed">{v.text}</p>
        </div>
      ))}
    </div>
  );
}

function StoryContent() {
  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-parchment-100 font-bold leading-tight">
        Tempat Santai, Main Billiard &amp; Ngopi
      </h2>
      <p className="mt-5 text-parchment-200 text-sm sm:text-base leading-relaxed">
        One Pool and Coffee hadir sebagai tempat nongkrong yang menyenangkan dengan memadukan
        meja billiard premium serta pilihan kopi dan minuman terbaik. Kami menyediakan
        suasana santai yang sempurna untuk bersantai bersama teman dan keluarga.
      </p>
      <ValueGrid />
    </div>
  );
}

function StoryImage() {
  return (
    <div className="relative mt-6 lg:mt-0">
      <div className="relative overflow-hidden rounded-lg border border-gold-600/20 shadow-2xl shadow-black/60">
        <img
          src={baristaImg}
          alt="Suasana One Pool and Coffee"
          className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function DividerQuote() {
  return (
    <div
      className="relative py-16 sm:py-20 overflow-hidden bg-cover bg-center border-y border-void-800/80"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4098880/pexels-photo-4098880.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
      }}
    >
      <div className="absolute inset-0 bg-void-950/85 backdrop-blur-[2px]" />
      <div className="relative max-w-3xl mx-auto text-center px-6">
        <blockquote className="font-display text-2xl sm:text-4xl text-parchment-100 font-bold leading-snug">
          "Satu tempat untuk semua momen santai terbaikmu."
        </blockquote>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-void-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <StoryContent />
          <StoryImage />
        </div>
      </div>
      <DividerQuote />
    </section>
  );
}
