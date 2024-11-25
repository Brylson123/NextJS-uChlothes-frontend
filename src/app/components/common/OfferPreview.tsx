import React, { useEffect, useState } from 'react';
import Image from "next/image";
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
interface OfferPreviewProps {
    formData: FormDataState;
}

const OfferPreview: React.FC<OfferPreviewProps> = ({ formData }) => {
    const { name, description, price, clothingCategory, gender, size, imageFile, imageName } = formData;
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(imageFile);
        } else if (imageName) {
            setImagePreview(`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${imageName}`);
        } else {
            setImagePreview('');
        }
    }, [imageFile, imageName]);

    return (
        <div className="border p-4 rounded-lg shadow-lg w-full">
            {imagePreview ? (
                <Image src={imagePreview} alt="Offer Image" width={500} height={300} className="w-full h-96 object-contain mb-4 rounded-lg" />
            ) : (
                <div className="w-full h-96 flex items-center justify-center text-gray-400">
                    No image available
                </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{name || 'Offer Name'}</h3>
            <p className="text-gray-700 mb-1">Size: {size || 'Size'}</p>
            <p className="text-gray-500 mb-4">{description || 'Offer Description'}</p>
            <p className="text-xl font-bold mb-4">{price ? `${price} zł` : 'Price'}</p>
            <p className="text-gray-700 mb-1">Category: {clothingCategory || 'Category'}</p>
            <p className="text-gray-700 mb-4">Gender: {gender || 'Gender'}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Buy Now</button>
        </div>
    );
};

export default OfferPreview;
