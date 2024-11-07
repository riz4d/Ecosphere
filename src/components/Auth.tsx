"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

import { ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAuthComponent = (props: P) => {
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

    WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuthComponent;
};

export default withAuth;
