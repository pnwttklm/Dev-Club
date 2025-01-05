import './globals.css'
import { Providers } from "./providers";
import Nav from '../components/nav'
import Footer from '../components/footer'
import { Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: 'Dev Club',
  description: 'Dev Club, ICT Mahidol',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="shortcut icon" href="favicon.ico" />
      <link rel="icon" href="icon.svg" />
      <link
      rel="apple-touch-icon"
        href="apple-icon.ico"
      />
      </head>
      <body className={poppins.className}>
 	      <Providers>
          <Nav/>
          {children}
          <Footer/>
      	</Providers>
      </body>
    </html>
    
  )
}

 