import { ConceptInfo, QuizQuestion } from '../types';

export const dataStructuresConcepts: Record<string, ConceptInfo> = {
  array: {
    id: 'array',
    title: 'Array (Mảng)',
    definition: 'Mảng là một cấu trúc dữ liệu tuyến tính lưu trữ các phần tử có cùng kiểu dữ liệu tại các vị trí bộ nhớ liên tiếp nhau. Mỗi phần tử có thể được truy cập trực tiếp thông qua chỉ số (index) bắt đầu từ 0.',
    advantages: [
      'Truy cập ngẫu nhiên nhanh chóng bằng chỉ số với độ phức tạp O(1).',
      'Sử dụng bộ nhớ liên tục hiệu quả, tiết kiệm không gian (không tốn thêm con trỏ).'
    ],
    disadvantages: [
      'Kích thước cố định sau khi khởi tạo (đối với mảng tĩnh).',
      'Thao tác thêm hoặc xóa phần tử ở giữa tốn nhiều thời gian (phải di chuyển các phần tử kế tiếp) với độ phức tạp O(N).'
    ],
    applications: [
      'Lưu trữ danh sách tuyến tính đơn giản.',
      'Làm nền tảng để xây dựng các cấu trúc dữ liệu phức tạp hơn như Stack, Queue, Hash Table.',
      'Phù hợp cho các thuật toán cần truy cập ngẫu nhiên thường xuyên.'
    ],
    complexity: {
      timeBest: 'O(1) - Truy cập',
      timeAverage: 'O(N) - Thêm/Xóa/Tìm',
      timeWorst: 'O(N) - Thêm/Xóa/Tìm',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Thêm phần tử x vào cuối mảng A kích thước n
function insertAtEnd(A, n, x):
    if n >= A.capacity:
        return error "Mảng đầy"
    A[n] = x
    return n + 1`,
      c: `void insertAtEnd(int arr[], int *n, int x) {
    arr[*n] = x;
    (*n)++;
}`,
      cpp: `void insertAtEnd(std::vector<int>& arr, int x) {
    arr.push_back(x);
}`,
      java: `public void insertAtEnd(ArrayList<Integer> arr, int x) {
    arr.add(x);
}`,
      javascript: `function insertAtEnd(arr, x) {
    arr.push(x);
}`
    }
  },
  linkedlist: {
    id: 'linkedlist',
    title: 'Linked List (Danh sách liên kết)',
    definition: 'Danh sách liên kết là một cấu trúc dữ liệu tuyến tính trong đó các phần tử (Node) không nằm liên tiếp nhau trong bộ nhớ. Mỗi Node chứa hai phần chính: dữ liệu và một con trỏ (next) trỏ đến phần tử tiếp theo.',
    advantages: [
      'Kích thước động, có thể dễ dàng co giãn khi chạy chương trình.',
      'Thêm hoặc xóa Node mới ở đầu hoặc sau một Node cho trước có độ phức tạp O(1).'
    ],
    disadvantages: [
      'Không hỗ trợ truy cập ngẫu nhiên. Phải duyệt tuần tự từ đầu đến Node cần tìm (độ phức tạp O(N)).',
      'Tốn thêm bộ nhớ để lưu trữ các con trỏ liên kết.'
    ],
    applications: [
      'Quản lý danh bạ, danh sách phát nhạc.',
      'Triển khai các ứng dụng Undo/Redo đơn giản.',
      'Được sử dụng làm cấu trúc nền tảng cho Stack và Queue dạng động.'
    ],
    complexity: {
      timeBest: 'O(1) - Thêm/Xóa ở đầu',
      timeAverage: 'O(N) - Tìm kiếm/Truy cập',
      timeWorst: 'O(N) - Tìm kiếm/Truy cập',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Định nghĩa một Node
class Node:
    data: Value
    next: Node or Null

// Thêm Node mới vào đầu danh sách
function insertAtHead(head, data):
    newNode = new Node(data)
    newNode.next = head
    return newNode`,
      c: `struct Node {
    int data;
    struct Node* next;
};

struct Node* insertAtHead(struct Node* head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = head;
    return newNode;
}`,
      cpp: `struct Node {
    int data;
    Node* next;
};

Node* insertAtHead(Node* head, int val) {
    Node* newNode = new Node{val, head};
    return newNode;
}`,
      java: `class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; }
}

public Node insertAtHead(Node head, int val) {
    Node newNode = new Node(val);
    newNode.next = head;
    return newNode;
}`,
      javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function insertAtHead(head, val) {
    const newNode = new Node(val);
    newNode.next = head;
    return newNode;
}`
    }
  },
  doublylinkedlist: {
    id: 'doublylinkedlist',
    title: 'Doubly Linked List (Danh sách liên kết kép)',
    definition: 'Danh sách liên kết kép tương tự như danh sách liên kết đơn, nhưng mỗi Node sẽ chứa thêm một con trỏ thứ hai (prev) để tham chiếu đến Node đứng trước nó, cho phép duyệt danh sách theo cả hai chiều.',
    advantages: [
      'Có thể duyệt theo cả hai chiều (trước ra sau và sau ra trước).',
      'Thao tác xóa một Node khi đã biết con trỏ trỏ đến Node đó diễn ra rất nhanh O(1) mà không cần tìm Node đứng trước.'
    ],
    disadvantages: [
      'Tốn nhiều bộ nhớ hơn danh sách liên kết đơn do cần thêm con trỏ prev.',
      'Thao tác thêm/xóa phức tạp hơn vì phải cập nhật nhiều liên kết đồng thời.'
    ],
    applications: [
      'Ứng dụng Trình duyệt web (Nút Back và Forward để chuyển hướng giữa các trang).',
      'Ứng dụng biên tập văn bản, danh sách hoàn tác.',
      'Triển khai thuật toán thay thế trang/cache LRU (Least Recently Used).'
    ],
    complexity: {
      timeBest: 'O(1) - Thêm/Xóa khi biết Node',
      timeAverage: 'O(N) - Tìm kiếm/Truy cập',
      timeWorst: 'O(N) - Tìm kiếm/Truy cập',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Định nghĩa Node kép
class DoublyNode:
    data: Value
    prev: DoublyNode
    next: DoublyNode

// Chen node moi vao sau node hien tai
function insertAfter(node, data):
    newNode = new DoublyNode(data)
    newNode.next = node.next
    newNode.prev = node
    if node.next != null:
        node.next.prev = newNode
    node.next = newNode`,
      c: `struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};`,
      cpp: `struct Node {
    int data;
    Node* prev;
    Node* next;
};`,
      java: `class Node {
    int data;
    Node prev, next;
    Node(int d) { data = d; }
}`,
      javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}`
    }
  },
  stack: {
    id: 'stack',
    title: 'Stack (Ngăn xếp)',
    definition: 'Stack là một cấu trúc dữ liệu tuyến tính hoạt động theo nguyên lý LIFO (Last In, First Out - Vào sau, Ra trước). Phần tử nào được thêm vào cuối cùng sẽ là phần tử đầu tiên được lấy ra khỏi ngăn xếp.',
    advantages: [
      'Thao tác đơn giản, có kiểm soát chặt chẽ.',
      'Các thao tác đẩy vào (push) và lấy ra (pop) cực kỳ nhanh chóng O(1) và độc lập với số lượng phần tử.'
    ],
    disadvantages: [
      'Không hỗ trợ truy cập ngẫu nhiên. Muốn lấy phần tử ở đáy phải lấy toàn bộ các phần tử ở trên ra ngoài.',
      'Dễ bị lỗi tràn bộ nhớ (Stack Overflow) nếu cấp phát tĩnh và không kiểm soát số lượng phần tử.'
    ],
    applications: [
      'Quản lý lời gọi hàm (Call Stack) trong trình biên dịch.',
      'Xử lý biểu thức toán học (Infix to Postfix, tính giá trị biểu thức).',
      'Thuật toán duyệt theo chiều sâu (DFS) trên đồ thị.',
      'Chức năng Undo/Redo trong các phần mềm chỉnh sửa.'
    ],
    complexity: {
      timeBest: 'O(1) - Thao tác Push/Pop/Peek',
      timeAverage: 'O(1) - Thao tác Push/Pop/Peek',
      timeWorst: 'O(1) - Thao tác Push/Pop/Peek',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Triển khai Stack bằng mảng
class Stack:
    top = -1
    items = []

    function push(item):
        top = top + 1
        items[top] = item

    function pop():
        if top < 0: return error "Stack rỗng"
        item = items[top]
        top = top - 1
        return item`,
      c: `void push(int stack[], int *top, int value) {
    stack[++(*top)] = value;
}
int pop(int stack[], int *top) {
    return stack[(*top)--];
}`,
      cpp: `std::stack<int> s;
s.push(10);
int val = s.top();
s.pop();`,
      java: `Stack<Integer> stack = new Stack<>();
stack.push(10);
int val = stack.pop();`,
      javascript: `const stack = [];
stack.push(10);
const val = stack.pop();`
    }
  },
  queue: {
    id: 'queue',
    title: 'Queue (Hàng đợi)',
    definition: 'Queue là một cấu trúc dữ liệu hoạt động theo nguyên lý FIFO (First In, First Out - Vào trước, Ra trước). Phần tử nào được thêm vào đầu tiên sẽ là phần tử đầu tiên được đưa ra khỏi hàng đợi.',
    advantages: [
      'Quản lý dữ liệu tuần tự công bằng và có trật tự.',
      'Thao tác thêm ở cuối (enqueue) và xóa ở đầu (dequeue) có độ phức tạp O(1).'
    ],
    disadvantages: [
      'Không hỗ trợ truy cập ngẫu nhiên dữ liệu ở giữa hàng đợi.',
      'Nếu triển khai bằng mảng tĩnh thông thường, việc dịch chuyển phần tử sau khi dequeue có thể tốn O(N) trừ khi sử dụng Hàng đợi vòng (Circular Queue).'
    ],
    applications: [
      'Quản lý hàng đợi in ấn, xử lý gói tin trong mạng truyền thông.',
      'Thuật toán lập lịch tiến trình của hệ điều hành (FIFO, Round Robin).',
      'Thuật toán duyệt theo chiều rộng (BFS) trên đồ thị.'
    ],
    complexity: {
      timeBest: 'O(1) - Enqueue/Dequeue',
      timeAverage: 'O(1) - Enqueue/Dequeue',
      timeWorst: 'O(1) - Enqueue/Dequeue',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Thêm phần tử x vào hàng đợi Q
function enqueue(Q, x):
    Q.rear = Q.rear + 1
    Q.items[Q.rear] = x

// Lấy phần tử ra khỏi hàng đợi Q
function dequeue(Q):
    if Q.front > Q.rear:
        return error "Hàng đợi rỗng"
    val = Q.items[Q.front]
    Q.front = Q.front + 1
    return val`,
      c: `void enqueue(int queue[], int *rear, int x) {
    queue[++(*rear)] = x;
}
int dequeue(int queue[], int *front) {
    return queue[(*front)++];
}`,
      cpp: `std::queue<int> q;
q.push(10); // enqueue
int top = q.front();
q.pop();  // dequeue`,
      java: `Queue<Integer> q = new LinkedList<>();
q.add(10);
int val = q.poll();`,
      javascript: `const queue = [];
queue.push(10); // enqueue
const val = queue.shift(); // dequeue`
    }
  },
  binarytree: {
    id: 'binarytree',
    title: 'Binary Tree (Cây nhị phân)',
    definition: 'Cây nhị phân là một cấu trúc dữ liệu dạng cây phi tuyến, trong đó mỗi nút (node) chỉ chứa tối đa hai nút con, được gọi là nút con bên trái (left child) và nút con bên phải (right child).',
    advantages: [
      'Biểu diễn các mối quan hệ phân cấp rõ ràng (thư mục, phả hệ).',
      'Là nền tảng để triển khai các thuật toán tìm kiếm và cân bằng hiệu quả.'
    ],
    disadvantages: [
      'Cấu trúc có thể bị lệch (degenerated b-tree) thành cấu trúc tuyến tính giống danh sách liên kết nếu các phần tử thêm vào có thứ tự tăng/giảm dần, khiến việc tìm kiếm tốn O(N).'
    ],
    applications: [
      'Cơ chế phân cấp hệ thống tập tin trình quản lý thư mục.',
      'Cây quyết định trong học máy (Decision Trees).',
      'Bộ phân tích cú pháp biểu thức của trình biên dịch.'
    ],
    complexity: {
      timeBest: 'O(log N) - Thêm/Xóa/Tìm (Cân bằng)',
      timeAverage: 'O(log N) - Thêm/Xóa/Tìm',
      timeWorst: 'O(N) - Trường hợp lệch chuỗi',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Các phép duyệt cây cơ bản (Preorder DFS)
function preorder(node):
    if node == null: return
    print(node.val)
    preorder(node.left)
    preorder(node.right)`,
      c: `struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};`,
      cpp: `struct Node {
    int data;
    Node* left;
    Node* right;
};`,
      java: `class Node {
    int data;
    Node left, right;
    Node(int item) {
        data = item;
        left = right = null;
    }
}`,
      javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}`
    }
  },
  binarysearchtree: {
    id: 'binarysearchtree',
    title: 'AVL & Binary Search Tree (Cây tìm kiếm nhị phân)',
    definition: 'Cây tìm kiếm nhị phân (BST) là cây nhị phân có thêm ràng buộc: Với mọi nút X, tất cả các nút thuộc cây con bên trái đều có giá trị nhỏ hơn X, và tất cả các nút thuộc cây con bên phải đều có giá trị lớn hơn X.',
    advantages: [
      'Tối ưu hóa tìm kiếm phần tử: Chỉ cần tốn O(log N) để tìm kiếm phần tử bất kỳ trong cây cân bằng.',
      'Tự động giữ dữ liệu theo thứ tự khi duyệt in-order.'
    ],
    disadvantages: [
      'Không tự động cân bằng theo mặc định, dẫn đến hiệu suất giảm xuống O(N) trong trường hợp xấu nhất (bị lệch thành một đường thẳng).'
    ],
    applications: [
      'Hệ thống quản lý cơ sở dữ liệu (lập chỉ mục Index cho câu truy vấn).',
      'Cấu trúc Set và Map trong bộ thư viện chuẩn của nhiều ngôn ngữ lập trình.'
    ],
    complexity: {
      timeBest: 'O(1) - Tìm nút gốc',
      timeAverage: 'O(log N) - Thêm/Tìm/Xóa',
      timeWorst: 'O(N) - Khi cây lệch lớn',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Áp dụng thuật toán tìm kiếm trên cây nhị phân BST
function searchBST(root, key):
    if root == null or root.val == key:
        return root
    if key < root.val:
        return searchBST(root.left, key)
    return searchBST(root.right, key)`,
      c: `struct Node* search(struct Node* root, int key) {
    if (root == NULL || root->data == key) return root;
    if (key < root->data) return search(root->left, key);
    return search(root->right, key);
}`,
      cpp: `Node* search(Node* root, int key) {
    if (!root || root->data == key) return root;
    if (key < root->data) return search(root->left, key);
    return search(root->right, key);
}`,
      java: `public Node search(Node root, int key) {
    if (root == null || root.data == key) return root;
    if (key < root.data) return search(root.left, key);
    return search(root.right, key);
}`,
      javascript: `function search(root, key) {
    if (!root || root.data === key) return root;
    if (key < root.data) return search(root.left, key);
    return search(root.right, key);
}`
    }
  },
  heap: {
    id: 'heap',
    title: 'Heap (Đống - Min/Max Heap)',
    definition: 'Đống là một dạng cây nhị phân gần đầy đủ đặc biệt. Với Max-Heap, mọi nút cha luôn có giá trị lớn hơn hoặc bằng các nút con. Ngược lại với Min-Heap, nút cha luôn có giá trị nhỏ hơn hoặc bằng các nút con.',
    advantages: [
      'Lấy ra phần tử lớn nhất (hoặc nhỏ nhất) cực nhanh O(1) tại đỉnh Heap.',
      'Sắp xếp vun đống (Heap Sort) tốn tài nguyên tối thiểu, không tốn thêm bộ nhớ làm việc O(1).'
    ],
    disadvantages: [
      'Truy cập ngẫu nhiên các phần tử khác rất kém (độ phức tạp tốn O(N)).',
      'Thao tác thêm mới đòi hỏi duyệt up-heapify duy trì trật tự tốn O(log N).'
    ],
    applications: [
      'Hàng đợi ưu tiên (Priority Queue).',
      'Thuật toán tìm đường ngắn nhất Dijkstra chọn đỉnh có quãng đường ngắn nhất.',
      'Sắp xếp mảng (Heap Sort).'
    ],
    complexity: {
      timeBest: 'O(1) - Lấy Max/Min',
      timeAverage: 'O(log N) - Thêm/Xóa',
      timeWorst: 'O(log N) - Thêm/Xóa',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Hàm vun đống (max-heapify) tại nút i
function heapify(A, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and A[left] > A[largest]: largest = left
    if right < n and A[right] > A[largest]: largest = right
    if largest != i:
        swap(A[i], A[largest])
        heapify(A, n, largest)`,
      c: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}`,
      cpp: `// Thư viện STL C++ cung cấp sẵn heap qua priority_queue
std::priority_queue<int> maxHeap;
maxHeap.push(10);
int root = maxHeap.top();
maxHeap.pop();`,
      java: `PriorityQueue<Integer> pQueue = new PriorityQueue<>(Collections.reverseOrder());
pQueue.add(10);
int root = pQueue.peek();`,
      javascript: `// Thường được cài đặt thủ công qua mảng
class MinHeap {
    constructor() { this.heap = []; }
    // code heapify...
}`
    }
  },
  graph: {
    id: 'graph',
    title: 'Graph (Đồ thị)',
    definition: 'Đồ thị là một cấu trúc dữ liệu phi tuyến biểu diễn các mối quan hệ mạng phức tạp. Một đồ thị gồm tập hợp các Đỉnh (Vertices/Nodes) và các Cạnh (Edges) kết nối các đỉnh đó lại với nhau.',
    advantages: [
      'Biểu diễn được các mối quan hệ mạng phức tạp ngoài đời thực (Giao thông, Web, MXH).',
      'Đựơc giải quyết bằng nhiều lớp thuật toán mạnh mẽ được nghiên cứu rộng rãi (Dijkstra, Prim, Kruskal).'
    ],
    disadvantages: [
      'Lưu trữ tốn không gian (dạng Ma trận kề tốn O(V^2)).',
      'Việc thiết kế, cài đặt thuật toán cực kỳ phức tạp và dễ gặp lỗi logic.'
    ],
    applications: [
      'Bản đồ dẫn đường GPS (Google Maps, tìm đường đi ngắn nhất).',
      'Phân tích liên kết mạng xã hội (đề xuất bạn bè trên Facebook, LinkedIn).',
      'Hệ thống mạng truyền thông, định tuyến dữ liệu trên Internet.'
    ],
    complexity: {
      timeBest: 'O(1) - Kiểm tra kề (Ma trận)',
      timeAverage: 'O(V + E) - Duyệt BFS/DFS',
      timeWorst: 'O(V + E) - Duyệt BFS/DFS',
      space: 'O(V + E) hoặc O(V^2)'
    },
    code: {
      pseudocode: `// Thuật toán duyệt đồ thị BFS sử dụng hàng đợi Queue
function BFS(graph, startVertex):
    visited = danh sach rong
    Q = Queue()
    Q.enqueue(startVertex)
    visited.add(startVertex)
    while Q khong rong:
        curr = Q.dequeue()
        print(curr)
        for sub in graph.adjacent(curr):
            if sub not in visited:
                visited.add(sub)
                Q.enqueue(sub)`,
      c: `// Adjacency Matrix representation
int adjMatrix[100][100];
// code initialization...`,
      cpp: `// Adjacency List representation
std::vector<std::vector<int>> adjList;`,
      java: `class Graph {
    int V;
    LinkedList<Integer> adjList[];
}`,
      javascript: `class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
}`
    }
  },
  hashtable: {
    id: 'hashtable',
    title: 'Hash Table (Bảng băm)',
    definition: 'Bảng băm là cấu trúc dữ liệu lưu trữ các cặp khóa (key) và giá trị (value). Nó sử dụng mộ Hàm băm (Hash function) để biến đổi khóa thành một chỉ số mảng, cho phép tìm kiếm cực kỳ nhanh chóng.',
    advantages: [
      'Tìm kiếm, thêm mới và xóa phần tử cực kỳ nhanh chóng, đạt độ phức tạp O(1) trong điều kiện tối ưu.',
      'Sử dụng khóa là các nhãn trực quan, dễ quản lý hơn chỉ số số học.'
    ],
    disadvantages: [
      'Xử lý va chạm băm (collision) phức tạp (chaining, open addressing).',
      'Hiệu năng bị giảm sút trầm trọng nếu hàm băm kém, sinh ra quá nhiều va chạm (worst case O(N)).',
      'Không hỗ trợ lưu trữ dữ liệu theo thứ tự tự nhiên.'
    ],
    applications: [
      'Quản lý cơ sở dữ liệu làm lớp Cache dữ liệu tốc độ cao (như Redis).',
      'Hệ thống quản lý từ điển, danh bạ tra cứu.',
      'Trình dịch ngôn ngữ lưu trữ bảng ký hiệu (Symbol Table).'
    ],
    complexity: {
      timeBest: 'O(1) - Thêm/Xóa/Tìm kiếm',
      timeAverage: 'O(1) - Thêm/Xóa/Tìm kiếm',
      timeWorst: 'O(N) - Khi xảy ra va chạm toàn bộ',
      space: 'O(N)'
    },
    code: {
      pseudocode: `// Một hàm băm đơn giản (Modulo)
function hashFunc(key, tableSize):
    return key % tableSize

// Tra cuu gia tri bang khoa key
function get(key):
    idx = hashFunc(key, size)
    return bucket[idx].find(key)`,
      c: `int hashFunction(int key, int size) {
    return key % size;
}`,
      cpp: `std::unordered_map<std::string, int> hashMap;
hashMap["apple"] = 5;
int val = hashMap["apple"];`,
      java: `HashMap<String, Integer> map = new HashMap<>();
map.put("apple", 5);
int val = map.get("apple");`,
      javascript: `const map = new Map();
map.set("apple", 5);
const val = map.get("apple");`
    }
  }
};

