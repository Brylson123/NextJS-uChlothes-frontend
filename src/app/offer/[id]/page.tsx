'use client';
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import Nav from '@/app/components/layouts/Nav';
import Image from 'next/image';

interface Offer {
    id: string;
    name: string;
    description: string;
    imageName: string;
    price: number;
    clothingCategory: string;
    url: string;
    gender: string;
    size: string;
}

const OfferDetail: React.FC = () => {
    const {id} = useParams();
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setOffer(data.offer);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            }
            finally {
                setLoading(false);
            }
        })();

    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">Error: {error}</h1>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">Offer not found</h1>
            </div>
        );
    }

    return (
        <div>
            <Nav setCategory={() => {}}/>
            <div className="max-w-7xl mx-auto py-8 flex">
                <div className="w-1/2">
                    <Image
                        src={`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${offer.imageName}`}
                        alt={offer.name}
                        width={600}
                        height={600}
                        className="object-contain"
                    />
                </div>
                <div className="w-1/2 ml-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">{offer.name}</h2>
                    <h2 className="text-xl font-bold mb-4">size: {offer.size}</h2>
                    <p className="text-xl text-gray-500 mb-4">{offer.description}</p>
                    <p className="text-2xl font-bold mb-4">{offer.price.toFixed(2)}zł</p>
                    <p className="text-lg mb-4">Category: {offer.clothingCategory}</p>
                    <p className="text-lg mb-4">Gender: {offer.gender}</p>
                    <a href={offer.url} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center">Buy Now</a>
                </div>
            </div>
        </div>
    );
}
export default OfferDetail;
