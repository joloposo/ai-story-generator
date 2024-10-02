'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { menu } from '@nextui-org/theme';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {
  const menuList = [
    { name: 'Home', link: '/' },
    { name: 'Create story', link: '/create-story' },
    { name: 'Explore stories', link: '/explore' },
    { name: 'About us', link: '/about-us' },
  ];

  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        ></NavbarMenuToggle>
        <NavbarBrand>
          <Image src='static/images/logo.svg' alt='Logo' width={40} height={40} />
          <h2 className='font-bold text-2xl text-primary ml-3'>Kidso Story</h2>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='center' className='hidden sm:flex'>
        {menuList.map((menu, index) => (
          <NavbarItem className='text-xl text-primary font-medium hover:underline mx-2' key={index}>
            <Link href={menu.link}>{menu.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <Link href={'/dashboard'}>
          <Button color='primary'>
            {isSignedIn ? 'Dashboard' : 'Get Started'}
          </Button>
        </Link>
        <UserButton />
      </NavbarContent>
      <NavbarMenu>
        {menuList.map((menu, index) => (
          <NavbarMenuItem key={index}>
            <Link href={menu.link}>{menu.name}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
