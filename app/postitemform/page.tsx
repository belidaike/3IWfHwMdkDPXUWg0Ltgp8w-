"use client";

import { useState } from 'react';

interface FormData {
    pname: string;
    brand: string;
    allcategory: string;
    category: string;
    description: string;
    price: string;
    alink: string;
    img: File | null;
}

export default function CreatePostItem() {
    const [formData, setFormData] = useState<FormData>({
        pname: '',
        brand: '',
        allcategory: '',
        category: '',
        description: '',
        price: '',
        alink: '',
        img: null,
    });

    const [categories, setCategories] = useState<string[]>([]);

    const allCategories = {
        'Beauty and Skincare': [
            'Skincare Essentials',
            'Makeup Tools & Kits',
            'Anti-Aging Products',
            'Hair Care',
        ],
        'Fashion and Accessories': [
            'Clothing',
            'Footwear',
            'Jewelry & Watches',
            'Bags & Wallets',
        ],
        'Health and Fitness': [
            'Fitness Equipment',
            'Supplements & Vitamins',
            'Wearable Tech',
            'Yoga & Meditation',
        ],
        'Home and Kitchen Appliances': [
            'Kitchen Appliances',
            'Home Essentials',
            'Cleaning Supplies',
            'Smart Home Devices',
        ],
        'Tech and Gadgets': [
            'Mobile Phones',
            'Laptops & Computers',
            'Smartwatches',
            'Audio & Headphones',
        ],
    };

    // Helper function to handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Update categories based on main category selection
        if (name === 'allcategory') {
            setCategories(allCategories[value as keyof typeof allCategories] || []);
            setFormData((prev) => ({ ...prev, category: '' }));
        }
    };

    // Handle file input change separately
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({
            ...prev,
            img: file,
        }));
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formPayload = new FormData();
        Object.keys(formData).forEach((key) => {
            formPayload.append(key, (formData as any)[key]);
        });

        const response = await fetch('/api/postitems', {
            method: 'POST',
            body: formPayload,
        });

        if (response.ok) {
            alert('Item created successfully!');
        } else {
            alert('Failed to create item.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Create Post Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="pname"
                    placeholder="Product Name"
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
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
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                ></textarea>

                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="text"
                    name="alink"
                    placeholder="Affiliate Link"
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
                    required
                />

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}
