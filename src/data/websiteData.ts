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
  aiBattlepassUrl: 'http://localhost:5174',
};

export const AI_ML_PROJECTS: ProjectItem[] = [
  {
    id: 'agentic-ai-orchestrator',
    title: 'Autonomous Multi-Agent Enterprise Orchestrator',
    category: 'ai-ml',
    subtitle: 'Self-correcting multi-agent workflow using LangGraph & Claude 3.5',
    description: 'Autonomous multi-agent architecture where specialized agents collaborate on code synthesis, tool execution, output verification, and self-correction loops.',
    tags: ['LangGraph', 'Claude 3.5 Sonnet', 'Python', 'FastAPI', 'Vector DB'],
    techHighlight: 'Multi-Agent Orchestration & Self-Correction',
    featured: true,
    architecture: [
      'Planner Agent decomposes objectives into execution graphs',
      'Worker Agents call tools (Web search, DB query, Code sandbox)',
      'Critic & Reflection Agent audits outputs for deterministic validation'
    ],
    deliverables: [
      'FastAPI agent orchestration backend',
      'React control dashboard',
      'Docker container setup & documentation'
    ]
  },
  {
    id: 'hybrid-rag-engine',
    title: 'Enterprise Hybrid-Search RAG Knowledge Engine',
    category: 'ai-ml',
    subtitle: 'High-precision retrieval combining BM25 keyword search with cross-encoder rerankers',
    description: 'Enterprise Retrieval-Augmented Generation engine combining dense embeddings with sparse BM25 indices and Cohere cross-encoders for zero-hallucination document QA.',
    tags: ['RAG', 'Qdrant', 'Cohere Rerank', 'LlamaIndex', 'Python'],
    techHighlight: 'Hybrid Dense + BM25 & Cohere Reranking',
    featured: true,
    architecture: [
      'Hierarchical chunking preserving document context',
      'Reciprocal Rank Fusion (RRF) between Dense and Sparse BM25',
      'Cross-encoder reranking and strict citation guardrails'
    ],
    deliverables: [
      'Ingestion and vector indexing pipeline',
      'Streaming REST and WebSocket query endpoints',
      'Citation verification module'
    ]
  },
  {
    id: 'edge-vision-defect',
    title: 'Real-Time Edge Computer Vision & Defect Detection',
    category: 'ai-ml',
    subtitle: 'Sub-millisecond inference on edge cameras using YOLOv11 & TensorRT',
    description: 'Industrial computer vision pipeline for automated defect identification on manufacturing lines with real-time hardware alerts.',
    tags: ['YOLOv11', 'TensorRT', 'PyTorch', 'OpenCV', 'CUDA'],
    techHighlight: 'INT8 Quantized Edge Inference with TensorRT',
    featured: false,
    architecture: [
      'Custom annotated industrial dataset with augmentation',
      'INT8 quantized TensorRT engine running on NVIDIA Jetson & RTX',
      'RTSP video stream ingestion with MQTT alert triggers'
    ],
    deliverables: [
      'Trained model weights (.pth, ONNX, TensorRT)',
      'Live stream analysis GUI with defect bounding boxes',
      'Telemetry dashboard for production yield statistics'
    ]
  },
  {
    id: 'conversational-voice-ai',
    title: 'Low-Latency Conversational Voice AI Agent',
    category: 'ai-ml',
    subtitle: 'Natural voice synthesis with under 400ms turn-around latency',
    description: 'Conversational voice assistant integrating Whisper transcription, streaming LLM reasoning, and Cartesia text-to-speech over bidirectional WebSockets.',
    tags: ['Whisper', 'Cartesia TTS', 'WebSockets', 'LiveKit', 'Python'],
    techHighlight: 'Streaming WebSocket Voice Synthesis',
    featured: false,
    architecture: [
      'Voice Activity Detection (VAD) for natural user interruptions',
      'Streaming token-by-token TTS pipeline during LLM generation',
      'Tool execution hooks for CRM lookup and scheduling'
    ],
    deliverables: [
      'Voice server pipeline with WebSocket handlers',
      'Browser audio client with visual equalizer',
      'CRM integration connector'
    ]
  }
];

