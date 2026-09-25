import { ProjectItem, TrainingCourse, FinalYearProjectDomain, BlogPost } from '../types';

export const COMPANY_INFO = {
  name: 'Mani DeepTech Solutions',
  shortName: 'Mani DeepTech',
  tagline: 'Level Up Your Tech — From Scalable Software to Autonomous Agentic AI',
  founder: 'Manideep Juvvala',
  founderRole: 'AI/ML Engineer & AI Product Builder',
  phone: '9381088104',
  phoneFormatted: '+91 9381088104',
  whatsappUrl: 'https://wa.me/919381088104?text=Hi%20Mani%2C%20I%20am%20interested%20in%20Mani%20DeepTech%20Solutions%20services%20/%20training!',
  instagramUrl: 'https://www.instagram.com/manideeptechsolutions/',
  instagramHandle: '@manideeptechsolutions',
  email: 'manideeptechsolutions@gmail.com',
  address: 'Live Online Training & Global Engineering Consulting',
  hours: 'Mon - Sat: 9:00 AM - 8:00 PM IST',
  aiBattlepassUrl: 'http://localhost:5174', // local link / section reference
};

export const AI_ML_PROJECTS: ProjectItem[] = [
  {
    id: 'agentic-ai-orchestrator',
    title: 'Autonomous Multi-Agent Enterprise Orchestrator',
    category: 'ai-ml',
    subtitle: 'Self-correcting multi-agent workflow using LangGraph & Claude 3.5',
    description: 'Designed and deployed an autonomous multi-agent swarm where specialized agents collaborate on code synthesis, validation, security auditing, and documentation.',
    tags: ['LangGraph', 'Claude 3.5 Sonnet', 'Python', 'FastAPI', 'Vector DB', 'AsyncIO'],
    metrics: '84% task automation efficiency, 4.2x faster research pipelines',
    featured: true,
    architecture: [
      'Planner Agent decomposes complex user objectives into atomic tasks',
      'Execution Agents call specialized tools (Web search, Database, Code sandbox)',
      'Critic & Reflection Agent verifies output correctness and triggers self-correction loops',
      'Persistent memory layer using ChromaDB and Redis state serialization'
    ],
    deliverables: [
      'Production FastAPI agent orchestration gateway',
      'Interactive React & Tailwind control cockpit',
      'Dockerized deployment configuration and CI/CD pipelines',
      'Comprehensive system architecture blueprint'
    ]
  },
  {
    id: 'hybrid-rag-engine',
    title: 'Enterprise Hybrid-Search RAG Knowledge Engine',
    category: 'ai-ml',
    subtitle: 'High-precision legal & financial document retrieval with cross-encoders',
    description: 'Constructed an enterprise-scale Retrieval Augmented Generation engine combining dense semantic embeddings with sparse BM25 keyword matching and Cohere re-ranking.',
    tags: ['RAG', 'Qdrant', 'Cohere Rerank', 'LlamaIndex', 'OpenAI', 'Chunking Heuristics'],
    metrics: '96.4% recall rate across 50,000+ unstructured PDFs',
    featured: true,
    architecture: [
      'Multi-modal document parser handling tables, charts, and scanned text',
      'Hierarchical chunking preserving contextual parent-child relationships',
      'Reciprocal Rank Fusion (RRF) between Dense and Sparse BM25 indices',
      'Contextual compression and dynamic hallucination check guardrails'
    ],
    deliverables: [
      'End-to-end ingestion and indexing script suite',
      'REST & WebSocket streaming query endpoints',
      'Confidence scoring and citation highlight module'
    ]
  },
  {
    id: 'edge-vision-defect',
    title: 'Real-Time Edge Computer Vision & Defect Detection',
    category: 'ai-ml',
    subtitle: 'Sub-millisecond inference on edge cameras using YOLOv11 & TensorRT',
    description: 'Engineered an industrial computer vision pipeline for automated defect identification on manufacturing assembly lines with real-time alerting.',
    tags: ['YOLOv11', 'TensorRT', 'PyTorch', 'OpenCV', 'CUDA', 'FastAPI'],
    metrics: '60+ FPS on edge hardware with 98.7% mAP accuracy',
    featured: false,
    architecture: [
      'Custom annotated industrial dataset with synthetic augmentation',
      'INT8 quantized TensorRT engine running on NVIDIA Jetson & RTX nodes',
      'Zero-copy frame buffer processing with RTSP video stream ingest',
      'Automated MQTT trigger for pneumatic sorting arms'
    ],
    deliverables: [
      'Trained model weights and exportable ONNX/TensorRT artifacts',
      'Live stream analysis GUI with heatmaps and defect bounding boxes',
      'Telemetry dashboard for production yield statistics'
    ]
  },
  {
    id: 'conversational-voice-ai',
    title: 'Low-Latency Conversational Voice AI Agent',
    category: 'ai-ml',
    subtitle: 'Natural human-like voice synthesis with under 400ms turn-around latency',
    description: 'Built a conversational voice assistant integrating Whisper transcription, streaming LLM reasoning, and Cartesia text-to-speech over bidirectional WebSockets.',
    tags: ['Whisper', 'Cartesia TTS', 'WebSockets', 'LiveKit', 'Python', 'Audio Stream'],
    metrics: '< 380ms end-to-end voice latency for phone support',
    featured: false,
    architecture: [
      'Voice Activity Detection (Silero VAD) for natural interruptions and barge-in',
      'Streaming token-by-token TTS pipeline generating audio while LLM generates tokens',
      'Tool execution hooks for CRM lookup and live calendar scheduling',
      'Telephony SIP trunk integration for inbound and outbound customer calls'
    ],
    deliverables: [
      'Production voice server pipeline with WebSocket handlers',
      'Browser audio client with visual audio wave equalizer',
      'CRM integration connector and call log sentiment analytics'
    ]
  }
];

