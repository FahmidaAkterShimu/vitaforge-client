import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;