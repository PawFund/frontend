'use client';
import { useEffect } from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Uncaught error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Something went wrong!
                </h1>
                <p className="text-gray-600 mb-4">
                    {error.message || 'An unexpected error occurred'}
                </p>
                <button
                    onClick={reset}
                    className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}