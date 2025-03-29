import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Palette } from 'lucide-react';

export const LogoHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-out',
                scrolled ? 'glass' : 'bg-transparent'
            )}
        >
            <div className="container flex justify-between items-center pt-2 ml-4">
                <Link to="/" className="flex items-center gap-2">
                    <Palette className="h-6 w-6 text-blue-600" />
                    <span className="font-display font-medium text-xl">ColorValidator</span>
                </Link>
                <div className="flex items-center gap-4">
                    {/* <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex"
                    >
                        Sign In
                    </Button> */}
                    <Button onClick={()=>navigate('/packaging-color')} size="sm" className='cursor-pointer'>Get Started</Button>
                </div>
            </div>
        </header>
    );
};