'use client';

import { Info, Cpu, Globe, Zap, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const features = [
    {
      icon: <Cpu className="text-blue-600 dark:text-blue-400" />,
      title: "GPT-4o Powered",
      description: "Harnesses the world's most capable AI to provide nuances, definitions, and perfectly natural Urdu translations."
    },
    {
      icon: <Globe className="text-indigo-600 dark:text-indigo-400" />,
      title: "Cultural Context",
      description: "Our AI doesn't just translate; it understands cultural context to provide Urdu that feels native and natural."
    },
    {
      icon: <Zap className="text-amber-600 dark:text-amber-400" />,
      title: "Neural TTS",
      description: "Experience ultra-clear text-to-speech for both languages, helping you master pronunciation with a single click."
    },
    {
      icon: <Shield className="text-emerald-600 dark:text-emerald-400" />,
      title: "Premium Experience",
      description: "A clean, distraction-free environment designed for serious learners who value speed and aesthetic quality."
    }
  ];

  return (
    <div className="relative flex-1 max-w-5xl mx-auto px-4 py-20 w-full overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[30%] h-[30%] bg-blue-400/5 blur-[100px] rounded-full animate-float" />
        <div className="absolute bottom-[20%] right-[-5%] w-[25%] h-[25%] bg-indigo-400/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="text-center space-y-6 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100/50 dark:border-blue-900/30 shadow-sm mx-auto"
        >
          <Info size={16} />
          <span className="uppercase tracking-widest">Our Mission</span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Translation</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
          WordSense AI is built on the belief that language is more than words—it&apos;s about understanding. We use state-of-the-art AI to bridge the gap between English and Urdu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 relative z-10">
        {features.map((feature, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="group p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-blue-500/20"
          >
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 w-fit rounded-2xl group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative group overflow-hidden rounded-[3rem] p-1 sm:p-2 relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse group-hover:animate-none group-hover:bg-gradient-to-br" />
        <div className="relative bg-slate-900 dark:bg-slate-950 rounded-[2.8rem] p-10 sm:p-16 text-center text-white space-y-8 overflow-hidden">
           {/* Grid Pattern Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">The Future of <br/>Bilingual Education</h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm font-bold uppercase tracking-widest overflow-hidden">
              <span className="px-5 py-2.5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">Next.js 15</span>
              <span className="px-5 py-2.5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">React 19</span>
              <span className="px-5 py-2.5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">OpenAI 4o</span>
              <span className="px-5 py-2.5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">Tailwind 4</span>
              <span className="px-5 py-2.5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">TypeScript</span>
            </div>
            <p className="text-slate-400 max-w-xl mx-auto font-medium">
              Every detail of WordSense AI has been meticulously crafted to provide the most responsive and high-fidelity experience possible.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
