// import { MetadataRoute } from "next";

// export default function robot(): MetadataRoute.Robots {
//     return {
//         rules: {
//             // all the user agents from all Search engines
//             userAgent: '*',
//             allow: ["/"],
//             disallow: []
//         },
//         sitemap: 'nizzyabi.com/sitemap.xml'
//     }
// }
export default function robots() {
    const baseUrl = "https://5hop5martly.vercel.app";

    return `
        User-agent: *
        Allow: /

        Sitemap: ${baseUrl}/sitemap.xml
    `;
}
