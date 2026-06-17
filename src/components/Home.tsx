import { motion } from 'motion/react';
import {
  Database,
  SlidersHorizontal,
  Search,
  Layers,
  Network,
  GitPullRequest,
  HelpCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  CirclePlay
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HomeProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  const statItems = [
    { label: 'Cấu trúc dữ liệu', count: '10', description: 'Từ Array tới Hash Table', color: 'text-blue-500' },
    { label: 'Thuật toán sắp xếp', count: '6', description: 'Bubble, Quick, Merge...', color: 'text-purple-500' },
    { label: 'Thuật toán tìm kiếm', count: '2', description: 'Tuyến tính & Nhị phân', color: 'text-emerald-500' },
    { label: 'Bài tập Trắc nghiệm', count: '50+', description: 'Hệ thống câu hỏi phủ rộng', color: 'text-rose-500' },
  ];

  const quickLinks = [
    {
      id: 'data-structures',
      title: 'Cấu Trúc Dữ Liệu',
      description: 'Mô phỏng ngăn xếp, hàng đợi, danh sách liên kết và bảng băm trực quan sinh động.',
      icon: Database,
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-100 hover:border-blue-500 dark:border-blue-900/60'
    },
    {
      id: 'sorting',
      title: 'Thuật Toán Sắp Xếp',
      description: 'Trải nghiệm từng bước sắp xếp, hoán đổi cột giá trị kèm highlight dòng mã giả.',
      icon: SlidersHorizontal,
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-100 hover:border-purple-500 dark:border-purple-900/60'
    },
    {
      id: 'searching',
      title: 'Thuật Toán Tìm Kiếm',
      description: 'So sánh tốc độ tìm kiếm nhị phân chia đôi không gian và duyệt tuần tự tuyến tính.',
      icon: Search,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100 hover:border-emerald-500 dark:border-emerald-900/60'
    },
    {
      id: 'tree',
      title: 'Mô phỏng Cây (Tree)',
      description: 'Tương tác dựng cây BST, AVL, phân tích đường đi Inorder, Preorder, Postorder.',
      icon: GitPullRequest,
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-100 hover:border-indigo-500 dark:border-indigo-900/60'
    },
    {
      id: 'graph',
      title: 'Duyệt Đồ Thị (Graph)',
      description: 'Khám phá thế giới mạng nối, đỉnh và cạnh với giải thuật duyệt BFS và DFS.',
      icon: Network,
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-100 hover:border-amber-500 dark:border-amber-900/60'
    },
    {
      id: 'recursion',
      title: 'Đệ Quy Sinh Động',
      description: 'Xem chi tiết Call Stack xếp chồng và cây đệ quy Fibonacci, Giai thừa, Tháp Hà Nội.',
      icon: Layers,
      bgColor: 'bg-teal-50 dark:bg-teal-950/20',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderColor: 'border-teal-100 hover:border-teal-500 dark:border-teal-900/60'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Banner Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 md:p-14 shadow-2xl">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur-md text-xs font-semibold mb-6 border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Nền tảng Học trực quan 2026</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold font-display leading-tight tracking-tight">
            Trực Quan Hóa Cấu Trúc Dữ Liệu & Giải Thuật
          </h2>
          <p className="mt-4 text-base md:text-lg text-blue-100 font-sans leading-relaxed">
            Học tập không còn nhàm chán. Cổng học tập này giúp bạn 'nhìn' thấy cách hoạt động thực sự của bộ nhớ máy tính, luồng hoán đổi mảng, cây liên kết và các đồ thị kề thông qua những mô phỏng chuyển động sinh động nhất.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              id="start-learning-btn"
              onClick={() => setActiveTab('data-structures')}
              className="px-6 py-3.5 rounded-xl bg-white text-indigo-900 font-bold hover:bg-zinc-100 hover:scale-103 transition-all duration-300 shadow-lg flex items-center gap-2 text-sm"
            >
              <CirclePlay className="w-5 h-5 text-indigo-650" />
              Bắt đầu học ngay
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-6 py-3.5 rounded-xl bg-indigo-700/50 text-white font-bold hover:bg-indigo-700/80 transition-all duration-300 border border-white/20 flex items-center gap-2 text-sm"
            >
              <Award className="w-5 h-5" />
              Thử thách trắc nghiệm
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold font-display text-gray-900 dark:text-zinc-50 flex items-center gap-2.5">
          <BookOpen className="w-5.5 h-5.5 text-blue-600 dark:text-purple-400" />
          Tiến trình môn học
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className={`text-3xl md:text-4xl font-extrabold font-display ${stat.color}`}>
                  {stat.count}
                </span>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2">
                  {stat.label}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 font-sans">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Entry Cards */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Sparkles className="w-5.5 h-5.5 text-indigo-600 dark:text-purple-400" />
          Bộ học cụ mô phỏng
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.id}
                onClick={() => setActiveTab(link.id as ActiveTab)}
                className={`p-6 rounded-2xl bg-white dark:bg-[#0F172A] border ${link.borderColor} shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  <div className={`p-3.5 rounded-xl w-fit ${link.bgColor} ${link.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-gray-800 dark:text-zinc-200 mt-4">
                    {link.title}
                  </h4>
                  <p className="text-sm text-gray-400 dark:text-zinc-400 font-sans mt-2 leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-zinc-200 group">
                  <span>Trải nghiệm ngay</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
