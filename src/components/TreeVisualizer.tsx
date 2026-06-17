import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Plus, Trash2, Search, Info, RotateCcw } from 'lucide-react';

interface TreeNode {
  value: number;
  x: number;
  y: number;
  left: TreeNode | null;
  right: TreeNode | null;
  state: 'idle' | 'checking' | 'success' | 'new' | 'visited';
}

export default function TreeVisualizer() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchTarget, setSearchTarget] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('Khởi động mô phỏng Cây BST. Nhập số để tương tác!');
  const [inorderArr, setInorderArr] = useState<number[]>([]);
  const [preorderArr, setPreorderArr] = useState<number[]>([]);
  const [postorderArr, setPostorderArr] = useState<number[]>([]);

  const [animatingTraversal, setAnimatingTraversal] = useState<boolean>(false);
  const [activeTraversalType, setActiveTraversalType] = useState<'inorder' | 'preorder' | 'postorder' | null>(null);
  const [visitedTraversalList, setVisitedTraversalList] = useState<number[]>([]);

  const [showInorder, setShowInorder] = useState<boolean>(false);
  const [showPreorder, setShowPreorder] = useState<boolean>(false);
  const [showPostorder, setShowPostorder] = useState<boolean>(false);

  useEffect(() => {
    // Generate simple seed BST
    seedDefaultTree();
  }, []);

  const seedDefaultTree = () => {
    // We can insert seed elements: [50, 30, 70, 20, 40, 60, 80]
    let newRoot: TreeNode | null = null;
    const seeds = [50, 30, 70, 23, 42, 60, 85];
    seeds.forEach(val => {
      newRoot = insertHelper(newRoot, val, 240, 40, 90);
    });
    setRoot(newRoot);
    setStatusMessage('Cây BST mẫu đã được gieo hạt thành công.');
    recalculateDFSTraversals(newRoot);
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Helper inside BST insertion computing coordinates
  const insertHelper = (
    node: TreeNode | null,
    val: number,
    x: number,
    y: number,
    deltaX: number
  ): TreeNode => {
    if (node === null) {
      return { value: val, x, y, left: null, right: null, state: 'new' };
    }
    if (val < node.value) {
      node.left = insertHelper(node.left, val, x - deltaX, y + 60, Math.max(20, deltaX - 25));
    } else if (val > node.value) {
      node.right = insertHelper(node.right, val, x + deltaX, y + 60, Math.max(20, deltaX - 25));
    }
    return node;
  };

  // Recalculate Traversal strings
  const recalculateDFSTraversals = (currentRoot: TreeNode | null) => {
    const inRes: number[] = [];
    const preRes: number[] = [];
    const postRes: number[] = [];

    const traverseIn = (n: TreeNode | null) => {
      if (!n) return;
      traverseIn(n.left);
      inRes.push(n.value);
      traverseIn(n.right);
    };

    const traversePre = (n: TreeNode | null) => {
      if (!n) return;
      preRes.push(n.value);
      traversePre(n.left);
      traversePre(n.right);
    };

    const traversePost = (n: TreeNode | null) => {
      if (!n) return;
      traversePost(n.left);
      traversePost(n.right);
      postRes.push(n.value);
    };

    traverseIn(currentRoot);
    traversePre(currentRoot);
    traversePost(currentRoot);

    setInorderArr(inRes);
    setPreorderArr(preRes);
    setPostorderArr(postRes);
  };

  // Flatten tree structure to draw nodes cleanly
  const flattenTree = (node: TreeNode | null, list: TreeNode[] = []): TreeNode[] => {
    if (!node) return list;
    flatTreeHelper(node, list);
    return list;
  };

  const flatTreeHelper = (node: TreeNode, list: TreeNode[]) => {
    list.push(node);
    if (node.left) flatTreeHelper(node.left, list);
    if (node.right) flatTreeHelper(node.right, list);
  };

  const flattenEdges = (node: TreeNode | null, list: { from: TreeNode; to: TreeNode; id: string }[] = []) => {
    if (!node) return list;
    flatEdgesHelper(node, list);
    return list;
  };

  const flatEdgesHelper = (node: TreeNode, list: { from: TreeNode; to: TreeNode; id: string }[]) => {
    if (node.left) {
      list.push({ from: node, to: node.left, id: `e-${node.value}-${node.left.value}` });
      flatEdgesHelper(node.left, list);
    }
    if (node.right) {
      list.push({ from: node, to: node.right, id: `e-${node.value}-${node.right.value}` });
      flatEdgesHelper(node.right, list);
    }
  };

  const setNodeStates = (node: TreeNode | null, val: number, state: 'idle' | 'checking' | 'success' | 'new' | 'visited') => {
    if (!node) return;
    if (node.value === val) {
      node.state = state;
      return;
    }
    setNodeStates(node.left, val, state);
    setNodeStates(node.right, val, state);
  };

  const clearAllStates = (node: TreeNode | null) => {
    if (!node) return;
    node.state = 'idle';
    clearAllStates(node.left);
    clearAllStates(node.right);
  };

  // Traversal Simulator
  const animateTraversal = async (type: 'inorder' | 'preorder' | 'postorder') => {
    if (!root || animatingTraversal) return;
    setAnimatingTraversal(true);
    setActiveTraversalType(type);
    setVisitedTraversalList([]);
    clearAllStates(root);
    setRoot({ ...root });

    const visitedNodes: number[] = [];
    const steps: TreeNode[] = [];

    const buildInorderSteps = (n: TreeNode | null) => {
      if (!n) return;
      buildInorderSteps(n.left);
      steps.push(n);
      buildInorderSteps(n.right);
    };

    const buildPreorderSteps = (n: TreeNode | null) => {
      if (!n) return;
      steps.push(n);
      buildPreorderSteps(n.left);
      buildPreorderSteps(n.right);
    };

    const buildPostorderSteps = (n: TreeNode | null) => {
      if (!n) return;
      buildPostorderSteps(n.left);
      buildPostorderSteps(n.right);
      steps.push(n);
    };

    if (type === 'inorder') {
      setShowInorder(true);
      setStatusMessage('Bắt đầu duyệt giữa INORDER LNR: Trái (L) -> Gốc (N) -> Phải (R).');
      buildInorderSteps(root);
    } else if (type === 'preorder') {
      setShowPreorder(true);
      setStatusMessage('Bắt đầu duyệt trước PREORDER NLR: Gốc (N) -> Trái (L) -> Phải (R).');
      buildPreorderSteps(root);
    } else if (type === 'postorder') {
      setShowPostorder(true);
      setStatusMessage('Bắt đầu duyệt sau POSTORDER LRN: Trái (L) -> Phải (R) -> Gốc (N).');
      buildPostorderSteps(root);
    }

    for (let i = 0; i < steps.length; i++) {
      const stepNode = steps[i];
      // Highlight current exploring node
      setNodeStates(root, stepNode.value, 'checking');
      setRoot({ ...root });
      setStatusMessage(`Đang thăm nút: ${stepNode.value}`);
      await delay(900);

      // Save visit
      setNodeStates(root, stepNode.value, 'visited');
      visitedNodes.push(stepNode.value);
      setVisitedTraversalList([...visitedNodes]);
      setRoot({ ...root });
      setStatusMessage(`Đã duyệt qua: ${stepNode.value}. Danh sách tích lũy: [ ${visitedNodes.join(' - ')} ]`);
      await delay(700);
    }

    setStatusMessage(`Hoàn tất mô phỏng duyệt cây ${type === 'inorder' ? 'INORDER LNR' : type === 'preorder' ? 'PREORDER NLR' : 'POSTORDER LRN'}!`);
    await delay(3000);
    clearAllStates(root);
    setRoot({ ...root });
    setAnimatingTraversal(false);
    setActiveTraversalType(null);
    setVisitedTraversalList([]);
  };

  // Operation 1: Insert Node with Animation
  const handleInsert = async () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      setStatusMessage('Vui lòng nhập giá trị số nguyên hợp lệ!');
      return;
    }

    setStatusMessage(`Tìm vị trí chèn giá trị ${val}...`);
    clearAllStates(root);

    // Simulated path walkthrough highlight
    let curr = root;
    const path: number[] = [];
    while (curr !== null) {
      path.push(curr.value);
      if (val === curr.value) {
        setStatusMessage(`Trùng lặp: Giá trị ${val} đã tồn tại trong cây!`);
        return;
      }
      if (val < curr.value) curr = curr.left;
      else curr = curr.right;
    }

    // Highlighting search path steps
    for (let pathVal of path) {
      setNodeStates(root, pathVal, 'checking');
      setRoot({ ...root! }); // Trigger react re-render
      setStatusMessage(`Kiểm tra nút: ${pathVal}...`);
      await delay(600);
    }

    const updatedRoot = insertHelper(root, val, 240, 40, 90);
    setRoot({ ...updatedRoot });
    setNodeStates(updatedRoot, val, 'new');
    setStatusMessage(`Thêm thành công ${val} vào cây BST.`);
    recalculateDFSTraversals(updatedRoot);
    setShowInorder(false);
    setShowPreorder(false);
    setShowPostorder(false);
    setInputValue('');

    await delay(1200);
    clearAllStates(updatedRoot);
    setRoot({ ...updatedRoot });
  };

  // Operation 2: Search Node with Animation
  const handleSearch = async () => {
    const val = parseInt(searchTarget);
    if (isNaN(val)) {
      setStatusMessage('Nhập giá trị cần tìm!');
      return;
    }

    setStatusMessage(`Bắt đầu định vị giá trị ${val} trên BST...`);
    clearAllStates(root);

    let curr = root;
    let found = false;
    const path: number[] = [];

    while (curr !== null) {
      path.push(curr.value);
      if (curr.value === val) {
        found = true;
        break;
      }
      if (val < curr.value) curr = curr.left;
      else curr = curr.right;
    }

    // Animate path checks
    for (let i = 0; i < path.length; i++) {
      const isLastNode = i === path.length - 1;
      const pathVal = path[i];

      setNodeStates(root, pathVal, isLastNode && found ? 'success' : 'checking');
      setRoot({ ...root! });
      setStatusMessage(
        isLastNode && found 
          ? `TÌM THẤY! Đã xác định vị trí của nút ${val} trên cây.` 
          : `So sánh: ${val} ${val < pathVal ? '<' : '>'} ${pathVal}. rẽ hướng...`
      );
      await delay(800);
    }

    if (!found) {
      setStatusMessage(`Tìm kiếm kết thúc: Không tồn tại nút ${val} trong cây.`);
    }

    setSearchTarget('');
  };

  // Operation 3: Delete Node Helper Logic
  const deleteHelper = (node: TreeNode | null, val: number): TreeNode | null => {
    if (node === null) return null;

    if (val < node.value) {
      node.left = deleteHelper(node.left, val);
    } else if (val > node.value) {
      node.right = deleteHelper(node.right, val);
    } else {
      // Node found!
      // Case 1: Leaf or single child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Case 2: Node has 2 children
      // Find min on right subtree (successor)
      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }
      // Overwrite value
      node.value = successor.value;
      // Delete successor from right
      node.right = deleteHelper(node.right, successor.value);
    }

    // Dynamic coordinates layout correction helper
    realignCoords(node, node.x, node.y, 90);
    return node;
  };

  // Fix tree coordinates layout after delete
  const realignCoords = (node: TreeNode | null, x: number, y: number, deltaX: number) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    if (node.left) realignCoords(node.left, x - deltaX, y + 60, Math.max(20, deltaX - 25));
    if (node.right) realignCoords(node.right, x + deltaX, y + 60, Math.max(20, deltaX - 25));
  };

  const handleDelete = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      setStatusMessage('Nhập giá trị cần xóa!');
      return;
    }

    if (!root) return;
    
    setStatusMessage(`Đang xóa nút ${val} khỏi BST...`);
    clearAllStates(root);

    const checkRoot = deleteHelper(root, val);
    setRoot(checkRoot ? { ...checkRoot } : null);
    setStatusMessage(`Đã loại bỏ nút ${val} khỏi cây BST thành công.`);
    recalculateDFSTraversals(checkRoot);
    setShowInorder(false);
    setShowPreorder(false);
    setShowPostorder(false);
    setInputValue('');
  };

  const handleReset = () => {
    setRoot(null);
    setInorderArr([]);
    setPreorderArr([]);
    setPostorderArr([]);
    setShowInorder(false);
    setShowPreorder(false);
    setShowPostorder(false);
    setStatusMessage('Đã làm trống rỗng toàn bộ cây BST.');
  };

  const nodeList = flattenTree(root);
  const edgeList = flattenEdges(root);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      {/* Control panel (4 cols) */}
      <div className="lg:col-span-4 space-y-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
          <label className="text-sm font-bold font-display text-gray-900 dark:text-zinc-50 block uppercase tracking-wider">
            Thao tác cây BST
          </label>

          <div className="space-y-3 pt-1">
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-gray-400 dark:text-zinc-550 block uppercase text-[10px]">
                Giá trị (N):
              </span>
              <input
                id="tree-val-input"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ví dụ: 35"
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-800 dark:text-zinc-200 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                id="tree-insert-btn"
                onClick={handleInsert}
                disabled={!inputValue.trim()}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                Insert Node
              </button>
              <button
                id="tree-delete-btn"
                onClick={handleDelete}
                disabled={!inputValue.trim()}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-md"
              >
                <Trash2 className="w-4 h-4" />
                Delete Node
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-gray-100 dark:border-zinc-850">
            <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-550 uppercase block font-display">
              Tìm kiếm nhanh trên cây:
            </span>
            <div className="flex gap-2">
              <input
                id="tree-search-input"
                type="number"
                value={searchTarget}
                onChange={(e) => setSearchTarget(e.target.value)}
                placeholder="Nhập giá trị cần tìm..."
                className="flex-1 px-3 py-2 text-xs bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-800 dark:text-zinc-200 focus:outline-none"
              />
              <button
                id="tree-search-btn"
                onClick={handleSearch}
                className="px-3 bg-blue-50 hover:bg-blue-100 dark:bg-purple-950/20 dark:border-purple-900 border border-blue-100 dark:text-purple-400 text-blue-600 rounded-xl flex items-center justify-center cursor-pointer shadow-sm"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-zinc-850">
            <button
              id="tree-seed-btn"
              onClick={seedDefaultTree}
              className="px-3.5 py-2.5 rounded-xl border border-gray-150 dark:border-zinc-800 text-xs font-bold hover:bg-gray-55 text-gray-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 flex-1"
            >
              <RotateCcw className="w-4 h-4" />
              Gieo cây mẫu
            </button>
            <button
              id="tree-clear-btn"
              onClick={handleReset}
              className="px-3.5 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 dark:bg-red-950/10 text-xs font-bold flex-1"
            >
              Xóa sạch cây
            </button>
          </div>
        </div>

        {/* Tree traversals sequences list */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
          <h4 className="text-xs font-bold text-gray-950 dark:text-zinc-100 uppercase tracking-wider font-display border-b border-gray-100 dark:border-zinc-850 pb-2 flex justify-between items-center">
            <span>Thứ tự duyệt cây BST</span>
          </h4>

          <div className="space-y-3 font-mono text-[10px] leading-relaxed">
            <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-blue-500 dark:text-purple-400 uppercase tracking-wide">
                  INORDER LNR (Duyệt giữa):
                </span>
                <button
                  onClick={() => animateTraversal('inorder')}
                  disabled={animatingTraversal || !root}
                  className="px-2 py-1 text-[9px] bg-blue-100 hover:bg-blue-200 dark:bg-indigo-950 dark:hover:bg-indigo-900 border border-blue-200 dark:border-indigo-800 text-blue-700 dark:text-indigo-300 rounded font-bold cursor-pointer disabled:opacity-45 transition-colors"
                >
                  {animatingTraversal && activeTraversalType === 'inorder' ? 'Đang chạy...' : 'Mô phỏng (LNR)'}
                </button>
              </div>
              <span className="text-gray-700 dark:text-zinc-300 text-[11px] block whitespace-pre-wrap">
                {animatingTraversal && activeTraversalType === 'inorder' ? (
                  <span className="text-[#7c3aed] font-bold">
                    Tiến trình: [ {visitedTraversalList.join(' - ')} ]
                  </span>
                ) : showInorder ? (
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-emerald-500 font-bold">Kết quả:</span> [ {inorderArr.join(' - ')} ]
                  </span>
                ) : (
                  <span className="text-gray-400 italic">Hãy nhấn để chạy mô phỏng</span>
                )}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-amber-600 block uppercase tracking-wide">
                  PREORDER NLR (Duyệt trước):
                </span>
                <button
                  onClick={() => animateTraversal('preorder')}
                  disabled={animatingTraversal || !root}
                  className="px-2 py-1 text-[9px] bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded font-bold cursor-pointer disabled:opacity-45 transition-colors"
                >
                  {animatingTraversal && activeTraversalType === 'preorder' ? 'Đang chạy...' : 'Mô phỏng (NLR)'}
                </button>
              </div>
              <span className="text-gray-700 dark:text-zinc-300 text-[11px] block whitespace-pre-wrap">
                {animatingTraversal && activeTraversalType === 'preorder' ? (
                  <span className="text-[#7c3aed] font-bold">
                    Tiến trình: [ {visitedTraversalList.join(' - ')} ]
                  </span>
                ) : showPreorder ? (
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-emerald-500 font-bold">Kết quả:</span> [ {preorderArr.join(' - ')} ]
                  </span>
                ) : (
                  <span className="text-gray-400 italic">Hãy nhấn để chạy mô phỏng</span>
                )}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-pink-500 block uppercase tracking-wide">
                  POSTORDER LRN (Duyệt sau):
                </span>
                <button
                  onClick={() => animateTraversal('postorder')}
                  disabled={animatingTraversal || !root}
                  className="px-2 py-1 text-[9px] bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/60 dark:hover:bg-pink-900 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 rounded font-bold cursor-pointer disabled:opacity-45 transition-colors"
                >
                  {animatingTraversal && activeTraversalType === 'postorder' ? 'Đang chạy...' : 'Mô phỏng (LRN)'}
                </button>
              </div>
              <span className="text-gray-700 dark:text-zinc-300 text-[11px] block whitespace-pre-wrap">
                {animatingTraversal && activeTraversalType === 'postorder' ? (
                  <span className="text-[#7c3aed] font-bold">
                    Tiến trình: [ {visitedTraversalList.join(' - ')} ]
                  </span>
                ) : showPostorder ? (
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-emerald-500 font-bold">Kết quả:</span> [ {postorderArr.join(' - ')} ]
                  </span>
                ) : (
                  <span className="text-gray-400 italic">Hãy nhấn để chạy mô phỏng</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BST Visual Board (8 cols) */}
      <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm min-h-[460px] flex flex-col justify-between">
        <h3 className="text-base font-bold font-display text-gray-900 dark:text-zinc-100 uppercase border-b border-gray-100 dark:border-zinc-850 pb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-500" />
          Vẽ sơ đồ Cây BST Tự động
        </h3>

        {/* Tree Map canvas drawing */}
        <div className="flex-1 min-h-[340px] bg-gray-50 dark:bg-zinc-950/60 rounded-2xl border border-gray-100 dark:border-zinc-855 relative py-6 flex items-center justify-center overflow-auto mt-4">
          <div className="w-[480px] h-[340px] relative shrink-0">
            {/* Draw parent-child connections SVG lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {edgeList.map((edge) => (
                <line
                  key={edge.id}
                  x1={edge.from.x}
                  y1={edge.from.y}
                  x2={edge.to.x}
                  y2={edge.to.y}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  className="transition-all duration-300 stroke-gray-300 dark:stroke-zinc-750"
                />
              ))}
            </svg>

            {/* Draw Circle Nodes */}
            {nodeList.map((node) => {
              const checking = node.state === 'checking';
              const isNew = node.state === 'new';
              const success = node.state === 'success';
              const visited = node.state === 'visited';

              let nodeClass = 'bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-zinc-100';
              if (checking) {
                nodeClass = 'bg-orange-500 border-orange-600 text-white shadow-md glow-active scale-110';
              } else if (isNew) {
                nodeClass = 'bg-blue-600 border-blue-700 text-white scale-110 animate-bounce';
              } else if (success) {
                nodeClass = 'bg-emerald-500 border-emerald-600 text-white scale-110 shadow-lg';
              } else if (visited) {
                nodeClass = 'bg-[#7c3aed] border-[#6d28d9] text-white scale-110 shadow-md font-bold';
              }

              return (
                <motion.div
                  key={`node-${node.value}`}
                  layout
                  style={{
                    position: 'absolute',
                    left: node.x - 20, // offset
                    top: node.y - 20
                  }}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-xs shadow transition-colors duration-300 cursor-help ${nodeClass}`}
                  title={`Con trái: ${node.left?.value ?? 'null'}, Con phải: ${node.right?.value ?? 'null'}`}
                >
                  {node.value}
                </motion.div>
              );
            })}

            {nodeList.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 italic">
                Cây đang rỗng hoàn chỉnh. Hãy thêm Nút bằng bảng bên trái!
              </div>
            )}
          </div>
        </div>

        {/* Console terminal logs display */}
        <div className="h-14 font-mono text-[11px] text-gray-700 dark:text-zinc-350 p-3 bg-gray-50 dark:bg-zinc-850 rounded-xl border border-gray-150 dark:border-zinc-800 mt-4 flex items-center gap-2 shadow-inner">
          <Info className="w-4.5 h-4.5 text-blue-500 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      </div>
    </div>
  );
}
