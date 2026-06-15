import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Trash2,
  Search,
  RefreshCw,
  Info,
  Clock,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';
import { dataStructuresConcepts } from '../data/concepts';

export default function DataStructures() {
  const [selectedDS, setSelectedDS] = useState<string>('array');
  const [elements, setElements] = useState<{ id: string; value: string; state: 'normal' | 'active' | 'success' | 'new' }[]>([]);
  const [hashTable, setHashTable] = useState<Record<number, string[]>>({});
  const [inputValue, setInputValue] = useState<string>('');
  const [indexValue, setIndexValue] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('Chào mừng bạn đến với mục mô phỏng Cấu trúc dữ liệu!');
  const [searchTarget, setSearchTarget] = useState<string>('');
  const [codeTab, setCodeTab] = useState<'pseudocode' | 'c' | 'cpp' | 'java' | 'javascript'>('pseudocode');

  // Load default layout of elements for each DS
  useEffect(() => {
    resetDSElements();
  }, [selectedDS]);

  const resetDSElements = () => {
    setInputValue('');
    setIndexValue('');
    setSearchTarget('');
    
    if (selectedDS === 'hashtable') {
      const initialTable: Record<number, string[]> = {};
      for (let i = 0; i < 7; i++) {
        initialTable[i] = [];
      }
      // Seed initial data
      initialTable[1] = ['DSA'];
      initialTable[4] = ['Vite', 'React'];
      initialTable[6] = ['Hash'];
      setHashTable(initialTable);
      setStatusMessage('Đã khởi tạo bảng băm với kích thước 7 (Hàm băm: Modulo 7)');
    } else {
      const defaultVals = ['12', '45', '78', '23', '56'];
      setElements(
        defaultVals.map((val, i) => ({
          id: `${selectedDS}-${Date.now()}-${i}`,
          value: val,
          state: 'normal'
        }))
      );
      setStatusMessage(`Đã khởi tạo ${dataStructuresConcepts[selectedDS]?.title}`);
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Thao tác Thêm (Insert)
  const handleInsert = async () => {
    if (!inputValue.trim()) {
      setStatusMessage('Vui lòng nhập giá trị hợp lệ!');
      return;
    }

    if (selectedDS === 'hashtable') {
      const size = 7;
      const num = parseInt(inputValue);
      if (isNaN(num)) {
        setStatusMessage('Với bảng băm mô phỏng, vui lòng chỉ nhập giá trị số nguyên!');
        return;
      }
      const hash = num % size;
      setStatusMessage(`Tính mã băm: ${num} % 7 = ${hash}. Thêm vào giỏ băm số ${hash}.`);
      
      const newTable = { ...hashTable };
      newTable[hash] = [...newTable[hash], inputValue];
      setHashTable(newTable);
      setInputValue('');
      return;
    }

    setStatusMessage(`Đang chèn phần tử: ${inputValue}...`);
    const newId = `${selectedDS}-${Date.now()}`;

    if (selectedDS === 'stack') {
      // Stack insert (Push)
      const newItem = { id: newId, value: inputValue, state: 'new' as const };
      setElements((prev) => [newItem, ...prev]);
      await delay(100);
      setElements((prev) => prev.map(item => item.id === newId ? { ...item, state: 'normal' } : item));
      setStatusMessage(`Đã ĐẨY (Push) giá trị ${inputValue} vào đỉnh Stack.`);
    } else if (selectedDS === 'queue') {
      // Queue insert (Enqueue)
      const newItem = { id: newId, value: inputValue, state: 'new' as const };
      setElements((prev) => [...prev, newItem]);
      await delay(100);
      setElements((prev) => prev.map(item => item.id === newId ? { ...item, state: 'normal' } : item));
      setStatusMessage(`Đã đưa giá trị ${inputValue} vào cuối hàng đợi (Enqueue).`);
    } else {
      // Array, LinkedList
      let idx = parseInt(indexValue);
      if (isNaN(idx) || idx < 0 || idx > elements.length) {
        // Mặc định chèn vào cuối
        const newItem = { id: newId, value: inputValue, state: 'new' as const };
        setElements((prev) => [...prev, newItem]);
        await delay(100);
        setElements((prev) => prev.map(item => item.id === newId ? { ...item, state: 'normal' } : item));
        setStatusMessage(`Đã chèn ${inputValue} vào cuối danh sách.`);
      } else {
        // Chèn vào vị trí chỉ định
        setStatusMessage(`Đang dịch chuyển các phần tử từ chỉ số ${idx} để chèn...`);
        const updated = [...elements];
        // Đánh dấu các phần tử bị dịch chuyển
        for (let i = idx; i < updated.length; i++) {
          updated[i].state = 'active';
        }
        setElements([...updated]);
        await delay(600);

        const newItem = { id: newId, value: inputValue, state: 'new' as const };
        updated.splice(idx, 0, newItem);
        // Trả lại trạng thái bình thường
        setElements(updated.map(item => ({ ...item, state: 'normal' })));
        setStatusMessage(`Đã chèn thành công ${inputValue} vào chỉ mục ${idx}.`);
      }
    }
    setInputValue('');
    setIndexValue('');
  };

  // Thao tác Xóa (Delete)
  const handleDelete = async () => {
    if (selectedDS === 'hashtable') {
      if (!inputValue) {
        setStatusMessage('Vui lòng nhập giá trị cần xóa trong bảng băm!');
        return;
      }
      const num = parseInt(inputValue);
      if (isNaN(num)) return;
      const hash = num % 7;
      if (hashTable[hash] && hashTable[hash].includes(inputValue)) {
        const newTable = { ...hashTable };
        newTable[hash] = newTable[hash].filter(val => val !== inputValue);
        setHashTable(newTable);
        setStatusMessage(`Xóa thành công ${inputValue} tại ô băm ${hash}`);
      } else {
        setStatusMessage(`Không tìm thấy giá trị ${inputValue} trong bảng băm.`);
      }
      setInputValue('');
      return;
    }

    if (elements.length === 0) {
      setStatusMessage('Cấu trúc dữ liệu đang rỗng, không thể xóa!');
      return;
    }

    if (selectedDS === 'stack') {
      // Pop
      const popped = elements[0];
      setStatusMessage(`Đang lấy (Pop) phần tử đỉnh Stack: ${popped.value}...`);
      setElements((prev) => prev.map((item, idx) => idx === 0 ? { ...item, state: 'active' as const } : item));
      await delay(400);
      setElements((prev) => prev.slice(1));
      setStatusMessage(`Đã thực hiện POP phần tử đỉnh Stack với giá trị: ${popped.value}.`);
    } else if (selectedDS === 'queue') {
      // Dequeue
      const dequeued = elements[0];
      setStatusMessage(`Đang lấy (Dequeue) phần tử đầu hàng đợi: ${dequeued.value}...`);
      setElements((prev) => prev.map((item, idx) => idx === 0 ? { ...item, state: 'active' as const } : item));
      await delay(400);
      setElements((prev) => prev.slice(1));
      setStatusMessage(`Đã DEQUEUE phần tử đầu hàng đợi với giá trị: ${dequeued.value}.`);
    } else {
      // Array, LinkedList
      let idx = parseInt(indexValue);
      if (isNaN(idx) || idx < 0 || idx >= elements.length) {
        // Xóa phần tử cuối cùng
        const popped = elements[elements.length - 1];
        setElements((prev) => prev.map((item, i) => i === prev.length - 1 ? { ...item, state: 'active' as const } : item));
        await delay(400);
        setElements((prev) => prev.slice(0, -1));
        setStatusMessage(`Đã xóa phần tử cuối cùng có giá trị: ${popped?.value}.`);
      } else {
        // Xóa vị trí chỉ định
        const targetValue = elements[idx].value;
        const updated = [...elements];
        updated[idx].state = 'active';
        setElements([...updated]);
        setStatusMessage(`Đang loại bỏ phần tử ${targetValue} tại vị trí đại diện ${idx}...`);
        await delay(500);
        updated.splice(idx, 1);
        setElements(updated.map(item => ({ ...item, state: 'normal' })));
        setStatusMessage(`Đã xóa thành công phần tử tại chỉ mục ${idx}.`);
      }
    }
    setIndexValue('');
  };

  // Thao tác Tìm kiếm (Search)
  const handleSearch = async () => {
    if (!searchTarget.trim()) {
      setStatusMessage('Vui lòng điền giá trị muốn tìm!');
      return;
    }

    if (selectedDS === 'hashtable') {
      const num = parseInt(searchTarget);
      if (isNaN(num)) return;
      const hash = num % 7;
      setStatusMessage(`Ước tính mã băm: ${num} % 7 = ${hash}. Kiểm tra trong giỏ băm thứ ${hash}...`);
      await delay(600);
      if (hashTable[hash] && hashTable[hash].includes(searchTarget)) {
        setStatusMessage(`TÌM THẤY! Đã phát hiện giá trị ${searchTarget} tại giỏ băm số ${hash} trong thời gian O(1).`);
      } else {
        setStatusMessage(`Không tìm thấy giá trị ${searchTarget} trong bảng băm.`);
      }
      return;
    }

    setStatusMessage(`Bắt đầu duyệt tuần tự tìm kiếm giá trị: ${searchTarget}...`);
    let found = false;
    const tempElements = [...elements];

    for (let i = 0; i < tempElements.length; i++) {
      // Đổi trạng thái hiển thị
      setElements(prev => prev.map((item, idx) => idx === i ? { ...item, state: 'active' as const } : item));
      setStatusMessage(`Kiểm tra phần tử vị trí ${i}: ${tempElements[i].value} === ${searchTarget}?`);
      await delay(550);

      if (tempElements[i].value === searchTarget) {
        setElements(prev => prev.map((item, idx) => idx === i ? { ...item, state: 'success' as const } : item));
        setStatusMessage(`TÌM THẤY! Đã định vị được ${searchTarget} tại chỉ mục ${i}.`);
        found = true;
        break;
      } else {
        setElements(prev => prev.map((item, idx) => idx === i ? { ...item, state: 'normal' as const } : item));
      }
    }

    if (!found) {
      setStatusMessage(`Tìm kiếm kết thúc: Không tìm thấy giá trị ${searchTarget} trong danh sách.`);
    }
    setSearchTarget('');
  };

  // Thao tác Cập nhật (Update)
  const handleUpdate = async () => {
    let idx = parseInt(indexValue);
    if (isNaN(idx) || idx < 0 || idx >= elements.length) {
      setStatusMessage('Chỉ mục (index) cập nhật không chính xác!');
      return;
    }
    if (!inputValue.trim()) {
      setStatusMessage('Vui lòng điền giá trị cập nhật!');
      return;
    }

    setStatusMessage(`Cập nhật phần tử chỉ mục ${idx}: Đổi ${elements[idx].value} thàng ${inputValue}...`);
    setElements(prev => prev.map((item, i) => i === idx ? { ...item, state: 'active' as const } : item));
    await delay(500);

    setElements(prev => prev.map((item, i) => i === idx ? { ...item, value: inputValue, state: 'success' as const } : item));
    await delay(500);
    setElements(prev => prev.map(item => ({ ...item, state: 'normal' })));
    setStatusMessage(`Đã cập nhật thành công phần tử chỉ mục ${idx} thành: ${inputValue}.`);
    
    setInputValue('');
    setIndexValue('');
  };

  const activeConcept = dataStructuresConcepts[selectedDS];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* DS Selector & Details Header (4 cols) */}
      <div className="xl:col-span-4 space-y-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
          <label className="text-sm font-bold font-display text-gray-900 dark:text-zinc-50 block">
            Chọn cấu trúc dữ liệu:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(dataStructuresConcepts).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedDS(key)}
                className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold border transition-all duration-200 ${
                  selectedDS === key
                    ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-purple-950/20 dark:border-purple-500 dark:text-purple-400'
                    : 'border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/60 text-gray-700 dark:text-zinc-300'
                }`}
              >
                {dataStructuresConcepts[key]?.title.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Academic Details Card */}
        {activeConcept && (
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-zinc-50">
                {activeConcept.title}
              </h3>
              <p className="mt-2 text-xs text-gray-500 dark:text-zinc-400 font-sans leading-relaxed">
                {activeConcept.definition}
              </p>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 gap-4 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-900/30">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  Ưu điểm
                </span>
                <ul className="list-disc pl-4.5 space-y-1 text-gray-600 dark:text-zinc-300">
                  {activeConcept.advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100/60 dark:border-orange-900/30">
                <span className="font-bold text-orange-700 dark:text-orange-400 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-4.5 h-4.5" />
                  Nhược điểm
                </span>
                <ul className="list-disc pl-4.5 space-y-1 text-gray-600 dark:text-zinc-300">
                  {activeConcept.disadvantages.map((dis, i) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 block font-display">
                Ứng dụng thực tế:
              </span>
              <ul className="list-disc pl-5 text-xs text-gray-500 dark:text-zinc-400 space-y-1 font-sans">
                {activeConcept.applications.map((app, i) => (
                  <li key={i}>{app}</li>
                ))}
              </ul>
            </div>

            {/* Complexity Cards */}
            <div className="grid grid-cols-2 gap-3.5 text-center font-sans border-t border-gray-100 dark:border-zinc-800 pt-5">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800">
                <Clock className="w-4.5 h-4.5 text-blue-500 mx-auto" />
                <span className="text-[10px] text-gray-400 dark:text-zinc-550 block mt-1 font-semibold uppercase">
                  Time Complexity
                </span>
                <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 mt-0.5 block">
                  {activeConcept.complexity.timeAverage.split(' - ')[0]}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800">
                <HardDrive className="w-4.5 h-4.5 text-purple-500 mx-auto" />
                <span className="text-[10px] text-gray-400 dark:text-zinc-550 block mt-1 font-semibold uppercase">
                  Space Complexity
                </span>
                <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 mt-0.5 block">
                  {activeConcept.complexity.space}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Playgound & Code Implementation (8 cols) */}
      <div className="xl:col-span-8 space-y-6">
        {/* Simulation Output Area */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-850 pb-4">
            <h3 className="text-base font-bold font-display text-gray-900 dark:text-zinc-50 flex items-center gap-2">
              <Play className="w-5 h-5 text-indigo-500 animate-pulse fill-indigo-500" />
              Sân chơi mô phỏng cấu trúc dữ liệu
            </h3>
            <button
              onClick={resetDSElements}
              className="px-3.5 py-1.5 rounded-lg border border-gray-100 dark:border-zinc-800 text-xs font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-gray-700 dark:text-zinc-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Khởi tạo lại
            </button>
          </div>

          {/* Interactive Playground Node Grid */}
          <div className="min-h-48 flex items-center justify-center p-6 bg-gray-50 dark:bg-zinc-950/60 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 overflow-x-auto">
            {selectedDS === 'hashtable' ? (
              /* Hash Table Custom Drawing */
              <div className="w-full max-w-xl space-y-3 font-mono">
                {Object.keys(hashTable).map((bucketIdxStr) => {
                  const bucketIdx = parseInt(bucketIdxStr);
                  const bucketList = hashTable[bucketIdx] || [];
                  return (
                    <div key={bucketIdx} className="flex items-center gap-3">
                      {/* Bucket Label */}
                      <div className="w-16 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-extrabold border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                        Index {bucketIdx}
                      </div>
                      
                      {/* Bucket Link List of Values */}
                      <div className="flex flex-wrap items-center gap-2 flex-1 p-1 bg-white dark:bg-zinc-900/40 rounded-xl border border-gray-100 dark:border-zinc-800 min-h-12">
                        {bucketList.length === 0 ? (
                          <span className="text-[10px] text-gray-400 dark:text-zinc-650 italic px-3 py-1.5">
                            Rỗng (null)
                          </span>
                        ) : (
                          bucketList.map((val, itemIdx) => (
                            <div key={itemIdx} className="flex items-center">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-400 text-blue-600 dark:bg-purple-500/10 dark:border-purple-500 text-xs font-bold"
                              >
                                {val}
                              </motion.div>
                              {itemIdx < bucketList.length - 1 && (
                                <span className="mx-2 text-gray-400 dark:text-zinc-700">➔</span>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Array, Linked Lists, Stack, Queue Drawing */
              <div className={`flex flex-wrap items-center justify-center gap-3 p-3 ${selectedDS === 'stack' ? 'flex-col-reverse justify-end h-80 min-h-0 py-6' : ''}`}>
                <AnimatePresence mode="popLayout">
                  {elements.map((node, index) => {
                    const isArray = selectedDS === 'array';
                    const isStack = selectedDS === 'stack';
                    const isQueue = selectedDS === 'queue';
                    const isLinked = selectedDS === 'linkedlist' || selectedDS === 'doublylinkedlist';
                    const isDLL = selectedDS === 'doublylinkedlist';

                    // Color based on state
                    let colorClass = 'bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 border-gray-200 dark:border-zinc-750';
                    if (node.state === 'active') {
                      colorClass = 'bg-orange-500 border-orange-600 text-white shadow-md glow-active duration-75 scale-105';
                    } else if (node.state === 'success') {
                      colorClass = 'bg-emerald-500 border-emerald-600 text-white';
                    } else if (node.state === 'new') {
                      colorClass = 'bg-blue-600 border-blue-700 text-white dark:bg-purple-600 dark:border-purple-700 animate-bounce';
                    }

                    return (
                      <motion.div
                        key={node.id}
                        layout
                        initial={{ opacity: 0, scale: 0.6, y: isStack ? -40 : 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: isStack ? -20 : -15 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                        className="flex items-center"
                      >
                        {/* Node layout wrapper based on DS specs */}
                        <div className="flex flex-col items-center">
                          {/* Top Tag or Index indicator */}
                          {(!isStack && !isQueue) && (
                            <span className="text-[10px] text-gray-400 dark:text-zinc-650 font-mono mb-1 font-semibold">
                              [{index}]
                            </span>
                          )}

                          {isStack && index === 0 && (
                            <span className="text-[10px] text-red-500 dark:text-orange-400 font-mono font-black mb-1 animate-pulse uppercase">
                              TOP ➔
                            </span>
                          )}

                          {isQueue && index === 0 && (
                            <span className="text-[10px] text-emerald-500 font-mono font-black mb-1 uppercase">
                              Front (Lấy ra)
                            </span>
                          )}

                          {isQueue && index === elements.length - 1 && index !== 0 && (
                            <span className="text-[10px] text-blue-500 font-mono font-bold mb-1 uppercase">
                              Rear (Nạp vào)
                            </span>
                          )}

                          {/* Primary Data node bubble */}
                          <div
                            id={`node-element-${index}`}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold tracking-tight text-sm font-sans border shadow-sm transition-all duration-300 relative ${colorClass}`}
                          >
                            <span>{node.value}</span>
                          </div>
                        </div>

                        {/* Connection Arrows */}
                        {isLinked && index < elements.length - 1 && (
                          <div className="flex items-center mx-1 select-none">
                            {isDLL && (
                              <span className="text-gray-400 dark:text-zinc-650 font-bold text-lg leading-none -mr-0.5">
                                ◀
                              </span>
                            )}
                            <span className="text-gray-300 dark:text-zinc-700 font-sans tracking-tighter text-lg font-black">
                              ━━▶
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {elements.length === 0 && (
                  <span className="text-gray-400 dark:text-zinc-600 text-sm italic py-8">
                    Cấu trúc dữ liệu hiện tại đang rỗng.
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quick Info Terminal message */}
          <div className="flex items-center gap-2.5 p-3.5 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-gray-100 dark:border-zinc-800 text-xs font-mono text-gray-700 dark:text-zinc-300 leading-normal shadow-inner">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{statusMessage}</span>
          </div>

          {/* Input Panel Controls */}
          <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-850 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Input Value field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase font-display block">
                  Giá trị để thêm/sửa:
                </label>
                <input
                  id="ds-input-val"
                  type="text"
                  maxLength={6}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ví dụ: 99"
                  className="w-full px-3.5 py-2 text-sm bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Index Value field (For Array and Lists) */}
              {selectedDS !== 'stack' && selectedDS !== 'queue' && selectedDS !== 'hashtable' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase font-display block">
                    Vị trí (Index):
                  </label>
                  <input
                    id="ds-input-index"
                    type="number"
                    min={0}
                    max={elements.length}
                    value={indexValue}
                    onChange={(e) => setIndexValue(e.target.value)}
                    placeholder={`0 - ${elements.length}`}
                    className="w-full px-3.5 py-2 text-sm bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              )}

              {/* Input for Search Operation */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase font-display block">
                  Tìm kiếm giá trị:
                </label>
                <div className="flex gap-2">
                  <input
                    id="ds-input-search"
                    type="text"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(e.target.value)}
                    placeholder="Tìm..."
                    className="w-full px-3.5 py-2 text-sm bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <button
                    id="ds-search-btn"
                    onClick={handleSearch}
                    className="px-3.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-705 border border-gray-200 dark:border-zinc-700/50 text-gray-700 dark:text-zinc-200 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* General Operation Action Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-1.5">
              <button
                id="ds-insert-btn"
                onClick={handleInsert}
                disabled={!inputValue.trim()}
                className="px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Thêm phần tử ({selectedDS === 'stack' ? 'Push' : selectedDS === 'queue' ? 'Enqueue' : 'Insert'})
              </button>

              <button
                id="ds-delete-btn"
                onClick={handleDelete}
                className="px-4.5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-red-500/10 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Xóa phần tử ({selectedDS === 'stack' ? 'Pop' : selectedDS === 'queue' ? 'Dequeue' : 'Delete'})
              </button>

              {selectedDS !== 'stack' && selectedDS !== 'queue' && selectedDS !== 'hashtable' && (
                <button
                  id="ds-update-btn"
                  onClick={handleUpdate}
                  disabled={!inputValue.trim() || !indexValue}
                  className="px-4.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-650 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Cập nhật dữ liệu
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Code Snippets Section */}
        {activeConcept && (
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-3">
              <h4 className="text-sm font-bold font-display text-gray-900 dark:text-zinc-100 uppercase tracking-tight">
                Cài đặt mã thuật toán
              </h4>
              <div className="flex gap-1.5 flex-wrap">
                {(['pseudocode', 'c', 'cpp', 'java', 'javascript'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCodeTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all border ${
                      codeTab === tab
                        ? 'border-blue-500 text-blue-500 bg-blue-50 dark:bg-purple-950/20 dark:border-purple-500 dark:text-purple-400'
                        : 'border-transparent text-gray-450 dark:text-zinc-500 hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {tab === 'cpp' ? 'C++' : tab}
                  </button>
                ))}
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900 text-xs font-mono text-gray-700 dark:text-zinc-300 leading-relaxed overflow-x-auto select-text scrollbar-thin">
              <code>{activeConcept.code[codeTab]}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
