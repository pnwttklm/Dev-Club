import './globals.css'
import { Provider } from "../components/ui/provider";
import Nav from '../components/nav'
import Footer from '../components/footer'
import { bodyFont } from './fonts';

export const metadata = {
  title: 'MUICT Dev Club',
  description: 'MUICT Dev Club, Faculty of ICT, Mahidol University',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/icon.svg" />
      <link
      rel="apple-touch-icon"
        href="/apple-icon.ico"
      />
      </head>
      <body className={`${bodyFont.className} ${bodyFont.variable} min-h-screen flex flex-col`}>
        <Provider>
          <div className="flex min-h-screen flex-col">
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Nav/>
            <div className="flex flex-1 flex-col">
              {children}
            </div>
            <Footer/>
          </div>
        </Provider>
      </body>
    </html>
  )
}

 
