'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import AuthHeader from '../components/authHeader';

export default function RegisterPage() {
    const router = useRouter();
    return (
        <div className="w-full h-full rounded-xl flex justify-start flex-col">
            <AuthHeader onBack={() => router.push('/auth/login')} authtitle="Create an account" authslogan="Taste the Passion in Every Dish" />
            <div className="w-full h-4/5 bg-transparent !p-5 flex-nesw">
                <div className='w-full h-full flex-nesw'>
                    <form action="" className='w-full h-max flex-nesw flex-col !p-5 gap-4 text-center'>
                            <input type="text" placeholder="Username" className="inputStyle" />
                            <input type="text" placeholder="Display name" className="inputStyle" />
                            <input type="password" placeholder="Password" className="inputStyle" />
                            <input type="password" placeholder="Confirm your password" className="inputStyle" />
                            <input type="text" placeholder="Phone Number" className="inputStyle" />
                            <button type="submit" className="w-full bg-accent hover:bg-red-700 text-white font-bold text-lg rounded-xl !p-4 no-select cursor-pointer">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}