import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from './types';

// Components Imports
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import DataStructures from './components/DataStructures';
import SortingVisualizer from './components/SortingVisualizer';
import SearchVisualizer from './components/SearchVisualizer';
import RecursionVisualizer from './components/RecursionVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import GraphVisualizer from './components/GraphVisualizer';
import Quiz from './components/Quiz';
import About from './components/About';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Mobile Menu toggle state expected by Sidebar

  // Sync dark mode class with DOM element root
  useEffect(() => {
    const rootEl = window.document.documentElement;
    if (darkMode) {
      rootEl.classList.add('dark');
    } else {
      rootEl.classList.remove('dark');
    }
  }, [darkMode]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'data-structures':
        return <DataStructures />;
      case 'sorting':
        return <SortingVisualizer />;
      case 'searching':
        return <SearchVisualizer />;
      case 'recursion':
        return <RecursionVisualizer />;
      case 'tree':
        return <TreeVisualizer />;
      case 'graph':
        return <GraphVisualizer />;
      case 'quiz':
        return <Quiz />;
      case 'about':
        return <About />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  const getPageHeaderTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Trang Chủ & Chuyên Đề';
      case 'data-structures':
        return 'Cấu trúc dữ liệu tuyến tính';
      case 'sorting':
        return 'Thuật toán Sắp xếp (Sorting)';
      case 'searching':
        return 'Thuật toán Tìm kiếm (Searching)';
      case 'recursion':
        return 'Mô phỏng Đệ quy (Recursion)';
      case 'tree':
        return 'Cấu trúc Cây (Trees / BST)';
      case 'graph':
        return 'Lý thuyết Đồ thị (Graphs)';
      case 'quiz':
        return 'Trắc nghiệm Kiến thức DSA';
      case 'about':
        return 'Giới thiệu & Công nghệ';
      default:
        return 'Trực quan hóa Thuật toán';
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      darkMode ? 'bg-[#090D16] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* 1. Integrated Sidebar (Handles both Desktop rail & Mobile Header Drawer) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* 2. Main content side frame (Shifts right lg:pl-72 to fit Desktop side panel, and down pt-16 on mobile for mobile header) */}
      <div className="lg:pl-72 pt-16 lg:pt-0 flex flex-col min-h-screen">
        {/* Page Inner title indicator with blur effect for desktop */}
        <header className="hidden lg:flex h-16 border-b border-slate-200 dark:border-slate-800/80 items-center justify-between px-8 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md sticky top-0 z-20">
          <h2 className="text-sm font-extrabold font-display text-slate-800 dark:text-white uppercase tracking-wider">
            {getPageHeaderTitle()}
          </h2>
          <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 px-2.5 py-1 rounded-full font-bold">
            Portal Đào Tạo Công Nghệ
          </span>
        </header>

        {/* Core content wrapper container */}
        <main className="p-4 md:p-6 flex-1 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {renderActiveComponent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
