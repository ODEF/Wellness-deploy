import "./navbar.module.css"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setNavSolid(window.scrollY > 20);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header
      className={`${styles.header} ${
        navSolid || mobileOpen ? styles.headerSolid : ""
      }`}
    >
      <div className={styles.headerInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <div className={styles.logoIcon}>
            <Heart size={15} fill="currentColor" />
          </div>

          <span className={styles.logoText}>Dogs Wellness Co.</span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA / Mobile toggle */}
        <div className={styles.actions}>
          <Link href="/contact" className={styles.ctaButton}>
            Book Appointment
          </Link>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className={styles.mobileCtaButton}
            onClick={closeMobileMenu}
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}