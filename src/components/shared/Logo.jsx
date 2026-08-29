import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <div>
            <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2"
            >
                {/* VitaForge Logo */}

                <Image
                    src='/logo.png'
                    alt='logo'
                    width={40}
                    height={40}
                    className="w-9 h-9"
                />


                <h3 className="font-display text-xl font-black text-foreground tracking-tight">
                    Vita
                    <span className="font-body text-primary">Forge</span>
                </h3>
            </Link>
        </div>
    );
};

export default Logo;