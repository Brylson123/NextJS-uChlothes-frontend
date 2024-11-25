/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'next-js-u-clothes-frontend.vercel.app',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: `spring-boot-app-485887907071.europe-west2.run.app`,
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;