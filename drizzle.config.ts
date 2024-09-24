import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-story-generator_owner:Zv0QDBcIm9Cx@ep-blue-sky-a22gcd5g.eu-central-1.aws.neon.tech/ai-story-generator?sslmode=require'
  },
  verbose: true,
  strict: true,
})


