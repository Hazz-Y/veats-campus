// VEats — App Shell with Theme + Wallet providers
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { WalletProvider } from '../contexts/WalletContext';

export default function VEatsApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <WalletProvider>
                <Head>
                    <title>VEats — VIT Chennai Campus Food</title>
                    <meta name="description" content="Queue-free campus food ordering for VIT Chennai. Order from Gazebo, North Square, AB cafes & more." />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
                    <meta name="theme-color" content="#121212" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                </Head>
                <Component {...pageProps} />
            </WalletProvider>
        </ThemeProvider>
    );
}
