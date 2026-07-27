import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "polarization-control",
    title: "偏振控制算法研究",
    description:
      "基于 AdamSPGD 与动量梯度下降算法的偏振控制系统，在 FPGA 上完成定点化部署，实现高速偏振态锁定与跟踪。",
    tags: ["AdamSPGD", "FPGA", "Vivado", "偏振控制"],
    color: "#667eea",
    icon: "🔬",
  },
  {
    slug: "scramble-algorithm",
    title: "扰偏算法仿真平台",
    description:
      "混沌映射与球面覆盖策略的扰偏算法仿真工具，评估 SVR、DOP、ACF 及 Poincaré 球面覆盖均匀度等性能指标。",
    tags: ["混沌", "Poincaré", "MATLAB", "SVR"],
    color: "#f5576c",
    icon: "🎯",
  },
  {
    slug: "digital-twin",
    title: "数字孪生偏振跟踪",
    description:
      "基于深度学习的偏振态数字孪生系统，实现物理偏振控制器的实时仿真与在线优化。",
    tags: ["数字孪生", "深度学习", "Python", "实时仿真"],
    color: "#00f2fe",
    icon: "🧠",
  },
  {
    slug: "portfolio",
    title: "个人技术主页",
    description:
      "基于 Next.js + Three.js + Framer Motion 构建的现代个人主页，支持暗黑/亮色主题、3D 粒子背景与滚动叙事。",
    tags: ["Next.js", "Three.js", "Framer Motion", "TypeScript"],
    color: "#43e97b",
    icon: "🖥️",
  },
];
