// VEats — Navbar: Logo + Wallet + Profile + Bottom Nav with Lucide icons
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';
import { IconHome, IconCart, IconOrders, IconNutrition } from './Icons';

export default function Navbar() {
    const router = useRouter();
    const path = router.pathname;
    const { isDark } = useTheme();
    const { balance } = useWallet();
    const [cartCount, setCartCount] = useState(0);

    // Sync cart count from localStorage
    useEffect(() => {
        const read = () => {
            const cart = JSON.parse(localStorage.getItem('veats_cart') || '[]');
            setCartCount(cart.reduce((s: number, i: any) => s + (i.quantity || 1), 0));
        };
        read();
        window.addEventListener('storage', read);
        // Also poll so same-tab changes register
        const id = setInterval(read, 800);
        return () => { window.removeEventListener('storage', read); clearInterval(id); };
    }, []);

    const navItems = [
        { href: '/', label: 'Home', icon: <IconHome />, activeIcon: <IconHome strokeWidth={2.5} /> },
        { href: '/cart', label: 'Cart', icon: <IconCart />, activeIcon: <IconCart strokeWidth={2.5} />, badge: cartCount },
        { href: '/orders', label: 'Orders', icon: <IconOrders />, activeIcon: <IconOrders strokeWidth={2.5} /> },
        { href: '/nutrition', label: 'Nutrition', icon: <IconNutrition />, activeIcon: <IconNutrition strokeWidth={2.5} /> },
    ];

    return (
        <>
            {/* ══ Top Navbar ══ */}
            <nav className="navbar">
                {/* Left: Logo only — the image IS the brand */}
                <div className="navbar-left">
                    <Link href="/" className="navbar-logo">
                        <Image
                            src="/images/v_eats_logo.png"
                            alt="VEats"
                            width={90}
                            height={36}
                            style={{
                                objectFit: 'contain',
                                objectPosition: 'left center',
                                filter: isDark ? 'brightness(1)' : 'brightness(0)',
                                transition: 'filter 0.3s ease',
                                display: 'block',
                            }}
                        />
                    </Link>
                </div>

                {/* Right: Wallet + Profile */}
                <div className="navbar-right">
                    {/* Wallet Pill */}
                    <Link href="/wallet" className="wallet-pill">
                        <span className="coin-icon">🪙</span>
                        <span className="coin-amount">{balance.toLocaleString()}</span>
                        <span className="coin-label">VCoin</span>
                    </Link>

                    {/* Profile Avatar */}
                    <Link href="/profile" className="profile-avatar">
                        <span className="avatar-initials">H</span>
                    </Link>
                </div>
            </nav>

            {/* ══ Bottom Navigation ══ */}
            <nav className="bottom-nav">
                {navItems.map((item) => {
                    const isActive = path === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item${isActive ? ' active' : ''}`}
                        >
                            <div className="nav-icon-wrap">
                                {isActive ? item.activeIcon : item.icon}
                                {item.badge && item.badge > 0 ? (
                                    <span className="nav-badge">{item.badge > 9 ? '9+' : item.badge}</span>
                                ) : null}
                            </div>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
