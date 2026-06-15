import { Award, BookOpen, Code, Cpu, Heart, CheckCircle2 } from 'lucide-react';

export default function About() {
  const techStack = [
    { name: 'Vite & React 19', desc: 'Máy chủ kết xuất thành phần siêu nhanh, gọn nhẹ, tối ưu.' },
    { name: 'Tailwind CSS v4', desc: 'Thế hệ CSS tiện ích mới nhất với kiến trúc biên dịch tĩnh cực tốt.' },
    { name: 'Motion / React', desc: 'Khung xử lý hoạt ảnh chuyển đổi mượt mà, chân thực nhất hiện nay.' },
    { name: 'TypeScript', desc: 'Nền tảng kiểm soát mã lỗi tĩnh mạnh mẽ.' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 font-sans">
      {/* Intro section */}
      <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 to-purple-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
        
        <div className="relative z-10 space-y-4 max-w-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            DSA Interactive Project 2026
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display leading-tight">
            Về Dự Án ALGO-VISUAL
          </h2>
          <p className="text-xs md:text-sm text-purple-150 leading-relaxed">
            Dự án này ra đời với mục tiêu mang đến một phương thức học tập cấu trúc dữ liệu và giải thuật (DSA) hoàn toàn mới cho sinh viên và lập trình viên. Thay vì những dòng code khô khan, ALGO-VISUAL biến chúng thành hoạt ảnh trực quan chuyển động thời gian thực dễ tiếp thu nhất.
          </p>
        </div>
      </section>

      {/* Target Audience Value and Scope */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
          <h3 className="text-lg font-bold font-display text-gray-950 dark:text-zinc-50 flex items-center gap-1.5">
            <BookOpen className="w-5.5 h-5.5 text-blue-500" />
            Phương châm học tập
          </h3>
          <ul className="space-y-3 text-xs text-gray-500 dark:text-zinc-450 leading-relaxed pl-1">
            <li className="flex gap-2.5 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Mô phỏng 100% phản hồi:</strong> Thao tác của người dùng lên các cấu trúc Stack, Queue được mô phỏng lập tức giúp định hình tư duy logic.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Duyệt mã từng bước:</strong> Việc tô sáng mã pseudocode khi mảng thay đổi cột giúp học viên hiểu sâu sắc từng khối lệnh điều kiện.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Tự kiểm tra khách quan:</strong> Đề kiểm tra 50 câu mang đến các lát cắt kiến thức đầy đủ, chấm điểm tự động thông minh.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
          <h3 className="text-lg font-bold font-display text-gray-950 dark:text-zinc-50 flex items-center gap-1.5">
            <Cpu className="w-5.5 h-5.5 text-purple-500" />
            Công nghệ cốt lõi
          </h3>
          <div className="space-y-3">
            {techStack.map((tech, i) => (
              <div key={i} className="flex gap-3 text-xs leading-relaxed">
                <div className="h-5 w-5 bg-blue-500/10 dark:bg-purple-500/10 text-blue-600 dark:text-purple-400 font-bold font-mono rounded flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <strong className="text-gray-800 dark:text-zinc-200">{tech.name}</strong>
                  <p className="text-gray-400 dark:text-zinc-500 text-[11px] mt-0.5">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Greetings block footer */}
      <footer className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-dashed border-gray-200 dark:border-zinc-850 text-center space-y-3">
        <div className="mx-auto bg-rose-500/10 text-rose-500 h-10 w-10 rounded-full flex items-center justify-center shadow-inner animate-pulse">
          <Heart className="w-5 h-5 fill-rose-500" />
        </div>
        <h4 className="text-sm font-bold font-display text-gray-800 dark:text-zinc-150">
          Chúc Bạn Học Tập Đạt Kết Quả Xuất Sắc!
        </h4>
        <p className="text-xs text-gray-400 dark:text-zinc-550 max-w-md mx-auto leading-relaxed">
          Hãy tận dụng tối đa lợi thế của mô phỏng trực quan để chinh phục học phần Cấu trúc dữ liệu & Giải thuật một cách dễ dàng và đầy tự tin.
        </p>
      </footer>
    </div>
  );
}
