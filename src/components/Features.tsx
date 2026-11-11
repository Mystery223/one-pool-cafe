import { Coffee, Wifi, Clock, CircleDot } from 'lucide-react';

const features = [
  { icon: CircleDot, label: 'I',   title: 'Meja Billiard',   text: 'Meja billiard premium tersedia untuk Anda nikmati kapan saja.' },
  { icon: Coffee,    label: 'II',  title: 'Kopi Spesial',    text: 'Berbagai minuman kopi dan non-kopi yang nikmat menemani permainan.' },
  { icon: Wifi,      label: 'III', title: 'WiFi Premium',    text: 'Koneksi cepat untuk kamu bekerja, belajar, atau bersantai dengan nyaman.' },
  { icon: Clock,     label: 'IV',  title: 'Buka Setiap Hari', text: 'Dari pagi hingga malam, 7 hari seminggu kami siap menyambutmu.' },
];

export default function Features() {
  return (
    <section className="py-24 bg-void-950 border-t border-void-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase text-gold-400 font-medium">
            Keunggulan Kami
          </span>
          <span className="gold-line mt-4 block" />
          <h2 className="font-display text-4xl md:text-5xl text-parchment-100 font-bold mt-6">
            Lebih dari Sekadar Kafe
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-void-800/30">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-void-950 hover:bg-void-900 transition-colors duration-300 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs text-gold-600/60 font-light tracking-widest">{f.label}</span>
                <span className="flex-1 h-px bg-gold-700/30" />
              </div>
              <f.icon className="w-7 h-7 text-gold-500/70 mb-5 group-hover:text-gold-400 transition-colors" />
              <h3 className="font-display text-lg text-parchment-200 font-semibold mb-3">
                {f.title}
              </h3>
              <p className="text-xs text-parchment-300/70 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