export const WEB_PROJECTS: ProjectItem[] = [
  {
    id: 'deeptech-analytics-saas',
    title: 'Cloud AI Telemetry & Observability SaaS Platform',
    category: 'web-apps',
    subtitle: 'Real-time observability platform for distributed LLM & AI inference nodes',
    description: 'Architected a full-stack SaaS platform delivering real-time metrics, token spend tracking, latency profiling, and automated alerts for AI applications.',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'ClickHouse'],
    metrics: 'Sub-50ms analytics rendering across 10M+ daily events',
    featured: true,
    architecture: [
      'Server-side streaming architecture with React 19 Server Components',
      'High-throughput time-series ingestion utilizing ClickHouse columnar storage',
      'Role-based access control (RBAC), multi-tenant isolation, and OAuth2',
      'Interactive data charts using Canvas & SVG with micro-interactions'
    ],
    deliverables: [
      'Complete web portal source code with responsive mobile layout',
      'Custom API key generation and rate-limiting middleware',
      'Stripe recurring billing subscription lifecycle integration'
    ]
  },
  {
    id: 'enterprise-erp-portal',
    title: 'Next-Gen Enterprise ERP & Inventory Control System',
    category: 'web-apps',
    subtitle: 'Mission-critical warehouse logistics and order management engine',
    description: 'Developed an enterprise portal streamlining multi-location supply chain operations, automated barcode scanning, supplier management, and instant invoice generation.',
    tags: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB', 'Docker', 'Redis'],
    metrics: 'Reduced order fulfillment processing lag by 65%',
    featured: false,
    architecture: [
      'Microservice architecture with decoupled inventory and invoice worker queues',
      'Redis cache cluster for rapid item lookup and concurrency locking',
      'Automated PDF invoice generation and thermal printer formatting',
      'Comprehensive audit logging tracking every stock movement'
    ],
    deliverables: [
      'Full-stack repository with Docker Compose development environments',
      'Admin, Warehouse Staff, and Auditor permission dashboards',
      'Live barcode scanner component with audio confirmation'
    ]
  },
  {
    id: 'interactive-lms-learning-hub',
    title: 'Interactive DeepTech LMS & Code Playground',
    category: 'web-apps',
    subtitle: 'Modern education portal with live sandbox code execution & tracking',
    description: 'Engineered an interactive student learning management system featuring video streaming, instant quiz evaluations, and in-browser Python execution environments.',
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'WebAssembly (Pyodide)', 'Framer Motion', 'Supabase'],
    metrics: 'Supports 2,000+ simultaneous students with zero server execution cost',
    featured: true,
    architecture: [
      'In-browser Python code execution using Pyodide WebAssembly sandboxing',
      'Adaptive video player with playback speeds, notes, and auto-bookmarking',
      'Gamified progress tracking with badges, levels, and milestone rewards',
      'Instant certificate generation with unique verifiable cryptographic QR code'
    ],
    deliverables: [
      'Student and Instructor dual-portal interface',
      'Interactive curriculum roadmap viewer with animated step unlocked states',
      'Razorpay payment checkout integration with automated course enrollment'
    ]
  }
];

