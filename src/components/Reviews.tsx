import { useState, useEffect } from 'react';
import { supabase, type Review } from '@/lib/supabase';
import { Star, Loader2, Send } from 'lucide-react';

const rationalOverrides: Record<string, string> = {
  'aa34115e-6706-4b9c-9c61-54505ff4da1e':
    'Tempatnya asyik buat main billiard bareng teman. Meja billiard-nya terawat dan kopinya enak, pas banget buat santai sore.',
  '5286aa7e-53e0-447a-9c73-9194ab6cca74':
    'Kopi Susu Kekinian dan Summer Mojito-nya mantap! Suasananya nyaman, pelayanannya ramah, cocok buat nongkrong lama.',
  'ad6dd4a3-f324-4c1c-89d5-4724bb41cf90':
    'Pilihan minumannya variatif dan segar, terutama Berry Pink-nya. Tempatnya bersih dan meja billiard-nya nyaman dimainkan.',
  '14e6d063-bf55-417a-baed-b0a08f7289f2':
    'Tempat billiard sekaligus kafe terbaik di area Leuwigoong. Parkirnya luas, WiFi kencang, dan harga minumannya sangat bersahabat.',
};

const defaultReviews: Review[] = [
  {
    id: 'aa34115e-6706-4b9c-9c61-54505ff4da1e',
    name: 'Sarah Wijaya',
    rating: 5,
    comment: rationalOverrides['aa34115e-6706-4b9c-9c61-54505ff4da1e'],
    is_approved: true,
    created_at: '2026-10-23T15:23:38.052467+00:00',
  },
  {
    id: '5286aa7e-53e0-447a-9c73-9194ab6cca74',
    name: 'Michael Tan',
    rating: 5,
    comment: rationalOverrides['5286aa7e-53e0-447a-9c73-9194ab6cca74'],
    is_approved: true,
    created_at: '2026-10-23T15:23:38.052467+00:00',
  },
  {
    id: 'ad6dd4a3-f324-4c1c-89d5-4724bb41cf90',
    name: 'Linda Hartono',
    rating: 4,
    comment: rationalOverrides['ad6dd4a3-f324-4c1c-89d5-4724bb41cf90'],
    is_approved: true,
    created_at: '2026-10-23T15:23:38.052467+00:00',
  },
  {
    id: '14e6d063-bf55-417a-baed-b0a08f7289f2',
    name: 'David Pratama',
    rating: 5,
    comment: rationalOverrides['14e6d063-bf55-417a-baed-b0a08f7289f2'],
    is_approved: true,
    created_at: '2026-10-23T15:23:38.052467+00:00',
  },
];

function ReviewsHeader() {
  return (
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl sm:text-5xl text-parchment-100 font-bold">
        Ulasan Pengunjung
      </h2>
      <p className="mt-3 text-parchment-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
        Pendapat jujur dari pengunjung tentang permainan billiard, rasa kopi, dan kenyamanan di One Pool and Cafe.
      </p>
    </div>
  );
}

