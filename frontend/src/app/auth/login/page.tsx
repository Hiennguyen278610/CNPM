'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import AuthHeader from '../components/authHeader';
import LegendCenter from '@/components/lgendCenter';
import GoogleOpt from '@/app/auth/components/googleOpt';
import LocalOpt from '@/app/auth/components/localOpt';

export default function LoginPage() {
    const router = useRouter();
    return (
        <div className="w-full h-full rounded-xl flex flex-col justify-between">
            <AuthHeader onBack={() => router.push('/')} authtitle="Login your account" authslogan="20% Off Your First Ride – Why Not?" />
            <div className="w-full h-4/5 bg-transparent md:!p-5 flex-nesw">
                <div className='w-full h-full flex-nesw'>
                    <form action="" className='w-full h-max flex-nesw flex-col !p-5 gap-4'>
                            <input type="text" placeholder="Username" className="inputStyle" />
                            <input type="password" placeholder="Password" className="inputStyle" />
                            <button type="submit" className="w-full loginBtn no-select">Login</button>
                            <LegendCenter title="Or" />
                            <div className='flex flex-row w-full gap-4'>
                                <GoogleOpt title="Login with Google" onClick={() => router.push('/')} />
                                <LocalOpt title="Register" onClick={() => router.push('/auth/register')} />
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}