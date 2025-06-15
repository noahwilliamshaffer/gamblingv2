/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mvpvxsozylnboebsoxzn.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12cHZ4c296eWxuYm9lYnNveHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NDU4OTIsImV4cCI6MjA2NTQyMTg5Mn0.aMwXki9THR8hicMjUNv4HPdxQjbUcT64Tzx0mhEbN5w',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12cHZ4c296eWxuYm9lYnNveHpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTg0NTg5MiwiZXhwIjoyMDY1NDIxODkyfQ.UTkGWn3CvpRlyI56LT1TbKxx5DLApDz34S3yLzrfna8'
  }
}

module.exports = nextConfig 