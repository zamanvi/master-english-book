import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'
const cardImage = `https://i.ibb.co/MPnmqw3/book-Cover-Fs.webp`;

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "দূর্বলদের Master English Book Part - I",
  description: "Easy English learning master book for all of us. Effective and Very attractive.",
  verification: {
    google: 'M0MK3nrHsamo73lbLU8-lwBKzCFfoSBfyLi-kL0z160',
  },
  openGraph: {
    images: [cardImage,],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} max-w-[1366px] lg:w-11/12 mx-auto`} >
        {children}


         
         <Footer/>
         <GoogleAnalytics gaId="G-YM9TZWWD6D" />
        </body>
 
    </html>
  );
}
