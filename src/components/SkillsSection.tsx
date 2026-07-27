"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

const skills = [
  { icon: "🔬", name: "偏振控制算法", tools: "AdamSPGD · 动量梯度下降 · 几何 · MPC", level: 95 },
  { icon: "⚡", name: "FPGA 定点化", tools: "Vivado · HLS · 时序优化 · 硬件部署", level: 88 },
  { icon: "⚛️", name: "前端开发", tools: "React · Next.js · Vue · TypeScript", level: 90 },
  { icon: "🖥️", name: "后端开发", tools: "Node.js · Python · Go · PostgreSQL", level: 82 },
  { icon: "📊", name: "算法仿真", tools: "MATLAB · Python · 数值分析", level: 92 },
  { icon: "🎨", name: "UI/UX 设计", tools: "Figma · Tailwind · 3D 可视化", level: 75 },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-6 bg-surface-800/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="核心" accent="技能" subtitle="偏振控制 · FPGA · 全栈 · 持续精进" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <ScrollReveal key={s.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass p-6 transition-colors hover:border-brand-purple/30"
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h4 className="font-semibold mb-1">{s.name}</h4>
                <p className="text-xs text-gray-500 mb-4">{s.tools}</p>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                  />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
