import { Link } from 'react-router-dom';
import React from 'react';
import { Palette } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 py-10 border-t border-border/40">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-7 h-7 relative overflow-hidden rounded-full">
                                <Palette className='text-blue-500' />
                            </div>
                            <span className="text-lg font-medium tracking-tight">ColorMatch</span>
                        </Link>
                        <p className="text-sm text-muted-foreground -ml-28">
                            Precision color validation for packaging and brand compliance.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Navigation</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Gallery', path: '/404' },
                                { name: 'About', path: '/about' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: 'Privacy Policy', path: '#' },
                                { name: 'Terms of Service', path: '#' },
                                { name: 'Cookies', path: '#' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} ColorValidator All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="#" className="hover:text-foreground transition-colors duration-200">Twitter</a>
                        <a href="#" className="hover:text-foreground transition-colors duration-200">GitHub</a>
                        <a href="#" className="hover:text-foreground transition-colors duration-200">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;