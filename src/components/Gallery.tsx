interface GalleryItem {
  url: string;
  label: string;
  tall?: boolean;
}

const galleryImages: GalleryItem[] = [
  { url: 'https://images.pexels.com/photos/35518412/pexels-photo-35518412.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Suasana Hangat', tall: true },
  { url: 'https://images.pexels.com/photos/15860802/pexels-photo-15860802.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Ruang Terang' },
  { url: 'https://images.pexels.com/photos/36484101/pexels-photo-36484101.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Sudut Nyaman' },
  { url: 'https://images.pexels.com/photos/40175045/pexels-photo-40175045.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Secangkir Kesempurnaan', tall: true },
  { url: 'https://images.pexels.com/photos/30853716/pexels-photo-30853716.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Sajian Segar' },
  { url: 'https://images.pexels.com/photos/27246443/pexels-photo-27246443.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Momen Santai' },
];

function GalleryHeader() {
  return (
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl sm:text-5xl text-parchment-100 font-bold">
        Galeri &amp; Suasana
      </h2>
      <p className="mt-3 text-parchment-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
        Meja billiard terawat, racikan minuman segar, dan tempat kumpul yang santai untuk hari Anda.
      </p>
    </div>
  );
}

function GalleryCard({ img }: { img: GalleryItem }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg group border border-void-800 shadow-md ${
        img.tall
          ? 'md:row-span-2 min-h-[280px] sm:min-h-[320px] md:min-h-[540px]'
          : 'min-h-[220px] sm:min-h-[250px]'
      }`}
    >
      <img
        src={img.url}
        alt={img.label}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void-950/85 via-transparent to-transparent flex items-end p-5">
        <span className="font-display text-parchment-100 text-sm sm:text-base font-medium">
          {img.label}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24 lg:py-28 bg-void-900 border-t border-void-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <GalleryHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {galleryImages.map((img, idx) => (
            <GalleryCard key={idx} img={img} />
          ))}
        </div>
      </div>
    </section>
  );
}
