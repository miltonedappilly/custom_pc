"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Monitor, Smartphone, Tv2 } from "lucide-react";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "30+", label: "Countries Served" },
  { value: "99%", label: "Client Satisfaction" },
];

const floatingIcons = [
  { icon: Monitor, label: "Interactive Displays", delay: "0s", x: "10%", y: "25%" },
  { icon: Tv2, label: "Digital Signage", delay: "1.5s", x: "82%", y: "20%" },
  { icon: Smartphone, label: "Mobile Accessories", delay: "3s", x: "75%", y: "65%" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 142, 247, ${p.opacity})`;
        ctx.fill();
      });

      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 142, 247, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden mesh-bg">
      {/* Animated particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating product icons */}
      {floatingIcons.map(({ icon: Icon, label, delay, x, y }) => (
        <div
          key={label}
          className="absolute hidden lg:flex flex-col items-center gap-2 animate-float pointer-events-none"
          style={{ left: x, top: y, animationDelay: delay }}
        >
          <div className="glass w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-xs text-white/50 font-medium">{label}</span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-blue-300 font-medium mb-8 border border-blue-500/20">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            Trusted by 500+ enterprises across MEA
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
            <span className="text-white">Power Your</span>
            <br />
            <span className="shimmer-text">Digital Future</span>
            <br />
            <span className="text-white">With Aztechmea</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
            From enterprise interactive displays and digital signage to premium mobile accessories — we bring technology that transforms how you work, connect, and grow.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToProducts}
              className="btn-primary px-7 py-4 text-base"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={scrollToContact}
              className="btn-ghost px-7 py-4 text-base"
            >
              Talk to an Expert
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 border border-white/8 text-center">
              <p className="text-3xl font-bold text-gradient mb-1">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors animate-bounce"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
}
