import { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Clock,
  HardDrive
} from 'lucide-react';
import { searchingConcepts } from '../data/concepts';

interface SearchStep {
  idx: number;
  low: number;
  high: number;
  mid: number;
  status: 'checking' | 'found' | 'notFound' | 'idle';
  stepNum: number;
}

export default function SearchVisualizer() {
  const [selectedAlg, setSelectedAlg] = useState<string>('linear');
  const [array, setArray] = useState<number[]>([]);
  const [targetNum, setTargetNum] = useState<number>(45);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('Khởi tạo mảng hoàn tất. Hãy bấm Chạy để bắt đầu!');

  const pseudocodeLines = {
    linear: [
      'function linearSearch(A, x):',
      '    for i = 0 to length(A)-1:',
      '        if A[i] == x:',
      '            return i',
      '    return -1 // Không tìm thấy'
    ],
    binary: [
      'function binarySearch(A, x):',
      '    low = 0, high = length(A)-1',
      '    while low <= high:',
      '        mid = low + (high - low) / 2',
      '        if A[mid] == x: return mid',
      '        else if A[mid] < x: low = mid + 1',
      '        else: high = mid - 1',
      '    return -1'
    ]
  };

  useEffect(() => {
    generateRandomArray();
  }, [selectedAlg]);

  const generateRandomArray = () => {
    setIsPlaying(false);
    const size = 12;
    const randoms: number[] = [];
    for (let i = 0; i < size; i++) {
      randoms.push(Math.floor(Math.random() * 85) + 10);
    }
    // Sắp xếp tăng dần nếu là Binary Search
    if (selectedAlg === 'binary') {
      randoms.sort((a, b) => a - b);
    }
    setArray(randoms);
    setTargetNum(randoms[Math.floor(Math.random() * size)]); // Đảm bảo luôn chọn phần tử ngẫu nhiên sẵn trong mảng để tăng tỉ lệ tìm thấy
    setSteps([]);
    setCurrentStepIdx(0);
    setStatusText('Mảng đã được sinh ngẫu nhiên. Nhập số cần tìm và bắt đầu mô phỏng.');
  };

  const handleManualTargetChange = (valStr: string) => {
    const num = parseInt(valStr);
    if (!isNaN(num)) {
      setTargetNum(num);
    }
  };

  // Compile full search path traces
  const compileSearchSteps = () => {
    const computed: SearchStep[] = [];
    let stepCount = 1;

    if (selectedAlg === 'linear') {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === targetNum) {
          computed.push({
            idx: i,
            low: 0,
            high: array.length - 1,
            mid: -1,
            status: 'found',
            stepNum: stepCount++
          });
          break;
        } else {
          computed.push({
            idx: i,
            low: 0,
            high: array.length - 1,
            mid: -1,
            status: 'checking',
            stepNum: stepCount++
          });
        }
      }
      // If we got to the end without finding it
      if (computed.length === 0 || computed[computed.length - 1].status !== 'found') {
        computed.push({
          idx: -1,
          low: 0,
          high: array.length - 1,
          mid: -1,
          status: 'notFound',
          stepNum: stepCount++
        });
      }
    } else {
      // Binary Search Steps Computation
      let low = 0;
      let high = array.length - 1;
      let found = false;

      while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        
        if (array[mid] === targetNum) {
          computed.push({
            idx: -1,
            low: low,
            high: high,
            mid: mid,
            status: 'found',
            stepNum: stepCount++
          });
          found = true;
          break;
        } else {
          computed.push({
            idx: -1,
            low: low,
            high: high,
            mid: mid,
            status: 'checking',
            stepNum: stepCount++
          });

          if (array[mid] < targetNum) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }
      }

      if (!found) {
        computed.push({
          idx: -1,
          low: low,
          high: high,
          mid: -1,
          status: 'notFound',
          stepNum: stepCount++
        });
      }
    }

    setSteps(computed);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  // Run simulation interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && steps.length > 0) {
      interval = setInterval(() => {
        if (currentStepIdx < steps.length - 1) {
          setCurrentStepIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 900); // 900ms transition time
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStepIdx, steps]);

  // Handle status update statements matching trace indices
  useEffect(() => {
    if (steps.length === 0) return;
    const step = steps[currentStepIdx];
    if (!step) return;

    if (selectedAlg === 'linear') {
      if (step.status === 'checking') {
        setStatusText(`Bước ${step.stepNum}: Kiểm tra phần tử chỉ số [${step.idx}] có giá trị là ${array[step.idx]}. Không khớp!`);
      } else if (step.status === 'found') {
        setStatusText(`Bước ${step.stepNum}: TÌM THẤY! Phần tử chỉ mục [${step.idx}] khớp hoàn chỉnh với giá trị ${targetNum}.`);
      } else {
        setStatusText(`Tìm kiếm thất bại: Không tồn tại số ${targetNum} trong mảng.`);
      }
    } else {
      // Binary search logs
      if (step.status === 'checking') {
        setStatusText(
          `Bước ${step.stepNum}: Thu hẹp tầm quét [${step.low}..${step.high}]. Đo khoảng phần tử đứng giữa (mid) tại [${step.mid}] = ${array[step.mid]}. Vì ${array[step.mid]} < ${targetNum}, ta dịch ranh giới.`
        );
      } else if (step.status === 'found') {
        setStatusText(`Bước ${step.stepNum}: CỰC KỲ KHỚP! Định vị chính xác giá trị tại chỉ số giữa [${step.mid}] = ${targetNum}.`);
      } else {
        setStatusText(`Tìm kiếm kết thúc: Không tìm thấy giá trị ${targetNum} trong dải mảng.`);
      }
    }
  }, [currentStepIdx, steps, targetNum, selectedAlg, array]);

  // Determine active pseudocode lines based on step phase
  const getActivePseudocodeLine = () => {
    if (steps.length === 0) return -1;
    const step = steps[currentStepIdx];
    if (!step) return -1;

    if (selectedAlg === 'linear') {
      if (step.status === 'checking') return 2;
      if (step.status === 'found') return 3;
      return 4;
    } else {
      if (step.status === 'checking') {
        if (array[step.mid] < targetNum) return 5;
        return 6;
      }
      if (step.status === 'found') return 4;
      return 7;
    }
  };

  const activeLine = getActivePseudocodeLine();
  const concept = searchingConcepts[selectedAlg];

  return (
    <div className="space-y-6">
      {/* Simulation Arena Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Playground area (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-850 pb-4">
            <div>
              <h3 className="text-base font-bold font-display text-gray-900 dark:text-zinc-50 uppercase">
                Trực quan hóa Tìm Kiếm
              </h3>
              <p className="text-xs text-gray-400 dark:text-zinc-400">
                Theo dõi cách thuật toán thu hẹp không gian để nhanh nhất tìm được đích đến.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedAlg('linear')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  selectedAlg === 'linear'
                    ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-purple-950/20 dark:border-purple-500 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-805'
                }`}
              >
                Tuyến tính (Linear)
              </button>
              <button
                onClick={() => setSelectedAlg('binary')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  selectedAlg === 'binary'
                    ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-purple-950/20 dark:border-purple-500 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-805'
                }`}
              >
                Nhị phân (Binary)
              </button>
            </div>
          </div>

          {/* Graphical representation element display boxes */}
          <div className="min-h-56 p-6 bg-gray-50 dark:bg-zinc-950/60 rounded-2xl border border-gray-100 dark:border-zinc-850 flex items-center justify-center overflow-x-auto">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {array.map((num, idx) => {
                const currentStep = steps[currentStepIdx];
                let boxColor = 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-750 dark:text-zinc-200';
                let scaleClass = 'scale-100';
                let indicator = '';

                if (currentStep) {
                  if (selectedAlg === 'linear') {
                    if (currentStep.status === 'checking' && idx <= currentStep.idx) {
                      boxColor = idx === currentStep.idx ? 'bg-orange-500 border-orange-500 text-white scale-105' : 'bg-red-500/10 border-red-200 dark:border-red-950 text-red-500';
                    } else if (currentStep.status === 'found' && idx <= currentStep.idx) {
                      boxColor = idx === currentStep.idx ? 'bg-emerald-500 border-emerald-500 text-white scale-105 shadow-md' : 'bg-red-500/10 border-red-200 dark:border-red-950 text-red-500';
                    } else if (currentStep.status === 'notFound') {
                      boxColor = 'bg-red-500/10 border-red-200 text-red-500';
                    }
                  } else {
                    // Binary search drawing logic
                    const inRange = idx >= currentStep.low && idx <= currentStep.high;
                    
                    if (!inRange && currentStep.status !== 'notFound') {
                      boxColor = 'bg-gray-100 dark:bg-zinc-950 border-gray-150 dark:border-zinc-950 text-gray-300 dark:text-zinc-700 opacity-30';
                    } else {
                      if (idx === currentStep.mid) {
                        if (currentStep.status === 'found') {
                          boxColor = 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-lg';
                        } else {
                          boxColor = 'bg-orange-500 border-orange-500 text-white scale-105 shadow';
                        }
                      } else {
                        boxColor = 'bg-blue-500/5 dark:bg-purple-500/5 border-blue-200 dark:border-purple-900/40 text-blue-600 dark:text-purple-400';
                      }
                    }

                    if (idx === currentStep.low) indicator = 'L';
                    if (idx === currentStep.high) indicator = indicator ? 'L, H' : 'H';
                    if (idx === currentStep.mid) indicator = indicator ? `${indicator}, M` : 'M';
                  }
                }

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 relative">
                    {/* Index above */}
                    <span className="text-[10px] font-mono text-gray-400 dark:text-zinc-600">
                      [{idx}]
                    </span>

                    {/* Numeric Square Box */}
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold font-sans text-sm transition-all duration-300 ${boxColor} ${scaleClass}`}>
                      {num}
                    </div>

                    {/* Pointer Indicator Labels below for L, M, H */}
                    <span className="text-[10px] font-extrabold font-mono text-orange-530 dark:text-orange-400 min-h-[15px] block text-center">
                      {indicator}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Log Text Description */}
          <div className="p-3.5 bg-gray-50 dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 rounded-xl font-mono text-xs text-gray-700 dark:text-zinc-300 leading-relaxed shadow-inner">
            {statusText}
          </div>

          {/* Action Button Controls */}
          <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-850 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-3 items-center flex-1">
              <div className="space-y-1 w-full md:w-36">
                <span className="text-[9px] font-extrabold text-gray-400 dark:text-zinc-500 uppercase block font-display">
                  Số cần tìm:
                </span>
                <input
                  id="search-target-input"
                  type="number"
                  value={targetNum}
                  onChange={(e) => handleManualTargetChange(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-800 dark:text-zinc-200 font-bold focus:outline-none"
                />
              </div>

              <div className="flex gap-2 self-end w-full md:w-auto">
                <button
                  id="search-run-btn"
                  onClick={compileSearchSteps}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer w-full md:w-auto justify-center"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Bắt đầu tìm
                </button>
                <button
                  id="search-reset-btn"
                  onClick={generateRandomArray}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-705 border border-gray-200 dark:border-zinc-700/50 text-gray-700 dark:text-zinc-200 font-bold flex items-center justify-center cursor-pointer"
                  title="Đặt lại mảng"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            <button
              onClick={generateRandomArray}
              className="px-3.5 py-2 rounded-xl bg-blue-500/10 dark:bg-purple-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-purple-400 border border-blue-500/10 text-xs font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Tạo mảng ngẫu nhiên mới
            </button>
          </div>
        </div>

        {/* Live Code Highlight (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
          <h3 className="text-xs font-bold font-display text-gray-900 dark:text-zinc-50 uppercase tracking-tight">
            Spotlight Mã giả thuật toán
          </h3>

          <div className="p-3.5 bg-gray-900 border border-gray-950 rounded-xl font-mono text-[11px] leading-relaxed select-none overflow-x-auto">
            {pseudocodeLines[selectedAlg as keyof typeof pseudocodeLines].map((line, idx) => {
              const isHighlighted = idx === activeLine;
              return (
                <div
                  key={idx}
                  className={`px-2 py-0.5 rounded transition-colors duration-100 ${
                    isHighlighted
                      ? 'bg-amber-500/20 text-amber-300 border-l-2 border-amber-500 font-bold'
                      : 'text-zinc-450'
                  }`}
                >
                  <span className="inline-block w-4 text-right text-zinc-600 mr-2 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              );
            })}
          </div>

          <div className="text-[10px] text-gray-400 dark:text-zinc-550 leading-relaxed font-sans bg-zinc-50 dark:bg-zinc-850 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
            📌 Trong Binary Search, L là chỉ số biên trái (Low), H là biên phải (High), M là giá trị xem xét chia đôi ở giữa (Mid).
          </div>
        </div>
      </div>

      {/* Explainer concept panel */}
      {concept && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-3">
            <h4 className="text-lg font-bold font-display text-gray-900 dark:text-zinc-50">
              Kiến thức: {concept.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              {concept.definition}
            </p>
            
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 block">
                Ứng dụng chính yếu:
              </span>
              <ul className="list-disc pl-4 text-xs text-gray-500 dark:text-zinc-400 space-y-0.5">
                {concept.applications.map((app, i) => (
                  <li key={i}>{app}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-zinc-800">
                <span className="font-bold text-gray-700 dark:text-zinc-205">Đánh giá hệ năng:</span>
                <span className="text-[10px] bg-blue-100 dark:bg-purple-950/45 text-blue-700 dark:text-purple-400 px-2 py-0.5 rounded-full font-bold">
                  Complexity
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 font-mono text-center">
                <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-lg">
                  <span className="text-[9px] text-gray-400 block font-semibold uppercase">Tốt nhất (Best)</span>
                  <span className="text-xs font-bold text-gray-800 dark:text-zinc-205 block mt-0.5">{concept.complexity.timeBest}</span>
                </div>
                <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-lg">
                  <span className="text-[9px] text-gray-400 block font-semibold uppercase">Gặp trung bình</span>
                  <span className="text-xs font-bold text-gray-800 dark:text-zinc-205 block mt-0.5">{concept.complexity.timeAverage}</span>
                </div>
                <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-lg">
                  <span className="text-[9px] text-gray-400 block font-semibold uppercase">Tồi nhất (Worst)</span>
                  <span className="text-xs font-bold text-gray-800 dark:text-zinc-205 block mt-0.5">{concept.complexity.timeWorst}</span>
                </div>
                <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-lg">
                  <span className="text-[9px] text-gray-400 block font-semibold uppercase">Bộ nhớ phụ</span>
                  <span className="text-xs font-bold text-gray-800 dark:text-zinc-205 block mt-0.5">{concept.complexity.space}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
