import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

const ProtectedRoute = (WrappedComponent) => {
    return (props) => {
        const { user, loading } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push('/login');
            }
        }, [user, loading, router]);

        if (loading || !user) {
            return <p className="mt-10 text-center">Loading...</p>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default ProtectedRoute;
