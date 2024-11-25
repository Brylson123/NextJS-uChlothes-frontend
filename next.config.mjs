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
                hostname: `${process.env.NEXT_PUBLIC_API_URL}`,
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;