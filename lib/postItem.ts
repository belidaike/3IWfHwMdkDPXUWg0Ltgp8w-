export interface PostItem {
    _id: string;
    pname: string;
    brand: string;
    category: string;
    allcategory: string;
    description: string;
    price: string;
    alink: string;
    img: string;
    slug: string;
    updatedAt: string;
}
export const fetchAllPostItems = async (): Promise<PostItem[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postitems`);
        if (!response.ok) throw new Error("Failed to fetch post items");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching post items:", error);
        return [];
    }
};
