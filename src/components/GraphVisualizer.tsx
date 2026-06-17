import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Plus, Trash2, Info, RefreshCw } from 'lucide-react';

interface NodeCoord {
  id: string;
  label: string;
  x: number;
  y: number;
  state: 'idle' | 'checking' | 'visited';
  visitOrder?: number;
}

interface Edge {
  id: string;
  from: string;
  to: string;
}

export default function GraphVisualizer() {
  const [nodes, setNodes] = useState<NodeCoord[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [newNodeLabel, setNewNodeLabel] = useState<string>('');
  const [edgeFrom, setEdgeFrom] = useState<string>('');
  const [edgeTo, setEdgeTo] = useState<string>('');
  const [startNode, setStartNode] = useState<string>('A');
  const [selectedAlg, setSelectedAlg] = useState<'bfs' | 'dfs'>('bfs');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [consoleLog, setConsoleLog] = useState<string[]>([]);

  useEffect(() => {
    resetGraph();
  }, []);

  const resetGraph = () => {
    setIsRunning(false);
    setConsoleLog(['Đồ thị đã khởi tạo với 5 đỉnh mẫu.']);
    
    // Default 5 Nodes Layout
    const defaultNodes: NodeCoord[] = [
      { id: 'A', label: 'A', x: 220, y: 80, state: 'idle' },
      { id: 'B', label: 'B', x: 100, y: 160, state: 'idle' },
      { id: 'C', label: 'C', x: 340, y: 160, state: 'idle' },
      { id: 'D', label: 'D', x: 160, y: 280, state: 'idle' },
      { id: 'E', label: 'E', x: 280, y: 280, state: 'idle' }
    ];

    const defaultEdges: Edge[] = [
      { id: 'e1', from: 'A', to: 'B' },
      { id: 'e2', from: 'A', to: 'C' },
      { id: 'e3', from: 'B', to: 'D' },
      { id: 'e4', from: 'C', to: 'E' },
      { id: 'e5', from: 'D', to: 'E' }
    ];

    setNodes(defaultNodes);
    setEdges(defaultEdges);
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Thêm Đỉnh
  const handleAddNode = () => {
    const label = newNodeLabel.trim().toUpperCase();
    if (!label) return;
    if (nodes.some(n => n.label === label)) {
      setConsoleLog(prev => [...prev, `⚠️ Đỉnh ${label} đã tồn tại!`]);
      return;
    }

    const x = Math.floor(Math.random() * 320) + 60;
    const y = Math.floor(Math.random() * 180) + 60;
    const newNode: NodeCoord = { id: label, label, x, y, state: 'idle' };
    setNodes([...nodes, newNode]);
    setConsoleLog(prev => [...prev, `➕ Thêm Đỉnh ${label} thành công.`]);
    setNewNodeLabel('');
  };

  // Thêm Cạnh
  const handleAddEdge = () => {
    if (!edgeFrom || !edgeTo) return;
    if (edgeFrom === edgeTo) {
      setConsoleLog(prev => [...prev, `⚠️ Không thể nối đỉnh với chính nó!`]);
      return;
    }

    const id = `e-${edgeFrom}-${edgeTo}`;
    // Kiểm tra trùng
    const exists = edges.some(e => 
      (e.from === edgeFrom && e.to === edgeTo) || 
      (e.from === edgeTo && e.to === edgeFrom)
    );

    if (exists) {
      setConsoleLog(prev => [...prev, `⚠️ Cạnh kết nối đã tồn tại!`]);
      return;
    }

    setEdges([...edges, { id, from: edgeFrom, to: edgeTo }]);
    setConsoleLog(prev => [...prev, `➕ Thêm Cạnh kết nối [${edgeFrom} ➔ ${edgeTo}] thành công.`]);
    setEdgeFrom('');
    setEdgeTo('');
  };

  // Xóa Cạnh
  const handleDeleteEdge = () => {
    if (!edgeFrom || !edgeTo) return;
    const filtered = edges.filter(e => 
      !( (e.from === edgeFrom && e.to === edgeTo) || (e.from === edgeTo && e.to === edgeFrom) )
    );
    if (filtered.length === edges.length) {
      setConsoleLog(prev => [...prev, `⚠️ Không tìm thấy cạnh [${edgeFrom} - ${edgeTo}] để xóa.`]);
      return;
    }
    setEdges(filtered);
    setConsoleLog(prev => [...prev, `➖ Đã xóa cạnh kết nối giữa [${edgeFrom} - ${edgeTo}].`]);
    setEdgeFrom('');
    setEdgeTo('');
  };

  // BFS / DFS Traversal logic generator
  const runTraversal = async () => {
    if (isRunning) return;
    setIsRunning(true);
    
    // Clear state
    setNodes(prev => prev.map(n => ({ ...n, state: 'idle', visitOrder: undefined })));
    setConsoleLog([`Bắt đầu giải thuật duyệt ${selectedAlg.toUpperCase()} từ đỉnh gốc [${startNode}]...`]);
    await delay(600);

    // Build Adjacency List
    const adj: Record<string, string[]> = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
      if (adj[e.from]) adj[e.from].push(e.to);
      if (adj[e.to]) adj[e.to].push(e.from);
    });

    const visited = new Set<string>();
    const order: string[] = [];
    let counter = 1;

    if (selectedAlg === 'bfs') {
      const q: string[] = [startNode];
      visited.add(startNode);
      setConsoleLog(prev => [...prev, `Nạp đỉnh gốc [${startNode}] vào Queue hàng đợi.`]);

      while (q.length > 0) {
        const curr = q.shift()!;
        
        // Mark checking
        setNodes(prev => prev.map(n => n.id === curr ? { ...n, state: 'checking' } : n));
        setConsoleLog(prev => [...prev, `🔍 Lấy ${curr} ra khỏi Queue và duyệt. Đọc các đỉnh kề kề.`]);
        await delay(1000);

        // Mark visited
        order.push(curr);
        setNodes(prev => prev.map(n => n.id === curr ? { ...n, state: 'visited', visitOrder: counter } : n));
        counter++;

        const neighbors = adj[curr] || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            q.push(neighbor);
            setConsoleLog(prev => [...prev, `   ➔ Phát hiện đỉnh kề chưa duyệt: ${neighbor}. Thêm vào cuối Hàng đợi.`]);
            await delay(400);
          }
        }
      }
    } else {
      // DFS Traversal
      const stack: string[] = [startNode];
      setConsoleLog(prev => [...prev, `Nạp đỉnh gốc [${startNode}] vào Stack ngăn xếp.`]);

      while (stack.length > 0) {
        const curr = stack.pop()!;
        
        if (!visited.has(curr)) {
          visited.add(curr);
          
          setNodes(prev => prev.map(n => n.id === curr ? { ...n, state: 'checking' } : n));
          setConsoleLog(prev => [...prev, `🔍 POP ${curr} ra khỏi Stack để duyệt.`]);
          await delay(1000);

          order.push(curr);
          setNodes(prev => prev.map(n => n.id === curr ? { ...n, state: 'visited', visitOrder: counter } : n));
          counter++;

          const neighbors = adj[curr] || [];
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              stack.push(neighbor);
              setConsoleLog(prev => [...prev, `   ➔ Phát hiện đỉnh kề: ${neighbor}. Nạp (Push) vào Stack.`]);
              await delay(400);
            }
          }
        }
      }
    }

    setConsoleLog(prev => [
      ...prev,
      `🎉 Hoàn thành chương trình Duyệt Đồ Thị! Thứ tự các đỉnh thu được: ${order.join(' ➔ ')}.`
    ]);
    setIsRunning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      {/* Control Tools panel (4 cols) */}
      <div className="lg:col-span-4 space-y-5">
        {/* Traversal Controls */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-4">
          <label className="text-sm font-bold font-display text-gray-900 dark:text-zinc-50 block">
            Điều khiển duyệt đồ thị:
          </label>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedAlg('bfs')}
              className={`px-3 py-2.5 rounded-xl text-center text-xs font-semibold border transition-colors ${
                selectedAlg === 'bfs'
                  ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-purple-950/20 dark:border-purple-500 dark:text-purple-400'
                  : 'border-gray-100 dark:border-zinc-800 hover:bg-gray-50 text-gray-700 dark:text-zinc-300'
              }`}
            >
              Duyệt theo chiều rộng (BFS)
            </button>
            <button
              onClick={() => setSelectedAlg('dfs')}
              className={`px-3 py-2.5 rounded-xl text-center text-xs font-semibold border transition-colors ${
                selectedAlg === 'dfs'
                  ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-purple-950/20 dark:border-purple-500 dark:text-purple-400'
                  : 'border-gray-100 dark:border-zinc-800 hover:bg-gray-50 text-gray-700 dark:text-zinc-300'
              }`}
            >
              Duyệt theo chiều sâu (DFS)
            </button>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase block">
              Đỉnh xuất phát:
            </span>
            <select
              id="graph-start-node"
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-800 dark:text-zinc-200 focus:outline-none"
            >
              {nodes.map(n => (
                <option key={n.id} value={n.id}>Đỉnh {n.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              id="graph-run-btn"
              onClick={runTraversal}
              disabled={isRunning || nodes.length === 0}
              className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-45 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/10 cursor-pointer rounded-xl flex-1"
            >
              <Play className="w-4 h-4 fill-white" />
              Chạy Duyệt
            </button>
            <button
              id="graph-reset-btn"
              onClick={resetGraph}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700/30 rounded-xl transition-all text-gray-750 dark:text-zinc-200 cursor-pointer animate-none"
              title="Khởi tạo lại sơ khởi"
            >
              <RefreshCw className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Structures Editors */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm space-y-5">
          <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-50 uppercase tracking-tight font-display border-b border-gray-100 dark:border-zinc-800 pb-2">
            Cấu hình sửa đổi đồ thị
          </h4>

          {/* Append Node */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-gray-500 dark:text-zinc-400 block uppercase text-[10px]">Thêm đỉnh mới:</span>
            <div className="flex gap-2">
              <input
                id="graph-node-label"
                type="text"
                placeholder="Ví dụ: F"
                maxLength={4}
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-800 dark:text-zinc-200 focus:outline-none"
              />
              <button
                id="graph-add-node-btn"
                onClick={handleAddNode}
                className="px-3.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 font-bold rounded-lg transition-colors text-gray-700 dark:text-zinc-200"
              >
                <Plus className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Append Link Edges */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-gray-500 dark:text-zinc-400 block uppercase text-[10px]">Cấu hình đường nối cạnh:</span>
            <div className="grid grid-cols-2 gap-2">
              <select
                id="graph-edge-from"
                value={edgeFrom}
                onChange={(e) => setEdgeFrom(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-700 dark:text-zinc-200 text-xs"
              >
                <option value="">Đỉnh đầu</option>
                {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
              <select
                id="graph-edge-to"
                value={edgeTo}
                onChange={(e) => setEdgeTo(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-700 dark:text-zinc-200 text-xs"
              >
                <option value="">Đỉnh cuối</option>
                {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1.5">
              <button
                id="graph-add-edge-btn"
                onClick={handleAddEdge}
                className="px-3 py-2 bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-100/50 dark:bg-purple-950/15 dark:border-purple-900/50 dark:text-purple-400 rounded-xl font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Nối cạnh
              </button>
              <button
                id="graph-delete-edge-btn"
                onClick={handleDeleteEdge}
                className="px-3 py-2 bg-red-50 border border-red-100 text-red-600 hover:bg-red-100/50 dark:bg-red-950/15 dark:border-red-900/50 dark:text-red-400 rounded-xl font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Cắt cạnh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Canvas and active trace console logs (8 cols) */}
      <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 shadow-sm min-h-[460px] flex flex-col justify-between">
        <h3 className="text-base font-bold font-display text-gray-900 dark:text-zinc-100 uppercase border-b border-gray-100 dark:border-zinc-850 pb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-500 fill-indigo-50" />
          Bản đồ liên kết đồ thị kề
        </h3>

        {/* Node SVG mapping container */}
        <div className="flex-1 min-h-80 bg-gray-50 dark:bg-zinc-950/60 rounded-2xl border border-gray-100 dark:border-zinc-850 relative py-6 flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Draw lines SVG Edges */}
            {edges.map((edge) => {
              const nodeFrom = nodes.find((n) => n.id === edge.from);
              const nodeTo = nodes.find((n) => n.id === edge.to);
              if (!nodeFrom || !nodeTo) return null;

              // Check if both nodes are visited to color connecting edge
              const isVisitedLink = 
                (nodeFrom.state === 'visited' && nodeTo.state === 'visited') ||
                (nodeFrom.state === 'checking' && nodeTo.state === 'visited') ||
                (nodeFrom.state === 'visited' && nodeTo.state === 'checking');

              return (
                <line
                  key={edge.id}
                  x1={nodeFrom.x}
                  y1={nodeFrom.y}
                  x2={nodeTo.x}
                  y2={nodeTo.y}
                  className={`transition-all duration-300 ${
                    isVisitedLink
                      ? 'stroke-emerald-500 stroke-[3]'
                      : 'stroke-gray-300 dark:stroke-zinc-750 stroke-[2]'
                  }`}
                />
              );
            })}
          </svg>

          {/* Topographically Map CSS Circle Nodes */}
          {nodes.map((node) => {
            const isChecking = node.state === 'checking';
            const isVisited = node.state === 'visited';

            let nodeStyle = 'bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 border-gray-300 dark:border-zinc-700/80';
            if (isChecking) {
              nodeStyle = 'bg-orange-500 border-orange-600 text-white shadow-lg glow-active scale-110 duration-70';
            } else if (isVisited) {
              nodeStyle = 'bg-emerald-500 border-emerald-600 text-white';
            }

            return (
              <motion.div
                key={node.id}
                layout
                style={{
                  position: 'absolute',
                  left: node.x - 24, // adjustments to center coordinate
                  top: node.y - 24
                }}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-extrabold text-sm select-none shadow cursor-grab active:cursor-grabbing ${nodeStyle}`}
              >
                <span>{node.label}</span>
                {/* Micro order value badge */}
                {node.visitOrder !== undefined && (
                  <span className="absolute -top-2.5 -right-2 bg-blue-600 dark:bg-purple-650 border border-white text-white text-[9px] font-mono h-5 w-5 rounded-full flex items-center justify-center shadow">
                    {node.visitOrder}
                  </span>
                )}
              </motion.div>
            );
          })}

          {nodes.length === 0 && (
            <span className="text-gray-400 dark:text-zinc-650 italic text-xs">Đồ thị trống. Vui lòng thêm Đỉnh.</span>
          )}
        </div>

        {/* Real-time console logs terminal */}
        <div className="h-28 overflow-y-auto bg-gray-50 dark:bg-zinc-850 rounded-xl border border-gray-150 dark:border-zinc-800 p-4 font-mono text-[11px] leading-relaxed text-gray-700 dark:text-zinc-350 shadow-inner space-y-1.5 mt-4 scrollbar-thin">
          {consoleLog.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
