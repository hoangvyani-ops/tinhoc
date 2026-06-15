import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Database,
  SlidersHorizontal,
  Search,
  Layers,
  Network,
  GitPullRequest,
  HelpCircle,
  Info,
  Sun,
  Moon,
  Menu,
  X,
  BookOpen
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  isOpen,
  setIsOpen
}: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'data-structures', label: 'Cấu trúc dữ liệu', icon: Database },
    { id: 'sorting', label: 'Thuật toán sắp xếp', icon: SlidersHorizontal },
    { id: 'searching', label: 'Thuật toán tìm kiếm', icon: Search },
    { id: 'recursion', label: 'Đệ quy', icon: Layers },
    { id: 'tree', label: 'Cây (Tree)', icon: GitPullRequest },
    { id: 'graph', label: 'Đồ thị (Graph)', icon: Network },
    { id: 'quiz', label: 'Trắc nghiệm', icon: HelpCircle },
    { id: 'about', label: 'Giới thiệu', icon: Info },
  ] as const;

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 font-sans select-none text-slate-400">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <BookOpen className="w-5.5 h-5.5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-md font-bold font-display tracking-tight text-white leading-tight">
              ALGO-VISUAL
            </h1>
            <span className="text-[10px] text-slate-500 font-mono font-semibold">
              Học DSA Trực Quan
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 relative group overflow-hidden ${
                  isActive
                    ? 'sidebar-active text-white'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer & Mode Toggle */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-slate-400 font-medium">Chế độ tối</span>
          <button
            id="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:scale-105 transition-all duration-200 flex items-center justify-center border border-slate-700/50 shadow-inner cursor-pointer"
            title={darkMode ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-600">
            Phiên bản 2.4 | © 2026
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen fixed left-0 top-0 bg-[#0F172A] border-r border-slate-850 z-30 transition-colors duration-300">
        {sidebarContent}
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden h-16 w-full fixed top-0 left-0 bg-[#0F172A] border-b border-slate-800 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
            <BookOpen className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-display tracking-tight text-white leading-tight">
              ALGO-VISUAL
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-800 text-zinc-300"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Hamburger toggle */}
          <button
            id="mobile-drawer-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-800 text-zinc-200"
          >
            {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Overlay & Content) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 h-full bg-[#0F172A] border-r border-slate-800 z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
