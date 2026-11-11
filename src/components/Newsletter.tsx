import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, CheckCircle, Mail } from 'lucide-react';

const bgImg =
  'https://images.pexels.com/photos/19162213/pexels-photo-19162213.jpeg?auto=compress&cs=tinysrgb&w=1600';

function NewsletterHeader() {
  return (
    <>
      <h2 className="font-display text-3xl sm:text-4xl text-parchment-100 font-bold">
        Promo &amp; Info Terbaru
      </h2>
      <p className="mt-3 text-parchment-200 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
        Daftarkan email Anda untuk mendapatkan promo billiard, diskon minuman, dan event spesial langsung di inbox.
      </p>
    </>
  );
}

function FormInputs({
  email,
  status,
  setEmail,
}: {
  email: string;
  status: string;
  setEmail: (val: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/80" />
        <input type="email" required placeholder="Masukkan email Anda" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-void-900 border border-void-700 rounded text-parchment-100 placeholder:text-parchment-400/50 text-sm focus:border-gold-500" />
      </div>
      <button type="submit" disabled={status === 'loading'} className="px-6 py-3 bg-gold-500 text-void-950 text-xs tracking-wider uppercase font-semibold rounded hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md">
        {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Berlangganan'}
      </button>
    </div>
  );
}

function NewsletterForm({
  email,
  status,
  setEmail,
  onSubmit,
}: {
  email: string;
  status: string;
  setEmail: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  if (status === 'success') {
    return (
      <div className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 bg-void-900 border border-gold-500/40 rounded animate-fade-in">
        <CheckCircle className="w-5 h-5 text-gold-400" />
        <span className="text-parchment-100 text-sm font-medium">Terima kasih telah bergabung! Cek email Anda segera.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <FormInputs email={email} status={status} setEmail={setEmail} />
    </form>
  );
}

function useNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (error && error.code !== '23505') {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return { email, setEmail, status, handleSubmit };
}

export default function Newsletter() {
  const { email, setEmail, status, handleSubmit } = useNewsletter();

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden border-t border-void-800/80">
      <div className="absolute inset-0">
        <img src={bgImg} alt="Suasana One Pool and Cafe" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-void-950/90" />
      </div>
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <NewsletterHeader />
        <NewsletterForm email={email} status={status} setEmail={setEmail} onSubmit={handleSubmit} />
        {status === 'error' && <p className="text-red-400 text-xs mt-3 font-medium">Terjadi kendala. Silakan coba kembali.</p>}
      </div>
    </section>
  );
}
