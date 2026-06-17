import { useState } from 'react';
import { 
  Award, CheckCircle2, XCircle, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, HelpCircle,
  BookOpen, SlidersHorizontal, Search, Layers, ArrowRightLeft, GitPullRequest, Network, Database, Key, Repeat
} from 'lucide-react';
import { quizQuestions } from '../data/concepts';

export default function Quiz() {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedExamIdx, setSelectedExamIdx] = useState<number>(0);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswered, setIsAnswered] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  // Helper to categorize each question automatically
  function getQuestionTopic(q: any): string {
    const cat = q.category;
    const text = (q.question + " " + q.explanation + " " + q.options.join(" ")).toLowerCase();
    
    if (cat === "Sắp xếp") return "sorting";
    if (cat === "Tìm kiếm") return "searching";
    if (cat === "Cây") return "tree";
    if (cat === "Đồ thị") return "graph";
    if (cat === "Đệ quy") return "recursion";
    
    if (cat === "Cấu trúc dữ liệu") {
      if (text.includes("ngăn xếp") || text.includes("stack") || text.includes("pop") || text.includes("push") || text.includes("lifo")) {
        return "stack";
      }
      if (text.includes("hàng đợi") || text.includes("queue") || text.includes("fifo") || text.includes("enqueue") || text.includes("dequeue")) {
        return "queue";
      }
      if (text.includes("băm") || text.includes("hash") || text.includes("collision") || text.includes("va chạm") || text.includes("chaining")) {
        return "hash";
      }
      if (text.includes("mảng") || text.includes("array") || text.includes("liên kết") || text.includes("linked") || text.includes("node") || text.includes("chỉ số") || text.includes("index")) {
        return "array_list";
      }
    }
    return "array_list"; // default linear DSA fallback
  }

  // Topics Metadata
  const TOPICS = [
    { id: 'all', name: 'Tất cả', icon: BookOpen, desc: `Toàn bộ ${quizQuestions.length} câu bách khoa`, border: 'border-slate-200 dark:border-zinc-800', text: 'text-slate-700 dark:text-zinc-300', bg: 'bg-slate-50/60 dark:bg-zinc-900/40', active: 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20 dark:bg-zinc-800/80 dark:border-indigo-500', iconBg: 'bg-slate-500/10 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400' },
    { id: 'array_list', name: 'Mảng & DS liên kết', icon: Database, desc: 'Lưu trữ tuyến tính liên tiếp & liên kết đơn/kép', border: 'border-teal-200 dark:border-teal-950/30', text: 'text-teal-800 dark:text-teal-400', bg: 'bg-teal-50/30 dark:bg-teal-950/10', active: 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/80 dark:bg-teal-950/35 dark:border-teal-500', iconBg: 'bg-teal-500/10 text-teal-600 dark:bg-teal-500/25 dark:text-teal-400' },
    { id: 'stack', name: 'Ngăn xếp (Stack)', icon: Layers, desc: 'Cơ chế LIFO, thao tác Push & Pop', border: 'border-purple-200 dark:border-purple-950/30', text: 'text-purple-800 dark:text-purple-400', bg: 'bg-purple-50/30 dark:bg-purple-950/10', active: 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-50/80 dark:bg-purple-950/35 dark:border-purple-500', iconBg: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/25 dark:text-purple-400' },
    { id: 'queue', name: 'Hàng đợi (Queue)', icon: ArrowRightLeft, desc: 'Cơ chế FIFO, chèn Rear xóa Front', border: 'border-rose-200 dark:border-rose-950/30', text: 'text-rose-800 dark:text-rose-400', bg: 'bg-rose-50/30 dark:bg-rose-950/10', active: 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/80 dark:bg-rose-950/35 dark:border-rose-500', iconBg: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/25 dark:text-rose-400' },
    { id: 'recursion', name: 'Giải thuật Đệ quy', icon: Repeat, desc: 'Kỹ thuật quy hồi, điều kiện dừng & phân rã', border: 'border-orange-200 dark:border-orange-950/30', text: 'text-orange-800 dark:text-orange-400', bg: 'bg-orange-50/30 dark:bg-orange-950/10', active: 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/80 dark:bg-orange-950/35 dark:border-orange-500', iconBg: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/25 dark:text-orange-400' },
    { id: 'searching', name: 'Tìm kiếm', icon: Search, desc: 'Tuyến tính & Nhị phân tối ưu', border: 'border-sky-200 dark:border-sky-950/30', text: 'text-sky-800 dark:text-sky-400', bg: 'bg-sky-50/30 dark:bg-sky-950/10', active: 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/80 dark:bg-sky-950/35 dark:border-sky-500', iconBg: 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/25 dark:text-sky-400' },
    { id: 'sorting', name: 'Sắp xếp', icon: SlidersHorizontal, desc: 'Nổi bọt, Chèn, Chọn, Nhanh, Trộn, Heap...', border: 'border-amber-200 dark:border-amber-950/30', text: 'text-amber-800 dark:text-amber-400', bg: 'bg-amber-50/30 dark:bg-amber-950/10', active: 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/80 dark:bg-amber-950/35 dark:border-amber-500', iconBg: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/25 dark:text-amber-400' },
    { id: 'hash', name: 'Bảng băm (Hash Table)', icon: Key, desc: 'Mã băm, ánh xạ khóa & xử lý va chạm băm', border: 'border-cyan-205 dark:border-cyan-950/30', text: 'text-cyan-800 dark:text-cyan-400', bg: 'bg-cyan-50/30 dark:bg-cyan-950/10', active: 'border-cyan-500 ring-2 ring-cyan-500/20 bg-cyan-50/85 dark:bg-cyan-950/35 dark:border-cyan-500', iconBg: 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/25 dark:text-cyan-400' },
    { id: 'tree', name: 'Mô hình Cây (Tree)', icon: GitPullRequest, desc: 'Duyệt AVL & Cây tìm kiếm BST', border: 'border-emerald-200 dark:border-emerald-950/30', text: 'text-emerald-800 dark:text-emerald-400', bg: 'bg-emerald-50/30 dark:bg-emerald-950/10', active: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-950/35 dark:border-emerald-500', iconBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-400' },
    { id: 'graph', name: 'Lý thuyết Đồ thị', icon: Network, desc: 'Đỉnh kề, cạnh & duyệt BFS, DFS', border: 'border-indigo-200 dark:border-indigo-950/30', text: 'text-indigo-800 dark:text-indigo-400', bg: 'bg-indigo-50/30 dark:bg-indigo-950/10', active: 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/80 dark:bg-indigo-950/35 dark:border-indigo-500', iconBg: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/25 dark:text-indigo-400' }
  ];

  // Helper to interleave the list of questions for 'all' mode so they are mixed evenly
  const getInterleavedQuestions = (questions: any[]) => {
    const groups: Record<string, any[]> = {};
    questions.forEach(q => {
      const t = getQuestionTopic(q);
      if (!groups[t]) groups[t] = [];
      groups[t].push(q);
    });

    const topicsOrder = ["array_list", "stack", "queue", "recursion", "searching", "sorting", "hash", "tree", "graph"];
    const interleaved: any[] = [];
    const maxLen = 50; // Each topic has up to 50 questions

    for (let i = 0; i < maxLen; i++) {
      for (const t of topicsOrder) {
        if (groups[t] && groups[t][i]) {
          interleaved.push(groups[t][i]);
        }
      }
    }
    return interleaved;
  };

  // Retrieve all questions for the current topic
  const topicQuestions = selectedTopic === 'all' 
    ? getInterleavedQuestions(quizQuestions) 
    : quizQuestions.filter(q => getQuestionTopic(q) === selectedTopic);

  const questionsPerExam = 25;
  const totalExams = Math.ceil(topicQuestions.length / questionsPerExam) || 1;

  // Correct the selectedExamIdx if it is overflowed (e.g. when changing topic)
  const activeExamIdx = selectedExamIdx >= totalExams ? 0 : selectedExamIdx;

  // Filtered questions are the slice of questions for the selected exam
  const filteredQuestions = topicQuestions.slice(activeExamIdx * questionsPerExam, (activeExamIdx + 1) * questionsPerExam);

  const currentQuestion = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleTopicChange = (topicId: string) => {
    setSelectedTopic(topicId);
    setSelectedExamIdx(0);
    setCurrentIdx(0);
    setShowResults(false);
  };

  const handleSelectOption = (optId: number) => {
    if (!currentQuestion) return;
    if (isAnswered[currentQuestion.id]) return; // Lock options once selected

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optId
    });
    setIsAnswered({
      ...isAnswered,
      [currentQuestion.id]: true
    });
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const countAnswered = () => {
    return filteredQuestions.filter(q => isAnswered[q.id]).length;
  };

  const handleResetQuiz = () => {
    // Clear only state of filtered questions
    const newAnswers = { ...selectedAnswers };
    const newAnswered = { ...isAnswered };
    filteredQuestions.forEach(q => {
      delete newAnswers[q.id];
      delete newAnswered[q.id];
    });
    setSelectedAnswers(newAnswers);
    setIsAnswered(newAnswered);
    setCurrentIdx(0);
    setShowResults(false);
  };

  const handleResetEntireQuiz = () => {
    setSelectedAnswers({});
    setIsAnswered({});
    setSelectedExamIdx(0);
    setCurrentIdx(0);
    setShowResults(false);
  };

  const score = calculateScore();
  const totalQuestions = filteredQuestions.length;
  const progressPct = totalQuestions > 0 ? Math.round((countAnswered() / totalQuestions) * 100) : 0;

  // Performance Badge evaluation
  const getBadgeInfo = () => {
    if (totalQuestions === 0) return { title: 'N/A', color: 'text-gray-500', desc: '' };
    const ratio = score / totalQuestions;
    if (ratio >= 0.85) return { title: 'Cao Thủ Giải Thuật 🏆', color: 'text-amber-500 bg-amber-550/10 border-amber-500/20', desc: 'Kiến thức chuyên đề này cực kỳ sâu rộng và chuẩn xác. Hãy giữ vững phong độ!' };
    if (ratio >= 0.6) return { title: 'Kiện Tướng Đắc Lực ⚔️', color: 'text-blue-500 bg-blue-550/10 border-blue-500/10', desc: 'Bạn đạt số điểm khá tốt. Chỉ cần ôn luyện thêm một chút ở các cấu trúc dữ liệu nâng cao là xuất sắc.' };
    return { title: 'Tân Binh Học Hỏi 🌱', color: 'text-red-500 bg-red-500/5 border-red-500/10', desc: 'Kiểm tra giải nghĩa và sử dụng công cụ mô phỏng để ghi nhớ sâu sắc các hoạt ảnh luồng dữ liệu.' };
  };

  const badge = getBadgeInfo();

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 shadow-xl space-y-8 font-sans">
        <div className="text-center space-y-4">
          <div className="mx-auto p-4 rounded-full bg-indigo-650/10 dark:bg-purple-600/10 text-indigo-600 dark:text-purple-400 w-20 h-20 flex items-center justify-center shadow-inner">
            <Award className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold font-display text-gray-950 dark:text-zinc-50">
            Kết quả Trắc nghiệm: {TOPICS.find(t => t.id === selectedTopic)?.name || 'Chuyên đề'} - Đề {activeExamIdx + 1}
          </h3>
          <p className="text-sm text-gray-400">Đồ thị kết quả đánh giá năng lực tổng quan chuyên đề này.</p>
        </div>

        {/* Big Score Bubble */}
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-850 flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-550 uppercase tracking-widest block font-mono">ĐIỂM SỐ LĨNH VỰC</span>
            <div className="text-5xl font-extrabold font-display text-gray-900 dark:text-zinc-50">
              {score} <span className="text-2xl text-gray-400 font-medium">/ {totalQuestions}</span>
            </div>
            <span className="text-xs font-semibold text-emerald-500">
              Đạt {totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}% câu trả lời chính xác!
            </span>
          </div>

          <div className={`p-4 rounded-xl border max-w-sm ${badge.color} space-y-1 text-center md:text-left`}>
            <span className="text-xs font-bold block">{badge.title}</span>
            <p className="text-[11px] leading-relaxed opacity-90">{badge.desc}</p>
          </div>
        </div>

        {/* Questions list breakdown review */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-50 font-display">Chi tiết câu hỏi đã thi:</h4>
            <span className="text-[10px] font-bold font-mono text-indigo-500">
              Chuyên đề: {TOPICS.find(t => t.id === selectedTopic)?.name} - Đề {activeExamIdx + 1}
            </span>
          </div>
          
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-850 border border-gray-100 dark:border-zinc-850 rounded-xl px-4 scrollbar-thin">
            {filteredQuestions.map((q, i) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;
              
              return (
                <div key={q.id} className="py-3 text-xs flex justify-between gap-4 items-start animate-fadeIn">
                  <div>
                    <span className="font-bold text-gray-700 dark:text-zinc-350">Câu {i + 1}:</span>
                    <p className="text-gray-500 dark:text-zinc-400 mt-0.5 leading-relaxed font-sans">{q.question}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-mono text-[9px] font-bold uppercase shrink-0 ${
                    selectedOpt === undefined ? 'bg-gray-150 text-gray-500 dark:bg-zinc-800' :
                    isCorrect ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-550'
                  }`}>
                    {selectedOpt === undefined ? 'Chưa chọn' : isCorrect ? 'Đúng' : 'Sai'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleResetQuiz}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/10"
          >
            <RefreshCw className="w-4 h-4" />
            Luyện lại chuyên đề này
          </button>
          
          <button
            onClick={() => {
              setSelectedTopic('all');
              handleResetEntireQuiz();
            }}
            className="flex-1 py-3 rounded-xl border border-gray-150 dark:border-zinc-850 hover:bg-gray-50 dark:hover:bg-zinc-850 text-gray-705 dark:text-zinc-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Về trang chủ ({quizQuestions.length} câu)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Sleek & Compact Quiz Selection Panel */}
      <div className="p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 rounded-2xl shadow-xs space-y-3">
        {/* Row 1: Heading & Reset Control */}
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
            <h3 className="text-xs font-bold text-gray-950 dark:text-zinc-50 uppercase tracking-widest font-mono">
              Chuyên đề luyện đề dsa
            </h3>
          </div>
          <button
            onClick={handleResetEntireQuiz}
            className="text-[10px] font-bold text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <RefreshCw className="w-3 h-3" />
            Làm lại từ đầu
          </button>
        </div>

        {/* Row 2: "Tất cả" separate and other topics in a 3-column grid */}
        <div className="space-y-3 pt-1">
          {/* Separate "Tất cả" section */}
          {TOPICS.filter(t => t.id === 'all').map((topic) => {
            const TopicIcon = topic.icon;
            const isActive = selectedTopic === 'all';
            const allAnswered = quizQuestions.filter(q => isAnswered[q.id]).length;
            const allCount = quizQuestions.length;

            return (
              <button
                key="all"
                onClick={() => handleTopicChange('all')}
                className={`px-4 py-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer text-left w-full ${
                  isActive 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                    : "bg-neutral-50/50 dark:bg-zinc-950/50 border-gray-200 dark:border-zinc-800/80 text-gray-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800/50 hover:border-gray-300 dark:hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-indigo-700' : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500'}`}>
                    <TopicIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-none">DSA Tổng Hợp (Tất cả chuyên đề)</h4>
                    <p className={`text-[10px] mt-1 leading-tight ${isActive ? 'text-indigo-200' : 'text-gray-400 dark:text-zinc-400'}`}>
                      Luyện trọn bộ {allCount} câu hỏi bách khoa ngẫu nhiên từ mọi chuyên đề
                    </p>
                  </div>
                </div>
                {allAnswered > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold shrink-0 ${
                    isActive ? "bg-indigo-700 text-white" : "bg-emerald-500/15 text-emerald-500"
                  }`}>
                    {allAnswered}/{allCount}
                  </span>
                )}
              </button>
            );
          })}

          {/* Grid of other topics (divided into 3 columns) */}
          <div className="grid grid-cols-3 gap-2">
            {TOPICS.filter(t => t.id !== 'all').map((topic) => {
              const TopicIcon = topic.icon;
              const isActive = selectedTopic === topic.id;
              const topicQuestions = quizQuestions.filter(q => getQuestionTopic(q) === topic.id);
              const topicCount = topicQuestions.length;
              const topicAnswered = topicQuestions.filter(q => isAnswered[q.id]).length;

              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicChange(topic.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 flex items-center justify-between gap-1.5 cursor-pointer text-left h-[38px] w-full ${
                    isActive 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-xs" 
                      : "bg-neutral-50/50 dark:bg-zinc-950/50 border-gray-200 dark:border-zinc-800/80 text-gray-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800/50 hover:border-gray-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <TopicIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{topic.name}</span>
                  </div>
                  {topicAnswered > 0 && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold shrink-0 ${
                      isActive ? "bg-indigo-700 text-white" : "bg-emerald-500/15 text-emerald-500"
                    }`}>
                      {topicAnswered}/{topicCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Exam selections row */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
            Chọn Đề thi (Mỗi đề gồm 25 câu)
          </span>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalExams }).map((_, examIdx) => {
              const startQ = examIdx * questionsPerExam + 1;
              const endQ = Math.min((examIdx + 1) * questionsPerExam, topicQuestions.length);
              const isSelected = activeExamIdx === examIdx;
              
              const examQuestions = topicQuestions.slice(examIdx * questionsPerExam, (examIdx + 1) * questionsPerExam);
              const examAnsweredCount = examQuestions.filter(q => isAnswered[q.id]).length;
              const isCompleted = examAnsweredCount === examQuestions.length;

              return (
                <button
                  key={examIdx}
                  onClick={() => {
                    setSelectedExamIdx(examIdx);
                    setCurrentIdx(0);
                    setShowResults(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-950/45 dark:border-indigo-500 dark:text-indigo-400 font-extrabold"
                      : "border-gray-200 dark:border-zinc-800/85 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 bg-neutral-50/30 dark:bg-zinc-950/50"
                  }`}
                >
                  <span>Đề {examIdx + 1}</span>
                  {examAnsweredCount > 0 && (
                    <span className={`text-[9px] font-mono font-bold px-1 rounded ${
                      isCompleted 
                        ? (isSelected ? "bg-emerald-500 text-white" : "bg-emerald-500/15 text-emerald-500") 
                        : "bg-amber-500/15 text-amber-500"
                    }`}>
                      {isCompleted ? "✓" : `${examAnsweredCount}/${examQuestions.length}`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Study/Exam Stage */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start font-sans">
        {/* Navigation Sidebar Matrix */}
        <div className="xl:col-span-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2.5">
            <h4 className="text-xs font-extrabold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider font-mono">
              Bản đồ câu hỏi
            </h4>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              {countAnswered()} / {totalQuestions} Câu
            </span>
          </div>

          {/* Mini progress bar split */}
          <div className="space-y-1.5 text-[10px] text-gray-400 font-bold font-mono">
            <div className="flex justify-between">
              <span>Đã trả lời:</span>
              <span>{progressPct}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPct}%` }}
                className="bg-indigo-600 dark:bg-indigo-500 h-full transition-all duration-300 rounded-full"
              />
            </div>
          </div>

          {/* Matrix of indices */}
          <div className="grid grid-cols-5 sm:grid-cols-10 xl:grid-cols-5 gap-1.5 max-h-[190px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredQuestions.map((q, i) => {
              const hasDone = isAnswered[q.id];
              const isNowActive = i === currentIdx;

              let btnTheme = 'border-gray-100 text-gray-500 dark:border-zinc-800 hover:bg-gray-50';
              if (hasDone) {
                btnTheme = 'bg-indigo-50/75 border-indigo-200 text-indigo-600 dark:bg-indigo-950/20 dark:border-indigo-900 dark:text-indigo-400';
              }
              if (isNowActive) {
                btnTheme = 'bg-indigo-600 border-indigo-600 text-white shadow-xs font-extrabold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(i)}
                  className={`py-1.5 text-[11px] font-mono border rounded-lg text-center transition-all cursor-pointer ${btnTheme}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Submission button */}
          <button
            id="quiz-submit-exam-btn"
            onClick={() => setShowResults(true)}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all shadow-xs cursor-pointer"
          >
            <div className="flex items-center gap-1 font-bold uppercase tracking-wide">
              <Award className="w-4 h-4" />
              Nộp bài & Đánh giá
            </div>
            {totalQuestions - countAnswered() > 0 ? (
              <span className="text-[9px] font-normal opacity-80 font-sans">
                (Còn {totalQuestions - countAnswered()} câu chưa làm)
              </span>
            ) : (
              <span className="text-[9px] opacity-80 font-mono font-normal">
                (Đã chọn đầy đủ các câu)
              </span>
            )}
          </button>
        </div>

        {/* Current Question Display (8 cols) */}
        {filteredQuestions.length > 0 && currentQuestion ? (
          <div className="xl:col-span-8 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800/80 pb-3">
              <span className="text-[9px] font-extrabold font-mono px-2.5 py-0.5 bg-neutral-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-transparent rounded-md uppercase tracking-wider">
                Chuyên đề: {currentQuestion.category}
              </span>
              <span className="text-[11px] font-extrabold font-mono text-gray-400">
                Câu {currentIdx + 1} / {totalQuestions}
              </span>
            </div>

            {/* Question title */}
            <div className="space-y-1">
              <h3 className="text-sm md:text-base font-bold font-sans text-gray-950 dark:text-zinc-50 leading-relaxed flex gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>{currentQuestion.question}</span>
              </h3>
            </div>

            {/* Selection Options list */}
            <div className="grid grid-cols-1 gap-2.5 font-sans">
              {currentQuestion.options.map((opt, optId) => {
                const questionDone = isAnswered[currentQuestion.id];
                const userPick = selectedAnswers[currentQuestion.id];
                const isThisChosen = userPick === optId;
                const isCorrectOption = optId === currentQuestion.correctAnswer;

                let optionTheme = '';
                let statusIcon = null;

                if (questionDone) {
                  if (isCorrectOption) {
                    optionTheme = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-950/30 font-bold ring-1 ring-emerald-500/25';
                    statusIcon = <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
                  } else if (isThisChosen) {
                    optionTheme = 'border-red-500 bg-red-500/5 text-red-700 dark:text-red-400 dark:bg-red-950/20 font-semibold';
                    statusIcon = <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
                  } else {
                    optionTheme = 'border-gray-200 dark:border-zinc-800 opacity-50 text-gray-400 dark:text-zinc-500 bg-neutral-50/50 dark:bg-zinc-950/40 cursor-not-allowed';
                  }
                } else {
                  optionTheme = isThisChosen
                    ? 'border-indigo-500 bg-indigo-50/30 text-indigo-650 dark:bg-indigo-950/25 dark:text-indigo-400 font-bold'
                    : 'border-gray-200 dark:border-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-850 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300';
                }

                return (
                  <button
                    key={optId}
                    disabled={questionDone}
                    onClick={() => handleSelectOption(optId)}
                    className={`w-full p-3 px-4 rounded-xl border text-left text-xs flex items-center justify-between gap-3 transition-all duration-150 ${optionTheme} ${!questionDone ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex gap-2.5 items-start">
                      <span className="font-mono text-gray-400 shrink-0 font-bold text-xs mt-0.5">
                        {String.fromCharCode(65 + optId)}.
                      </span>
                      <span>{opt}</span>
                    </div>
                    {statusIcon}
                  </button>
                );
              })}
            </div>

            {/* Immediate Explanation Box */}
            {isAnswered[currentQuestion.id] && selectedAnswers[currentQuestion.id] !== currentQuestion.correctAnswer && (
              <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/15 border border-orange-100 dark:border-orange-900/30 font-sans space-y-2.5 animate-fadeIn">
                <div className="flex gap-2 items-center">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-450">
                    Chưa chính xác. Lời giải thích:
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Paginations */}
            <div className="flex justify-between items-center border-t border-gray-100 dark:border-zinc-800/80 pt-4">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-3.5 py-2 text-xs font-bold border border-gray-150 dark:border-zinc-800 disabled:opacity-30 text-gray-700 dark:text-zinc-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-800 flex items-center gap-1 cursor-pointer transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Câu trước
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentIdx === filteredQuestions.length - 1}
                className="px-3.5 py-2 text-xs font-bold border border-gray-150 dark:border-zinc-800 disabled:opacity-30 text-gray-700 dark:text-zinc-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-800 flex items-center gap-1 cursor-pointer transition-all"
              >
                Câu sau
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="xl:col-span-8 p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-xs space-y-4">
            <Layers className="w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto animate-pulse" />
            <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-350">Không tìm thấy câu hỏi tương ứng</h3>
            <p className="text-xs text-gray-400">Vui lòng chọn một chuyên mục luyện tập khác bằng dashboard phía trên!</p>
          </div>
        )}
      </div>
    </div>
  );
}
