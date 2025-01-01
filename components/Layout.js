import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
            <ToastContainer />
        </>
    );
};

export default Layout;
