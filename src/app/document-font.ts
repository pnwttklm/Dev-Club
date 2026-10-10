import { Poppins } from 'next/font/google';

export const documentFont = Poppins({
  variable: '--font-poppins', subsets: ['latin'], weight: ['400', '500', '600', '700'],
  display: 'swap', preload: false,
});
