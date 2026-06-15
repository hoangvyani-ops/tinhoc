import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, HelpCircle, Layers, ArrowRight, Zap } from 'lucide-react';

interface CallStackFrame {
  id: string;
  funcName: string;
  param: number;
  val: string;
  phase: 'call' | 'return';
}

interface HanoiMove {
  from: string;
  to: string;
  disk: number;
}

export default function RecursionVisualizer() {
  const [selectedRec, setSelectedRec] = useState<'factorial' | 'fibonacci' | 'hanoi'>('factorial');
  const [factorialInput, setFactorialInput] = useState<number>(5);
  const [fibInput, setFibInput] = useState<number>(5);
  const [hanoiInput, setHanoiInput] = useState<number>(3); // 3 disks
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // Factorial States
  const [factorialStack, setFactorialStack] = useState<CallStackFrame[]>([]);
  const [factorialLog, setFactorialLog] = useState<string[]>([]);
  
  // Fibonacci States
  const [fibTreeNodes, setFibTreeNodes] = useState<{ id: string; label: string; state: 'idle' | 'active' | 'done'; value?: number }[]>([]);

  // Hanoi States
  const [hanoiTowers, setHanoiTowers] = useState<Record<string, number[]>>({ A: [], B: [], C: [] });
  const [hanoiMoves, setHanoiMoves] = useState<HanoiMove[]>([]);
  const [currentHanoiStep, setCurrentHanoiStep] = useState<number>(0);
  const [hanoiStatus, setHanoiStatus] = useState<string>('Khởi tạo sân chơi Tháp Hà Nội.');

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    resetVisualizer();
  }, [selectedRec, factorialInput, fibInput, hanoiInput]);

  const resetVisualizer = () => {
    setIsRunning(false);
    setFactorialStack([]);
    setFactorialLog([]);
    
    // Set Hanoi Init Disks
    const initialDisks = Array.from({ length: hanoiInput }, (_, i) => hanoiInput - i); // [3, 2, 1]
    setHanoiTowers({ A: initialDisks, B: [], C: [] });
    setHanoiMoves([]);
    setCurrentHanoiStep(0);
    setHanoiStatus('Đã xếp đĩa vào cột nguồn A. Sẵn sàng di chuyển!');

    // Fibonacci Nodes Init
    initializeFibTree();
  };

  const initializeFibTree = () => {
    // Generate simple tree nodes mapping F(N) calls
    const nodes = [
      { id: '1', label: `F(${fibInput})`, state: 'idle' as const },
      { id: '2', label: `F(${fibInput - 1})`, state: 'idle' as const },
      { id: '3', label: `F(${fibInput - 2})`, state: 'idle' as const },
      { id: '4', label: `F(${fibInput - 2})`, state: 'idle' as const },
      { id: '5', label: `F(${fibInput - 3})`, state: 'idle' as const }
    ];
    setFibTreeNodes(nodes);
  };

  // Run Factorial Simulation (Push/Pop Call Stack Frame)
  const runFactorial = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setFactorialStack([]);
    setFactorialLog(['Khởi động đệ quy tính Giai thừa.']);
    await delay(600);

    const tempStack: CallStackFrame[] = [];
    
    // Phase 1: Calling (Push node)
    for (let i = factorialInput; i >= 1; i--) {
      const frameId = `f-${i}`;
      const newFrame: CallStackFrame = {
        id: frameId,
        funcName: 'factorial',
        param: i,
        val: 'Đang đợi...',
        phase: 'call'
      };
      
      tempStack.unshift(newFrame); // Push to TOP of visual stack
      setFactorialStack([...tempStack]);
      setFactorialLog(prev => [...prev, `👉 Gọi hàm: factorial(${i}) -> Chờ kết quả.`]);
      await delay(900);
    }

    // Base case returned
    setFactorialLog(prev => [...prev, `✓ Đạt Base Case (Điều kiện dừng)! factorial(1) trả về trực tiếp = 1.`]);
    await delay(1000);

    // Phase 2: Unwinding returning values (Pop node)
    let currentProd = 1;
    for (let i = 1; i <= factorialInput; i++) {
      if (i > 1) {
        currentProd *= i;
      }
      
      // Update frame on stack
      setFactorialStack(prev =>
        prev.map(frame =>
          frame.param === i
            ? { ...frame, val: `${currentProd}`, phase: 'return' }
            : frame
        )
      );
      setFactorialLog(prev => [...prev, `◀ Trả về: factorial(${i}) hoàn tất xử lý, trả về = ${currentProd}`]);
      await delay(900);

      // Pop from screen stack
      setFactorialStack(prev => prev.filter(frame => frame.param !== i));
      await delay(300);
    }

    setFactorialLog(prev => [...prev, `🎉 Kết thúc đệ quy hoàn chỉnh! Kết quả ${factorialInput}! = ${currentProd}`]);
    setIsRunning(false);
  };

  // Run Fibonacci Tree Simulation
  const runFibonacci = async () => {
    if (isRunning) return;
    setIsRunning(true);
    initializeFibTree();
    await delay(500);

    // Step-by-step active/inactive nodes on simulated static tree logic
    const sequence = [
      { id: '1', state: 'active' as const },
      { id: '2', state: 'active' as const },
      { id: '4', state: 'active' as const },
      { id: '4', state: 'done' as const, value: 1 },
      { id: '5', state: 'active' as const },
      { id: '5', state: 'done' as const, value: 0 },
      { id: '2', state: 'done' as const, value: 1 },
      { id: '3', state: 'active' as const },
      { id: '3', state: 'done' as const, value: 1 },
      { id: '1', state: 'done' as const, value: 2 },
    ];

    for (let step of sequence) {
      setFibTreeNodes(prev =>
        prev.map(node =>
          node.id === step.id ? { ...node, state: step.state, value: step.value } : node
        )
      );
      await delay(900);
    }
    setIsRunning(false);
  };

  // Run Hanoi Disks Physics
  const runHanoi = async () => {
    if (isRunning) return;
    setIsRunning(true);
    
    // Resolve Tower of Hanoi algorithm to compile disk movements array list
    const moves: HanoiMove[] = [];
    const solveHanoi = (n: number, from: string, to: string, aux: string) => {
      if (n === 1) {
        moves.push({ from, to, disk: 1 });
        return;
      }
      solveHanoi(n - 1, from, aux, to);
      moves.push({ from, to, disk: n });
      solveHanoi(n - 1, aux, to, from);
    };

    solveHanoi(hanoiInput, 'A', 'C', 'B');
    setHanoiMoves(moves);
    setCurrentHanoiStep(0);

    let activeTowers = { ...hanoiTowers };

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      setCurrentHanoiStep(i + 1);
      setHanoiStatus(`Bước ${i + 1}: Di chuyển Đĩa ${move.disk} từ cột [${move.from}] sang cột [${move.to}].`);
      
      // Execute moving
      const sourceTower = [...activeTowers[move.from as keyof typeof activeTowers]];
      const poppedDisk = sourceTower.pop();
      
      if (poppedDisk !== undefined) {
        const destTower = [...activeTowers[move.to as keyof typeof activeTowers], poppedDisk];
        activeTowers = {
          ...activeTowers,
          [move.from]: sourceTower,
          [move.to]: destTower
        };
        setHanoiTowers(activeTowers);
      }
      await delay(1200);
    }

    setHanoiStatus('🎉 HOÀN THÀNH! Đã di chuyển thành công toàn bộ chồng đĩa sang cột mục tiêu C với luật đĩa to luôn nằm dưới đĩa nhỏ.');
    setIsRunning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      {/* Control panel (4 cols) */}
      <div className="lg:col-span-4 space-y-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
          <label className="text-sm font-bold font-display text-gray-900 dark:text-zinc-50 block">
            Chọn mô phỏng Đệ Quy:
          </label>
          <div className="space-y-1.5 col-span-1">
            {(['factorial', 'fibonacci', 'hanoi'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedRec(type)}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                  selectedRec === type
                    ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-purple-950/20 dark:border-purple-500 dark:text-purple-400'
                    : 'border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-805 text-gray-700 dark:text-zinc-300'
                }`}
              >
                {type === 'factorial' ? 'Tính Giai thừa (N!)' : type === 'fibonacci' ? 'Dãy số Fibonacci (Call Tree)' : 'Tháp Hà Nội (Tower of Hanoi)'}
              </button>
            ))}
          </div>
        </div>

        {/* Input variables customization */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-5">
          {selectedRec === 'factorial' && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider block font-mono">
                Số lượng tham số (N):
              </span>
              <div className="flex items-center gap-4">
                <input
                  id="rec-factorial-input"
                  type="range"
                  min={2}
                  max={6}
                  value={factorialInput}
                  disabled={isRunning}
                  onChange={(e) => setFactorialInput(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-bold font-mono text-blue-600 dark:text-purple-450 shrink-0 bg-blue-50/50 dark:bg-purple-950/20 px-3 py-1 rounded-lg">
                  N = {factorialInput}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-zinc-550 leading-normal font-sans">
                💡 Công thức đệ quy: <code className="font-mono text-zinc-650 bg-gray-100 p-0.5 rounded">fact(n) = n * fact(n-1)</code>. Điều kiện dừng: <code className="font-mono text-zinc-650 bg-gray-100 p-0.5 rounded">fact(1) = 1</code>.
              </p>
            </div>
          )}

          {selectedRec === 'fibonacci' && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider block font-mono">
                Chỉ số dãy Fib (N):
              </span>
              <div className="flex items-center gap-4">
                <input
                  id="rec-fib-input"
                  type="range"
                  min={3}
                  max={6}
                  value={fibInput}
                  disabled={isRunning}
                  onChange={(e) => setFibInput(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-bold font-mono text-blue-600 dark:text-purple-450 shrink-0 bg-blue-50/50 dark:bg-purple-950/20 px-3 py-1 rounded-lg">
                  F({fibInput})
                </span>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-zinc-550 leading-normal font-sans">
                💡 Đệ quy Fibonacci phân nhánh kép: <code className="font-mono text-zinc-650 bg-gray-100 p-0.5 rounded">F(n) = F(n-1) + F(n-2)</code>. Cây gọi hàm sinh trưởng cấp lũy thừa.
              </p>
            </div>
          )}

          {selectedRec === 'hanoi' && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider block font-mono">
                Số đĩa xếp tháp:
              </span>
              <div className="flex items-center gap-4">
                <input
                  id="rec-hanoi-input"
                  type="range"
                  min={2}
                  max={4}
                  value={hanoiInput}
                  disabled={isRunning}
                  onChange={(e) => setHanoiInput(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-bold font-mono text-blue-600 dark:text-purple-450 shrink-0 bg-blue-50/50 dark:bg-purple-950/20 px-3 py-1 rounded-lg">
                  {hanoiInput} Đĩa
                </span>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-zinc-550 leading-normal font-sans">
                💡 Sức mạnh đệ quy: Tháp Hà Nội giải quyết trong <code className="font-mono text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-1 rounded font-bold">2^{hanoiInput} - 1 = {Math.pow(2, hanoiInput) - 1} bước</code> tuyệt hảo.
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-zinc-850">
            <button
              id="rec-simulate-btn"
              onClick={selectedRec === 'factorial' ? runFactorial : selectedRec === 'fibonacci' ? runFibonacci : runHanoi}
              disabled={isRunning}
              className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/10 cursor-pointer rounded-xl flex-1"
            >
              <Play className="w-4 h-4 fill-white" />
              Chạy mô phỏng
            </button>
            <button
              id="rec-reset-btn"
              onClick={resetVisualizer}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-705 border border-gray-200 dark:border-zinc-750/30 rounded-xl transition-all text-gray-700 dark:text-zinc-200 cursor-pointer"
              title="Đặt lại trạng thái"
            >
              <RotateCcw className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Visual Canvas Board (8 cols) */}
      <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm min-h-[460px] flex flex-col justify-between">
        <h3 className="text-base font-bold font-display text-gray-900 dark:text-zinc-50 flex items-center gap-2 border-b border-gray-100 dark:border-zinc-855 pb-3">
          <Layers className="w-5 h-5 text-indigo-500 fill-indigo-50" />
          Không gian hiển thị Đệ Quy
        </h3>

        {/* Dynamic Inner views based on selection tab */}
        <div className="flex-1 flex items-center justify-center py-6">
          {selectedRec === 'factorial' && (
            /* Factorial Call Stack Visualization */
            <div className="w-full max-w-md flex flex-col-reverse justify-end gap-2 px-6 h-80 overflow-y-auto border border-dashed border-gray-200 dark:border-zinc-800/80 rounded-2xl bg-gray-50/50 dark:bg-zinc-950/40 p-4">
              <AnimatePresence>
                {factorialStack.map((frame, idx) => (
                  <motion.div
                    key={frame.id}
                    initial={{ opacity: 0, y: -40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className={`p-3.5 rounded-xl border font-mono text-xs flex justify-between items-center shadow-sm ${
                      frame.phase === 'call'
                        ? 'bg-amber-500/10 border-amber-400/50 text-amber-700 dark:text-amber-400'
                        : 'bg-emerald-500/10 border-emerald-400/50 text-emerald-700 dark:text-emerald-400 glow-active'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 animate-pulse shrink-0" />
                      <span>
                        factorial(<strong className="text-sm font-bold">{frame.param}</strong>)
                      </span>
                    </div>
                    <div className="text-[10px] px-2.5 py-1 rounded bg-white dark:bg-zinc-900 border border-inherit border-opacity-40 select-all font-semibold uppercase">
                      Kết quả: {frame.val}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {factorialStack.length === 0 && (
                <div className="text-center text-gray-400 dark:text-zinc-600 italic py-10 font-sans text-xs">
                  Ngăn xếp rỗng. Bấm nút Chạy để nạp Call Stack.
                </div>
              )}
            </div>
          )}

          {selectedRec === 'fibonacci' && (
            /* Recursive Tree representation */
            <div className="w-full flex flex-col items-center gap-6 py-4">
              <div className="grid grid-cols-1 gap-2 text-center text-xs w-full max-w-sm">
                {/* Node Level 0 Root */}
                <div className="flex justify-center">
                  <div className={`p-3.5 rounded-xl border w-24 font-bold font-mono transition-all duration-300 ${
                    fibTreeNodes[0]?.state === 'active' ? 'bg-orange-500 border-orange-500 text-white scale-105' :
                    fibTreeNodes[0]?.state === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 dark:border-zinc-800 text-gray-500'
                  }`}>
                    {fibTreeNodes[0]?.label}
                    {fibTreeNodes[0]?.value !== undefined && <span className="block text-[10px] mt-1 text-slate-100">→ {fibTreeNodes[0]?.value}</span>}
                  </div>
                </div>

                <div className="text-gray-300 dark:text-zinc-880 leading-none h-4 -my-1 select-none">⬇</div>

                {/* Node Level 1 Left and Right branches */}
                <div className="flex justify-around px-8">
                  <div className={`p-3.5 rounded-xl border w-24 font-bold font-mono transition-all duration-300 ${
                    fibTreeNodes[1]?.state === 'active' ? 'bg-orange-500 border-orange-500 text-white scale-105' :
                    fibTreeNodes[1]?.state === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 dark:border-zinc-800 text-gray-500'
                  }`}>
                    {fibTreeNodes[1]?.label}
                    {fibTreeNodes[1]?.value !== undefined && <span className="block text-[10px] mt-1 text-slate-100">→ {fibTreeNodes[1]?.value}</span>}
                  </div>

                  <div className={`p-3.5 rounded-xl border w-24 font-bold font-mono transition-all duration-300 ${
                    fibTreeNodes[3]?.state === 'active' ? 'bg-orange-500 border-orange-500 text-white scale-105' :
                    fibTreeNodes[3]?.state === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 dark:border-zinc-800 text-gray-500'
                  }`}>
                    {fibTreeNodes[3]?.label}
                    {fibTreeNodes[3]?.value !== undefined && <span className="block text-[10px] mt-1 text-slate-100">→ {fibTreeNodes[3]?.value}</span>}
                  </div>
                </div>

                <div className="flex justify-around px-20">
                  <span className="text-gray-300 dark:text-zinc-800 leading-none select-none">⬇</span>
                  <span className="text-gray-300 dark:text-zinc-800 leading-none select-none">⬇</span>
                </div>

                {/* Node Level 2 child calls */}
                <div className="flex justify-around px-4">
                  <div className={`p-3.5 rounded-xl border w-20 font-bold font-mono transition-all duration-300 ${
                    fibTreeNodes[2]?.state === 'active' ? 'bg-orange-500 border-orange-500 text-white scale-105' :
                    fibTreeNodes[2]?.state === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 dark:border-zinc-800 text-gray-400'
                  }`}>
                    {fibTreeNodes[2]?.label}
                  </div>

                  <div className={`p-3.5 rounded-xl border w-20 font-bold font-mono transition-all duration-300 ${
                    fibTreeNodes[4]?.state === 'active' ? 'bg-orange-500 border-orange-500 text-white scale-105' :
                    fibTreeNodes[4]?.state === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 dark:border-zinc-800 text-gray-400'
                  }`}>
                    {fibTreeNodes[4]?.label}
                    {fibTreeNodes[4]?.value !== undefined && <span className="block text-[10px] mt-0.5 text-slate-100">→ {fibTreeNodes[4]?.value}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedRec === 'hanoi' && (
            /* Tower of Hanoi physical rods structure */
            <div className="w-full flex flex-col gap-6 py-4">
              <div className="flex items-end justify-center gap-12 md:gap-24 h-64 relative font-sans p-6 bg-gray-50 dark:bg-zinc-950/60 border border-gray-150 dark:border-zinc-850/60 rounded-2xl max-w-2xl mx-auto">
                {/* 3 Rods: A, B, C */}
                {(['A', 'B', 'C'] as const).map((towerKey) => {
                  const disksList = hanoiTowers[towerKey] || [];
                  return (
                    <div key={towerKey} className="flex-1 flex flex-col items-center h-full relative group">
                      {/* Physical Vertical Rod line */}
                      <span className="w-2.5 bg-gray-300 dark:bg-zinc-800 absolute top-4 bottom-0 rounded-t-full z-10" />

                      {/* Physical Disks array stack aligned bottom */}
                      <div className="w-full flex flex-col-reverse gap-1.5 items-center absolute bottom-0 z-20">
                        {disksList.map((diskVal) => {
                          // Style sizing disk proportionately
                          const widthPct = 30 + diskVal * 15;
                          // Distinct color mapping per disk
                          const diskColors = [
                            'bg-red-500 border-red-650 shadow-red-500/10',
                            'bg-blue-500 border-blue-650 shadow-blue-500/10',
                            'bg-amber-450 border-amber-600 shadow-amber-500/10',
                            'bg-purple-500 border-purple-650 shadow-purple-500/10'
                          ];
                          const diskStyleIdx = (diskVal - 1) % diskColors.length;

                          return (
                            <motion.div
                              key={`disk-${diskVal}`}
                              layoutId={`disk-${diskVal}`}
                              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                              style={{ width: `${widthPct}%` }}
                              className={`h-6 rounded-lg text-white font-black font-mono text-[10px] flex items-center justify-center border shadow-md ${diskColors[diskStyleIdx]}`}
                            >
                              {diskVal}
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Tower label indicator */}
                      <span className="absolute -bottom-8 px-3 py-1 rounded bg-gray-100 dark:bg-zinc-800 text-[11px] font-bold border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-200/50 transition-colors">
                        Cột {towerKey} {towerKey === 'A' ? '(Nguồn)' : towerKey === 'C' ? '(Mục tiêu)' : '(Bổ trợ)'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Live log status text display console */}
        <div className="h-28 overflow-y-auto bg-gray-50 dark:bg-zinc-850 rounded-xl border border-gray-150 dark:border-zinc-800 p-4 font-mono text-[11px] leading-relaxed text-gray-700 dark:text-zinc-350 shadow-inner space-y-1 scrollbar-thin">
          {selectedRec === 'factorial' ? (
            factorialLog.map((log, i) => <div key={i}>{log}</div>)
          ) : (
            <div>{hanoiStatus}</div>
          )}
        </div>
      </div>
    </div>
  );
}
