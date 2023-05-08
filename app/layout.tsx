import { Nunito } from "next/font/google";
import "./globals.css";

import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import RentModal from "./components/Modals/RentModal";
import SearchModal from "./components/Modals/SearchModal";
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
        <ClientOnly>
          <ToasterProvider />
          {/* Modals */}
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          {/* Navbar */}
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
