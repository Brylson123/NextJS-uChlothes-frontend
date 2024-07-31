'use client'
import React, {useState} from 'react';
import OfferForm from '@/app/components/common/OfferForm';
import OfferPreview from '@/app/components/common/OfferPreview';

export interface FormDataState {
    name: string;
    description: string;
    imageName?: string;
    imageFile: File | null;
    price: string;
    clothingCategory: string;
    url: string;
    gender: string;
    size: string;
}
export default function AddOfferForm() {
    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        description: '',
        imageFile: null,
        imageName: '',
        price: '',
        clothingCategory: '',
        url: '',
        gender: '',
        size: ''
    });
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        if (formData.imageFile) data.append('image', formData.imageFile);
        data.append('price', formData.price);
        data.append('clothingCategory', formData.clothingCategory);
        data.append('url', formData.url);
        data.append('gender', formData.gender);
        data.append('size', formData.size);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/add`, {
                method: 'POST',
                body: data as any,
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.success) {
                setSuccess(true);
            } else {
                setError('Failed to add the offer.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while adding the offer.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8 flex space-x-8">
            <div className="w-1/2">
                <h2 className="text-2xl font-bold mb-6">Add New Offer</h2>
                {success && <p className="text-green-500 mb-4">Offer added successfully!</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <OfferForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} action="add" />
            </div>
            <div className="w-1/2">
                <h2 className="text-2xl font-bold mb-6">Offer Preview</h2>
                <OfferPreview formData={formData} />
            </div>
        </div>
    );
}