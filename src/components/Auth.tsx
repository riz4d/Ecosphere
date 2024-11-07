"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

import { ComponentType } from 'react';

const withAuth = (WrappedComponent: ComponentType) => {
    return (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
            if (!accessToken) {
                router.replace('/login');
            } else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
