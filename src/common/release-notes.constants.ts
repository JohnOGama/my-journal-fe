import {
  BookOpen,
  Search,
  BarChart3,
  User,
  Shield,
  Zap,
  Code,
  Smartphone,
  Server,
  LucideIcon,
} from "lucide-react";

export interface ReleaseNoteFeature {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export interface TechStackCategory {
  title: string;
  icon: LucideIcon;
  sections: {
    title: string;
    items: string[];
  }[];
}

export interface ReleaseNoteData {
  version: string;
  releaseDate: string;
  overview: string;
  features: ReleaseNoteFeature[];
  frontendTech: TechStackCategory;
  backendTech: TechStackCategory;
  devTools: TechStackCategory;
  apiFeatures: string[];
  databaseFeatures: string[];
}

export const RELEASE_NOTES_DATA: ReleaseNoteData = {
  version: "1.0.1",
  releaseDate: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  overview:
    "Welcome to My Journal 1.0.1! This is our initial release, bringing you a modern, feature-rich journaling experience with AI-powered insights, comprehensive analytics, and a beautiful, responsive interface. This release includes everything you need to start your digital journaling journey.",
  features: [
    {
      title: "Journal Management",
      icon: BookOpen,
      items: [
        "Create, read, update, and delete journal entries",
        "Rich text editor for formatting journal entries",
        "Soft delete functionality for data recovery",
        "Mood tracking with 15 different mood options",
        "Automatic timestamp tracking for entries",
        "Progress tracking system (20 journals to unlock AI features)",
      ],
    },
    {
      title: "Advanced Search",
      icon: Search,
      items: [
        "Full-text search across journal titles and content",
        "PostgreSQL full-text search with GIN indexing",
        "Vector AI search with Google Gemini embeddings (3072 dimensions)",
        "Semantic search using cosine similarity for natural language queries",
        "Real-time search results with highlighting",
        "Query-based filtering and sorting",
      ],
    },
    {
      title: "Analytics & Insights",
      icon: BarChart3,
      items: [
        "AI-powered weekly summaries using Google Gemini",
        "Entry frequency tracking by date",
        "Average word count per entry",
        "Monthly analytics with customizable date ranges",
        "Mood analysis and trends visualization",
        "7-day cooldown period for AI summary generation",
      ],
    },
    {
      title: "AI-Powered Features",
      icon: Zap,
      items: [
        "Google Gemini AI integration for intelligent summaries",
        "Weekly journal entry analysis and insights",
        "Embedding support for semantic search capabilities",
        "Progressive unlock system (complete 20 journals to access)",
      ],
    },
    {
      title: "Authentication & Security",
      icon: Shield,
      items: [
        "Secure user registration and login",
        "Better Auth integration with email/password authentication",
        "Session management with secure cookies",
        "Protected routes with authentication guards",
        "Rate limiting to prevent abuse (100 requests per minute)",
        "Helmet.js security headers for enhanced protection",
      ],
    },
    {
      title: "User Profile",
      icon: User,
      items: [
        "User profile management",
        "Personalized dashboard with user statistics",
        "Progress tracking and achievement system",
      ],
    },
    {
      title: "Additional Features",
      icon: Zap,
      items: [
        "Dark mode support with theme switching",
        "Responsive design for mobile, tablet, and desktop",
        "Email notifications powered by SendGrid",
        "File storage integration with AWS S3",
        "Payment integration ready (Stripe & Xendit)",
        "Product management system",
        "PostgreSQL notification listener for real-time updates",
        "Interactive API documentation with Swagger UI",
      ],
    },
  ],
  frontendTech: {
    title: "Frontend",
    icon: Smartphone,
    sections: [
      {
        title: "Framework & Language",
        items: ["Next.js 16", "React 19", "TypeScript 5"],
      },
      {
        title: "Styling",
        items: ["TailwindCSS 4", "Radix UI", "Lucide Icons", "next-themes"],
      },
      {
        title: "State Management",
        items: ["Zustand", "TanStack Query", "React Hook Form"],
      },
      {
        title: "UI Components",
        items: [
          "Radix UI Primitives",
          "Vaul (Drawers)",
          "Sonner (Toasts)",
          "react-day-picker",
        ],
      },
      {
        title: "Authentication",
        items: ["Better Auth"],
      },
      {
        title: "Utilities",
        items: [
          "nuqs (URL state)",
          "class-variance-authority",
          "clsx & tailwind-merge",
        ],
      },
    ],
  },
  backendTech: {
    title: "Backend",
    icon: Server,
    sections: [
      {
        title: "Framework & Language",
        items: ["NestJS 11", "TypeScript 5.7", "Node.js"],
      },
      {
        title: "Database",
        items: ["PostgreSQL", "Drizzle ORM", "Drizzle Kit"],
      },
      {
        title: "Authentication",
        items: ["Better Auth", "@thallesp/nestjs-better-auth"],
      },
      {
        title: "AI & Services",
        items: ["Google Gemini AI", "SendGrid (Email)", "AWS S3"],
      },
      {
        title: "Security & Performance",
        items: ["Helmet.js", "Throttler", "Compression", "Cookie Parser"],
      },
      {
        title: "Documentation",
        items: ["Swagger/OpenAPI", "@nestjs/swagger"],
      },
    ],
  },
  devTools: {
    title: "Development Tools",
    icon: Code,
    sections: [
      {
        title: "Code Quality",
        items: ["ESLint", "Prettier", "TypeScript ESLint"],
      },
      {
        title: "Git Hooks",
        items: ["Husky", "lint-staged"],
      },
      {
        title: "Testing",
        items: ["Jest", "Supertest", "ts-jest"],
      },
      {
        title: "Build Tools",
        items: ["SWC", "ts-loader", "tsconfig-paths"],
      },
    ],
  },
  apiFeatures: [
    "RESTful API architecture with NestJS",
    "Global API prefix: /api/v1",
    "Comprehensive API documentation with Swagger UI",
    "Request validation with class-validator and class-transformer",
    "MessagePack support for binary serialization (optional)",
    "Event-driven architecture with NestJS Event Emitter",
    "PostgreSQL LISTEN/NOTIFY for real-time database events",
  ],
  databaseFeatures: [
    "PostgreSQL relational database",
    "Drizzle ORM for type-safe database operations",
    "Database migrations with Drizzle Kit",
    "Full-text search with GIN indexes",
    "Soft delete pattern for data recovery",
    "Drizzle Studio for visual database management",
    "Foreign key constraints and cascading deletes",
  ],
};
