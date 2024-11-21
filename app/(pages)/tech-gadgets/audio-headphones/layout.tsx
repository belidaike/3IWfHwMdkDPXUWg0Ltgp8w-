import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Audio and Headphones - Shop Smartly",
    description: "Upgrade your sound experience with the best audio devices, including headphones, earbuds, and speakers. Shop smartly with trusted links.",
    openGraph: {
        title: "Audio and Headphones - Shop Smartly",
        description: "Discover top-quality audio gear with reviews, ratings, and exclusive deals.",
        images: "/audio-headphones-og-image.jpg", // Replace with a relevant image
        url: `https://5hop5martly.vercel.app/tech-gadgets/audio-headphones`,
    },
    // twitter: {
    //     card: "summary_large_image",
    //     site: "@yourTwitterHandle", // Replace with your site's Twitter handle
    // },
};

interface AudioHeadphonesLayoutProps {
    children: React.ReactNode;
}

export default function AudioHeadphonesLayout({ children }: AudioHeadphonesLayoutProps) {
    return (
        <section className="flex flex-col gap-4 p-4">
            {children}
        </section>
    );
}
