import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from './lib/authContext';
import { DateProvider } from './lib/dateContext';
import Footer from '@/components/Footer';

// const comfortaa = localFont({
//   src: './fonts/Comfortaa-VariableFont_wght.ttf',
//   variable: '--font-comfortaa',
//   weight: '100 900'
// });
const poppins = localFont({
  src: './fonts/Poppins-Regular.ttf',
  variable: '--font-poppins',
  weight: '100 900'
});

export const metadata = {
  title: 'Prodify',
  description: 'Handle your daily tasks with ease.',
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-background flex h-screen`}>
        {/* Hooks and Providers */}
        <AuthProvider>
          <DateProvider>
            {/* Main Layout */}
            <Navbar />

            {/* Main Content */}
            <main className="flex flex-col w-full bg-background overflow-y-auto">{children}</main>

            {/* Footer */}
            {/* <Footer /> */}
          </DateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