export const sortingConcepts: Record<string, ConceptInfo> = {
  bubble: {
    id: 'bubble',
    title: 'Bubble Sort (Sắp xếp nổi bọt)',
    definition: 'Sắp xếp nổi bọt hoạt động bằng cách liên tục duyệt qua mảng, so sánh các cặp phần tử kề nhau và hoán đổi chúng nếu chúng đứng sai thứ tự. Quá trình này được lặp lại cho đến khi mảng được sắp xếp hoàn toàn.',
    advantages: ['Cực kỳ đơn giản, dễ hiểu và dễ lập trình.', 'Không tốn thêm bộ nhớ phụ (sắp xếp tại chỗ O(1)).', 'Có tính ổn định (Stable Sort).'],
    disadvantages: ['Hiệu suất cực kỳ thấp với dữ liệu lớn O(N^2).', 'Không thực tế trong các ứng dụng thương mại.'],
    applications: ['Sử dụng cho giảng dạy lý thuyết cơ bản về thuật toán.', 'Sử dụng khi kích thước mảng cực kỳ nhỏ.'],
    complexity: {
      timeBest: 'O(N) - Mảng đã sắp xếp',
      timeAverage: 'O(N^2)',
      timeWorst: 'O(N^2)',
      space: 'O(1)'
    },
    code: {
      pseudocode: `function bubbleSort(A):
    n = length(A)
    for i = 0 to n-1:
        swapped = false
        for j = 0 to n-i-2:
            if A[j] > A[j+1]:
                swap(A[j], A[j+1])
                swapped = true
        if not swapped: break`,
      c: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int swapped = 0;
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = 1;
            }
        }
        if (swapped == 0) break;
    }
}`,
      cpp: `void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j+1]) {
                std::swap(arr[j], arr[j+1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
    }
  },
  selection: {
    id: 'selection',
    title: 'Selection Sort (Sắp xếp chọn)',
    definition: 'Sắp xếp chọn thuật chia mảng thành 2 phần: phần đã sắp xếp và phần chưa sắp xếp. Ở mỗi bước, thuật toán tìm phần tử nhỏ nhất từ phần chưa sắp xếp và đưa về vị trí cuối của phần đã sắp xếp.',
    advantages: ['Đơn giản, dễ cài đặt.', 'Số lần hoán đổi (swap) tối đa chỉ là O(N), tốt hơn so với Bubble Sort khi thao tác ghi bộ nhớ tốn kém.'],
    disadvantages: ['Hiệu suất kém O(N^2) trong bất kỳ trường hợp nào.', 'Thuật toán sắp xếp không ổn định kỹ thuật mặc định.'],
    applications: ['Sử dụng khi bộ nhớ ghi bị hạn chế tối đa.', 'Dữ liệu mảng nhỏ cần sắp xếp.'],
    complexity: {
      timeBest: 'O(N^2)',
      timeAverage: 'O(N^2)',
      timeWorst: 'O(N^2)',
      space: 'O(1)'
    },
    code: {
      pseudocode: `function selectionSort(A):
    n = length(A)
    for i = 0 to n-2:
        min_idx = i
        for j = i+1 to n-1:
            if A[j] < A[min_idx]:
                min_idx = j
        swap(A[i], A[min_idx])`,
      c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
      cpp: `void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        int min_idx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        std::swap(arr[i], arr[min_idx]);
    }
}`,
      java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
      javascript: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
}`
    }
  },
  insertion: {
    id: 'insertion',
    title: 'Insertion Sort (Sắp xếp chèn)',
    definition: 'Sắp xếp chèn hoạt động tương tự như cách con người sắp xếp các quân bài trên tay. Nó duyệt qua từng phần tử của mảng và "chèn" phần tử đó vào đúng vị trí thích hợp trong đoạn mảng đã sắp xếp trước đó.',
    advantages: ['Rất hiệu quả đối với các mảng có kích thước nhỏ hoặc đã gần được sắp xếp sẵn.', 'Là thuật toán trực tuyến (online) - có thể sắp xếp dữ liệu ngay khi vừa nhận được.', 'Có tính ổn định.'],
    disadvantages: ['Hiệu suất không cao đối với các mảng lớn O(N^2).'],
    applications: ['Sử dụng làm thuật toán bổ trợ cho các thuật toán lai như Timsort hay IntroSort.', 'Hệ thống nhận luồng dữ liệu liên tục.'],
    complexity: {
      timeBest: 'O(N) - Khi mảng đã sắp xếp',
      timeAverage: 'O(N^2)',
      timeWorst: 'O(N^2)',
      space: 'O(1)'
    },
    code: {
      pseudocode: `function insertionSort(A):
    for i = 1 to length(A)-1:
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]
            j = j - 1
        A[j+1] = key`,
      c: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      cpp: `void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      javascript: `function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    }
  },
  merge: {
    id: 'merge',
    title: 'Merge Sort (Sắp xếp trộn)',
    definition: 'Dựa trên tư tưởng "Chia để trị" (Divide and Conquer). Thuật chia mảng lớn làm đôi cho tới khi mỗi đoạn chỉ chứa 1 phần tử, sau đó liên tục thực hiện ghép các đoạn mảng này lại theo đúng thứ tự tăng dần.',
    advantages: ['Luôn đạt hiệu năng rất ổn định O(N log N) trong mọi trường hợp.', 'Duy trì tính ổn định (Stable Sort).', 'Thích hợp sắp xếp các tập dữ liệu có kích thước khổng lồ mà không vừa bộ nhớ RAM (External Sort).'],
    disadvantages: ['Tốn thêm không gian bộ nhớ phụ O(N) để lưu trữ các mảng con trong quá trình trộn.'],
    applications: ['Sắp xếp danh sách liên kết rất tốt.', 'Ứng dụng trong việc đếm nghịch thế của một mảng.'],
    complexity: {
      timeBest: 'O(N log N)',
      timeAverage: 'O(N log N)',
      timeWorst: 'O(N log N)',
      space: 'O(N)'
    },
    code: {
      pseudocode: `function mergeSort(A, left, right):
    if left >= right: return
    mid = left + (right - left) / 2
    mergeSort(A, left, mid)
    mergeSort(A, mid + 1, right)
    merge(A, left, mid, right)`,
      c: `void merge(int arr[], int l, int m, int r) {
    // code mảng tạm và trộn mảng...
}
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      cpp: `void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    // code merge...
}`,
      java: `public void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r-l)/2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}`,
      javascript: `function mergeSort(arr, l = 0, r = arr.length - 1) {
    if (l >= r) return;
    const m = Math.floor(l + (r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    // Code merge mảng...
}`
    }
  },
  quick: {
    id: 'quick',
    title: 'Quick Sort (Sắp xếp nhanh)',
    definition: 'Cũng sử dụng triết lý "Chia để trị". Thuật toán chọn ra một phần tử làm điểm chốt (Pivot), phân chia mảng thành hai phần: một phần nhỏ hơn pivot, phần còn lại lớn hơn pivot. Sau đó đệ quy sắp xếp hai phần này.',
    advantages: ['Cực kỳ nhanh chóng trong thực tế, thường có hằng số nhỏ nhất nên chạy nhanh hơn Merge Sort và Heap Sort.', 'Sắp xếp tại chỗ, tốn bộ nhớ phụ cho ngăn xếp đệ quy rất thấp O(log N).'],
    disadvantages: ['Hiệu năng rơi xuống O(N^2) nếu chọn pivot không tốt (mảng đã sắp xếp và chọn pivot ở biên).', 'Không có tính ổn định.'],
    applications: ['Là lõi thuật toán sắp xếp chuẩn của hầu hết ngôn ngữ lập trình lớn.', 'Sắp xếp lượng dữ liệu khổng lồ nằm hoàn toàn trên RAM.'],
    complexity: {
      timeBest: 'O(N log N)',
      timeAverage: 'O(N log N)',
      timeWorst: 'O(N^2) - Khi chọn pivot sai lệch cực đoan',
      space: 'O(log N) - Ngăn xếp đệ quy'
    },
    code: {
      pseudocode: `function quickSort(A, low, high):
    if low < high:
        p = partition(A, low, high)
        quickSort(A, low, p - 1)
        quickSort(A, p + 1, high)`,
      c: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      cpp: `void quickSort(std::vector<int>& arr, int low, int high) {
    if (low >= high) return;
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
}`,
      java: `public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return;
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
}`
    }
  },
  heap: {
    id: 'heap',
    title: 'Heap Sort (Sắp xếp vun đống)',
    definition: 'Heap Sort tổ chức dữ liệu thành một cấu trúc cây nhị phân gọi là Max-Heap. Sau đó rút dần phần tử lớn nhất tại gốc đưa về cuối mảng và thực hiện tái cấu trúc lại Heap cho các phần tử còn lại.',
    advantages: ['Hiệu suất ổn định được đảm bảo tuyệt đối ở mức O(N log N) trong mọi trường hợp.', 'Không tốn thêm bộ nhớ bổ trợ để làm việc O(1).'],
    disadvantages: ['Hiệu năng thực tế thường chậm hơn Quick Sort do bộ nhớ đệm Cache hoạt động kém hơn.', 'Không bảo toàn tính ổn định (Unstable).'],
    applications: ['Sử dụng trong các ứng dụng Embedded nơi bộ nhớ hạn chế và cần đảm bảo thời gian chạy tối đa.', 'Thuật toán IntroSort (lai giữa Quick và Heap).'],
    complexity: {
      timeBest: 'O(N log N)',
      timeAverage: 'O(N log N)',
      timeWorst: 'O(N log N)',
      space: 'O(1)'
    },
    code: {
      pseudocode: `function heapSort(A):
    n = length(A)
    // Dung max heap
    for i = n/2 - 1 down to 0:
        heapify(A, n, i)
    // Rut tung phan tu ra khoi heap
    for i = n-1 down to 1:
        swap(A[0], A[i])
        heapify(A, i, 0)`,
      c: `void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
      cpp: `void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; --i) heapify(arr, n, i);
    for (int i = n - 1; i > 0; --i) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
      java: `public void heapSort(int arr[]) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
      javascript: `function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
}`
    }
  }
};

export const searchingConcepts: Record<string, ConceptInfo> = {
  linear: {
    id: 'linear',
    title: 'Linear Search (Tìm kiếm tuyến tính)',
    definition: 'Tìm kiếm tuyến tính là thuật toán đơn giản nhất. Nó duyệt qua từng phần tử của mảng từ đầu đến cuối một cách tuần tự, so sánh từng phần tử với giá trị cần tìm cho đến khi phát hiện hoặc hết mảng.',
    advantages: ['Cực kỳ đơn giản, không cần chuẩn bị hay sắp xếp dữ liệu trước.', 'Hoạt động tốt trên mọi loại danh sách kể cả danh sách liên kết.'],
    disadvantages: ['Hiệu suất cực thấp nếu mảng có lượng phần tử lớn O(N).'],
    applications: ['Ứng dụng khi tìm kiếm mảng nhỏ chưa được sắp xếp.', 'Tìm kiếm cơ bản không yêu cầu tối ưu thời gian.'],
    complexity: {
      timeBest: 'O(1) - Tìm thấy ở vị trí đầu tiên',
      timeAverage: 'O(N)',
      timeWorst: 'O(N) - Tìm thấy ở cuối hoặc không có',
      space: 'O(1)'
    },
    code: {
      pseudocode: `function linearSearch(A, x):
    for i = 0 to length(A)-1:
        if A[i] == x:
            return i
    return -1 // Khong tim thay`,
      c: `int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) return i;
    }
    return -1;
}`,
      cpp: `int linearSearch(const std::vector<int>& arr, int x) {
    for (size_t i = 0; i < arr.size(); ++i) {
        if (arr[i] == x) return i;
    }
    return -1;
}`,
      java: `public int linearSearch(int[] arr, int x) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == x) return i;
        }
        return -1;
    }`,
      javascript: `function linearSearch(arr, x) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === x) return i;
    }
    return -1;
}`
    }
  },
  binary: {
    id: 'binary',
    title: 'Binary Search (Tìm kiếm nhị phân)',
    definition: 'Thuật toán tìm kiếm nhị phân áp dụng trên mảng đã được sắp xếp tăng dần. Nó so sánh giá trị cần tìm với phần tử giữa. Nếu nhỏ hơn học lớn hơn, nó bỏ qua hoàn toàn một nửa mảng không chứa kết quả và lặp lại trên nửa còn lại.',
    advantages: ['Hiệu suất tuyệt vời, cực kỳ nhanh chóng O(log N). Ngay cả với 1 triệu phần tử, tối đa chỉ cần khoảng 20 lần so sánh.'],
    disadvantages: ['Yêu cầu mảng bắt buộc phải được sắp xếp trước đó.', 'Không phù hợp với danh sách liên kết do yêu cầu truy cập ngẫu nhiên chỉ số liên tục.'],
    applications: ['Tìm kiếm từ điển, tra bảng chỉ số cơ sở dữ liệu sắp xếp sẵn.', 'Tích hợp sâu trong các thư viện tìm kiếm cao cấp.'],
    complexity: {
      timeBest: 'O(1) - Gặp ngay phần tử giữa mảng',
      timeAverage: 'O(log N)',
      timeWorst: 'O(log N)',
      space: 'O(1) - Phiên bản lặp'
    },
    code: {
      pseudocode: `// Phien ban lap trong tim kiem nhi phan
function binarySearch(A, x):
    low = 0
    high = length(A) - 1
    while low <= high:
        mid = low + (high - low) / 2
        if A[mid] == x: return mid
        else if A[mid] < x: low = mid + 1
        else: high = mid - 1
    return -1`,
      c: `int binarySearch(int arr[], int n, int x) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == x) return mid;
        if (arr[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      cpp: `int binarySearch(const std::vector<int>& arr, int x) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == x) return mid;
        if (arr[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `public int binarySearch(int[] arr, int x) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == x) return mid;
        if (arr[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      javascript: `function binarySearch(arr, x) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (arr[mid] === x) return mid;
        if (arr[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    }
  }
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Độ phức tạp thời gian trung bình của thuật toán Sắp xếp nhanh (Quick Sort) là gì?",
    options: ["O(N)", "O(N log N)", "O(N²)", "O(log N)"],
    correctAnswer: 1,
    explanation: "Độ phức tạp thời gian trung bình của Quick Sort là O(N log N), tuy nhiên trong trường hợp xấu nhất nó có thể rơi vào O(N²).",
    category: "Sắp xếp"
  },
  {
    id: 2,
    question: "Cấu trúc dữ liệu nào hoạt động theo nguyên lý LIFO (Last In First Out)?",
    options: ["Hàng đợi (Queue)", "Ngăn xếp (Stack)", "Cây nhị phân", "Mảng"],
    correctAnswer: 1,
    explanation: "Stack hoạt động theo nguyên lý LIFO (Mới nhất được đẩy vào sẽ được lấy ra đầu tiên).",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 3,
    question: "Cấu trúc dữ liệu nào hoạt động theo nguyên lý FIFO?",
    options: ["Stack", "Queue", "Binary Tree", "Graph"],
    correctAnswer: 1,
    explanation: "Queue hoạt động theo nguyên lý FIFO (First In First Out - Vào trước ra trước).",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 4,
    question: "Hàm băm (Hash Function) được sử dụng để làm gì?",
    options: ["Phục vụ duyệt đồ thị", "Biến đổi khóa (key) thành một chỉ số mảng", "Sắp xếp mảng", "Cân bằng cây nhị phân"],
    correctAnswer: 1,
    explanation: "Hàm băm chuyển đổi khóa thành một giá trị chỉ số trong mảng để lưu trữ và tìm kiếm dữ liệu với O(1).",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 5,
    question: "Độ phức tạp truy cập ngẫu nhiên phần tử trong Mảng là gì?",
    options: ["O(N)", "O(log N)", "O(1)", "O(N log N)"],
    correctAnswer: 2,
    explanation: "Do các phần tử nằm kề nhau trong bộ nhớ, mảng hỗ trợ truy cập ngẫu nhiên trực tiếp bằng chỉ số với thời gian hằng số O(1).",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 6,
    question: "Danh sách liên kết đơn có ưu điểm là gì so với Mảng tĩnh?",
    options: ["Hỗ trợ truy cập ngẫu nhiên trực tiếp", "Kích thước động linh hoạt và không lãng phí bộ nhớ dự phòng", "Duyệt nhanh hơn mảng", "Sử dụng ít bộ nhớ hơn mảng"],
    correctAnswer: 1,
    explanation: "Danh sách liên kết có kích thước động, giúp tối ưu bộ nhớ cấp phát linh hoạt và thêm/xóa phần tử mà không phải dịch chuyển mảng.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 7,
    question: "Trong Cây tìm kiếm nhị phân (BST), các node thuộc cây con bên trái của node gốc sẽ như thế nào?",
    options: ["Luôn có giá trị lớn hơn node gốc", "Luôn có giá trị nhỏ hơn node gốc", "Luôn có giá trị bằng node gốc", "Không có quy tắc cụ thể"],
    correctAnswer: 1,
    explanation: "Quy tắc của BST: Tất cả node con bên trái luôn nhỏ hơn cha, bên phải luôn lớn hơn cha.",
    category: "Cây"
  },
  {
    id: 8,
    question: "Để duyệt qua tất cả đỉnh đồ thị theo chiều rộng, ta dùng cấu trúc dữ liệu bổ trợ nào?",
    options: ["Mảng tĩnh", "Stack", "Queue", "Cây nhị phân"],
    correctAnswer: 2,
    explanation: "Thuật toán BFS (Tìm kiếm theo chiều rộng) sử dụng Queue để lưu trữ các đỉnh chờ duyệt.",
    category: "Đồ thị"
  },
  {
    id: 9,
    question: "Có lỗi gì thường xảy ra nếu đệ quy không có điều kiện dừng?",
    options: ["Tràn hàng đợi (Queue overflow)", "Tràn ngăn xếp (Stack overflow)", "Rò rỉ bộ nhớ băm", "Lỗi dữ liệu đồ thị"],
    correctAnswer: 1,
    explanation: "Khi không có điều kiện dừng, các lời gọi hàm đệ quy vô tận làm tràn vùng nhớ ngăn xếp (Stack Overflow).",
    category: "Đệ quy"
  },
  {
    id: 10,
    question: "Duyệt cây theo thứ tự Inorder (LNR) trên một Cây Tìm Kiếm Nhị Phân (BST) sẽ cho ra kết quả gì?",
    options: ["Danh sách node lộn xộn", "Danh sách giảm dần", "Danh sách tăng dần", "Độ sâu của cây"],
    correctAnswer: 2,
    explanation: "Duyệt Inorder (Trái -> Gốc -> Phải) trên cây BST luôn tạo ra danh sách các giá trị được sắp xếp tăng dần.",
    category: "Cây"
  },
  {
    id: 11,
    question: "Thao tác Pop trên Stack làm nhiệm vụ gì?",
    options: ["Đẩy phần tử mới vào đỉnh Stack", "Lấy ra và xóa phần tử ở đỉnh Stack", "Chỉ đọc phần tử ở đỉnh Stack mà không xóa", "Xóa toàn bộ Stack"],
    correctAnswer: 1,
    explanation: "Pop dùng để lấy ra và loại bỏ phần tử ở đầu đỉnh hiện tại của Stack.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 12,
    question: "Bảng băm giải quyết va chạm bằng phương pháp 'Chaining' là gì?",
    options: ["Chuyển mảng băm thành mảng khác", "Liên kết các phần tử va chạm thành một danh sách liên kết tại ô băm đó", "Xóa phần tử cũ để nhường chỗ", "Chạy lại hàm băm khác hoàn toàn"],
    correctAnswer: 1,
    explanation: "Phương pháp Chaining (dây chuyền) liên kết các phần tử bị trùng mã băm dưới dạng danh sách liên kết tại chính ô băm đó.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 13,
    question: "Thuật toán sắp xếp nào có hiệu năng tốt nhất khi mảng đã được sắp xếp sẵn?",
    options: ["Selection Sort", "Insertion Sort", "Quick Sort", "Heap Sort"],
    correctAnswer: 1,
    explanation: "Insertion Sort chỉ mất độ phức tạp O(N) khi mảng đã sắp xếp sẵn vì chỉ so sánh 1 lần cho mỗi phần tử.",
    category: "Sắp xếp"
  },
  {
    id: 14,
    question: "Thuật toán Tìm kiếm Nhị phân yêu cầu mảng đầu vào phải có cấu trúc thế nào?",
    options: ["Có ít hơn 100 phần tử", "Đã được sắp xếp", "Toàn con số dương", "Dạng danh sách liên kết kép"],
    correctAnswer: 1,
    explanation: "Binary Search chỉ hoạt động chính xác khi mảng đầu vào đã được sắp xếp theo thứ tự nhất định.",
    category: "Tìm kiếm"
  },
  {
    id: 15,
    question: "Thuật toán nào luôn đảm bảo thời gian chạy trong mọi trường hợp là O(N log N) và sắp xếp tại chỗ (không tốn bộ nhớ phụ O(1))?",
    options: ["Quick Sort", "Merge Sort", "Heap Sort", "Bubble Sort"],
    correctAnswer: 2,
    explanation: "Heap Sort luôn có độ phức tạp O(N log N) cả về Best, Average, Worst và chỉ tốn O(1) không gian bộ nhớ làm việc.",
    category: "Sắp xếp"
  },
  {
    id: 16,
    question: "Một cây nhị phân đầy đủ có độ sâu h có số lượng node tối đa là bao nhiêu?",
    options: ["h", "2^h - 1", "2^(h+1) - 1", "h^2"],
    correctAnswer: 2,
    explanation: "Số node tối đa có thể có trên cây nhị phân độ sâu h (tính từ gốc là 0) là 2^(h+1) - 1.",
    category: "Cây"
  },
  {
    id: 17,
    question: "Chỉ số (index) đầu tiên của mảng trong đa số các ngôn ngữ lập trình là mấy?",
    options: ["1", "-1", "0", "Có thể là số bất kỳ"],
    correctAnswer: 2,
    explanation: "Mảng thường đánh số chỉ mục bắt đầu từ 0.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 18,
    question: "Giải thuật duyệt theo chiều sâu (DFS) trên đồ thị thường sử dụng cấu trúc dữ liệu nào?",
    options: ["Queue", "Stack (gọi đệ quy hoặc thủ công)", "Hash Table", "Cây nhị phân"],
    correctAnswer: 1,
    explanation: "DFS duyệt theo chiều sâu bằng cách đào sâu một nhánh nên cần Stack (thông qua đệ quy hệ thống hoặc tự quản lý) để lưu vết quay lui.",
    category: "Đồ thị"
  },
  {
    id: 19,
    question: "Trong cấu trúc dữ liệu cây, Node không có Node con được gọi là gì?",
    options: ["Node gốc", "Node nhánh", "Node lá", "Node mồ côi"],
    correctAnswer: 2,
    explanation: "Node không có nhánh con được gọi là Node lá (Leaf Node).",
    category: "Cây"
  },
  {
    id: 20,
    question: "Chi phí không gian (bộ nhớ phụ hằng số) của thuật toán Sắp xếp trộn (Merge Sort) là bao nhiêu?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
    correctAnswer: 2,
    explanation: "Merge Sort cần tạo mảng phụ để lưu và trộn các mảng con nên tốn độ phức tạp bộ nhớ là O(N).",
    category: "Sắp xếp"
  },
  {
    id: 21,
    question: "Độ phức tạp thời gian xấu nhất của thuật toán Sắp xếp chọn (Selection Sort) là gì?",
    options: ["O(N log N)", "O(N²)", "O(N)", "O(1)"],
    correctAnswer: 1,
    explanation: "Sắp xếp chọn luôn chạy hai vòng lặp lồng nhau dù dữ liệu ban đầu thế nào, nên luôn tốn O(N²).",
    category: "Sắp xếp"
  },
  {
    id: 22,
    question: "Cách tốt nhất để thêm một phần tử vào Stack là gì?",
    options: ["Pop", "Push", "Enqueue", "Insert"],
    correctAnswer: 1,
    explanation: "Push là thuật ngữ dùng để thêm phần tử vào đỉnh ngăn xếp Stack.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 23,
    question: "Một đồ thị có n đỉnh, nếu biểu diễn bằng Ma trận kề thì tốn dung lượng bộ nhớ bao nhiêu?",
    options: ["O(n)", "O(n²)", "O(n log n)", "O(n!)"],
    correctAnswer: 1,
    explanation: "Ma trận kề có kích thước n x n phần tử, do đó tốn diện tích lưu trữ là O(n²).",
    category: "Đồ thị"
  },
  {
    id: 24,
    question: "Trong bài toán Tháp Hà Nội với n đĩa, số bước di chuyển tối thiểu để hoàn thành là bao nhiêu?",
    options: ["n²", "2^n", "2^n - 1", "n!"],
    correctAnswer: 2,
    explanation: "Đệ quy bài toán Tháp Hà Nội có công thức số bước di chuyển tối thiểu là 2^n - 1.",
    category: "Đệ quy"
  },
  {
    id: 25,
    question: "Duyệt cây nhị phân theo thứ tự Preorder là gì?",
    options: ["LNR (Trái-Gốc-Phải)", "NLR (Gốc-Trái-Phải)", "LRN (Trái-Phải-Gốc)", "RLN (Phải-Trái-Gốc)"],
    correctAnswer: 1,
    explanation: "Preoder duyệt gốc trước, sau đó đến nhánh trái và nhánh phải (NLR).",
    category: "Cây"
  },
  {
    id: 26,
    question: "Độ phức tạp tìm kiếm một phần tử trong danh sách liên kết đơn kích thước N là gì?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
    correctAnswer: 2,
    explanation: "Danh sách liên kết không hỗ trợ truy cập ngẫu nhiên nên trường hợp xấu nhất phải duyệt toàn bộ N nút để tìm kiếm.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 27,
    question: "Đâu là thuật tính sắp xếp có tính ổn định (Stable Sort)?",
    options: ["Quick Sort", "Merge Sort", "Selection Sort", "Heap Sort"],
    correctAnswer: 1,
    explanation: "Merge Sort là thuật toán sắp xếp có tính ổn định (giữ nguyên thứ tự tương đối của các phần tử có khóa bằng nhau).",
    category: "Sắp xếp"
  },
  {
    id: 28,
    question: "Trong cấu trúc Heap tối đa (Max Heap), phần tử lớn nhất luôn nằm ở đâu?",
    options: ["Lá ngoài cùng bên trái", "Lá ngoài cùng bên phải", "Tại gốc (Root)", "Ở giữa cây"],
    correctAnswer: 2,
    explanation: "Với Max Heap, mọi nút đều nhỏ hơn hoặc bằng cha nên giá trị lớn nhất luôn đứng ở gốc cây (Root).",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 29,
    question: "Nếu một nút X trong danh sách liên kết kép cần bị xóa bỏ, ta có thể làm thế nào trong O(1)?",
    options: ["Phải duyêt từ đầu để biết node đứng trước", "Liên kết trực tiếp node trước X với node sau X nhờ các con trỏ prev và next sẵn có", "Khó khăn không thực hiện được", "Sử dụng hàm băm"],
    correctAnswer: 1,
    explanation: "Vì DLL có con trỏ lưu trữ nút kế trước (prev) và kế sau (next), ta có thể bắc cầu bắc qua nút X trong O(1) mà không cần dò tìm.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 30,
    question: "Thuật toán tìm kiếm phần tử bằng cách liên tiếp giảm một nửa không gian tìm kiếm là gì?",
    options: ["Linear Search", "Binary Search", "DFS", "BFS"],
    correctAnswer: 1,
    explanation: "Binary Search liên tục chia đôi không gian để tìm kiếm nên đạt tốc độ tối đa.",
    category: "Tìm kiếm"
  },
  {
    id: 31,
    question: "Ứng dụng nào sau đây áp dụng trực tiếp cấu trúc hàng đợi (Queue)?",
    options: ["Kiểm tra cú pháp dấu ngoặc", "Lời gọi đệ quy hàm toán học", "Gửi file in tuần tự cho máy in", "Duyệt DFS"],
    correctAnswer: 2,
    explanation: "Máy in nhận các lệnh in và in theo trình tự ai gửi trước in trước (FIFO), chính là ứng dụng của hàng đợi.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 32,
    question: "Hàm tính Fibonacci đệ quy thông thường (không nhớ) có độ phức tạp thời gian là gì?",
    options: ["O(N)", "O(log N)", "O(2^N) - Mũ lũy thừa", "O(N²)"],
    correctAnswer: 2,
    explanation: "Tính Fibonacci đệ quy thuần túy sinh ra 2 lời gọi con ở mỗi tầng tạo nên cây đệ quy cỡ 2^n đỉnh, gây bùng nổ thời gian tính lũy thừa.",
    category: "Đệ quy"
  },
  {
    id: 33,
    question: "Cạnh có hướng trong đồ thị biểu thị điều gì?",
    options: ["Mối quan hệ hai chiều hoàn toàn đối xứng", "Mối liên kết một chiều từ đỉnh gốc tới đỉnh ngọn", "Trọng số âm", "Không biểu thị gì"],
    correctAnswer: 1,
    explanation: "Cạnh có hướng biểu thị hướng đi một chiều từ đỉnh nguồn đến đỉnh đích.",
    category: "Đồ thị"
  },
  {
    id: 34,
    question: "Cây quyết định (Decision Tree) là ứng dụng của cấu trúc dữ liệu nào?",
    options: ["Dòng đệ quy", "Cây nhị phân / Cây phân cấp", "Bảng băm lưu trữ", "Danh sách liên kết đơn"],
    correctAnswer: 1,
    explanation: "Cây quyết định sử dụng cấu trúc phân nhánh dạng cây nhị phân hoặc đa nhánh phân cấp để đưa ra phân loại.",
    category: "Cây"
  },
  {
    id: 35,
    question: "Ứng dụng tính năng Undo trong các trình soạn thảo được lưu qua cấu trúc nào phù hợp nhất?",
    options: ["Queue", "Danh sách liên kết vòng", "Stack", "Đống Heap"],
    correctAnswer: 2,
    explanation: "Các hành động được đưa vào Stack, khi Undo ta lấy hành động cuối cùng ra trước (LIFO), rất phù hợp với Stack.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 36,
    question: "Mức độ cân bằng của cây AVL được giữ bằng cách nào?",
    options: ["Xoay cây (Xoay đơn, xoay kép)", "Xóa toàn bộ cây và nạp lại", "Đổi giá trị các nút", "Chuyển thành cây nhị phân thường"],
    correctAnswer: 0,
    explanation: "Cây AVL là cây BST cân bằng, duy trì độ cao lệch không quá 1 nhờ vào các phép xoay cây (Đơn trái, đơn phải, kép trái-phải, kép phải-trái).",
    category: "Cây"
  },
  {
    id: 37,
    question: "Đồ thị liên thông là đồ thị như thế nào?",
    options: ["Đồ thị có mọi đỉnh đều liên kết trực tiếp với nhau", "Đồ thị mà giữa bất kỳ cặp đỉnh nào cũng có ít nhất một đường đi kết nối", "Đồ thị không chứa chu trình", "Đồ thị có trọng số dương"],
    correctAnswer: 1,
    explanation: "Đồ thị liên thông là đồ thị mà từ bất kỳ một đỉnh nào ta cũng có thể tìm thấy tuyến đường đến mọi đỉnh khác.",
    category: "Đồ thị"
  },
  {
    id: 38,
    question: "Độ phức tạp thời gian xấu nhất của thuật toán Sắp xếp nổi bọt (Bubble Sort) là gì?",
    options: ["O(N log N)", "O(N²)", "O(N)", "O(1)"],
    correctAnswer: 1,
    explanation: "Trường hợp xấu nhất mảng bị đảo ngược, mảng nổi bọt tốn hai vòng lặp lồng chạy hết cỡ O(N²).",
    category: "Sắp xếp"
  },
  {
    id: 39,
    question: "Khi biểu diễn mảng trong máy tính, địa chỉ của phần tử A[i] được tính thế nào từ BaseAddress?",
    options: ["BaseAddress + i", "BaseAddress + i * sizeOf(ElementType)", "BaseAddress - i", "BaseAddress / i"],
    correctAnswer: 1,
    explanation: "Công thức định vị bộ nhớ: Địa chỉ phần tử i = Địa chỉ bắt đầu + i nhân với kích thước kiểu dữ liệu.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 40,
    question: "BST bị lệch hoàn toàn (gần giống danh sách liên kết) thì tìm kiếm tốn thời gian bao nhiêu?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctAnswer: 2,
    explanation: "Khi cây lệch, ta phải duyệt tuần tự từ gốc xuống ngọn lần lượt không khác gì danh sách liên kết nên tốn O(N).",
    category: "Cây"
  },
  {
    id: 41,
    question: "Một chu trình trong đồ thị là dải đường đi thế nào?",
    options: ["Không đi qua đỉnh nào quá một lần", "Nối từ một đỉnh, qua một số đỉnh khác rồi quay lại chính đỉnh ban đầu đó", "Đường đi vô hạn", "Đồ thị không có cạnh"],
    correctAnswer: 1,
    explanation: "Chu trình là đường đi khép kín bắt đầu và kết thúc tại cùng một đỉnh.",
    category: "Đồ thị"
  },
  {
    id: 42,
    question: "Cơ chế đệ quy làm việc trên máy tính thực chất nhờ cấu trúc ẩn nào hỗ trợ?",
    options: ["Hệ thống Queue", "Vùng nhớ Heap hệ thống", "Ngăn xếp hệ thống (System Call Stack)", "Hàm băm băm ngược"],
    correctAnswer: 2,
    explanation: "Mỗi lời gọi đệ quy sẽ đóng gói trạng thái hàm hiện tại và đẩy vào ngăn xếp hệ thống (Call Stack) và lấy ra khi quay lui.",
    category: "Đệ quy"
  },
  {
    id: 43,
    question: "Thuật toán sắp xếp nào chia mảng thành các phần tử đơn lẻ rồi ghép (trộn) chúng lại một cách có thứ tự?",
    options: ["Bubble", "Quick Sort", "Merge Sort", "Insertion"],
    correctAnswer: 2,
    explanation: "Merge Sort chia đôi mảng liên tục rồi trộn (merge) các đoạn mảng dã phân rã một cách tuần tự.",
    category: "Sắp xếp"
  },
  {
    id: 44,
    question: "Bắt đầu duyệt BFS từ nút A trên đồ thị có các đỉnh kề {B, C}. Thứ tự các đỉnh được đưa vào Queue để duyệt tiếp theo là gì?",
    options: ["Duyệt hết các đỉnh xa trước", "Cả B và C", "Chỉ một đỉnh B", "Không đỉnh nào"],
    correctAnswer: 1,
    explanation: "BFS sẽ nạp toàn bộ các đỉnh kề trực tiếp chưa duyệt (B và C) vào Hàng đợi để duyệt diện rộng trước.",
    category: "Đồ thị"
  },
  {
    id: 45,
    question: "Bảng băm có hệ số tải (Load Factor) là tỷ số giữa các đại lượng nào?",
    options: ["Dung lượng bảng chia số phần tử", "Số lượng phần tử trong bảng chia kích thước vật lý của bảng", "Số lượng va chạm trên tổng số ô trống", "Không có khái niệm này"],
    correctAnswer: 1,
    explanation: "Hệ số tải Alpha = N / M, là tỷ lệ phần tử lưu trữ trên năng lực lưu trữ vật lý của bảng băm để đánh giá rủi ro va chạm băm.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 46,
    question: "Một cây nhị phân mà mọi đỉnh cha có đúng 0 hoặc 2 con được gọi là gì?",
    options: ["Cây nhị phân đầy đủ (Strictly/Full Binary Tree)", "Cây nhị phân hoàn hảo", "Cây nhị phân lệch", "Cây AVL"],
    correctAnswer: 0,
    explanation: "Full Binary Tree (Cây nhị phân đầy đủ) quy định mọi đỉnh trong cây chỉ được phép có 0 hoặc 2 con.",
    category: "Cây"
  },
  {
    id: 47,
    question: "Độ phức tạp thời gian xấu nhất của thuật toán Sắp xếp nhanh (Quick Sort) xảy ra khi nào?",
    options: ["Mảng được trộn ngẫu nhiên hoàn toàn", "Mảng đã được sắp xếp sẵn và chọn phần tử chốt (pivot) cực biên (đầu hoặc cuối mảng)", "Mảng có kích thước rất nhỏ", "Mảng chứa toàn số âm "],
    correctAnswer: 1,
    explanation: "Trong trường hợp mảng đã sắp xếp và chọn chốt ở đầu hoặc cuối mảng, cây phân chia bị lệch cực đoan khiến các phân vùng rộng N-1 tốn O(N²).",
    category: "Sắp xếp"
  },
  {
    id: 48,
    question: "Trong danh sách liên kết kép, con trỏ của nút đầu danh sách trỏ 'prev' về đâu?",
    options: ["Nút cuối danh sách", "Nút kế tiếp", "Null / Giá trị rỗng", "Về chính nó"],
    correctAnswer: 2,
    explanation: "Vì không có nút nào trước nút đầu danh sách liên kết kép, con trỏ prev của nó trỏ về NULL.",
    category: "Cấu trúc dữ liệu"
  },
  {
    id: 49,
    question: "Đâu là một ứng dụng của tính toán đệ quy trong tự nhiên và đồ họa máy tính?",
    options: ["Vẽ hình khối Fractal (lá dương xỉ, bông tuyết Koch)", "Vận hành hệ thống hàng đợi máy in", "Duyệt tuần tự tệp", "Lập toán băm"],
    correctAnswer: 0,
    explanation: "Mẫu tự lặp (Fractal) đại diện tiêu biểu nhất cho đệ quy sâu sắc trong toán học và đồ họa sinh động.",
    category: "Đệ quy"
  },
  {
    id: 50,
    question: "Cấu trúc dữ liệu nào đại diện tốt nhất cho bản đồ giao thông đường bộ?",
    options: ["Mảng 2 chiều liên tục", "Cây Nhị Phân BST", "Đồ thị (Đỉnh là ngã tư, cạnh là đường đi)", "Hàng đợi ưu tiên Stack"],
    correctAnswer: 2,
    explanation: "Đồ thị tương thích hoàn toàn để mô phỏng bản đồ do các nút giao thông là đỉnh và đường giao xe là các cạnh nối.",
    category: "Đồ thị"
  }
];
