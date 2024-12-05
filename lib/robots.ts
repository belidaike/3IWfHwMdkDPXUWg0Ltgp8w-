export default function robots() {
    return `
        User-agent: *
        Allow: /
        Disallow: /admin/
        Sitemap: https://5hop5martly.vercel.app/sitemap.xml
    `;
}
