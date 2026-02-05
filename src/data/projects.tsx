import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  ocr: {
    title: "EasyOCR",
    bg: "black",
    fg: "white",
    icon: (
      <span className="text-xs font-bold">OCR</span>
    ),
  },
  llm: {
    title: "Local LLM",
    bg: "black",
    fg: "white",
    icon: (
      <span className="text-xs font-bold">LLM</span>
    ),
  },
  semantic: {
    title: "Semantic Analysis",
    bg: "black",
    fg: "white",
    icon: (
      <span className="text-xs font-bold">AI</span>
    ),
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "sportq",
    category: "Sports Facility Management",
    title: "SportQ",
    src: `${BASE_PATH}/sportq-ss-1.jpg`,
    screenshots: [
      `${BASE_PATH}/sportq-ss-1.jpg`,
      `${BASE_PATH}/sportq-ss-2.jpg`,
      `${BASE_PATH}/sportq-ss-3.jpg`,
    ],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
      ],
    },
    live: "https://github.com/Coder-Zaid/SportQ",
    github: "https://github.com/Coder-Zaid/SportQ",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Comprehensive Sports Facility Management System
          </TypographyP>
          <TypographyP className="font-mono ">
            SportQ is a comprehensive sports facility management system designed for college campuses. The application allows students to browse, rent sports equipment, and book turf facilities. Administrators can manage inventory, approve requests, and monitor facility usage.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Equipment browsing and rental system</li>
            <li>Turf facility booking with time slots</li>
            <li>Admin dashboard for inventory management</li>
            <li>Request approval workflow</li>
            <li>Usage monitoring and analytics</li>
          </ul>
          <SlideShow
            images={[
              `${BASE_PATH}/game-ss-1.png`,
              `${BASE_PATH}/game-ss-2.png`,
              `${BASE_PATH}/game-ss-3.png`,
              `${BASE_PATH}/game-ss-4.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "signalsense",
    category: "Traffic Management System",
    title: "SignalSense",
    src: `${BASE_PATH}/signalsense-ss-1.jpg`,
    screenshots: [
      `${BASE_PATH}/signalsense-ss-1.jpg`,
      `${BASE_PATH}/signalsense-ss-2.jpg`,
    ],
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
      ],
    },
    live: "https://github.com/Coder-Zaid/SignalSense?tab=readme-ov-file#signalsense",
    github: "https://github.com/Coder-Zaid/SignalSense?tab=readme-ov-file#signalsense",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Smart Traffic Signal Management System
          </TypographyP>
          <TypographyP className="font-mono ">
            SignalSense is a Next.js web application for traffic simulation and analysis using SUMO (Simulation of Urban MObility). Features interactive traffic simulation visualization, real-time monitoring of traffic flow and metrics, and comparison of different traffic scenarios.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Core Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Adaptive traffic signal logic based on real-time traffic density</li>
            <li>Emergency Vehicle Priority System (EVPS)</li>
            <li>Interactive traffic simulation visualization</li>
            <li>Real-time monitoring of traffic flow and metrics</li>
            <li>Comparison of different traffic scenarios</li>
            <li>Responsive design for various screen sizes</li>
          </ul>
          <SlideShow
            images={[
              `${BASE_PATH}/signalsense-ss-1.jpg`,
              `${BASE_PATH}/signalsense-ss-2.jpg`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "neuro",
    category: "AI Therapeutic Application",
    title: "Neuro.py",
    src: `${BASE_PATH}/neuro-ss-1.jpg`,
    screenshots: [
      `${BASE_PATH}/neuro-ss-1.jpg`,
      `${BASE_PATH}/neuro-ss-2.jpg`,
      `${BASE_PATH}/neuro-ss-3.jpg`,
    ],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.node,
      ],
    },
    live: "https://github.com/Coder-Zaid/Neuro.py",
    github: "https://github.com/Coder-Zaid/Neuro.py",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI Thought Clarifier for Neurodivergent Users
          </TypographyP>
          <TypographyP className="font-mono ">
            Neuro.py is a visually stunning, therapeutic AI chat application designed as a safe space for neurodivergent users. It helps organize, clarify, and reframe complex or emotional thoughts. The core is an empathetic AI assistant that listens without judgment, reflects feelings, and helps structure thoughts into clear, emotionally intelligent messages.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Design & Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Dark, minimalist, and calming UI design</li>
            <li>Glass-morphic cards with soft glowing accents</li>
            <li>Subtle animations for soothing experience</li>
            <li>Empathetic AI conversation partner</li>
            <li>Thought organization and clarification tools</li>
            <li>Emotionally intelligent message structuring</li>
          </ul>
          <SlideShow
            images={[
              `${BASE_PATH}/neuro-ss-1.jpg`,
              `${BASE_PATH}/neuro-ss-2.jpg`,
              `${BASE_PATH}/neuro-ss-3.jpg`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "this-page-is-wrong",
    category: "Psychological Horror Game",
    title: "This Page Is Wrong",
    src: `${BASE_PATH}/game-ss-1.png`,
    screenshots: [
      `${BASE_PATH}/game-ss-1.png`,
      `${BASE_PATH}/game-ss-2.png`,
      `${BASE_PATH}/game-ss-3.png`,
      `${BASE_PATH}/game-ss-4.png`,
    ],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [],
    },
    live: "https://this-page-is-wrong.vercel.app",
    github: "https://github.com/Coder-Zaid/this-page-is-wrong",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Psychological Horror Web Game
          </TypographyP>
          <TypographyP className="font-mono ">
            A psychological horror web game where you detect anomalies in seemingly normal webpages. Players observe a normal-looking system analysis webpage and must decide whether an anomaly exists, testing attention to detail and confidence rather than reflexes.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Game Concept & Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>8 progressive levels with increasing difficulty</li>
            <li>Randomized anomalies - no two playthroughs are the same</li>
            <li>40% fake-out rate - sometimes there's nothing wrong</li>
            <li>Psychological horror through subtle visual and audio distortions</li>
            <li>One mistake ends the game - creates genuine tension</li>
            <li>Tutorial system with favicon anomaly demonstration</li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Horror Elements</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Subtle visual glitches that appear randomly</li>
            <li>Ambient audio hum that creates unease</li>
            <li>Tab title corruption and favicon flickering</li>
            <li>Progressive theme decay as you advance</li>
            <li>Audio cracks on wrong decisions</li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Anomaly Types</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Layout shifts and font weight changes</li>
            <li>Letter spacing distortions</li>
            <li>Disabled hover effects</li>
            <li>Cursor changes and favicon changes</li>
            <li>No anomaly (40% chance) - psychological tension</li>
          </ul>
          <video 
            src={`${BASE_PATH}/this-is-a-wrong-page.mp4`}
            controls
            className="w-full rounded-lg mt-8"
            poster={`${BASE_PATH}/game-ss-1.png`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    },
  },
  {
    id: "consentiq",
    category: "AI Policy Intelligence System",
    title: "ConsentIQ",
    src: `${BASE_PATH}/ConsentIO-1.jpg`,
    screenshots: [
      `${BASE_PATH}/ConsentIO-1.jpg`,
      `${BASE_PATH}/ConsentIQ-2.jpg`,
      `${BASE_PATH}/ConsentIQ-3.jpg`,
      `${BASE_PATH}/ConsentIQ-4.jpg`,
      `${BASE_PATH}/ConsentIQ-5.jpg`,
      `${BASE_PATH}/ConsentIQ-6.jpg`,
      `${BASE_PATH}/ConsentIQ-7.jpg`,
      `${BASE_PATH}/ConsentIQ-8.jpg`,
      `${BASE_PATH}/ConsentIQ-9.jpg`,
    ],
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.ocr,
        PROJECT_SKILLS.llm,
        PROJECT_SKILLS.semantic,
      ],
    },
    live: "https://github.com/Coder-Zaid/ConsentIQ",
    github: "https://github.com/Coder-Zaid/ConsentIQ",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI-Driven Policy & Consent Intelligence System
          </TypographyP>
          <TypographyP className="font-mono ">
            Built as part of Udgam 2.0 – Tensor v2, a national-level hackathon at Woxsen University, where our team was selected as Finalists. The entire system was designed and implemented within a 24-hour development window, focusing on real-world feasibility rather than demo-only features.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Problem Definition</TypographyH3>
          <TypographyP className="font-mono">
            Online privacy policies and terms & conditions are long, legally dense, and non-transparent. They are rarely read or understood by users, updated silently, and existing tools focus on legal compliance checks rather than user impact, clause risk, or interpretability.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">System Overview</TypographyH3>
          <TypographyP className="font-mono">
            ConsentIQ is a policy intelligence platform that analyzes legal documents end-to-end and converts them into structured clauses, risk-weighted insights, plain-English explanations, and visual risk indicators. The system operates in offline-first mode, ensuring privacy, security, and low-latency analysis.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li><strong>Data Ingestion Layer:</strong> Web-based policies via browser navigation and document-based policies (PDFs, scanned images)</li>
            <li><strong>OCR & Text Normalization:</strong> Local OCR pipeline using EasyOCR/Tesseract with confidence scoring</li>
            <li><strong>Clause Segmentation Engine:</strong> Heuristic-based splitting and semantic boundary detection</li>
            <li><strong>AI Risk Detection:</strong> Local LLM analyzes clauses for arbitration, data sharing, liability waivers, and more</li>
            <li><strong>Weighted Risk Scoring:</strong> Deterministic + AI-assisted model with 0-100 risk scoring system</li>
            <li><strong>Clause Fingerprinting:</strong> Semantic similarity to identify recurring problematic clauses</li>
            <li><strong>Personalization:</strong> Auto-rejection logic based on user preferences and keywords</li>
            <li><strong>Admin Dashboard:</strong> Standalone Next.js 14 dashboard with analytics and reporting</li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Risk Scoring System</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li>Arbitration clauses: +25 points</li>
            <li>Third-party data sharing: +20 points</li>
            <li>Liability waiver: +20 points</li>
            <li>Indefinite data retention: +15 points</li>
            <li>Government data access: +10 points</li>
            <li>🟢 Safe (0-30) 🟡 Risky (31-60) 🔴 Dangerous (61-100)</li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <ul className="list-disc ml-6 font-mono">
            <li><strong>Frontend:</strong> Next.js 14 (App Router), TypeScript, Vanilla CSS</li>
            <li><strong>AI & ML:</strong> Local LLM (offline inference), EasyOCR/Tesseract OCR, Semantic clause analysis</li>
            <li><strong>System Design:</strong> Offline-first architecture, Privacy-preserving local processing</li>
          </ul>
          <SlideShow
            images={[
              `${BASE_PATH}/ConsentIO-1.jpg`,
              `${BASE_PATH}/ConsentIQ-2.jpg`,
              `${BASE_PATH}/ConsentIQ-3.jpg`,
              `${BASE_PATH}/ConsentIQ-4.jpg`,
              `${BASE_PATH}/ConsentIQ-5.jpg`,
              `${BASE_PATH}/ConsentIQ-6.jpg`,
              `${BASE_PATH}/ConsentIQ-7.jpg`,
              `${BASE_PATH}/ConsentIQ-8.jpg`,
              `${BASE_PATH}/ConsentIQ-9.jpg`,
            ]}
          />
        </div>
      );
    },
  },
];
export default projects;