export const WEB_PROJECTS: ProjectItem[] = [
  {
    id: 'deeptech-analytics-saas',
    title: 'Cloud AI Telemetry & Observability SaaS Platform',
    category: 'web-apps',
    subtitle: 'Real-time observability platform for distributed AI inference nodes',
    description: 'Full-stack SaaS delivering real-time metrics, token spend tracking, latency profiling, and automated alerts for AI applications.',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    techHighlight: 'React 19 & Real-Time Telemetry Streaming',
    featured: true,
    architecture: [
      'Server-side streaming architecture with React 19 Server Components',
      'Columnar time-series data storage for high throughput analytics',
      'Role-based access control (RBAC) and Stripe billing'
    ],
    deliverables: [
      'Complete web portal source code with responsive UI',
      'API key generation and rate-limiting middleware',
      'Stripe subscription lifecycle integration'
    ]
  },
  {
    id: 'enterprise-erp-portal',
    title: 'Enterprise ERP & Inventory Control System',
    category: 'web-apps',
    subtitle: 'Warehouse logistics and order management engine',
    description: 'Enterprise portal streamlining multi-location inventory, automated barcode scanning, supplier orders, and instant PDF invoice generation.',
    tags: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB', 'Docker', 'Redis'],
    techHighlight: 'Role-Based Access & Redis Cache Layer',
    featured: false,
    architecture: [
      'Microservice architecture with decoupled inventory workers',
      'Redis cache cluster for rapid item lookup and locking',
      'Automated PDF invoice generation'
    ],
    deliverables: [
      'Full-stack repository with Docker Compose environments',
      'Admin, staff, and auditor permission dashboards',
      'Live barcode scanner integration'
    ]
  },
  {
    id: 'interactive-lms-learning-hub',
    title: 'Interactive LMS & Code Playground',
    category: 'web-apps',
    subtitle: 'Modern education portal with live sandbox code execution',
    description: 'Student learning management system featuring video streaming, automated quiz evaluations, and in-browser Python execution environments.',
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'WebAssembly', 'Supabase'],
    techHighlight: 'In-Browser Python Execution via WebAssembly',
    featured: true,
    architecture: [
      'In-browser Python code execution using WebAssembly sandboxing',
      'Adaptive video player with auto-bookmarking',
      'Instant certificate generation with verifiable QR code'
    ],
    deliverables: [
      'Student and instructor portal interface',
      'Interactive curriculum roadmap viewer',
      'Payment checkout integration with automated enrollment'
    ]
  }
];

