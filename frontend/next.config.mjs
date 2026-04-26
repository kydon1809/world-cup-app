/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          // Tell Next.js: Catch any request going to /api/ on port 3000...
          source: '/api/:path*',
          // ...and secretly forward it to Python on port 8000!
          destination: 'http://localhost:8000/api/:path*',
        },
      ]
    },
  }
  
  export default nextConfig;