export const MOBILE_PROJECTS: ProjectItem[] = [
  {
    id: 'smart-vitals-mobile',
    title: 'PulseAI: Smart Vitals & Health Analytics Companion',
    category: 'mobile-apps',
    subtitle: 'Cross-platform iOS & Android mobile app with Bluetooth medical device sync',
    description: 'Designed a medical companion app that connects via BLE to health sensors, runs on-device anomaly detection, and provides instant emergency alerts.',
    tags: ['React Native', 'Expo', 'TypeScript', 'BLE', 'Tailwind (NativeWind)', 'SQLite'],
    metrics: '4.8 Star rating, 10,000+ active device telemetry sessions',
    featured: true,
    architecture: [
      'Low-energy Bluetooth background polling with connection recovery logic',
      'Local offline SQLite database for zero-latency vitals logging',
      'On-device statistical spike detection triggering native push notifications',
      'One-tap PDF report export ready to share directly with physicians'
    ],
    deliverables: [
      'iOS & Android native build outputs (.ipa & .apk / .aab)',
      'Full component library styled with clean light aesthetics',
      'End-to-end Apple HealthKit & Google Fit integration bridge'
    ]
  },
  {
    id: 'ai-document-scanner',
    title: 'ScanCraft: On-Device AI Scanner & Smart OCR',
    category: 'mobile-apps',
    subtitle: 'Edge document edge-detection, perspective warp, and multilingual extraction',
    description: 'Built a lightweight, offline-first mobile scanning app leveraging machine learning for automatic edge detection, perspective flattening, and text recognition.',
    tags: ['Flutter', 'Google ML Kit', 'OpenCV', 'On-Device AI', 'Dart'],
    metrics: '100% offline functionality with < 200ms document crop and OCR',
    featured: false,
    architecture: [
      'Live camera overlay with dynamic quad-point boundary detection',
      'Hardware-accelerated perspective warp matrix transformation',
      'Multilingual OCR extraction with structured key-value field identification',
      'Multi-page PDF compilation with OCR text layer searchability'
    ],
    deliverables: [
      'Flutter production codebase supporting iOS and Android',
      'Custom image filtering shaders (Color, B&W, Grayscale, Magic Enhancer)',
      'Local encrypted document vault with biometric FaceID / TouchID protection'
    ]
  },
  {
    id: 'field-dispatch-mobile',
    title: 'FleetTrack: Smart Logistics & Dispatch Mobile Suite',
    category: 'mobile-apps',
    subtitle: 'Real-time GPS routing, electronic Proof of Delivery (e-POD), and offline sync',
    description: 'Engineered an enterprise driver and field agent app featuring turn-by-turn route optimization, digital signature capture, and offline task queue synchronization.',
    tags: ['React Native', 'Mapbox', 'Redux Toolkit', 'Background Geolocation', 'Node.js'],
    metrics: 'Zero data loss in remote areas with over 50,000 completed deliveries',
    featured: false,
    architecture: [
      'Battery-optimized background GPS tracking with variable interval pings',
      'Offline-first Redux Persist synchronization with exponential backoff retry',
      'Touch-sensitive signature capture and high-res photo proof upload',
      'Instant push notifications through Firebase Cloud Messaging (FCM)'
    ],
    deliverables: [
      'Driver mobile application and dispatcher web companion',
      'Automated geofencing arrival triggers',
      'Turn-by-turn map navigation integration'
    ]
  }
];

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'ai-battlepass',
    title: 'AI BATTLEPASS: Python to Agentic AI (Flagship)',
    category: 'flagship',
    badge: 'Flagship 3-Month Program',
    duration: '3 Months (Live Weekend Batches)',
    level: 'Beginner to Advanced Masterclass',
    description: 'Our premier hands-on training program. Master Python, Machine Learning, Deep Learning, NLP, LLMs, Generative AI, RAG systems, and autonomous Agentic AI with 20+ live projects and personal mentorship.',
    highlights: [
      '50% Theory & Intuition + 50% Practical Hands-on Live Coding',
      '20+ Real-World AI & DeepTech Projects Built from Scratch',
      'Master LangChain, LangGraph, Ollama, Vector DBs, PyTorch, and HuggingFace',
      'Complete LMS Access, Recorded Sessions, and Dedicated Doubt Solving',
      'Final Industry Capstone Project, GitHub Portfolio, and Resume Review',
      'Official Certificate of Completion from Mani DeepTech Solutions'
    ],
    tools: ['Python', 'PyTorch', 'LangChain', 'LangGraph', 'ChromaDB', 'HuggingFace', 'FastAPI', 'Docker'],
    pricing: '₹1,200 (Special Cohort Fee)',
    isFlagship: true,
    link: '#contact'
  },
  {
    id: 'python-zero-to-hero',
    title: 'Python for Developers & Problem Solving',
    category: 'programming',
    badge: 'Core Programming',
    duration: '6 Weeks (Live Interactive)',
    level: 'Beginner to Intermediate',
    description: 'A rock-solid foundation in Python programming. Learn clean syntax, data structures, Object-Oriented Programming (OOP), file operations, web scraping, API consumption, and automated scripts.',
    highlights: [
      'Core syntax, list comprehensions, lambda, generators, and decorators',
      'Object-Oriented Programming: Inheritance, Polymorphism, Encapsulation',
      'Working with JSON, CSV, REST APIs, and automation scripts',
      '50+ coding challenges to build algorithmic problem-solving confidence'
    ],
    tools: ['Python 3.12', 'VS Code', 'Git', 'BeautifulSoup', 'Requests', 'PyTest'],
    pricing: 'Affordable Student & Professional Batches',
    isFlagship: false
  },
  {
    id: 'fullstack-js-ts',
    title: 'Modern Full-Stack Web: React, Node.js & TypeScript',
    category: 'programming',
    badge: 'Web Development',
    duration: '8 Weeks (Live Interactive)',
    level: 'Intermediate',
    description: 'Build production-ready web applications from scratch using modern React 19, TypeScript, Tailwind CSS, Node.js, Express, and modern database systems.',
    highlights: [
      'TypeScript mastery: interfaces, generics, type guards, and strict safety',
      'Modern React: hooks, state machines, context, and custom utilities',
      'Backend REST APIs with Express, JWT authentication, and MongoDB/PostgreSQL',
      'Building 3 full-stack portfolio applications deployed live to Vercel and Railway'
    ],
    tools: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
    pricing: 'Custom Cohort Options',
    isFlagship: false
  },
  {
    id: 'cpp-and-dsa',
    title: 'C++ Systems Programming & Data Structures (DSA)',
    category: 'programming',
    badge: 'Competitive & Systems',
    duration: '8 Weeks (Hands-On)',
    level: 'Intermediate to Advanced',
    description: 'Master low-level programming concepts, memory pointers, modern C++ STL, and conquer data structures and algorithms required for top tech company interviews.',
    highlights: [
      'Pointers, references, dynamic memory allocation, and RAII',
      'Standard Template Library: vectors, maps, priority queues, and sets',
      'Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, and Dynamic Programming',
      '100+ curated LeetCode problem walkthroughs with optimal time/space complexity'
    ],
    tools: ['Modern C++20', 'GCC / Clang', 'GDB', 'LeetCode Patterns', 'VS Code'],
    pricing: 'Weekend & Evening Batches',
    isFlagship: false
  },
  {
    id: 'genai-agentic-mastery',
    title: 'Generative AI & Agentic AI Specialist Course',
    category: 'aiml',
    badge: 'Cutting Edge AI',
    duration: '6 Weeks (Intensive)',
    level: 'Advanced',
    description: 'Take your AI engineering skills to the cutting edge. Build production RAG pipelines, fine-tune open-source models with LoRA, and architect multi-agent swarms.',
    highlights: [
      'Prompt engineering frameworks and structured output generation (Pydantic)',
      'Vector databases, hybrid search, Cohere reranking, and chunking heuristics',
      'Multi-agent workflow design using LangGraph and LangChain',
      'Deploying local LLMs using Ollama, vLLM, and HuggingFace pipelines'
    ],
    tools: ['LangGraph', 'LangChain', 'Ollama', 'ChromaDB', 'Llama-3.3', 'FastAPI'],
    pricing: 'Fast-Track Professional Cohort',
    isFlagship: false
  }
];

