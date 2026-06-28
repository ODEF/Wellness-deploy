import react from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Navbar"
export default function HomePage() {
  return (
    <main >
      <Header/>
      <h1>Healthy Paw</h1>
      <p>Website is running.</p>
      
      <Link href="/hotels">Hotels</Link>
      <br />
      <Link href="/services">Services</Link>
      <Footer />
    </main>
    
  );
}