"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiDownload, HiEye, HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import BlogContent from "@/components/BlogContent";

const DEFAULT_TEMPLATE = `---
title: "文章标题"
date: "${new Date().toISOString().slice(0, 10)}"
tags: ["标签"]
description: "文章摘要"
published: true
---

在这里开始写作...

> [!tip]
> 这是一个提示框，支持 tip / info / warning / danger 四种类型
`;

interface Draft {
  id: string;
  filename: string;
  content: string;
  updatedAt: number;
}

function loadDrafts(): Draft[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("blog-drafts") || "[]");
  } catch {
    return [];
  }
}

function saveDrafts(drafts: Draft[]) {
  localStorage.setItem("blog-drafts", JSON.stringify(drafts));
}

export default function BlogEditor() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [content, setContent] = useState(DEFAULT_TEMPLATE);
  const [filename, setFilename] = useState("my-new-post.md");
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [showDraftList, setShowDraftList] = useState(true);

  useEffect(() => {
    const saved = loadDrafts();
    setDrafts(saved);
    if (saved.length > 0) {
      setActiveId(saved[0].id);
      setContent(saved[0].content);
      setFilename(saved[0].filename);
    }
  }, []);

  const activeDraft = drafts.find((d) => d.id === activeId);

  const updateDraft = (newContent: string, newFilename?: string) => {
    setContent(newContent);
    if (newFilename !== undefined) setFilename(newFilename);

    if (activeId) {
      const updated = drafts.map((d) =>
        d.id === activeId
          ? { ...d, content: newContent, filename: newFilename ?? d.filename, updatedAt: Date.now() }
          : d
      );
      setDrafts(updated);
      saveDrafts(updated);
    }
  };

  const createDraft = () => {
    const id = Date.now().toString();
    const newDraft: Draft = {
      id,
      filename: `post-${id}.md`,
      content: DEFAULT_TEMPLATE,
      updatedAt: Date.now(),
    };
    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    saveDrafts(updated);
    setActiveId(id);
    setContent(newDraft.content);
    setFilename(newDraft.filename);
  };

  const deleteDraft = (id: string) => {
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    saveDrafts(updated);
    if (activeId === id) {
      if (updated.length > 0) {
        setActiveId(updated[0].id);
        setContent(updated[0].content);
        setFilename(updated[0].filename);
      } else {
        setActiveId(null);
        setContent(DEFAULT_TEMPLATE);
        setFilename("my-new-post.md");
      }
    }
  };

  const downloadFile = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    alert("已复制到剪贴板！直接粘贴到 content/blog/ 目录即可");
  };

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            ✍️ <span className="text-gradient">博客编辑器</span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={createDraft}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 transition"
            >
              <HiPlus size={14} /> 新建草稿
            </button>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition"
            >
              📋 复制
            </button>
            <button
              onClick={downloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 transition"
            >
              <HiDownload size={14} /> 下载 .md
            </button>
          </div>
        </div>

        <div className="flex gap-4" style={{ height: "calc(100vh - 140px)" }}>
          {/* Draft list sidebar */}
          {showDraftList && (
            <div className="w-56 flex-shrink-0 glass p-3 flex flex-col gap-1 overflow-y-auto">
              <div className="text-xs text-gray-500 mb-2 px-2">草稿列表</div>
              {drafts.length === 0 && (
                <p className="text-xs text-gray-600 px-2 py-4">暂无草稿，点击"新建草稿"</p>
              )}
              {drafts.map((d) => (
                <div
                  key={d.id}
                  onClick={() => {
                    setActiveId(d.id);
                    setContent(d.content);
                    setFilename(d.filename);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all text-sm ${
                    activeId === d.id
                      ? "bg-brand-purple/15 text-brand-purple"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <span className="truncate">{d.filename}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDraft(d.id);
                    }}
                    className="text-gray-600 hover:text-red-400 transition"
                  >
                    <HiTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Editor / Preview */}
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={filename}
                onChange={(e) => updateDraft(content, e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-brand-purple outline-none"
                placeholder="文件名"
              />
              <div className="flex bg-white/5 rounded-lg p-0.5">
                <button
                  onClick={() => setMode("edit")}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition ${
                    mode === "edit" ? "bg-brand-purple text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <HiPencil size={14} /> 编辑
                </button>
                <button
                  onClick={() => setMode("preview")}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition ${
                    mode === "preview" ? "bg-brand-purple text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <HiEye size={14} /> 预览
                </button>
              </div>
            </div>

            {/* Content area */}
            {mode === "edit" ? (
              <textarea
                value={content}
                onChange={(e) => updateDraft(e.target.value)}
                className="flex-1 w-full p-5 rounded-xl bg-surface-950 border border-white/10 text-sm font-mono text-gray-300 focus:border-brand-purple outline-none resize-none leading-relaxed"
                placeholder="用 Markdown 写作..."
                spellCheck={false}
              />
            ) : (
              <div className="flex-1 overflow-y-auto glass p-8">
                <BlogContent content={content} />
              </div>
            )}

            {/* Footer hint */}
            <div className="text-xs text-gray-600 text-center">
              草稿保存在浏览器本地，编辑完成后下载 .md 文件到{" "}
              <code className="text-brand-cyan">content/blog/</code> 目录，然后 git push 即可上线
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
