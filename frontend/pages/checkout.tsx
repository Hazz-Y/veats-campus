// VEats — Checkout Page (dark theme)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import PickupModal from '../components/PickupModal';

export default function CheckoutPage() {
    const router = useRouter();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showPickup, setShowPickup] = useState(false);
    const [pickupCode, setPickupCode] = useState('');
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        const t = localStorage.getItem('veats_checkout_total');
        if (t) setTotal(parseInt(t, 10));
        else router.push('/cart');
    }, []);

    const handlePay = async () => {
        setLoading(true);
        // TODO: Integrate PhonePe payment gateway
        // Simulating payment + order creation
        await new Promise(r => setTimeout(r, 1500));

        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const id = 'ORD-' + Date.now().toString(36).toUpperCase();

        setPickupCode(code);
        setOrderId(id);
        setShowPickup(true);
        setLoading(false);

        // Clear cart
        localStorage.removeItem('veats_cart');
        localStorage.removeItem('veats_checkout_total');
    };

    return (
        <div className="app-container">
            <Navbar />

            <div className="page-content" style={{ paddingTop: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>Checkout</h2>

                {/* Payment Summary */}
                <div className="glass-card animate-fade-in-up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '24px' }}>💳</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '15px' }}>Payment</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PhonePe • UPI • Cards</div>
                        </div>
                    </div>

                    <div className="bill-summary" style={{ background: 'var(--bg-elevated)', marginTop: '0' }}>
                        <div className="bill-row total" style={{ border: 'none', paddingTop: '0', marginTop: '0' }}>
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                </div>

                {/* Pickup Info */}
                <div className="glass-card animate-fade-in-up" style={{ marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>📦</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '15px' }}>Pickup from Counter</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Show QR code at the cafe counter to collect</div>
                        </div>
                    </div>
                </div>

                {/* Pay Button */}
                <button
                    className="checkout-btn"
                    style={{ marginTop: '24px', position: 'relative' }}
                    onClick={handlePay}
                    disabled={loading}
                >
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                            Processing...
                        </span>
                    ) : (
                        `Pay ₹${total}`
                    )}
                </button>

                {/* Secure payment note */}
                <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    🔒 Secured by PhonePe Sandbox
                </div>
            </div>

            {/* Pickup Modal */}
            {showPickup && (
                <PickupModal
                    orderId={orderId}
                    pickupCode={pickupCode}
                    onClose={() => router.push('/orders')}
                />
            )}
        </div>
    );
}
