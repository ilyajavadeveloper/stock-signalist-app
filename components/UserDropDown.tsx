import {Avatar, AvatarImage} from "@radix-ui/react-avatar";

"use-client";
import {useRouter} from "next/navigation";
import React from 'react';


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {AvatarFallback} from "@/components/ui/avatar";

const UserDropDown = () => {
    const router=useRouter();


    const handleSignOut =async () => {

        router.push("/sign-in");
    }

    const user ={name:'John', emails:'ilyajavadev@gmail.com'};


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>Open</DropdownMenuTrigger>
                <Button variant='ghost' className='flex items-center gap-3 text-shadow-gray-400 hover:text-yellow-400D'>

                    <Avatar>

                        <AvatarImage src='https://github.com.png'/>
                        <AvatarFallback>
                            CN
                        </AvatarFallback>


                    </Avatar>


                </Button>




                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserDropDown;