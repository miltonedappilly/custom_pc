import { Zap, ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type SocialItem = { label: string; href: string; icon: ReactNode };

const socials: SocialItem[] = [
  { label: "LinkedIn", href: "#", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
  { label: "X", href: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { label: "Instagram", href: "#", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
  { label: "YouTube", href: "#", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg> },
];

const links: Record<string, string[]> = {
  Products: ["Interactive Displays", "Digital Signage", "Mobile Accessories", "Consumer Electronics"],
  Company: ["About Us", "Careers", "News & Blog", "Partners"],
  Support: ["Contact Us", "Documentation", "Warranty Claims", "Find a Reseller"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-[#040610]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400"><Zap className="w-5 h-5 text-[#040610]" fill="currentColor" /></div>
              <span className="text-xl font-bold tracking-tight"><span className="text-gradient">AZ</span><span className="text-white">TECHMEA</span></span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed mb-6 max-w-xs">Powering digital transformation across the Middle East & Africa with cutting-edge technology products and enterprise solutions.</p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, icon }) => (<a key={label} href={href} aria-label={label} className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white border border-white/8 transition-all hover:scale-105">{icon}</a>))}
            </div>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (<li key={item}><a href="#" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group">{item}<ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Aztechmea. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
