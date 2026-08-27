// import dns from "node:dns";
// dns.setServers(['8.8.8.8', '8.8.4.4']);

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Providers } from "@/providers/ThemeProvider";

const MainLayout = ({ children }) => {
    return (
        <Providers>
            <Navbar />
            <main className='min-h-screen'>
                {children}
            </main>
            <Footer />
        </Providers>
    );
};

export default MainLayout;