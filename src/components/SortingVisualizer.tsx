import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Sparkles,
  Sliders,
  HelpCircle,
  Code2
} from 'lucide-react';
import { sortingConcepts } from '../data/concepts';

interface SortStep {
  array: number[];
  indices: number[];
  type: 'compare' | 'swap' | 'pivot' | 'sorted' | 'idle';
  comparisons: number;
  swaps: number;
  activeLine: number;
}

export default function SortingVisualizer() {
  const [selectedAlg, setSelectedAlg] = useState<string>('bubble');
  const [array, setArray] = useState<number[]>([]);
  const [rawInput, setRawInput] = useState<string>('');
  const [speed, setSpeed] = useState<number>(400); // ms delay
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [stepState, setStepState] = useState<'compare' | 'swap' | 'pivot' | 'sorted' | 'idle'>('idle');

  // Interactive step controller
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const pseudocodeLines = {
    bubble: [
      'function bubbleSort(A):',
      '    for i = 0 to n-1:',
      '        for j = 0 to n-i-2:',
      '            if A[j] > A[j+1]:',
      '                swap(A[j], A[j+1])',
      '        if not swapped: break'
    ],
    selection: [
      'function selectionSort(A):',
      '    for i = 0 to n-2:',
      '        min_idx = i',
      '        for j = i+1 to n-1:',
      '            if A[j] < A[min_idx]: min_idx = j',
      '        swap(A[i], A[min_idx])'
    ],
    insertion: [
      'function insertionSort(A):',
      '    for i = 1 to n-1:',
      '        key = A[i], j = i - 1',
      '        while j >= 0 and A[j] > key:',
      '            A[j+1] = A[j], j = j - 1',
      '        A[j+1] = key'
    ],
    merge: [
      'function mergeSort(A, left, right):',
      '    if left >= right: return',
      '    mid = left + (right - left) / 2',
      '    mergeSort(A, left, mid)',
      '    mergeSort(A, mid + 1, right)',
      '    merge(A, left, mid, right)'
    ],
    quick: [
      'function quickSort(A, low, high):',
      '    if low < high:',
      '        p = partition(A, low, high) // pivot',
      '        quickSort(A, low, p - 1)',
      '        quickSort(A, p + 1, high)'
    ],
    heap: [
      'function heapSort(A):',
      '    for i = n/2 - 1 down to 0: heapify(A, n, i)',
      '    for i = n-1 down to 1:',
      '        swap(A[0], A[i])',
      '        heapify(A, i, 0)'
    ]
  };

  // Generate random array at boot or reset
  useEffect(() => {
    generateRandomArray();
  }, [selectedAlg]);

  // Keep state updated matching the current step index
  useEffect(() => {
    if (steps.length > 0 && currentStepIdx < steps.length) {
      const step = steps[currentStepIdx];
      setArray(step.array);
      setActiveIndices(step.indices);
      setStepState(step.type);
      setComparisons(step.comparisons);
      setSwaps(step.swaps);
    }
  }, [currentStepIdx, steps]);

  // Auto-play steps loop
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          setCurrentStepIdx((prev) => prev + 1);
          setTimeElapsed(Math.round(performance.now() - startTimeRef.current));
        } else {
          setIsPlaying(false);
          setStepState('sorted');
          setActiveIndices([]);
        }
      }, speed);
    } else {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [isPlaying, currentStepIdx, steps, speed]);

  const generateRandomArray = () => {
    setIsPlaying(false);
    setTimeElapsed(0);
    const size = 12;
    const randoms: number[] = [];
    for (let i = 0; i < size; i++) {
      randoms.push(Math.floor(Math.random() * 85) + 15);
    }
    setArray(randoms);
    setRawInput('');
    setComparisons(0);
    setSwaps(0);
    setActiveIndices([]);
    setStepState('idle');
    setSteps([]);
    setCurrentStepIdx(0);
  };

  const handleManualInput = () => {
    const parsed = rawInput
      .split(',')
      .map((x) => parseInt(x.trim()))
      .filter((n) => !isNaN(n) && n > 0 && n <= 100);

    if (parsed.length < 3) {
      alert('Vui lòng nhập ít nhất 3 số nguyên ngăn cách bởi dấu phẩy (Ví dụ: 20, 50, 10, 80, 45)');
      return;
    }

    setIsPlaying(false);
    setTimeElapsed(0);
    setArray(parsed.slice(0, 16)); // Giới hạn tối đa 16 cột để giao diện đẹp
    setComparisons(0);
    setSwaps(0);
    setActiveIndices([]);
    setStepState('idle');
    setSteps([]);
    setCurrentStepIdx(0);
  };

  // Compile full trace sequence for the visualizer
  const generateSortSteps = () => {
    const tempArray = [...array];
    const computedSteps: SortStep[] = [];
    let compCount = 0;
    let swapCount = 0;

    // Initial step setup
    computedSteps.push({
      array: [...tempArray],
      indices: [],
      type: 'idle',
      comparisons: 0,
      swaps: 0,
      activeLine: 0
    });

    if (selectedAlg === 'bubble') {
      const len = tempArray.length;
      for (let i = 0; i < len; i++) {
        let swapped = false;
        for (let j = 0; j < len - i - 1; j++) {
          compCount++;
          // Compare step
          computedSteps.push({
            array: [...tempArray],
            indices: [j, j + 1],
            type: 'compare',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 3
          });

          if (tempArray[j] > tempArray[j + 1]) {
            // Swap step
            const temp = tempArray[j];
            tempArray[j] = tempArray[j + 1];
            tempArray[j + 1] = temp;
            swapCount++;
            swapped = true;

            computedSteps.push({
              array: [...tempArray],
              indices: [j, j + 1],
              type: 'swap',
              comparisons: compCount,
              swaps: swapCount,
              activeLine: 4
            });
          }
        }
        if (!swapped) {
          computedSteps.push({
            array: [...tempArray],
            indices: [],
            type: 'idle',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 5
          });
          break;
        }
      }
    } else if (selectedAlg === 'selection') {
      const len = tempArray.length;
      for (let i = 0; i < len - 1; i++) {
        let minIdx = i;
        computedSteps.push({
          array: [...tempArray],
          indices: [i],
          type: 'idle',
          comparisons: compCount,
          swaps: swapCount,
          activeLine: 2
        });

        for (let j = i + 1; j < len; j++) {
          compCount++;
          computedSteps.push({
            array: [...tempArray],
            indices: [j, minIdx],
            type: 'compare',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 3
          });

          if (tempArray[j] < tempArray[minIdx]) {
            minIdx = j;
            computedSteps.push({
              array: [...tempArray],
              indices: [minIdx],
              type: 'idle',
              comparisons: compCount,
              swaps: swapCount,
              activeLine: 4
            });
          }
        }

        if (minIdx !== i) {
          const temp = tempArray[i];
          tempArray[i] = tempArray[minIdx];
          tempArray[minIdx] = temp;
          swapCount++;
          computedSteps.push({
            array: [...tempArray],
            indices: [i, minIdx],
            type: 'swap',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 5
          });
        }
      }
    } else if (selectedAlg === 'insertion') {
      const len = tempArray.length;
      for (let i = 1; i < len; i++) {
        const key = tempArray[i];
        let j = i - 1;
        computedSteps.push({
          array: [...tempArray],
          indices: [i],
          type: 'idle',
          comparisons: compCount,
          swaps: swapCount,
          activeLine: 2
        });

        while (j >= 0) {
          compCount++;
          computedSteps.push({
            array: [...tempArray],
            indices: [j, j + 1],
            type: 'compare',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 3
          });

          if (tempArray[j] > key) {
            tempArray[j + 1] = tempArray[j];
            swapCount++;
            computedSteps.push({
              array: [...tempArray],
              indices: [j, j + 1],
              type: 'swap',
              comparisons: compCount,
              swaps: swapCount,
              activeLine: 4
            });
            j--;
          } else {
            break;
          }
        }
        tempArray[j + 1] = key;
        computedSteps.push({
          array: [...tempArray],
          indices: [j + 1],
          type: 'idle',
          comparisons: compCount,
          swaps: swapCount,
          activeLine: 5
        });
      }
    } else if (selectedAlg === 'quick') {
      // Trace-logic for Quicksort
      const traceQuickSort = (arr: number[], low: number, high: number) => {
        if (low < high) {
          const pi = partition(arr, low, high);
          traceQuickSort(arr, low, pi - 1);
          traceQuickSort(arr, pi + 1, high);
        }
      };

      const partition = (arr: number[], low: number, high: number) => {
        const pivot = arr[high];
        computedSteps.push({
          array: [...arr],
          indices: [high],
          type: 'pivot',
          comparisons: compCount,
          swaps: swapCount,
          activeLine: 2
        });

        let i = low - 1;
        for (let j = low; j < high; j++) {
          compCount++;
          computedSteps.push({
            array: [...arr],
            indices: [j, high],
            type: 'compare',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 2
          });

          if (arr[j] < pivot) {
            i++;
            const t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
            swapCount++;
            computedSteps.push({
              array: [...arr],
              indices: [i, j],
              type: 'swap',
              comparisons: compCount,
              swaps: swapCount,
              activeLine: 2
            });
          }
        }
        const t = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = t;
        swapCount++;
        computedSteps.push({
          array: [...arr],
          indices: [i + 1, high],
          type: 'swap',
          comparisons: compCount,
          swaps: swapCount,
          activeLine: 2
        });
        return i + 1;
      };

      traceQuickSort(tempArray, 0, tempArray.length - 1);
    } else if (selectedAlg === 'merge') {
      // Trace-logic for Merge Sort
      const traceMergeSort = (arr: number[], l: number, r: number) => {
        if (l < r) {
          const m = Math.floor(l + (r - l) / 2);
          traceMergeSort(arr, l, m);
          traceMergeSort(arr, m + 1, r);
          merge(arr, l, m, r);
        }
      };

      const merge = (arr: number[], l: number, m: number, r: number) => {
        const n1 = m - l + 1;
        const n2 = r - m;
        const L = arr.slice(l, m + 1);
        const R = arr.slice(m + 1, r + 1);

        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
          compCount++;
          computedSteps.push({
            array: [...arr],
            indices: [l + i, m + 1 + j],
            type: 'compare',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 5
          });

          if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
          } else {
            arr[k] = R[j];
            j++;
          }
          swapCount++;
          computedSteps.push({
            array: [...arr],
            indices: [k],
            type: 'swap',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 5
          });
          k++;
        }

        while (i < n1) {
          arr[k] = L[i];
          i++;
          swapCount++;
          computedSteps.push({
            array: [...arr],
            indices: [k],
            type: 'swap',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 5
          });
          k++;
        }

        while (j < n2) {
          arr[k] = R[j];
          j++;
          swapCount++;
          computedSteps.push({
            array: [...arr],
            indices: [k],
            type: 'swap',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 5
          });
          k++;
        }
      };

      traceMergeSort(tempArray, 0, tempArray.length - 1);
    } else {
      // Heap Sort Trace
      const heapify = (arr: number[], n: number, i: number) => {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n) {
          compCount++;
          computedSteps.push({
            array: [...arr],
            indices: [l, largest],
            type: 'compare',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 1
          });
          if (arr[l] > arr[largest]) l;
          largest = l;
        }

        if (r < n) {
          compCount++;
          computedSteps.push({
            array: [...arr],
            indices: [r, largest],
            type: 'compare',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 1
          });
          if (arr[r] > arr[largest]) r;
          largest = r;
        }

        if (largest !== i) {
          const swap = arr[i];
          arr[i] = arr[largest];
          arr[largest] = swap;
          swapCount++;
          computedSteps.push({
            array: [...arr],
            indices: [i, largest],
            type: 'swap',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 1
          });
          heapify(arr, n, largest);
        }
      };

      const hSort = (arr: number[]) => {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
          heapify(arr, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
          const temp = arr[0];
          arr[0] = arr[i];
          arr[i] = temp;
          swapCount++;
          computedSteps.push({
            array: [...arr],
            indices: [0, i],
            type: 'swap',
            comparisons: compCount,
            swaps: swapCount,
            activeLine: 3
          });
          heapify(arr, i, 0);
        }
      };

      hSort(tempArray);
    }

    // final sorted safety step
    computedSteps.push({
      array: [...tempArray],
      indices: [],
      type: 'sorted',
      comparisons: compCount,
      swaps: swapCount,
      activeLine: 0
    });

    return computedSteps;
  };

  const handlePlayPause = () => {
    if (steps.length === 0) {
      const compiled = generateSortSteps();
      setSteps(compiled);
      setCurrentStepIdx(0);
      startTimeRef.current = performance.now();
      setIsPlaying(true);
    } else {
      if (!isPlaying) {
        startTimeRef.current = performance.now() - timeElapsed;
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepForward = () => {
    let currentSteps = steps;
    if (steps.length === 0) {
      currentSteps = generateSortSteps();
      setSteps(currentSteps);
    }
    setIsPlaying(false);
    if (currentStepIdx < currentSteps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    generateRandomArray();
  };

  const activeStepLine = steps[currentStepIdx]?.activeLine ?? 0;
  const activeAlgInfo = sortingConcepts[selectedAlg];

  return (
    <div className="space-y-6">
      {/* Interactive visualizer panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sorting Arena (7 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-850 pb-4">
            <div>
              <h3 className="text-base font-bold font-display text-gray-900 dark:text-zinc-50 uppercase">
                Trực quan hóa Sắp Xếp
              </h3>
              <p className="text-xs text-gray-400 dark:text-zinc-400">
                Hiển thị tiến trình bằng hệ thống cột so sánh và hoán đổi.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {Object.keys(sortingConcepts).map((alg) => (
                <button
                  key={alg}
                  onClick={() => {
                    setSelectedAlg(alg);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    selectedAlg === alg
                      ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-purple-950/20 dark:border-purple-500 dark:text-purple-400'
                      : 'border-transparent hover:bg-gray-50 dark:hover:bg-zinc-805 text-gray-700 dark:text-zinc-300'
                  }`}
                >
                  {sortingConcepts[alg]?.title.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Graphical Bars Canvas */}
          <div className="h-64 bg-gray-50 dark:bg-zinc-950/60 rounded-2xl border border-gray-100 dark:border-zinc-850/60 flex items-end justify-center p-6 gap-2 select-none">
            {array.map((value, idx) => {
              const isActive = activeIndices.includes(idx);
              let barColor = 'bg-blue-500 dark:bg-purple-600'; // Default stable

              if (stepState === 'compare' && isActive) {
                barColor = 'bg-red-500 scale-103 shadow-md border-red-400'; // Comparison = Red
              } else if (stepState === 'swap' && isActive) {
                barColor = 'bg-orange-500 scale-105 shadow-md border-orange-400 animate-pulse'; // Swap = Orange
              } else if (stepState === 'pivot' && isActive) {
                barColor = 'bg-indigo-650'; // Pivot element color
              } else if (stepState === 'sorted') {
                barColor = 'bg-emerald-500'; // Complete = Green
              }

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  {/* Digital value indicator */}
                  <span className={`text-[10px] font-bold font-mono ${isActive ? 'text-orange-550 dark:text-orange-400' : 'text-gray-450 dark:text-zinc-500'}`}>
                    {value}
                  </span>
                  
                  {/* Physical bar column */}
                  <div
                    style={{ height: `${Math.max(12, value)}%` }}
                    className={`w-full rounded-t-lg transition-transform duration-100 ${barColor}`}
                  />
                  
                  {/* Position label under the column */}
                  <span className="text-[9px] text-gray-400 dark:text-zinc-600 font-mono mt-1">
                    {idx}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Live telemetry counters */}
          <div className="grid grid-cols-3 gap-4 text-center font-mono text-xs font-semibold p-4 rounded-xl bg-gray-50 dark:bg-zinc-850/60 border border-gray-100 dark:border-zinc-800">
            <div>
              <span className="text-gray-400 dark:text-zinc-550 block text-[10px]">SO SÁNH (COMP)</span>
              <span className="text-sm font-extrabold text-blue-500 dark:text-purple-400 mt-1 block">
                {comparisons}
              </span>
            </div>
            <div className="border-x border-gray-150 dark:border-zinc-800">
              <span className="text-gray-400 dark:text-zinc-550 block text-[10px]">HOÁN ĐỔI (SWAPS)</span>
              <span className="text-sm font-extrabold text-orange-550 mt-1 block">
                {swaps}
              </span>
            </div>
            <div>
              <span className="text-gray-400 dark:text-zinc-550 block text-[10px]">THỜI GIAN THỰC THI</span>
              <span className="text-sm font-extrabold text-gray-700 dark:text-zinc-200 mt-1 block">
                {timeElapsed} ms
              </span>
            </div>
          </div>

          {/* Action controller deck */}
          <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-850 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-1.5">
                <button
                  id="sort-play-pause-btn"
                  onClick={handlePlayPause}
                  className="p-3 bg-blue-600 dark:bg-purple-650 hover:bg-blue-700 dark:hover:bg-purple-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
                  title={isPlaying ? 'Tạm dừng mô phỏng' : 'Bắt đầu Sắp xếp'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>
                <button
                  id="sort-step-forward-btn"
                  onClick={handleStepForward}
                  disabled={isPlaying}
                  className="p-3 bg-gray-150 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-705 disabled:opacity-50 text-gray-800 dark:text-zinc-100 rounded-xl transition-all cursor-pointer"
                  title="Đi tới bước tiếp theo"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                <button
                  id="sort-reset-btn"
                  onClick={handleReset}
                  className="p-3 bg-gray-150 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-705 text-gray-800 dark:text-zinc-100 rounded-xl transition-all cursor-pointer"
                  title="Đặt lại mảng"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Adjust speed slider */}
              <div className="flex-1 min-w-[140px] flex items-center gap-3 font-mono text-xs text-gray-500 dark:text-zinc-400">
                <Sliders className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="shrink-0">Tốc độ:</span>
                <input
                  id="sort-speed-slider"
                  type="range"
                  min={50}
                  max={1200}
                  step={50}
                  value={1250 - speed} // Reverse to make higher speed = smaller delay
                  onChange={(e) => setSpeed(1250 - parseInt(e.target.value))}
                  className="w-full accent-blue-600 dark:accent-purple-500 h-1.5 rounded-full cursor-pointer bg-gray-200 dark:bg-zinc-800"
                />
                <span className="shrink-0 w-12 text-right">{1250 - speed}ms</span>
              </div>
            </div>

            {/* Manual item creation array */}
            <div className="flex flex-col md:flex-row gap-3 pt-2 text-xs">
              <div className="flex-1 space-y-1.5">
                <span className="font-bold text-gray-500 dark:text-zinc-400 font-display uppercase text-[10px]">
                  Nhập danh sách mảng thủ công (Tách bởi dâu phẩy):
                </span>
                <div className="flex gap-2">
                  <input
                    id="sort-manual-input"
                    type="text"
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    placeholder="Ví dụ: 22, 67, 10, 89, 5"
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    id="sort-apply-input-btn"
                    onClick={handleManualInput}
                    className="px-4 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-705 text-gray-700 dark:text-zinc-200 font-bold border border-gray-200 dark:border-zinc-750/30 rounded-xl transition-colors shrink-0"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
              <button
                id="sort-random-array-btn"
                onClick={generateRandomArray}
                className="mt-5 px-4 py-2.5 bg-blue-500/10 dark:bg-purple-500/10 hover:bg-blue-500/15 dark:hover:bg-purple-500/15 text-blue-600 dark:text-purple-400 border border-blue-500/20 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                Tạo mảng ngẫu nhiên
              </button>
            </div>
          </div>
        </div>

        {/* Live Pseudocode Line Spotlight (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-5">
          <h3 className="text-sm font-bold font-display text-gray-900 dark:text-zinc-50 uppercase tracking-tight flex items-center gap-2">
            <Code2 className="w-4.5 h-4.5 text-blue-500" />
            Spotlight Mã giả thuật toán
          </h3>

          <div className="p-3.5 rounded-xl bg-gray-900 border border-gray-950 font-mono text-[11px] leading-relaxed select-none overflow-x-auto">
            {pseudocodeLines[selectedAlg as keyof typeof pseudocodeLines]?.map((line, idx) => {
              const isTargetLine = idx === activeStepLine;
              return (
                <div
                  key={idx}
                  className={`px-2.5 py-1 rounded transition-colors duration-100 ${
                    isTargetLine
                      ? 'bg-amber-500/20 text-amber-300 border-l-2 border-amber-500 font-bold'
                      : 'text-zinc-450'
                  }`}
                >
                  <span className="inline-block w-4 text-right text-zinc-600 mr-3 text-[10px] select-none">
                    {idx + 1}
                  </span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-gray-400 dark:text-zinc-500 font-sans p-3 rounded-lg bg-gray-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 leading-normal">
            ⭐ <strong>Dòng tô sáng màu cam</strong> hiển thị câu lệnh đang được thực thi ẩn trong hệ thống.
          </div>
        </div>
      </div>

      {/* Academic Explainer Table Footer */}
      {activeAlgInfo && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-display text-gray-900 dark:text-zinc-50">
              Nguyên lý hoạt động {activeAlgInfo.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-sans leading-relaxed">
              {activeAlgInfo.definition}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans pt-1">
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                  ✓ Ưu điểm:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-zinc-300">
                  {activeAlgInfo.advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                <span className="font-bold text-orange-650 dark:text-orange-400 block mb-1">
                  ✗ Nhược điểm:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-zinc-300">
                  {activeAlgInfo.disadvantages.map((dis, i) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold font-display text-gray-900 dark:text-zinc-50">
              Bảng Đánh Giá Độ Phức Tạp
            </h4>
            <div className="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden font-sans text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-zinc-850 text-gray-800 dark:text-zinc-250 border-b border-gray-100 dark:border-zinc-800 font-bold">
                    <th className="p-3">Trường hợp (Case)</th>
                    <th className="p-3">Độ phức tạp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 text-gray-650 dark:text-zinc-350">
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 dark:text-zinc-300">Tốt nhất (Best Case)</td>
                    <td className="p-3 font-mono">{activeAlgInfo.complexity.timeBest}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 dark:text-zinc-300">Trung bình (Average Case)</td>
                    <td className="p-3 font-mono">{activeAlgInfo.complexity.timeAverage}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 dark:text-zinc-300">Tồi nhất (Worst Case)</td>
                    <td className="p-3 font-mono">{activeAlgInfo.complexity.timeWorst}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 dark:text-zinc-300">Không gian bộ nhớ phụ</td>
                    <td className="p-3 font-mono">{activeAlgInfo.complexity.space}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-1.5 leading-relaxed pt-2.5">
              <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 block font-display">
                Ứng dụng thực tế chủ chốt:
              </span>
              <ul className="list-disc pl-5 text-xs text-gray-500 dark:text-zinc-400 space-y-1 font-sans">
                {activeAlgInfo.applications.map((app, i) => (
                  <li key={i}>{app}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
