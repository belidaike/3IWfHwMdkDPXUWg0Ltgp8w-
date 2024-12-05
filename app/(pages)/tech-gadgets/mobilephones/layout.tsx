import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Mobile - Shop Smartly",
    description: "Explore the latest tech and gadgets, including mobile phones, laptops, smartwatches, and more. Shop smartly with our trusted affiliate links.",
    openGraph: {
        title: "Mobile- Shop Smartly",
        description: "Discover trending gadgets and tech products with our trusted reviews and deals.",
        images: "/default-og-image.jpg", // Replace with a default OG image path
        url: `https://5hop5martly.vercel.app/tech-gadgets/mobilephones`,
    },

};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function TechGadgetsLayout({ children }: RootLayoutProps) {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
    );
}
