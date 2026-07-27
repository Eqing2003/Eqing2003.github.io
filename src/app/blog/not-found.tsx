"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">文章未找到</h1>
        <p className="text-gray-400 mb-6">这篇文章可能已被删除或设置为私密</p>
        <Link
          href="/blog"
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-sm font-semibold hover:shadow-lg hover:shadow-brand-purple/25 transition-all"
        >
          返回博客列表
        </Link>
      </motion.div>
    </div>
  );
}
