"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useRouter } from 'next/navigation';  


import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); 
  const { setUser } = useContext(UserContext);

  
  const handleLogout = () => {
      setUser(null);  
      localStorage.removeItem('user');  
      router.push('/');  

    
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" bg-gray-800 p-4 fixed w-full mb-8">
      <div className="container mx-auto flex items-center justify-between">
        
        
        <button
          className="sm:hidden text-white"
          onClick={toggleMenu}
        >
          {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>


        <div className={`absolute top-14 left-0 right-0 bg-gray-1000 sm:static ${isOpen ? 'block' : 'hidden'} sm:flex`}>
          <NavigationMenu>
            <NavigationMenuList className={`flex flex-col sm:flex-row sm:space-x-4 ${isOpen ? 'space-y-4' : 'space-y-0'}`}>
              <NavigationMenuItem className={`transition-all ${isOpen ? 'h-8' : ''}`}>
                <NavigationMenuLink href="/dashboard" className="text-white hover:text-gray-400 flex items-center justify-center h-full">
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className={`transition-all ${isOpen ? 'h-8' : ''}`}>
                <NavigationMenuLink href="/notifications" className="text-white hover:text-gray-400 flex items-center justify-center h-full">
                  Notifications
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>


        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-black border-red-500 border hover:bg-red-500 hover:text-white"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default MyNavbar;
 