import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, Users, Clock, Mail, Phone, User, CheckCircle, Loader2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  notes: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '10:00',
  party_size: 2,
  notes: '',
};

function ReservationHeader() {
  return (
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl sm:text-5xl text-parchment-100 font-bold">
        Reservasi Meja &amp; Billiard
      </h2>
      <p className="mt-3 text-parchment-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
        Pilih waktu kunjungan favorit Anda. Tim kami akan mengonfirmasi meja Anda segera.
      </p>
    </div>
  );
}

function ReservationSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-void-900 border border-gold-500/40 p-8 sm:p-12 text-center rounded shadow-xl animate-fade-in max-w-lg mx-auto">
      <CheckCircle className="w-12 h-12 text-gold-400 mx-auto" />
      <h3 className="font-display text-2xl text-parchment-100 font-semibold mt-4">
        Reservasi Berhasil Dikirim
      </h3>
      <p className="text-parchment-200 text-sm mt-3 leading-relaxed">
        Kami telah menerima permohonan reservasi Anda dan akan mengirimkan konfirmasi via WhatsApp / Email dalam waktu 1x24 jam.
      </p>
      <button
        onClick={onReset}
        className="mt-8 px-6 py-2.5 bg-gold-500 text-void-950 text-xs tracking-wider uppercase font-semibold rounded hover:bg-gold-400 transition-colors"
      >
        Buat Reservasi Baru
      </button>
    </div>
  );
}

interface FormFieldsProps {
  form: FormState;
  onChange: (key: keyof FormState, val: string | number) => void;
}

function UserFields({ form, onChange }: FormFieldsProps) {
  return (
    <>
      <div>
        <label className="text-xs tracking-wider uppercase text-parchment-200 font-semibold mb-2 block">Nama Lengkap *</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/80" />
          <input type="text" required value={form.name} onChange={(e) => onChange('name', e.target.value)} placeholder="Nama Lengkap" className="w-full pl-10 pr-4 py-3 bg-void-900 border border-void-700 rounded text-parchment-100 placeholder:text-parchment-400/50 text-base sm:text-sm focus:border-gold-500" />
        </div>
      </div>
      <div>
        <label className="text-xs tracking-wider uppercase text-parchment-200 font-semibold mb-2 block">Email *</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/80" />
          <input type="email" required value={form.email} onChange={(e) => onChange('email', e.target.value)} placeholder="email@contoh.com" className="w-full pl-10 pr-4 py-3 bg-void-900 border border-void-700 rounded text-parchment-100 placeholder:text-parchment-400/50 text-base sm:text-sm focus:border-gold-500" />
        </div>
      </div>
    </>
  );
}

