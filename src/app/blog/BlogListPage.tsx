"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import BlogList from "@/components/BlogList";

export default function BlogListPage({
  posts,
  tags,
}: {
  posts: { slug: string; title: string; date: string; tags: string[]; description: string }[];
  tags: string[];
}) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="技术" accent="博客" subtitle="偏振控制 · FPGA · 全栈开发 · 学习记录" />
        <BlogList posts={posts} tags={tags} />
      </div>
    </div>
  );
}
