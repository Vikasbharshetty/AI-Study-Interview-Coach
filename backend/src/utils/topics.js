export const topics = {
  java: {
    title: "Java",
    notes: "Focus on OOP, collections, exception handling, multithreading, streams, and JVM basics.",
    quiz: [
      {
        question: "Which concept allows Java to reuse code through parent-child classes?",
        options: ["Inheritance", "Encapsulation", "Polymorphism"],
        correctIndex: 0
      },
      {
        question: "Which collection stores unique values?",
        options: ["List", "Set", "Queue"],
        correctIndex: 1
      },
      {
        question: "Which keyword handles exceptions?",
        options: ["try", "static", "final"],
        correctIndex: 0
      }
    ]
  },
  sql: {
    title: "SQL",
    notes: "Practice joins, grouping, indexes, normalization, constraints, and subqueries.",
    quiz: [
      {
        question: "Which clause filters grouped data?",
        options: ["WHERE", "HAVING", "ORDER BY"],
        correctIndex: 1
      },
      {
        question: "Which join returns matching rows from both tables?",
        options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN"],
        correctIndex: 0
      },
      {
        question: "What improves lookup speed on columns?",
        options: ["Index", "Trigger", "View"],
        correctIndex: 0
      }
    ]
  },
  mongodb: {
    title: "MongoDB",
    notes: "Know documents, collections, indexes, aggregation, schema design, and Mongoose.",
    quiz: [
      {
        question: "MongoDB stores data mainly as what?",
        options: ["Documents", "Rows", "Files only"],
        correctIndex: 0
      },
      {
        question: "Which pipeline processes grouped data?",
        options: ["Aggregation", "Population", "Validation"],
        correctIndex: 0
      },
      {
        question: "Which library maps MongoDB documents in Node.js?",
        options: ["Mongoose", "Express", "Multer"],
        correctIndex: 0
      }
    ]
  },
  docker: {
    title: "Docker",
    notes: "Prepare images, containers, Dockerfile, volumes, ports, and Compose basics.",
    quiz: [
      {
        question: "What is a running instance of an image called?",
        options: ["Container", "Volume", "Network"],
        correctIndex: 0
      },
      {
        question: "Which file describes image build steps?",
        options: ["Dockerfile", "package.json", "README.md"],
        correctIndex: 0
      },
      {
        question: "What stores persistent container data?",
        options: ["Volume", "Tag", "Layer"],
        correctIndex: 0
      }
    ]
  },
  dsa: {
    title: "DSA",
    notes: "Revise arrays, strings, linked lists, stacks, queues, trees, graphs, and complexity.",
    quiz: [
      {
        question: "Binary search has which average time complexity?",
        options: ["O(log n)", "O(n)", "O(n^2)"],
        correctIndex: 0
      },
      {
        question: "Which structure uses LIFO?",
        options: ["Stack", "Queue", "Graph"],
        correctIndex: 0
      },
      {
        question: "Which traversal visits root before children?",
        options: ["Preorder", "Inorder", "Postorder"],
        correctIndex: 0
      }
    ]
  },
  os: {
    title: "Operating Systems",
    notes: "Study processes, threads, scheduling, deadlocks, memory management, and paging.",
    quiz: [
      {
        question: "What is a lightweight unit within a process?",
        options: ["Thread", "Kernel", "Semaphore"],
        correctIndex: 0
      },
      {
        question: "What condition happens when processes wait forever?",
        options: ["Deadlock", "Paging", "Caching"],
        correctIndex: 0
      },
      {
        question: "Which memory technique divides memory into fixed-size blocks?",
        options: ["Paging", "Spooling", "Polling"],
        correctIndex: 0
      }
    ]
  },
  cn: {
    title: "Computer Networks",
    notes: "Cover OSI model, TCP/IP, HTTP, DNS, routing, subnetting, and congestion control.",
    quiz: [
      {
        question: "Which protocol is connection-oriented?",
        options: ["TCP", "UDP", "ICMP"],
        correctIndex: 0
      },
      {
        question: "DNS mainly translates domain names to what?",
        options: ["IP addresses", "MAC addresses", "Ports"],
        correctIndex: 0
      },
      {
        question: "HTTP belongs to which OSI layer?",
        options: ["Application", "Transport", "Network"],
        correctIndex: 0
      }
    ]
  }
};