function ContactFields({ form, onChange }: FormFieldsProps) {
  return (
    <>
      <div>
        <label className="text-xs tracking-wider uppercase text-parchment-200 font-semibold mb-2 block">Nomor Whatsapp</label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/80" />
          <input type="tel" value={form.phone} onChange={(e) => onChange('phone', e.target.value)} placeholder="08xx-xxxx-xxxx" className="w-full pl-10 pr-4 py-3 bg-void-900 border border-void-700 rounded text-parchment-100 placeholder:text-parchment-400/50 text-base sm:text-sm focus:border-gold-500" />
        </div>
      </div>
      <div>
        <label className="text-xs tracking-wider uppercase text-parchment-200 font-semibold mb-2 block">Jumlah Tamu</label>
        <div className="relative">
          <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/80" />
          <select value={form.party_size} onChange={(e) => onChange('party_size', parseInt(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-void-900 border border-void-700 rounded text-parchment-100 text-base sm:text-sm focus:border-gold-500">
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => <option key={n} value={n} className="bg-void-950 text-parchment-100">{n} Orang</option>)}
          </select>
        </div>
      </div>
    </>
  );
}

function ScheduleInputs({ form, onChange }: FormFieldsProps) {
  return (
    <>
      <div>
        <label className="text-xs tracking-wider uppercase text-parchment-200 font-semibold mb-2 block">Tanggal Kunjungan *</label>
        <div className="relative">
          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/80" />
          <input type="date" required value={form.date} onChange={(e) => onChange('date', e.target.value)} className="w-full pl-10 pr-4 py-3 bg-void-900 border border-void-700 rounded text-parchment-100 text-base sm:text-sm focus:border-gold-500" />
        </div>
      </div>
      <div>
        <label className="text-xs tracking-wider uppercase text-parchment-200 font-semibold mb-2 block">Jam</label>
        <div className="relative">
          <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/80" />
          <select value={form.time} onChange={(e) => onChange('time', e.target.value)} className="w-full pl-10 pr-4 py-3 bg-void-900 border border-void-700 rounded text-parchment-100 text-base sm:text-sm focus:border-gold-500">
            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((t) => (
              <option key={t} value={t} className="bg-void-950 text-parchment-100">{t} WIB</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

function ReservationNotes({ notes, onChange }: { notes: string; onChange: (val: string) => void }) {
  return (
    <div>
      <label className="text-xs tracking-wider uppercase text-parchment-200 font-semibold mb-2 block">Catatan Khusus (Opsional)</label>
      <textarea rows={3} value={notes} onChange={(e) => onChange(e.target.value)} placeholder="Contoh: Meja billiard, area santai, request khusus..." className="w-full px-4 py-3 bg-void-900 border border-void-700 rounded text-parchment-100 placeholder:text-parchment-400/50 text-base sm:text-sm focus:border-gold-500 resize-none" />
    </div>
  );
}

function ReservationForm({ form, status, errorMsg, onChange, onSubmit }: {
  form: FormState;
  status: string;
  errorMsg: string;
  onChange: (key: keyof FormState, val: string | number ) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="bg-void-950 border border-void-800 p-6 sm:p-10 rounded shadow-xl space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UserFields form={form} onChange={onChange} />
        <ContactFields form={form} onChange={onChange} />
        <ScheduleInputs form={form} onChange={onChange} />
      </div>
      <ReservationNotes notes={form.notes} onChange={(val) => onChange('notes', val)} />
      {status === 'error' && <p className="text-red-400 text-xs text-center font-medium">{errorMsg}</p>}
      <div className="text-center pt-2">
        <button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto px-10 py-3.5 bg-gold-500 text-void-950 text-xs tracking-wider uppercase font-semibold rounded hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 mx-auto shadow-lg shadow-gold-500/10">
          {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Kirim Permohonan Reservasi
        </button>
      </div>
    </form>
  );
}

async function sendReservation(form: FormState) {
  return supabase.from('reservations').insert({
    name: form.name, email: form.email, phone: form.phone || null,
    date: form.date, time: form.time, party_size: form.party_size, notes: form.notes || null,
  });
}

function useReservation() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (key: keyof FormState, val: string | number) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) {
      setStatus('error');
      setErrorMsg('Mohon isi nama lengkap, email, dan tanggal reservasi.');
      return;
    }
    setStatus('loading');
    const { error } = await sendReservation(form);
    if (error) { setStatus('error'); setErrorMsg('Terjadi kendala saat mengirim. Silakan coba lagi.'); return; }
    setStatus('success');
    setForm(initialForm);
  };

  return { form, status, errorMsg, handleChange, handleSubmit, reset: () => setStatus('idle') };
}

export default function Reservation() {
  const { form, status, errorMsg, handleChange, handleSubmit, reset } = useReservation();

  return (
    <section id="reservation" className="py-16 sm:py-24 lg:py-28 bg-void-950 border-t border-void-800/80">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <ReservationHeader />
        {status === 'success' ? (
          <ReservationSuccess onReset={reset} />
        ) : (
          <ReservationForm form={form} status={status} errorMsg={errorMsg} onChange={handleChange} onSubmit={handleSubmit} />
        )}
      </div>
    </section>
  );
}
