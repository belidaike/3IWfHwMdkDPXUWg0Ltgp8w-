import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Laptops and Computers - Shop Smartly",
    description: "Find the latest laptops, desktops, and computer accessories. Compare features, prices, and shop smartly with trusted affiliate links.",
    openGraph: {
        title: "Laptops and Computers - Shop Smartly",
        description: "Explore top laptops and desktops with detailed reviews and the best deals.",
        images: "/laptops-computers-og-image.jpg", // Replace with a relevant image
        url: `https://5hop5martly.vercel.app/tech-gadgets/laptops-computers`,
    },
    // twitter: {
    //     card: "summary_large_image",
    //     site: "@yourTwitterHandle", // Replace with your site's Twitter handle
    // },
};

interface LaptopsComputersLayoutProps {
    children: React.ReactNode;
}

export default function LaptopsComputersLayout({ children }: LaptopsComputersLayoutProps) {
    return (
        <section className="flex flex-col gap-4 p-4">
            {children}
        </section>
    );
}
