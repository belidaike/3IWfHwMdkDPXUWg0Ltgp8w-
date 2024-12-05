/** @type {import('next').NextConfig} */
export default {
    async rewrites() {
        return [
            {
                source: "/robots.txt",
                destination: "/api/robots",
            },
        ];
    },
};

