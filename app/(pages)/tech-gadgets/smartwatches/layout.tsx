import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Smartwatches",
    description: "Stay connected and track your fitness with the latest smartwatches. Compare features and shop smartly with trusted links.",
    openGraph: {
        title: "Smartwatches",
        description: "Find the perfect smartwatch for your needs with in-depth reviews and the best deals.",
        images: "/smartwatches-og-image.jpg", // Replace with a relevant image
        url: `https://5hop5martly.vercel.app/tech-gadgets/smartwatches`,
    },

};

interface SmartwatchesLayoutProps {
    children: React.ReactNode;
}

export default function SmartwatchesLayout({ children }: SmartwatchesLayoutProps) {
    return (
        <section className="flex flex-col gap-4 p-4">
            {children}
        </section>
    );
}
