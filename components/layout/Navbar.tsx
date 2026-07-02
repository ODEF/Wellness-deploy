"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Grooming", href: "#grooming" },
  { label: "Packages", href: "#packages" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isSolid, setIsSolid] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsSolid(window.scrollY > 40);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function closeMobileMenu() {
    setIsMobileOpen(false);
  }

  return (
    <header className={`${styles.header} ${isSolid ? styles.solid : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <span className={styles.logoMark}>♥</span>
          <span className={styles.logoText}>Dogs Wellness Co.</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/login" className={styles.loginLink}>
            Login
          </Link>

          <Link href="#contact" className={styles.ctaButton}>
            Book Appointment
          </Link>

          <button
            type="button"
            className={styles.mobileButton}
            onClick={() => setIsMobileOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <span>{isMobileOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className={styles.mobilePanel}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={styles.mobileLink}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#contact"
            className={styles.mobileCta}
            onClick={closeMobileMenu}
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}