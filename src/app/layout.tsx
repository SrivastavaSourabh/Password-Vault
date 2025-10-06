import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Password Generator + Secure Vault',
  description: 'Generate strong passwords and store them securely in your personal vault',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 min-h-screen text-white">
        {children}
      </body>
    </html>
  );
}
