"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface FormData {
    pname: string;
    brand: string;
    allcategory: string;
    category: string;
    description: string;
    date: string;
    price: string;
    alink: string;
    img: File | string | null;
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function PostItemForm() {
    const router = useRouter();
    const { id: postId } = useParams();

    const [formData, setFormData] = useState<FormData>({
        pname: "",
        brand: "",
        allcategory: "",
        category: "",
        description: "",
        date: "",
        price: "",
        alink: "",
        img: null,
    });

    const [categories, setCategories] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const allCategories = {
        "Beauty and Skincare": [
            "Skincare Essentials",
            "Makeup Tools & Kits",
            "Anti-Aging Products",
            "Hair Care",
        ],
        "Fashion and Accessories": [
            "Clothing",
            "Footwear",
            "Jewelry & Watches",
            "Bags & Wallets",
        ],
        "Health and Fitness": [
            "Fitness Equipment",
            "Supplements & Vitamins",
            "Wearable Tech",
            "Yoga & Meditation",
        ],
        "Home and Kitchen Appliances": [
            "Kitchen Appliances",
            "Home Essentials",
            "Cleaning Supplies",
            "Smart Home Devices",
        ],
        "Tech and Gadgets": [
            "Mobile Phones",
            "Laptops & Computers",
            "Smartwatches",
            "Audio & Headphones",
        ],
    };

    useEffect(() => {
        if (postId && typeof postId === "string" && !isDataFetched) {
            setIsEditMode(true);
            fetchPostData(postId);
        }
    }, [postId, isDataFetched]);

    const fetchPostData = async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/api/postitems/${id}`);
            if (response.ok) {
                const postData = await response.json();
                setFormData({
                    pname: postData.pname || "",
                    brand: postData.brand || "",
                    allcategory: postData.allcategory || "",
                    category: postData.category || "",
                    description: postData.description || "",
                    date: postData.date || "",
                    price: postData.price || "",
                    alink: postData.alink || "",
                    img: postData.img || null,
                });

                if (postData.allcategory in allCategories) {
                    setCategories(
                        allCategories[postData.allcategory as keyof typeof allCategories]
                    );
                }

                setIsDataFetched(true);
            } else {
                console.error("Failed to fetch post data.");
            }
        } catch (error) {
            console.error("Error fetching post data:", error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "allcategory") {
            const mainCategory = value as keyof typeof allCategories;
            setCategories(allCategories[mainCategory] || []);
            setFormData((prev) => ({ ...prev, category: "" }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, img: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formPayload = new FormData();
        Object.keys(formData).forEach((key) => {
            const value = (formData as any)[key];
            formPayload.append(key, value instanceof File ? value : String(value));
        });

        const method = isEditMode ? "PUT" : "POST";
        const url = isEditMode
            ? `${BASE_URL}/api/postitems/${postId}`
            : "${BASE_URL}/api/postitems";

        const response = await fetch(url, {
            method,
            body: formPayload,
        });

        if (response.ok) {
            alert(
                isEditMode ? "Item updated successfully!" : "Item created successfully!"
            );
            router.push("/");
        } else {
            alert(
                isEditMode ? "Failed to update item." : "Failed to create item."
            );
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">
                {isEditMode ? "Edit Post Item" : "Create Post Item"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="pname"
                    placeholder="Product Name"
                    value={formData.pname}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <select
                    name="allcategory"
                    value={formData.allcategory}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                >
                    <option value="">Select Main Category</option>
                    {Object.keys(allCategories).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                >
                    <option value="">Select Subcategory</option>
                    {categories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                            {subCategory}
                        </option>
                    ))}
                </select>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="text"
                    name="alink"
                    placeholder="Affiliate Link"
                    value={formData.alink}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border p-2"
                />
                <input
                    type="text"
                    name="date"
                    placeholder="Product Date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    {isEditMode ? "Update" : "Submit"}
                </button>
            </form>
        </div>
    );
}
