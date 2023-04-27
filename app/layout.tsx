import { Nunito } from "next/font/google";
import "./globals.css";

import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import RentModal from "./components/Modals/RentModal";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb Clone using NextJs",
};

const font = Nunito({
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        {/* Modals */}
        <RegisterModal />
        <LoginModal />
        <RentModal />
        {/* Navbar */}
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
