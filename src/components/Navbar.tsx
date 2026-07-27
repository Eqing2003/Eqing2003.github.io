"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi";

const links = [
  { href: "#hero", label: "首页" },
  { href: "#about", label: "关于" },
  { href: "#skills", label: "技能" },
  { href: "#projects", label: "项目" },
  { href: "#contact", label: "联系" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-gradient">
          Portfolio
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 hover:text-brand-purple transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            {theme === "dark" ? (
              <HiSun className="text-yellow-400" size={18} />
            ) : (
              <HiMoon className="text-brand-purple" size={18} />
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="flex flex-col gap-2 p-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-gray-400 hover:text-brand-purple transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <button onClick={toggle} className="py-2 text-left text-gray-400 hover:text-brand-purple">
                {theme === "dark" ? "🌞 亮色模式" : "🌙 暗色模式"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
