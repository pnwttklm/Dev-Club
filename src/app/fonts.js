import { 
  IBM_Plex_Sans_Thai_Looped,
  Roboto_Mono,
} from 'next/font/google';

export const IBM_Thai = IBM_Plex_Sans_Thai_Looped({
  weight: ['100','200','300','400','500','600','700'],
  subsets: ['latin'],
  display: 'swap'
});


// TEST FONT
// export const Roboto_mono = Roboto_Mono({
//   weight: ['100','700'],
//   subsets: ['latin'],
//   display: 'swap'
// })