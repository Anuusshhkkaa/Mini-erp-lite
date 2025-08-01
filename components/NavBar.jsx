'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const linkClass = (path) =>
    `px-4 py-2 rounded ${pathname === path ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}`;

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex space-x-4">
        <Link href="/" className={linkClass('/')}>Dashboard</Link>
        <Link href="/products" className={linkClass('/products')}>Products</Link>
        <Link href="/suppliers" className={linkClass('/suppliers')}>Suppliers</Link>
        <Link href="/transactions" className={linkClass('/transactions')}>Transactions</Link>
      </div>
    </nav>
  );
}
