import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'Mini ERP Lite',
  description: 'Inventory management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <NavBar />
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}