'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {DeviconGoogle} from '../components/logoGoogle';
import AuthHeader from '../components/authHeader';

export default function LoginPage() {
    const router = useRouter();
    return (
        <div className="w-full h-full rounded-xl flex-nesw flex-col">
            <AuthHeader onBack={() => router.push('/')} authtitle="Login your account" authslogan="20% Off Your First Ride – Why Not?" />
            <div className="w-full h-4/5 bg-transparent !p-5 flex-nesw">
                <div className='w-full h-full flex-nesw'>
                    <form action="" className='w-full h-max flex-nesw flex-col !p-5 gap-4 text-center'>
                            <input type="text" placeholder="Username" className="w-full rounded-xl !p-4 bg-secondary" />
                            <input type="password" placeholder="Password" className="w-full rounded-xl !p-4 bg-secondary" />
                            <button type="submit" className="w-full bg-accent hover:bg-red-700 text-white font-bold text-lg rounded-xl !p-4 no-select cursor-pointer">Login</button>
                            <div className="w-full flex-nesw gap-4">
                                <div className="h-px bg-dark flex-1"></div>
                                <legend className="text-center !text-sm text-gray-500 px-2">or</legend>
                                <div className="h-px bg-dark flex-1"></div>
                            </div>
                            <div className='flex flex-row w-full gap-4'>
                                <button type="button" className="w-full bg-light hover:bg-secondary text-dark font-bold text-lg rounded-xl !p-4 no-select 
                                cursor-pointer flex-nesw flex-row gap-2 border-1 border-dark  transition duration-300 ease-in-out transform hover:scale-105">
                                    <span className='w-max h-max'><DeviconGoogle/></span>
                                    <span className='w-max'>Login with Google</span>
                                </button>    
                                <button type="button" className="w-full bg-accent hover:bg-red-700 text-white font-bold text-lg rounded-xl !p-4 no-select 
                                cursor-pointer transition duration-300 ease-in-out transform hover:scale-105" onClick={() => router.push('/auth/register')}> Register</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}