
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropDown from "@/components/UserDropDown";



const Header = () => {
    return (
        <header className="sticky top-0 bg-black text-white">
            <div className="container flex items-center justify-between py-4">
                {/* Логотип */}
                <Link href="/">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="Signalist logo"
                        width={140}
                        height={32}
                        className="h-8 w-auto cursor-pointer"
                    />
                </Link>

                {/* Навигация */}
                <nav className="hidden sm:block">
                    <NavItems />
                </nav>

                <UserDropDown/>

            </div>

        </header>
    );
};

export default Header;
