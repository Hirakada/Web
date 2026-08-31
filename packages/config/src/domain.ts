export const DOMAIN = {
  web:
    process.env.NEXT_PUBLIC_WEB_URL ??
    "http://localhost:3000",

  portfolio:
    process.env.NEXT_PUBLIC_PORTFOLIO_URL ??
    "http://localhost:3000",
} as const;