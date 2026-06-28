import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import styles from "./navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
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

        {/* Desktop CTA */}
        <Link href="/contact" className={styles.ctaButton}>
          Book Appointment
        </Link>

        {/* Mobile menu */}
        <details className={styles.mobileMenu}>
          <summary className={styles.mobileToggle} aria-label="Menu">
            <Menu size={22} className={styles.menuIcon} />
            <X size={22} className={styles.closeIcon} />
          </summary>

          <div className={styles.mobileDrawer}>
            <nav className={styles.mobileNav}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link href="/contact" className={styles.mobileCtaButton}>
              Book Appointment
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}