"use client";

import { useState } from "react";
import { Monitor, Smartphone, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

const categories = [
  {
    id: "displays",
    icon: Monitor,
    label: "Interactive Displays",
    tagline: "Redefine collaboration & engagement",
    description:
      "Transform any space into an interactive hub. Our enterprise-grade interactive flat panels and smart boards empower education, boardrooms, and retail environments with responsive 4K touch technology.",
    accentColor: "from-blue-500 to-cyan-400",
    glowColor: "rgba(79, 142, 247, 0.3)",
    features: [
      "4K Ultra HD multi-touch panels",
      "Built-in Android & Windows dual OS",
      "Zero-latency palm rejection",
      "Wireless screen mirroring (4 devices)",
      "Sizes from 55\" to 110\"",
      "Anti-glare tempered glass",
    ],
    products: ["Smart Interactive Flat Panels", "Touch Screen Monitors", "Collaboration Displays", "Conference Room Boards"],
  },
  {
    id: "accessories",
    icon: Smartphone,
    label: "Mobile Accessories",
    tagline: "Stay powered, stay connected",
    description:
      "Premium-grade mobile accessories engineered for the modern lifestyle. From ultra-fast chargers to rugged protective cases, Aztechmea keeps your devices performing at their peak.",
    accentColor: "from-purple-500 to-pink-400",
    glowColor: "rgba(139, 92, 246, 0.3)",
    features: [
      "65W GaN fast charging technology",
      "MFi certified cables & connectors",
      "Military-grade protective cases",
      "Universal compatibility",
      "Premium audio accessories",
      "Wireless charging solutions",
    ],
    products: ["GaN Fast Chargers", "USB-C / Lightning Cables", "Protective Cases", "Wireless Earphones"],
  },
  {
    id: "electronics",
    icon: Zap,
    label: "Consumer Electronics",
    tagline: "Smart tech for everyday life",
    description:
      "A curated range of consumer electronics designed for performance and durability. From car accessories that make driving smarter to power solutions that keep you going all day.",
    accentColor: "from-cyan-500 to-teal-400",
    glowColor: "rgba(0, 212, 255, 0.3)",
    features: [
      "Smart car chargers & dashcams",
      "High-capacity power banks",
      "TWS earbuds & headphones",
      "Smart home accessories",
      "USB hubs & docking stations",
      "Extended warranty support",
    ],
    products: ["Car Chargers & Adapters", "Power Banks", "TWS Earbuds", "Smart Home Devices"],
  },
];

export default function Products() {
  const [active, setActive] = useState("displays");

  const current = categories.find((c) => c.id === active)!;
  const Icon = current.icon;

  return (
    <section id="products" className="relative py-28 overflow-hidden bg-[#060814]">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${current.glowColor}, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">
            Our Product Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technology That{" "}
            <span className="text-gradient">Moves Business</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Three product lines. One mission: deliver cutting-edge technology to every corner of the MEA region.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const TabIcon = cat.icon;
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${cat.accentColor} text-[#060814] shadow-lg`
                    : "glass text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: details */}
          <div className="glass rounded-3xl p-8 border border-white/10 card-hover">
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${current.accentColor} mb-6`}
            >
              <Icon className="w-7 h-7 text-[#060814]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{current.label}</h3>
            <p className={`text-sm font-semibold bg-gradient-to-r ${current.accentColor} bg-clip-text text-transparent mb-4`}>
              {current.tagline}
            </p>
            <p className="text-white/60 leading-relaxed mb-8">{current.description}</p>

            <div className="grid sm:grid-cols-2 gap-3">
              {current.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-8 btn-primary px-6 py-3 text-sm"
            >
              Request a Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: product cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {current.products.map((prod, i) => (
              <div
                key={prod}
                className="glass rounded-2xl p-5 border border-white/10 card-hover group cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${current.accentColor} opacity-80 mb-4 flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-[#060814]" />
                </div>
                <p className="text-sm font-semibold text-white mb-1">{prod}</p>
                <p className="text-xs text-white/40">View catalog →</p>
                <div
                  className={`mt-3 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full bg-gradient-to-r ${current.accentColor}`}
                />
              </div>
            ))}

            {/* CTA card */}
            <div
              className={`col-span-2 rounded-2xl p-6 bg-gradient-to-r ${current.accentColor} relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/5" />
              <p className="relative font-bold text-[#060814] text-lg mb-1">
                Need a custom solution?
              </p>
              <p className="relative text-sm text-[#060814]/70 mb-4">
                Our engineers will scope and quote a tailored product bundle.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="relative flex items-center gap-2 bg-[#060814]/90 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#060814] transition-colors"
              >
                Get Custom Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