function StarRating({ rating, setRating }: { rating: number; setRating?: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!setRating}
          onClick={() => setRating?.(n)}
          className={`p-1 ${setRating ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          aria-label={`${n} bintang`}
        >
          <Star className={`w-4 h-4 ${n <= rating ? 'fill-gold-400 text-gold-400' : 'text-void-700'}`} />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-void-950 p-6 sm:p-8 rounded border border-void-800/80 flex flex-col justify-between shadow-md">
      <div>
        <StarRating rating={review.rating} />
        <p className="mt-4 text-parchment-200 text-sm sm:text-base leading-relaxed italic font-display">
          "{review.comment}"
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-void-800 flex items-center justify-between">
        <p className="text-xs tracking-wider uppercase font-semibold text-gold-400">{review.name}</p>
        <span className="text-xs text-parchment-300">Pengunjung Terverifikasi</span>
      </div>
    </div>
  );
}

interface ReviewFormProps {
  form: { name: string; rating: number; comment: string };
  status: 'idle' | 'loading' | 'success' | 'error';
  setForm: React.Dispatch<React.SetStateAction<{ name: string; rating: number; comment: string }>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

function ReviewFormInputs({ form, setForm }: { form: { name: string; rating: number; comment: string }; setForm: React.Dispatch<React.SetStateAction<{ name: string; rating: number; comment: string }>> }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs uppercase tracking-wider text-parchment-200 font-medium mb-1.5 block">Nama Lengkap</label>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama kamu" className="w-full px-4 py-2.5 bg-void-900 border border-void-700 rounded text-parchment-100 placeholder:text-parchment-400/50 text-sm focus:border-gold-500" />
      </div>
      <div>
        <label className="text-xs uppercase tracking-wider text-parchment-200 font-medium mb-1.5 block">Rating</label>
        <StarRating rating={form.rating} setRating={(r) => setForm({ ...form, rating: r })} />
      </div>
      <div>
        <label className="text-xs uppercase tracking-wider text-parchment-200 font-medium mb-1.5 block">Ulasan</label>
        <textarea rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Ceritakan pengalaman rasa dan suasananya..." className="w-full px-4 py-2.5 bg-void-900 border border-void-700 rounded text-parchment-100 placeholder:text-parchment-400/50 text-sm focus:border-gold-500 resize-none" />
      </div>
    </div>
  );
}

function ReviewForm({ form, status, setForm, onSubmit, onCancel }: ReviewFormProps) {
  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-void-950 border border-void-700/80 p-6 sm:p-8 rounded space-y-5 text-left shadow-xl animate-fade-in">
      <h3 className="font-display text-xl text-parchment-100 font-semibold text-center">Bagikan Pengalamanmu</h3>
      <ReviewFormInputs form={form} setForm={setForm} />
      {status === 'success' && <p className="text-gold-400 text-xs text-center font-medium">Terima kasih! Ulasan akan tampil setelah diverifikasi.</p>}
      {status === 'error' && <p className="text-red-400 text-xs text-center font-medium">Mohon lengkapi nama dan ulasan Anda.</p>}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 border border-void-700 text-parchment-300 text-xs tracking-wider uppercase font-semibold rounded hover:bg-void-900">Batal</button>
        <button type="submit" disabled={status === 'loading'} className="flex-1 py-2.5 bg-gold-500 text-void-950 text-xs tracking-wider uppercase font-semibold rounded hover:bg-gold-400 flex items-center justify-center gap-2">
          {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          Kirim Ulasan
        </button>
      </div>
    </form>
  );
}

function ReviewList({ reviews, loading }: { reviews: Review[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
}

function mapLocalizedReviews(data: Review[]): Review[] {
  return data.map((r) => ({
    ...r,
    comment: rationalOverrides[r.id] || r.comment,
  }));
}

function useReviewsData() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setReviews(mapLocalizedReviews(data as Review[]));
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  return { reviews, loading };
}

interface ActionProps {
  showForm: boolean;
  form: { name: string; rating: number; comment: string };
  status: 'idle' | 'loading' | 'success' | 'error';
  setForm: React.Dispatch<React.SetStateAction<{ name: string; rating: number; comment: string }>>;
  onSubmit: (e: React.FormEvent) => void;
  onOpen: () => void;
  onClose: () => void;
}

function ReviewsAction({ showForm, form, status, setForm, onSubmit, onOpen, onClose }: ActionProps) {
  if (showForm) {
    return <ReviewForm form={form} status={status} setForm={setForm} onSubmit={onSubmit} onCancel={onClose} />;
  }
  return (
    <button onClick={onOpen} className="px-7 py-3 border border-gold-500/70 text-gold-300 text-xs tracking-wider uppercase font-semibold rounded hover:bg-gold-500/10 transition-colors">
      Tulis Ulasan
    </button>
  );
}

function useReviewForm() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) { setStatus('error'); return; }
    setStatus('loading');
    const { error } = await supabase.from('reviews').insert({ name: form.name, rating: form.rating, comment: form.comment });
    if (error) { setStatus('error'); return; }
    setStatus('success');
    setForm({ name: '', rating: 5, comment: '' });
    setTimeout(() => { setShowForm(false); setStatus('idle'); }, 2500);
  };

  return { showForm, setShowForm, form, setForm, status, handleSubmit };
}

export default function Reviews() {
  const { reviews, loading } = useReviewsData();
  const { showForm, setShowForm, form, setForm, status, handleSubmit } = useReviewForm();

  return (
    <section id="reviews" className="py-16 sm:py-24 lg:py-28 bg-void-900 border-t border-void-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ReviewsHeader />
        <ReviewList reviews={reviews} loading={loading} />
        <div className="mt-10 text-center">
          <ReviewsAction showForm={showForm} form={form} status={status} setForm={setForm} onSubmit={handleSubmit} onOpen={() => setShowForm(true)} onClose={() => setShowForm(false)} />
        </div>
      </div>
    </section>
  );
}
