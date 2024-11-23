import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PostItem {
    _id: string;
    pname: string;
    brand: string;
    category: string;
    allcategory: string;
    description: string;
    price: string;
    alink: string;
    img: string;
}

// Fetch the post data directly in the page component
export const fetchPost = async (id: string): Promise<PostItem | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postitems?id=${id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
};

// Server-side rendering metadata generation
export async function generateMetadata({ params }: { params: { id: string } }) {
    const postItem = await fetchPost(params.id);

    return {
        title: `${postItem?.pname || "Product"} - Shop Smartly`,
        description: `Buy ${postItem?.pname || "Product"} by ${postItem?.brand}. Explore the best deals and reviews.`,
        openGraph: {
            title: `${postItem?.pname || "Product"} - Shop Smartly`,
            description: `Buy ${postItem?.pname || "Product"} by ${postItem?.brand}. Explore the best deals and reviews.`,
            images: postItem?.img || "/default-og-image.jpg",
            url: `https://5hop5martly.vercel.app/tech-gadgets/${postItem?._id}`,
        },
    };
}

// Post page component for dynamic post data rendering
export default async function Laptop_Computer({ params }: { params: { id: string } }) {
    const postItem = await fetchPost(params.id);

    if (!postItem) {
        return <p className="text-center not-found text-center mt-5">Post not found</p>;
    }

    return (
        <div className="post-container">
            {/* Product Image and Details */}
            <div className="post-header">
                <img
                    src={postItem.img}
                    alt={postItem.pname}
                    className="post-image"
                />
                <div className="post-info">
                    <h1 className="post-title">{postItem.pname}</h1>
                    <p className="post-brand">Brand: {postItem.brand}</p>
                </div>
            </div>

            {/* Product Description and Buy Section */}
            <div className="post-details">
                <p className="post-price">₱{postItem.price}</p>
                <p className="post-description">{postItem.description}</p>

                <Button>
                    <Link target="_blank" rel="noopener noreferrer" href={postItem.alink}>Buy Now</Link>
                </Button>
            </div>
        </div>
    );
}
