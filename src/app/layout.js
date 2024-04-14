import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";

const cardImage = `https://i.ibb.co/kSf0GvB/book-Cover-Fs.jpg`;

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "দূর্বলদের Fast Learning English Part - I",
  description: "Easy English learning master book for all of us. Effective and Very attractive.",
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
        </body>
 
    </html>
  );
}
