import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AdminOfferCardProps {
    id: string;
    name: string;
    imageName: string;
    price: number;
    onDelete: (id: string) => void;
}

const AdminOfferCard: React.FC<AdminOfferCardProps> = ({ id, name, imageName, price, onDelete }) => {
    const router = useRouter();
    const imageUrl = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${imageName}`;
    const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

    const handleEdit = () => {
        router.push(`/admin/edit/${id}`);
    };

    const handleDelete = () => {
        onDelete(id);
        setDeleteConfirmationVisible(false);
    };

    return (
        <div className="relative">
            {isDeleteConfirmationVisible && (
                <DeleteConfirmation
                    onCancel={() => setDeleteConfirmationVisible(false)}
                    onConfirm={handleDelete}
                />
            )}
            <div className={`border p-4 rounded-lg shadow-lg h-full flex flex-col justify-between ${isDeleteConfirmationVisible ? 'filter blur-sm' : ''}`}>
                <div>
                    <div className="w-full h-64 relative mb-4">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-lg font-bold mb-4">{price.toFixed(2)} zł</p>
                </div>
                <div className="flex justify-between mt-auto">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleEdit}>
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => setDeleteConfirmationVisible(true)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmation: React.FC<{ onCancel: () => void; onConfirm: () => void }> = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this item?</p>
                <div className="mt-6 flex justify-end">
                    <button className="bg-gray-300 text-black px-4 py-2 rounded-lg mr-2" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminOfferCard;
