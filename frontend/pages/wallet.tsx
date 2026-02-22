// VEats — Wallet Page (VCoin balance + transaction history)
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useWallet } from '../contexts/WalletContext';
import { IconBack } from '../components/Icons';
import { useRouter } from 'next/router';

const transactions = [
    { type: 'earn', icon: '🛍️', title: 'Order at AB3 Cafe 1', sub: 'Today, 12:45 PM', amount: +60 },
    { type: 'earn', icon: '😊', title: 'Welcome Bonus', sub: 'VIT student join bonus', amount: +120 },
    { type: 'spend', icon: '🧾', title: 'Redeemed at Gazebo', sub: 'Yesterday, 7:30 PM', amount: -50 },
    { type: 'earn', icon: '🛍️', title: 'Order at North Square', sub: '3 days ago', amount: +40 },
    { type: 'earn', icon: '🎁', title: 'Referral Bonus', sub: '5 days ago', amount: +200 },
    { type: 'spend', icon: '🧾', title: 'Redeemed at AB2 Cafe', sub: '1 week ago', amount: -80 },
];

export default function WalletPage() {
    const { balance } = useWallet();
    const router = useRouter();

    return (
        <div className="app-container">
            <Navbar />
            <div className="page-content" style={{ paddingTop: '16px' }}>

                {/* Back + title row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <button
                        onClick={() => router.back()}
                        style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--text-primary)',
                        }}
                    >
                        <IconBack size={16} />
                    </button>
                    <h1 className="page-title" style={{ marginBottom: 0 }}>VCoin Wallet</h1>
                </div>

                {/* ── Balance Hero ── */}
                <div className="vcoin-hero animate-bounce-in">
                    <div className="balance-label">Current Balance</div>
                    <div className="balance-amount">{balance.toLocaleString()}</div>
                    <div className="balance-equiv">≈ ₹{(balance / 100).toFixed(2)} · 100 VCoin = ₹1</div>
                </div>

                {/* ── How to Earn ── */}
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px', color: 'var(--gold)' }}>
                        🪙 How to Earn VCoins
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { emoji: '🛍️', text: 'Place an order — earn 5% back in VCoins' },
                            { emoji: '🎁', text: 'Refer a friend — get 200 VCoins' },
                            { emoji: '⭐', text: 'Rate your meal — earn 10 VCoins' },
                            { emoji: '🔥', text: 'Order 3 days in a row — streak bonus 50 VCoins' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                                <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{item.emoji}</span>
                                <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Transaction History ── */}
                <div className="section-header">
                    <h2 style={{ fontSize: '15px' }}>Transaction History</h2>
                    <span className="count">{transactions.length} entries</span>
                </div>

                <div className="stagger">
                    {transactions.map((tx, i) => (
                        <div key={i} className="transaction-item">
                            <div className={`tx-icon ${tx.type}`}>{tx.icon}</div>
                            <div className="tx-meta">
                                <div className="tx-title">{tx.title}</div>
                                <div className="tx-sub">{tx.sub}</div>
                            </div>
                            <div className={`tx-amount ${tx.type}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    VCoins are non-transferable · Cannot be converted to cash
                </div>
            </div>
        </div>
    );
}