export const FINAL_YEAR_DOMAINS: FinalYearProjectDomain[] = [
  {
    id: 'ai-ml-domain',
    domain: 'Artificial Intelligence & Machine Learning (AI & ML)',
    description: 'Cutting-edge projects built on IEEE 2025/2026 conference and journal topics featuring real-world datasets, mathematical modeling, and production-ready interfaces.',
    popularTopics: [
      'Deep Fake Video and Audio Detection using Spatial-Temporal CNN-LSTM Networks',
      'Automated Early Alzheimer’s & Brain Tumor Detection from MRI Scans using Vision Transformers',
      'Credit Card Fraud Detection using Graph Neural Networks and Imbalanced Learning',
      'Smart Agriculture: Plant Disease Classification & Fertilizer Recommendation via Mobile AI',
      'Autonomous Driving: Real-time Lane Detection & Obstacle Avoidance with YOLOv11'
    ],
    techStack: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'Streamlit', 'FastAPI'],
    deliverables: [
      '100% Tested & Working Source Code with Readme Setup',
      'Complete IEEE Format Project Report (60-80 Pages)',
      'Professional PowerPoint Presentation (PPT) for Project Reviews',
      'Comprehensive Dataset & Trained Model Checkpoints (.pth / .h5)',
      '1-on-1 Code Walkthrough & Mock Viva Voice Guidance'
    ]
  },
  {
    id: 'genai-llm-domain',
    domain: 'Generative AI, LLMs & Autonomous Agents',
    description: 'High-demand capstone projects featuring Large Language Models, Retrieval-Augmented Generation (RAG), and multi-agent systems that impress external examiners.',
    popularTopics: [
      'Automated Multi-Agent Legal Contract Analysis and Clause Risk Scorer',
      'Interactive Healthcare Diagnostic Chatbot with Hallucination Guardrails & Medical Citations',
      'AI Code Reviewer & Vulnerability Fixer with Automated Test Generation',
      'Personalized Intelligent Tutoring System with Dynamic Difficulty & Quiz Generation',
      'Autonomous Financial Market Sentiment & News Intelligence Agent'
    ],
    techStack: ['LangChain', 'LangGraph', 'Llama 3', 'Mistral', 'ChromaDB', 'FastAPI', 'React'],
    deliverables: [
      'Complete Full-Stack Application Codebase (Backend + Frontend)',
      'Architecture Diagrams (DFD, UML, Component, Sequence)',
      'Research Paper Drafting Assistance & IEEE Template Formatting',
      'Project Documentation with Plagiarism-free Content',
      'Live Online Deployment Setup (HuggingFace Spaces / Vercel)'
    ]
  },
  {
    id: 'fullstack-cloud-domain',
    domain: 'Full-Stack Web & Cloud Distributed Systems',
    description: 'Robust, enterprise-grade web applications demonstrating full-stack engineering, microservice architectures, and modern cloud deployment standards.',
    popularTopics: [
      'Decentralized Healthcare Records Management with Role-Based Encryption',
      'Smart Campus Placement & Skill Assessment Portal with Automated Code Compiler',
      'AI-Powered E-Commerce Recommendation Engine with Real-Time Stock Analytics',
      'Collaborative Real-Time Whiteboard & Document Suite with WebSockets',
      'Disaster Relief Resource Allocation & Volunteer Coordination Platform'
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB / PostgreSQL', 'Docker', 'AWS'],
    deliverables: [
      'Modular Full-Stack Source Code with clean folder architecture',
      'Database Schema scripts, ER Diagrams, and Sample Data records',
      'Comprehensive System Requirement Specification (SRS) & Report',
      'Project Viva Presentation deck and demonstration video'
    ]
  },
  {
    id: 'iot-embedded-ai-domain',
    domain: 'IoT & Smart Embedded Systems with Edge AI',
    description: 'Hardware meets software: sensor integration, microcontrollers (ESP32 / Raspberry Pi / Arduino), cloud telemetry, and edge machine learning.',
    popularTopics: [
      'Smart Patient Monitoring System with Real-Time ECG & Fall Detection Alerting',
      'AI-Powered Smart Traffic Management System using Edge Vision & Raspberry Pi',
      'Industrial Air Quality & Toxic Gas Hazard Detection with Cloud Logging',
      'Smart Irrigation & Soil Nutrient Sensing with Predictive Weather Modeling',
      'Home Automation & Energy Optimization Hub with Voice Commands & Web Control'
    ],
    techStack: ['ESP32', 'Raspberry Pi', 'Arduino', 'Python', 'MQTT', 'C++', 'ThingSpeak / Firebase'],
    deliverables: [
      'Embedded Firmware Code & Wiring Circuit Connection Diagrams',
      'Companion Mobile / Web App for Real-time Sensor Monitoring',
      'Complete Project Book, Hardware Bill of Materials (BOM), and Report',
      'Demonstration Video and Hardware Setup Guidance'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'agentic-ai-architecture-2026',
    title: 'The Rise of Agentic AI: Why Multi-Agent Systems are Replacing Simple Chatbots in 2026',
    slug: 'rise-of-agentic-ai-multi-agent-systems-2026',
    category: 'AI & ML',
    excerpt: 'Simple Q&A chatbots are giving way to autonomous multi-agent swarms capable of planning, executing tools, reflecting, and self-correcting. Here is how modern Agentic AI works.',
    author: 'Manideep Juvvala',
    date: 'September 2026',
    readTime: '6 min read',
    tags: ['Agentic AI', 'LangGraph', 'LLMs', 'System Architecture', 'Multi-Agent'],
    content: [
      'Over the past two years, the AI landscape evolved from simple prompt engineering to complex Retrieval-Augmented Generation (RAG). However, enterprises quickly realized that single-prompt completions cannot handle multi-step, indeterminate business workflows.',
      'Enter Agentic AI: systems where an LLM is not just a passive text generator, but an active decision-making reasoning engine. By incorporating memory, goal decomposition, tool execution, and reflective critique loops, agents can execute complex multi-hour objectives autonomously.',
      'At Mani DeepTech Solutions, we architect multi-agent systems using frameworks like LangGraph. Instead of a single monolithic agent trying to do everything, we build specialized swarms: a Planner Agent creates the execution tree, Worker Agents query databases or call APIs, and an Evaluator Agent audits the output against acceptance criteria.',
      'Key takeaway: If you are building AI software today, stop designing conversational bots. Start designing autonomous agent workflows with strict guardrails and deterministic validation layers.'
    ]
  },
  {
    id: 'rag-optimization-production-lessons',
    title: 'Building Enterprise RAG: 5 Lessons Learned from Deploying High-Accuracy Retrieval Systems',
    slug: 'building-enterprise-rag-lessons-learned',
    category: 'AI & ML',
    excerpt: 'Naive RAG with simple text splitting fails miserably on enterprise documents. Here are 5 battle-tested techniques to achieve 95%+ retrieval accuracy.',
    author: 'Manideep Juvvala',
    date: 'September 2026',
    readTime: '8 min read',
    tags: ['RAG', 'Vector Search', 'Cohere Rerank', 'Enterprise AI', 'Python'],
    content: [
      'Almost every tutorial on YouTube makes RAG look trivial: load a PDF, split by 500 characters, embed into Chroma, and ask GPT-4. In real-world enterprise environments with complex contracts, balance sheets, and scanned manuals, this approach fails over 50% of the time.',
      '1. Implement Hybrid Search: Dense vectors are great for semantic concepts, but terrible at finding exact serial numbers, product codes, or invoice IDs. Always combine dense vector search with sparse BM25 keyword search using Reciprocal Rank Fusion (RRF).',
      '2. Reranking is Non-Negotiable: Vector cosine similarity is an approximate proxy for relevance. Passing your top 25 candidates through a cross-encoder like Cohere Rerank or BGE-Reranker filters out false positives dramatically.',
      '3. Respect Document Structure: Split text based on semantic headers (H1, H2, tables) rather than arbitrary character lengths. Preserving parent-child chunk metadata enables the model to see the big picture.',
      '4. Add Hallucination Guardrails: Always instruct the model to cite the exact chunk ID and quote the supporting evidence before generating answers.'
    ]
  },
  {
    id: 'choosing-final-year-project-guide',
    title: 'How to Choose a Winning Engineering Final Year Project That Gets You Hired',
    slug: 'how-to-choose-winning-final-year-project',
    category: 'Career & Projects',
    excerpt: 'Avoid outdated textbook projects. Here is our complete step-by-step guide to selecting an IEEE-standard capstone project that impresses both college examiners and tech recruiters.',
    author: 'Manideep Juvvala',
    date: 'September 2026',
    readTime: '5 min read',
    tags: ['Final Year Projects', 'B.Tech', 'Engineering', 'Career Roadmap', 'IEEE'],
    content: [
      'Every year, thousands of engineering students make the fatal mistake of choosing worn-out projects like "Student Management System" or "Online Book Store". When you sit for campus placements or off-campus interviews, interviewers have seen these 100 times and will immediately lose interest.',
      'Your final year project is the single biggest asset on your fresher resume. It demonstrates whether you can take a problem from ambiguity to working architecture, write clean modular code, and articulate engineering trade-offs.',
      'What makes a project stand out in 2026? 1) Integration of contemporary AI (Agentic workflows, GenAI, computer vision), 2) Real-world utility (healthcare, fintech, industrial automation), 3) A clean deployed web or mobile UI rather than just a terminal printout.',
      'At Mani DeepTech Solutions, we assist B.Tech, M.Tech, and MCA students in selecting high-impact IEEE topics, understanding every line of source code, and preparing flawless documentation and viva presentations.'
    ]
  },
  {
    id: 'fullstack-modern-stack-overview',
    title: 'The Modern Full-Stack Stack in 2026: Why React 19, TypeScript, and FastAPI Dominate DeepTech',
    slug: 'modern-fullstack-stack-react-fastapi-deeptech',
    category: 'Web Development',
    excerpt: 'Exploring the ideal tech stack for software products that require both rich, reactive user interfaces and heavy-duty asynchronous AI computation.',
    author: 'Manideep Juvvala',
    date: 'August 2026',
    readTime: '6 min read',
    tags: ['Full-Stack', 'React 19', 'FastAPI', 'TypeScript', 'Tailwind CSS'],
    content: [
      'When building applications that blend complex AI model inference with slick, responsive user experiences, choosing the right stack is critical to prevent engineering bottlenecks.',
      'For the frontend, React 19 paired with TypeScript and Tailwind CSS v4 delivers unmatched developer ergonomics, strict type safety, and zero-runtime CSS overhead.',
      'For the backend, Python FastAPI has become the undisputed champion for AI applications because it allows seamless integration with PyTorch, LangChain, and NumPy while offering async performance comparable to Go or Node.js.',
      'By decoupling your heavy AI worker nodes via Redis task queues and communicating with the client via WebSockets, you ensure your UI remains buttery smooth while multi-second AI computations complete in the background.'
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'K. Rajesh',
    role: 'B.Tech CSE Graduate',
    badge: 'Final Year Project & AI Training',
    text: 'Mani DeepTech Solutions helped our batch build an IEEE-standard Deep Learning project for medical imaging. The project report, code explanations, and viva guidance were phenomenal. Our project scored the highest marks in our department!',
    rating: 5
  },
  {
    name: 'S. Harika',
    role: 'Software Engineer',
    badge: 'AI Battlepass Alum',
    text: 'The AI Battlepass live training program completely transformed my understanding of Python, LLMs, and Agentic AI. The 50% theory and 50% practical hands-on approach made complex topics like LangGraph and RAG so intuitive.',
    rating: 5
  },
  {
    name: 'V. Sai Kumar',
    role: 'Startup Founder',
    badge: 'Web App & AI Consulting',
    text: 'We engaged Mani DeepTech Solutions to build our AI analytics web platform. Manideep and his team delivered the entire full-stack application with exceptional speed, clean code, and a stunning UI that our investors loved.',
    rating: 5
  }
];

export const COMPANY_VALUES = [
  {
    title: 'Deep Engineering Rigor',
    description: 'We don’t settle for surface-level wrappers. We write performant, maintainable, and battle-tested code across AI, web, and mobile.',
    icon: 'Cpu'
  },
  {
    title: '50/50 Practical Pedagogy',
    description: 'In all our training cohorts, we balance deep algorithmic intuition with immediate hands-on coding from day one.',
    icon: 'Code'
  },
  {
    title: 'Complete Ownership & Delivery',
    description: 'From software architecture to comprehensive documentation and post-deployment support, we deliver end-to-end solutions.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Next-Gen Innovation',
    description: 'We stay on the bleeding edge of AI advancements — mastering Agentic workflows, local LLMs, and real-time streaming architectures.',
    icon: 'Sparkles'
  }
];

export const FAQS = [
  {
    question: 'What services does Mani DeepTech Solutions offer?',
    answer: 'We provide specialized end-to-end engineering services across five core pillars: 1) Custom AI & Machine Learning solutions (LLMs, RAG, Agentic AI, Computer Vision), 2) High-performance Full-Stack Web Applications, 3) Native and Cross-Platform Mobile Applications, 4) Technical Education and Live Cohort Training (including our flagship 3-month AI Battlepass), and 5) Comprehensive Final Year Engineering Projects with source code, IEEE reports, and viva guidance.'
  },
  {
    question: 'How can students or professionals enroll in the AI Battlepass or Programming courses?',
    answer: 'You can reach out directly via WhatsApp at 9381088104 or submit an inquiry through our Contact tab. We will share the complete curriculum, batch schedules, and onboarding details. Live cohorts feature interactive weekend sessions, recorded archives, and LMS access.'
  },
  {
    question: 'What is included in the Final Year Project package for students?',
    answer: 'Our Final Year Project package includes 100% working, bug-free source code, complete IEEE-format documentation/report (50-80 pages), presentation slides (PPT), dataset and model weights, software requirement specification (SRS), and personalized 1-on-1 code explanation sessions to ensure you excel in your viva examination.'
  },
  {
    question: 'Do you take custom development contracts for startups and businesses?',
    answer: 'Yes! We collaborate with startups, SMEs, and enterprises to design, develop, and deploy production software. Whether you need a full-stack SaaS platform, an internal AI agent orchestrator, or an iOS/Android mobile app, we provide dedicated engineering support.'
  },
  {
    question: 'How do I contact Manideep or book a consultation?',
    answer: 'You can call or chat on WhatsApp directly at +91 9381088104, reach out on Instagram @manideeptechsolutions, or email us at manideeptechsolutions@gmail.com. We respond within a few hours to discuss your requirements.'
  }
];
