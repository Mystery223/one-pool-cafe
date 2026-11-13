import { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Berry Pink',
    description: 'Perpaduan segar sari buah beri manis dingin dan sensasi citrus lemon yang menyegarkan.',
    price: 19000,
    category: 'non-coffee',
    image: '/img/Berry_pink.jpeg',
  },
  {
    id: '2',
    name: 'Blue Ocean Mojito',
    description: 'Kesegaran sirup blue curacao berpadu soda berkarbonasi, daun mint segar, dan perasan jeruk nipis dingin.',
    price: 18000,
    category: 'non-coffee',
    image: '/img/Blue_ocean.jpeg',
  },
  {
    id: '3',
    name: 'Grand Forest',
    description: 'Sensasi segar sirup melon hijau berpadu irisan jeruk nipis asli, daun mint, dan yakult menyejukkan.',
    price: 22000,
    category: 'non-coffee',
    image: '/img/Grand_forest.jpeg',
  },
  {
    id: '4',
    name: 'Summer Mojito',
    description: 'Mocktail musim panas dengan ekstrak water melon, soda sparkling, daun mint, dan sentuhan lemon segar.',
    price: 18000,
    category: 'non-coffee',
    image: '/img/Summer_mojito.jpeg',
  },
  {
    id: '5',
    name: 'Sunrise Mojito',
    description: 'Gradasi eksotis sari jeruk manis dan stroberi berpadu soda dingin dengan garnish irisan lemon pilihan.',
    price: 25000,
    category: 'non-coffee',
    image: '/img/Sunrise_mojito.jpeg',
  },
  {
    id: '6',
    name: 'Coffee Gula Aren',
    description: 'Espresso pekat bertemu susu segar, menghasilkan kopi susu iced yang sempurna dan nikmat.',
    price: 20000,
    category: 'coffee',
    image: '/img/foto-7.jpeg',
  },
  {
    id: '7',
    name: 'Coffee Latte',
    description: 'Kopi latte iced dengan milk foam tebal, tekstur lembut, dan aroma kopi yang kuat.',
    price: 19000,
    category: 'coffee',
    image: '/img/foto-8.jpeg',
  },
  {
    id: '8',
    name: 'Vanilla Coffee',
    description: 'Espresso dan susu segar dipadu sirup vanilla premium, manis lembut dengan aroma harum yang menggoda.',
    price: 19000,
    category: 'coffee',
    image: '/img/foto-9.jpeg',
  },
  {
    id: '9',
    name: 'Hazelnut Coffee',
    description: 'Kopi latte iced dengan sentuhan hazelnut yang kaya, menghadirkan rasa nutty yang memanjakan lidah.',
    price: 19000,
    category: 'coffee',
    image: '/img/foto-10.jpeg',
  },
  {
    id: '10',
    name: 'Taro Coffee',
    description: 'Perpaduan unik espresso dengan taro ungu yang creamy menjadikan rasa kopi yang berbeda dari biasanya.',
    price: 20000,
    category: 'coffee',
    image: '/img/foto-11.jpeg',
  },
  {
    id: '11',
    name: 'Milk Taro',
    description: 'Masih Perlu pembahasan',
    price: 19000,
    category: 'milk-matcha',
    image: '/img/foto-2.jpeg',
  },
  {
    id: '12',
    name: 'Milk Matcha',
    description: 'Masih Perlu pembahasan',
    price: 20000,
    category: 'milk-matcha',
    image: '/img/foto-1.jpeg',
  },
  {
    id: '13',
    name: 'Matcha Brown Sugar Latte',
    description: 'Masih Perlu pembahasan',
    price: 20000,
    category: 'milk-matcha',
    image: '/img/foto-4.jpeg',
  },
];

const categories = [
  { key: 'all', label: 'Semua' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'non-coffee', label: 'Fresh Drink' },
  { key: 'milk-matcha', label: 'Milk & Matcha'}
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

function MenuHeader() {
  return (
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl sm:text-5xl text-parchment-100 font-bold">
        Daftar Menu Favorit
      </h2>
      <p className="mt-3 text-parchment-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
        Pilihan kopi racikan dan minuman segar untuk menemani santai dan permainan billiard Anda.
      </p>
    </div>
  );
}

function CategoryTabs({ active, onSelect }: { active: string; onSelect: (key: string) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onSelect(cat.key)}
          className={`px-5 py-2.5 text-xs tracking-wider uppercase font-semibold transition-all rounded ${
            active === cat.key
              ? 'bg-gold-500 text-void-950 shadow-md shadow-gold-500/20'
              : 'bg-void-900 border border-void-800 text-parchment-200 hover:border-gold-500/50 hover:text-gold-300'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

function ItemImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-void-950">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="group bg-void-900 border border-void-800/80 hover:border-gold-500/40 transition-all rounded-lg overflow-hidden flex flex-col shadow-md">
      <ItemImage src={item.image} alt={item.name} />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base sm:text-lg text-parchment-100 font-semibold leading-snug">
              {item.name}
            </h3>
            <span className="text-gold-400 font-semibold text-sm whitespace-nowrap">
              {formatPrice(item.price)}
            </span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-parchment-300 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Menu() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <section id="menu" className="py-16 sm:py-24 lg:py-28 bg-void-950 border-t border-void-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <MenuHeader />
        <CategoryTabs active={active} onSelect={setActive} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
