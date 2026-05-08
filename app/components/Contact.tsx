"use client";

import { useState, FormEvent } from "react";
import { MapPin, Mail, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";

const interests = ["Interactive Displays", "Digital Signage", "Mobile Accessories", "Consumer Electronics", "Custom Bundle", "Partnership / Distribution"];
const offices = [
  { city: "Dubai", country: "UAE", address: "Business Bay, Dubai, UAE", phone: "+971 4 XXX XXXX", email: "dubai@aztechmea.com" },
  { city: "Riyadh", country: "KSA", address: "King Fahd Road, Riyadh, KSA", phone: "+966 11 XXX XXXX", email: "riyadh@aztechmea.com" },
];
type FormState = "idle" | "loading" | "success";

export default function Contact() {
  const [selected, setSelected] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const toggleInterest = (item: string) => setSelected((p) => p.includes(item) ? p.filter((i) => i !== item) : [...p, item]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e: FormEvent) => { e.preventDefault(); setFormState("loading"); await new Promise((r) => setTimeout(r, 1500)); setFormState("success"); };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 20% 60%, rgba(79,142,247,0.1) 0%, transparent 65%), #060814" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let&apos;s Build Something <span className="text-gradient">Remarkable</span></h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Tell us what you need. Our team will get back to you within 24 hours with a tailored proposal.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 glass rounded-3xl p-8 border border-white/10">
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-green-400" /></div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/60 max-w-sm">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button onClick={() => { setFormState("idle"); setFormData({ name: "", company: "", email: "", phone: "", message: "" }); setSelected([]); }} className="btn-ghost px-6 py-3 text-sm mt-4">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Full Name *</label><input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Smith" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-500/50 transition-all" /></div>
                  <div><label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Company</label><input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-500/50 transition-all" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Email *</label><input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-500/50 transition-all" /></div>
                  <div><label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+971 50 000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-500/50 transition-all" /></div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">I&apos;m Interested In</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((item) => (<button key={item} type="button" onClick={() => toggleInterest(item)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${selected.includes(item) ? "bg-blue-500/30 border border-blue-500/60 text-blue-300" : "bg-white/5 border border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"}`}>{item}</button>))}
                  </div>
                </div>
                <div><label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Message</label><textarea name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none" /></div>
                <button type="submit" disabled={formState === "loading"} className="btn-primary w-full py-4 text-base justify-center disabled:opacity-70">
                  {formState === "loading" ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
                </button>
              </form>
            )}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-5">
            {offices.map((o) => (
              <div key={o.city} className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"><MapPin className="w-4 h-4 text-blue-400" /></div><div><p className="font-bold text-white text-sm">{o.city}</p><p className="text-xs text-white/40">{o.country}</p></div></div>
                <p className="text-sm text-white/50 mb-3">{o.address}</p>
                <div className="space-y-2">
                  <a href={`tel:${o.phone}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><Phone className="w-3.5 h-3.5 text-blue-400" />{o.phone}</a>
                  <a href={`mailto:${o.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><Mail className="w-3.5 h-3.5 text-blue-400" />{o.email}</a>
                </div>
              </div>
            ))}
            <div className="glass rounded-2xl p-6 border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-3 mb-3"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /><span className="text-sm font-semibold text-white">We&apos;re Online</span></div>
              <p className="text-sm text-white/60">Available Sunday – Thursday, 9AM–6PM GST. Response within <span className="text-white font-semibold">24 hours</span>.</p>
            </div>
            <a href="https://wa.me/971XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 border border-green-500/20 hover:border-green-500/40 transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.116 1.527 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.729.973.998-3.645-.234-.374A9.79 9.79 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z" /></svg>
              </div>
              <div><p className="text-sm font-semibold text-white">Chat on WhatsApp</p><p className="text-xs text-white/40">Fastest response channel</p></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
