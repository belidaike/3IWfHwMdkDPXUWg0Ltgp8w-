import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Tech and Gadgets",
    description: "Explore the latest tech and gadgets, including mobile phones, laptops, smartwatches, and more. Shop smartly with our trusted affiliate links.",
    openGraph: {
        title: "Tech and Gadgets",
        description: "Discover trending gadgets and tech products with our trusted reviews and deals.",
        images: "/default-og-image.jpg", // Replace with a default OG image path
        url: "https://yourwebsite.com/tech-gadgets", // Adjust to match your site's URL
    },

};
interface RootLayoutProps {
    children: React.ReactNode;
}
export default function tech_gadgets({ children }: RootLayoutProps) {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
    )
}

