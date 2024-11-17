"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormData {
    pname: string;
    brand: string;
    allcategory: string;
    category: string;
    description: string;
    date: string;
    price: string;
    alink: string;
    img: File | null;
}

interface PostData {
    pname: string;
    brand: string;
    allcategory: string;
    category: string;
    description: string;
    date: string;
    price: string;
    alink: string;
}

export default function PostItemForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get("id");

    const [formData, setFormData] = useState<FormData>({
        pname: '',
        brand: '',
        allcategory: '',
        category: '',
        description: '',
        date: '',
        price: '',
        alink: '',
        img: null,
    });

    const [categories, setCategories] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const allCategories = {
        'Tech and Gadgets': [
            'Mobile Phones',
            'Laptops and Computers',
            'Smartwatches',
            'Audio and Headphones'
        ],
        'Beauty and Skincare': [
            'Skincare Essentials',
            'Makeup Tools & Kits',
            'Anti-Aging Products',
            'Hair Care'
        ],
        // Add other categories as needed
    };

    const brandOptions: string[] = [
        'mobilephones',
        'laptops',
        'smartwatches',
        'audio-headphones',
    ];

    // Fetch data by ID if it's in edit mode
    const fetchPostData = useCallback(async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/postitems/${id}`);
            const postData: PostData = await response.json();  // Type the response
            setFormData({
                pname: postData.pname || '',
                brand: postData.brand || '',
                allcategory: postData.allcategory || '',
                category: postData.category || '',
                description: postData.description || '',
                date: postData.date || '',
                price: postData.price || '',
                alink: postData.alink || '',
                img: null,
            });
            if (postData.allcategory in allCategories) {
                setCategories(allCategories[postData.allcategory as keyof typeof allCategories]);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Failed to fetch post data:", error);
        }
    }, []);

    useEffect(() => {
        if (postId) {
            setIsEditMode(true);
            fetchPostData(postId);
        }
    }, [postId, fetchPostData]);  // Add fetchPostData to the dependency array

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'allcategory') {
            setCategories(allCategories[value as keyof typeof allCategories] || []);
            setFormData((prev) => ({ ...prev, category: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, img: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formPayload = new FormData();
        (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
            const value = formData[key];
            formPayload.append(key, value instanceof File ? value : String(value || ''));
        });

        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/postitems/${postId}` : `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/postitems`;

        try {
            const response = await fetch(url, {
                method,
                body: formPayload,
            });

            if (response.ok) {
                alert(isEditMode ? 'Item updated successfully!' : 'Item created successfully!');
                router.push('/postitems'); // Adjust the redirect path as needed
            } else {
                alert(isEditMode ? 'Failed to update item.' : 'Failed to create item.');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">
                {isEditMode ? 'Edit Post Item' : 'Create Post Item'}
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
                <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                >
                    <option value="">Select Brand</option>
                    {brandOptions.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand.charAt(0).toUpperCase() + brand.slice(1).replace(/-/g, ' ')}
                        </option>
                    ))}
                </select>
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
                    type="text"
                    name="date"
                    placeholder="Product Date"
                    value={formData.date}
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
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    {isEditMode ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
