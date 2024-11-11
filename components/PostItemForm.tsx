import { useState } from 'react';

const PostItemForm = () => {
    const [formData, setFormData] = useState({
        pname: '',
        brand: '',
        allcategory: '',
        category: '',
        description: '',
        price: '',
        alink: '',
    });
    const [image, setImage] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            alert('Please select an image');
            return;
        }

        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataObj.append(key, value);
        });
        formDataObj.append('img', image);

        try {
            const response = await fetch('/api/postitems', {
                method: 'POST',
                body: formDataObj,
            });

            if (response.ok) {
                alert('Post item created successfully!');
            } else {
                console.error('Failed to create post item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-item-form">
            <input type="text" name="pname" placeholder="Product Name" onChange={handleInputChange} required />
            <input type="text" name="brand" placeholder="Brand" onChange={handleInputChange} required />
            <input type="text" name="allcategory" placeholder="All Category" onChange={handleInputChange} required />
            <input type="text" name="category" placeholder="Category" onChange={handleInputChange} required />
            <textarea name="description" placeholder="Description" onChange={handleInputChange} required></textarea>
            <input type="text" name="price" placeholder="Price" onChange={handleInputChange} required />
            <input type="text" name="alink" placeholder="Affiliate Link" onChange={handleInputChange} required />
            <input type="file" accept="image/*" onChange={handleFileChange} required />
            <button type="submit">Create Post Item</button>
        </form>
    );
};

export default PostItemForm;