export const MOBILE_PROJECTS: ProjectItem[] = [
  {
    id: 'smart-vitals-mobile',
    title: 'PulseAI: Smart Vitals & Health Companion',
    category: 'mobile-apps',
    subtitle: 'Cross-platform iOS & Android mobile app with BLE medical device sync',
    description: 'Medical companion app that connects via Bluetooth Low Energy to health sensors, runs on-device anomaly detection, and logs vitals securely.',
    tags: ['React Native', 'Expo', 'TypeScript', 'BLE', 'SQLite'],
    techHighlight: 'Low-Energy Bluetooth Medical Telemetry',
    featured: true,
    architecture: [
      'Low-energy Bluetooth background polling with auto-reconnect',
      'Local offline SQLite database for zero-latency vitals logging',
      'Native push notifications and one-tap PDF export'
    ],
    deliverables: [
      'iOS & Android native build outputs (.ipa & .apk)',
      'Component library styled with clean light aesthetics',
      'Apple HealthKit & Google Fit integration bridge'
    ]
  },
  {
    id: 'ai-document-scanner',
    title: 'ScanCraft: On-Device AI Scanner & OCR',
    category: 'mobile-apps',
    subtitle: 'Edge document edge-detection, perspective warp, and multilingual extraction',
    description: 'Lightweight offline mobile scanning app leveraging machine learning for automatic edge detection, perspective flattening, and text recognition.',
    tags: ['Flutter', 'Google ML Kit', 'OpenCV', 'Dart'],
    techHighlight: 'Edge ML Kit & Hardware-Accelerated Warp',
    featured: false,
    architecture: [
      'Live camera overlay with dynamic boundary detection',
      'Hardware-accelerated perspective warp matrix transformation',
      'Multilingual OCR extraction with structured key-value output'
    ],
    deliverables: [
      'Flutter production codebase supporting iOS and Android',
      'Custom image filtering shaders (Color, B&W, Grayscale)',
      'Local encrypted document vault'
    ]
  },
  {
    id: 'field-dispatch-mobile',
    title: 'FleetTrack: Smart Logistics & Dispatch Mobile Suite',
    category: 'mobile-apps',
    subtitle: 'Real-time GPS routing, electronic Proof of Delivery (e-POD), and offline sync',
    description: 'Enterprise driver and field agent app featuring route optimization, digital signature capture, and offline task queue synchronization.',
    tags: ['React Native', 'Mapbox', 'Redux Toolkit', 'Background Geolocation'],
    techHighlight: 'Offline-First Geofenced Task Sync',
    featured: false,
    architecture: [
      'Battery-optimized background GPS tracking with variable interval pings',
      'Offline-first synchronization with automatic retry on reconnect',
      'Touch-sensitive signature capture and high-res photo proof upload'
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
    description: 'A rock-solid foundation in Python programming. Learn clean syntax, data structures, Object-Oriented Programming (OOP), file operations, web scraping, and automated scripts.',
    highlights: [
      'Core syntax, list comprehensions, lambda, generators, and decorators',
      'Object-Oriented Programming: Inheritance, Polymorphism, Encapsulation',
      'Working with JSON, CSV, REST APIs, and automation scripts',
      '50+ coding challenges to build algorithmic problem-solving confidence'
    ],
    tools: ['Python 3.12', 'VS Code', 'Git', 'Requests', 'PyTest'],
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
      'Building 3 full-stack portfolio applications deployed live to cloud'
    ],
    tools: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL'],
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
    description: 'Master low-level programming concepts, memory pointers, modern C++ STL, and conquer data structures and algorithms required for tech company interviews.',
    highlights: [
      'Pointers, references, dynamic memory allocation, and RAII',
      'Standard Template Library: vectors, maps, priority queues, and sets',
      'Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, and Dynamic Programming',
      'Curated LeetCode problem walkthroughs with optimal time/space complexity'
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
    description: 'Take your AI engineering skills to the cutting edge. Build production RAG pipelines, fine-tune models, and architect multi-agent swarms.',
    highlights: [
      'Prompt engineering frameworks and structured output generation (Pydantic)',
      'Vector databases, hybrid search, Cohere reranking, and chunking heuristics',
      'Multi-agent workflow design using LangGraph and LangChain',
      'Deploying local LLMs using Ollama, vLLM, and HuggingFace pipelines'
    ],
    tools: ['LangGraph', 'LangChain', 'Ollama', 'ChromaDB', 'Llama-3', 'FastAPI'],
    pricing: 'Fast-Track Professional Cohort',
    isFlagship: false
  }
];

export const FINAL_YEAR_DOMAINS: FinalYearProjectDomain[] = [
  {
    id: 'ai-ml-domain',
    domain: 'Artificial Intelligence & Machine Learning (AI & ML)',
    description: 'Cutting-edge projects built on IEEE topics featuring real-world datasets, mathematical modeling, and production-ready interfaces.',
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
      'Comprehensive Dataset & Trained Model Checkpoints',
      '1-on-1 Code Walkthrough & Mock Viva Voice Guidance'
    ]
  },
  {
    id: 'genai-llm-domain',
    domain: 'Generative AI, LLMs & Autonomous Agents',
    description: 'Capstone projects featuring Large Language Models, Retrieval-Augmented Generation (RAG), and multi-agent systems that impress external examiners.',
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
      'Live Online Deployment Setup'
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
    id: 'agentic-ai-architecture',
    title: 'The Rise of Agentic AI: Why Multi-Agent Systems are Replacing Chatbots',
    category: 'AI & ML',
    excerpt: 'Simple Q&A chatbots are being replaced by autonomous multi-agent swarms capable of recursive planning, tool execution, reflection, and self-correction.',
    content: [
      'Enterprises are moving beyond simple prompt engineering. Single-prompt completions cannot handle multi-step, complex business workflows that require deterministic verification.',
      'Agentic AI equips LLMs with short/long-term memory, tool calling, recursive task decomposition, and reflection loops to execute multi-step objectives autonomously.',
      'At Mani DeepTech Solutions, we architect multi-agent systems using LangGraph: a Planner Agent decomposes tasks, Worker Agents call APIs and databases, and an Evaluator Agent audits the output against strict acceptance criteria.'
    ]
  },
  {
    id: 'rag-optimization-production',
    title: 'Building Enterprise RAG: Practical Lessons from Production Retrieval',
    category: 'AI & ML',
    excerpt: 'Standard vector search often fails on complex unstructured documents. Here are the core techniques to achieve high-precision retrieval.',
    content: [
      'Simple chunking and embedding fails on complex contracts and tabular reports. High-accuracy enterprise RAG requires a hybrid approach.',
      '1. Hybrid Search: Always combine dense semantic embeddings with sparse BM25 keyword matching using Reciprocal Rank Fusion (RRF).',
      '2. Cross-Encoder Reranking: Passing candidate chunks through Cohere Rerank or BGE-Reranker filters false positives before sending to the LLM.',
      '3. Citation Guardrails: Ensure the model directly cites chunk IDs and quotes supporting evidence.'
    ]
  },
  {
    id: 'choosing-final-year-project',
    title: 'How to Choose an IEEE Final Year Project That Gets You Hired',
    category: 'Career & Projects',
    excerpt: 'Avoid outdated textbook projects. How to select a contemporary IEEE-standard capstone project that impresses college examiners and tech recruiters.',
    content: [
      'Your final year project is the most critical technical asset on a fresher resume. It demonstrates whether you can take a problem from ambiguity to working architecture.',
      'Projects that stand out combine modern AI (computer vision, RAG, agentic workflows), real-world domain utility, and a clean deployed web or mobile UI.',
      'We guide students in selecting IEEE-standard topics, mastering every line of code, and delivering complete documentation and viva presentations.'
    ]
  },
  {
    id: 'fullstack-modern-stack',
    title: 'The Modern Full-Stack Stack: React 19, TypeScript, and FastAPI',
    category: 'Web Development',
    excerpt: 'The ideal architecture for software products that require reactive, modern user interfaces alongside heavy asynchronous AI computation.',
    content: [
      'When building applications that blend complex AI model inference with fast user experiences, selecting the right stack prevents major engineering bottlenecks.',
      'React 19 with TypeScript and Tailwind CSS v4 delivers fast performance, strict type safety, and zero runtime CSS overhead.',
      'Python FastAPI handles backend AI execution with PyTorch and LangChain seamlessly while delivering async performance on par with Node.js.'
    ]
  }
];

export const COMPANY_VALUES = [
  {
    title: 'Deep Engineering Rigor',
    description: 'We write performant, maintainable, and battle-tested code across AI, web, and mobile.',
    icon: 'Cpu'
  },
  {
    title: '50/50 Practical Pedagogy',
    description: 'In all training cohorts, we balance intuitive theory with immediate hands-on coding.',
    icon: 'Code'
  },
  {
    title: 'Complete Ownership & Delivery',
    description: 'From system architecture to documentation and support, we deliver end-to-end solutions.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Next-Gen Innovation',
    description: 'We build on the bleeding edge of AI: Agentic workflows, local LLMs, and real-time streaming architectures.',
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
