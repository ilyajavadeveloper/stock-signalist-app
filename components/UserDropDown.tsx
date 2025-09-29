"use client";
import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import NavItems from "@/components/NavItems";

const UserDropDown = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        router.push("/sign-in");
    }

    const user = {name: 'John', email: 'hvosr133@gmail.com'}

    return (
        <DropdownMenu>
            {/* Кнопка-триггер */}
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='flex items-center gap-3 text-gray-400 hover:text-yellow-500'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                        <AvatarFallback className='bg-yellow-500 text-yellow-900 text-sm font-bold'>
                            {user.name[0]}CN
                        </AvatarFallback>
                    </Avatar>
                    <div className='hidden md:flex flex-col items-start'>
                        <span className='text-md text-gray-300'>{user.name}</span>
                        <span className='text-sm text-gray-200'>{user.email}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            {/* Выпадающее меню */}
            <DropdownMenuContent className='text-gray-400 w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-gray-600'/>


                <DropdownMenuItem onClick={handleSignOut}
                                  className='text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-400 transition-colors cursor-pointer'>Log
                    Out

                    <LogOut className='h-4 w-4 mr-2 hidden sm:block'></LogOut>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='hidden:sm:block bg-gray-600'/>


                <nav className='sm:hidden'>
                    <NavItems/>


                </nav>
            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default UserDropDown;
