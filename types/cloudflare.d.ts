// Extend CloudflareEnv with our D1 database binding
// This provides TypeScript autocomplete for env.TUTORIA_LEADS_DB

declare global {
  interface CloudflareEnv {
    // Our D1 database for waitlist + demo leads
    TUTORIA_LEADS_DB: D1Database;
  }
}

export {};
