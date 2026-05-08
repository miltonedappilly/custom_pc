"use client";

import { Globe, Award, Users, HeadphonesIcon, TrendingUp, ShieldCheck } from "lucide-react";

const values = [
  { icon: Globe, title: "MEA-Wide Reach", desc: "Distributing to 30+ countries across the Middle East and Africa with local support teams.", color: "text-blue-400", bg: "from-blue-500/20 to-blue-500/5" },
  { icon: Award, title: "Certified Quality", desc: "All products meet international quality standards with CE, FCC, and RoHS certifications.", color: "text-cyan-400", bg: "from-cyan-500/20 to-cyan-500/5" },
  { icon: Users, title: "Enterprise Trusted", desc: "Serving Fortune 500 companies, top universities, and government bodies since 2014.", color: "text-purple-400", bg: "from-purple-500/20 to-purple-500/5" },
  { icon: HeadphonesIcon, title: "Dedicated Support", desc: "24/7 technical support with on-site installation and after-sales service across the region.", color: "text-green-400", bg: "from-green-500/20 to-green-500/5" },
  { icon: TrendingUp, title: "Innovation-First", desc: "Partnering with the world's leading tech manufacturers to bring tomorrow's tech today.", color: "text-orange-400", bg: "from-orange-500/20 to-orange-500/5" },
  { icon: ShieldCheck, title: "Warranty & Trust", desc: "Up to 3-year warranty on all products, with hassle-free returns and replacement programs.", color: "text-pink-400", bg: "from-pink-500/20 to-pink-500/5" },
];

const milestones = [
  { year: "2014", event: "Founded in Dubai, UAE" },
  { year: "2016", event: "Expanded to 10 MEA markets" },
  { year: "2019", event: "Launched Enterprise Display Division" },
  { year: "2022", event: "500+ enterprise client milestone" },
  { year: "2024", event: "30+ countries, 1000+ product SKUs" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 80% 30%, rgba(139,92,246,0.1) 0%, transparent 65%), #060814" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-purple-400 mb-4">Who We Are</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">A Decade of Powering <span className="text-gradient">Digital Transformation</span></h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">Aztechmea is a leading technology distributor and solutions provider headquartered in the Middle East. We bridge the gap between world-class technology brands and businesses across the MEA region.</p>
            <p className="text-white/50 leading-relaxed">Our portfolio spans enterprise interactive displays, professional digital signage systems, and an extensive range of consumer electronics and mobile accessories — all backed by our expert team and regional support network.</p>
          </div>
          <div className="glass rounded-3xl p-8 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Our Journey</h3>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400" />
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex items-start gap-5 pl-8 relative">
                    <div className="absolute left-0 w-6 h-6 rounded-full border-2 border-white/20" style={{ background: `hsl(${200 + i * 30}, 80%, 60%)`, boxShadow: `0 0 12px hsl(${200 + i * 30}, 80%, 60%, 0.5)` }} />
                    <div><span className="text-sm font-bold text-blue-400">{m.year}</span><p className="text-sm text-white/70 mt-0.5">{m.event}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white">Why Companies Choose <span className="text-gradient">Aztechmea</span></h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="glass rounded-2xl p-6 border border-white/8 card-hover group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}><Icon className={`w-6 h-6 ${v.color}`} /></div>
                <h4 className="text-base font-bold text-white mb-2">{v.title}</h4>
                <p className="text-sm text-white/55 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-20 glass rounded-3xl p-8 border border-white/8 text-center">
          <p className="text-sm text-white/40 font-medium uppercase tracking-widest mb-6">Authorized distributor & partner of</p>
          <div className="flex flex-wrap justify-center gap-6 text-white/30 font-bold text-lg tracking-wide">
            {["Samsung", "LG Business", "Viewsonic", "Iiyama", "Anker", "Belkin", "Logitech"].map((brand) => (
              <span key={brand} className="hover:text-white/70 transition-colors duration-300 cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
