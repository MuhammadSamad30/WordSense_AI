import { Info, Cpu, Globe, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Cpu className="text-blue-600" />,
      title: "AI-Powered",
      description: "Leverages ChatGPT API to provide accurate meanings and contextual examples for any word."
    },
    {
      icon: <Globe className="text-blue-600" />,
      title: "Bilingual Support",
      description: "Seamless English to Urdu translations with proper Noto Nastaliq Urdu rendering."
    },
    {
      icon: <Zap className="text-blue-600" />,
      title: "Instant TTS",
      description: "High-quality text-to-speech for both English and Urdu to master pronunciation."
    },
    {
      icon: <Shield className="text-blue-600" />,
      title: "Reliable Data",
      description: "Combines a curated built-in dictionary with real-time AI generation for best results."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <Info className="text-blue-600" size={36} />
          About WordSense AI
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          WordSense AI is a premium educational tool designed to bridge the language gap 
          between English and Urdu using cutting-edge artificial intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {features.map((feature, idx) => (
          <div key={idx} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="mb-4 p-3 bg-blue-50 w-fit rounded-xl">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
        <h2 className="text-3xl font-bold">The Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <span className="px-4 py-2 bg-white/10 rounded-full border border-white/10">Next.js 15</span>
          <span className="px-4 py-2 bg-white/10 rounded-full border border-white/10">React 19</span>
          <span className="px-4 py-2 bg-white/10 rounded-full border border-white/10">TypeScript</span>
          <span className="px-4 py-2 bg-white/10 rounded-full border border-white/10">Tailwind CSS</span>
          <span className="px-4 py-2 bg-white/10 rounded-full border border-white/10">OpenAI API</span>
          <span className="px-4 py-2 bg-white/10 rounded-full border border-white/10">Framer Motion</span>
        </div>
      </div>
    </div>
  );
}
