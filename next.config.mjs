/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DYNAMICS_CLIENT_ID: process.env.DYNAMICS_CLIENT_ID,
        DYNAMICS_CLIENT_SECRET: process.env.DYNAMICS_CLIENT_SECRET,
        DYNAMICS_TENANT_ID: process.env.DYNAMICS_TENANT_ID,
        DYNAMICS_URL: process.env.DYNAMICS_URL,
        DATABASE_URL: process.env.DATABASE_URL,
    },
};

export default nextConfig;
