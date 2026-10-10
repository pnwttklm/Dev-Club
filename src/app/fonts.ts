import { Poppins } from 'next/font/google';

export const bodyFont = Poppins({
  variable: '--font-poppins', subsets: ['latin'], weight: ['400', '500'],
  display: 'swap', preload: true,
});

