import { 
  Instrument_Serif,
} from 'next/font/google';

// export const sarabun = Sarabun({
//   weight: ['100','200','300','400','500','600','700', '800'],
//   subsets: ['thai', 'latin'],
//   display: 'swap'
// });

export const sarabun = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  style: ['normal', 'italic']
});
