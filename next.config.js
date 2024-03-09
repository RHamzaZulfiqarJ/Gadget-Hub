/** @type {import('next').NextConfig} */
const nextConfig = {
    Experimental: { serverActions: true },
}

module.exports = {
    images: {
        domains: ['api.slingacademy.com', 'fakestoreapi.com'],
    },
    nextConfig,
}
