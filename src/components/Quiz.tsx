import { useState } from 'react';
import { Award, CheckCircle2, XCircle, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { quizQuestions } from '../data/concepts';

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswered, setIsAnswered] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const currentQuestion = quizQuestions[currentIdx];

  const handleSelectOption = (optId: number) => {
    if (isAnswered[currentQuestion.id]) return; // Khóa lại sau khi đã trả lời câu này

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
    if (currentIdx < quizQuestions.length - 1) {
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
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const countAnswered = () => {
    return Object.keys(isAnswered).length;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsAnswered({});
    setCurrentIdx(0);
    setShowResults(false);
  };

  const score = calculateScore();
  const totalQuestions = quizQuestions.length;
  const progressPct = Math.round((countAnswered() / totalQuestions) * 100);

  // Performance Badge evaluation
  const getBadgeInfo = () => {
    const ratio = score / totalQuestions;
    if (ratio >= 0.85) return { title: 'Cao Thủ Giải Thuật 🏆', color: 'text-amber-500 bg-amber-550/10 border-amber-500/20', desc: 'Kiến thức về Cấu trúc dữ liệu và giải thuật cực kỳ sâu rộng và chuẩn xác. Hãy giữ vững phong độ!' };
    if (ratio >= 0.6) return { title: 'Kiện Tướng Đắc Lực ⚔️', color: 'text-blue-500 bg-blue-50/50 dark:bg-purple-950/20 border-blue-500/10', desc: 'Bạn đạt số điểm khá tốt. Chỉ cần ôn luyện thêm một chút ở các giải thuật đệ quy hoặc đồ thị nâng cao là xuất sắc.' };
    return { title: 'Tân Binh Học Hỏi 🌱', color: 'text-red-500 bg-red-500/5 border-red-500/10', desc: 'Điểm khởi đầu tốt! Hãy dùng thêm các công cụ mô phỏng trực quan của website để nhớ luồng hoạt động rõ hơn nhé.' };
  };

  const badge = getBadgeInfo();

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 shadow-xl space-y-8 font-sans">
        <div className="text-center space-y-4">
          <div className="mx-auto p-4 rounded-full bg-blue-600/10 dark:bg-purple-600/10 text-blue-600 dark:text-purple-400 w-20 h-20 flex items-center justify-center shadow-inner">
            <Award className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold font-display text-gray-950 dark:text-zinc-50">
            Kết quả Trắc nghiệm Kiến thức dsa
          </h3>
          <p className="text-sm text-gray-400">Đồ thị kết quả đánh giá năng lực tổng quan môn học.</p>
        </div>

        {/* Big Score Bubble */}
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-850 flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-550 uppercase tracking-widest block font-mono">ĐIỂM SỐ CHUNG CUỘC</span>
            <div className="text-5xl font-extrabold font-display text-gray-900 dark:text-zinc-50">
              {score} <span className="text-2xl text-gray-400 font-medium">/ {totalQuestions}</span>
            </div>
            <span className="text-xs font-semibold text-emerald-500">Đạt {Math.round((score / totalQuestions) * 100)}% chỉ tiêu học kỳ</span>
          </div>

          <div className={`p-4 rounded-xl border max-w-xs text-center md:text-left ${badge.color}`}>
            <span className="font-bold text-sm block">{badge.title}</span>
            <p className="mt-1 text-xs leading-normal opacity-85">{badge.desc}</p>
          </div>
        </div>

        {/* Questions list breakdown review */}
        <div className="space-y-4">
          <h4 className="text-md font-bold text-gray-900 dark:text-zinc-50 font-display">Chi tiết câu hỏi:</h4>
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-850 border border-gray-100 dark:border-zinc-850 rounded-xl px-4 scrollbar-thin">
            {quizQuestions.map((q, i) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;
              return (
                <div key={q.id} className="py-3 text-xs flex justify-between gap-4 items-start">
                  <div>
                    <span className="font-bold text-gray-700 dark:text-zinc-300">Câu {i + 1}:</span>
                    <p className="text-gray-500 dark:text-zinc-400 mt-0.5 leading-relaxed font-sans">{q.question}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-mono text-[9px] font-bold uppercase shrink-0 ${
                    selectedOpt === undefined ? 'bg-gray-100 text-gray-500' :
                    isCorrect ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {selectedOpt === undefined ? 'Chưa chọn' : isCorrect ? 'Đúng' : 'Sai'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleResetQuiz}
          className="w-full py-3.5 rounded-xl bg-blue-650 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
        >
          <RefreshCw className="w-5 h-5 animate-spin" />
          Làm bài trắc nghiệm lại từ đầu
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start font-sans">
      {/* Quiz indices navigator grid (4 cols) */}
      <div className="xl:col-span-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-850 pb-3">
          <h4 className="text-xs font-extrabold text-gray-900 dark:text-zinc-100 uppercase tracking-widest font-display">
            Tổng 50 câu hỏi mẫu
          </h4>
          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-purple-950 text-blue-600 dark:text-purple-400">
            {countAnswered()} / {totalQuestions} Đã làm
          </span>
        </div>

        {/* Progress percent stats */}
        <div className="space-y-1.5 text-xs text-gray-400 font-semibold font-mono">
          <div className="flex justify-between">
            <span>Tiến trình hoàn tất:</span>
            <span>{progressPct}%</span>
          </div>
          <div className="w-full bg-gray-150 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPct}%` }}
              className="bg-blue-600 dark:bg-purple-600 h-full transition-all duration-300 rounded-full"
            />
          </div>
        </div>

        {/* 50 buttons matrix */}
        <div className="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-5 gap-1.5 max-h-80 overflow-y-auto pr-1">
          {quizQuestions.map((q, i) => {
            const hasDone = isAnswered[q.id];
            const isNowActive = i === currentIdx;

            let btnTheme = 'border-gray-100 text-gray-500 dark:border-zinc-850 hover:bg-gray-50';
            if (hasDone) {
              btnTheme = 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-purple-950/25 dark:border-purple-900 dark:text-purple-400';
            }
            if (isNowActive) {
              btnTheme = 'bg-blue-600 border-blue-600 dark:bg-purple-600 dark:border-purple-600 text-white shadow font-black scale-105';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className={`py-2 text-[11px] font-mono font-bold border rounded-lg text-center transition-all ${btnTheme}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Submit final quiz button */}
        <button
          id="quiz-submit-exam-btn"
          onClick={() => setShowResults(true)}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-500/10 cursor-pointer pt-3"
        >
          <Award className="w-4.5 h-4.5" />
          Nộp bài & Chấm điểm tự động
        </button>
      </div>

      {/* active quiz body block (8 cols) */}
      <div className="xl:col-span-8 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-6">
        {/* Question Header & Subject Category */}
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-850 pb-4">
          <span className="text-[10px] font-bold font-mono px-3 py-1 bg-amber-50 dark:bg-amber-950/20 shadow-sm text-amber-600 dark:text-amber-400 border border-amber-500/10 rounded-full uppercase tracking-wider">
            Lĩnh vực: {currentQuestion.category}
          </span>
          <span className="text-[11px] font-bold font-mono text-gray-400">
            Câu {currentIdx + 1} / {totalQuestions}
          </span>
        </div>

        {/* Question sentence */}
        <div className="space-y-1.5">
          <h3 className="text-base md:text-lg font-bold font-sans text-gray-900 dark:text-zinc-100 leading-relaxed flex gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
            <span>{currentQuestion.question}</span>
          </h3>
        </div>

        {/* 4 Block Options */}
        <div className="grid grid-cols-1 gap-3 font-sans">
          {currentQuestion.options.map((opt, optId) => {
            const hasSumbittedQuestion = isAnswered[currentQuestion.id];
            const userPick = selectedAnswers[currentQuestion.id];
            const isThisCorrect = optId === currentQuestion.correctAnswer;
            const isThisChosen = userPick === optId;

            let optionTheme = 'border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-850 bg-white dark:bg-zinc-900 text-gray-750 dark:text-zinc-200';
            let iconBox = null;

            if (hasSumbittedQuestion) {
              if (isThisCorrect) {
                // Correct ans = green background
                optionTheme = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold';
                iconBox = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
              } else if (isThisChosen) {
                // User chose wrong answer = red background
                optionTheme = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400';
                iconBox = <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
              } else {
                // Other options = fade out opacity slightly
                optionTheme = 'border-gray-100 dark:border-zinc-850 text-gray-400 dark:text-zinc-600 bg-transparent opacity-50';
              }
            } else {
              if (isThisChosen) {
                optionTheme = 'border-blue-500 bg-blue-500/5 text-blue-500';
              }
            }

            return (
              <button
                key={optId}
                onClick={() => handleSelectOption(optId)}
                disabled={hasSumbittedQuestion}
                className={`w-full p-4.5 rounded-xl border-2 text-left text-xs font-semibold flex items-center justify-between gap-4 transition-all duration-200 ${optionTheme} cursor-pointer`}
              >
                <div className="flex gap-3">
                  <span className="font-mono text-gray-400 shrink-0 font-black">
                    {String.fromCharCode(65 + optId)}.
                  </span>
                  <span>{opt}</span>
                </div>
                {iconBox}
              </button>
            );
          })}
        </div>

        {/* Explanations text block */}
        {isAnswered[currentQuestion.id] && (
          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-zinc-850 border border-indigo-150/60 dark:border-zinc-800 space-y-1.5 animate-fadeIn">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-purple-400 font-mono tracking-wider flex items-center gap-1.5 uppercase">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Giải thích học tập:
            </span>
            <p className="text-xs text-gray-650 dark:text-zinc-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Prev & Next controller buttons */}
        <div className="flex justify-between items-center border-t border-gray-100 dark:border-zinc-850 pt-5">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2 text-xs font-bold border border-gray-150 dark:border-zinc-800 disabled:opacity-35 text-gray-700 dark:text-zinc-300 rounded-xl hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Câu trước
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIdx === quizQuestions.length - 1}
            className="px-4 py-2 text-xs font-bold border border-gray-150 dark:border-zinc-800 disabled:opacity-35 text-gray-700 dark:text-zinc-300 rounded-xl hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-all"
          >
            Câu sau
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
