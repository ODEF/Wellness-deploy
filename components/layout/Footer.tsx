import Link from "next/link";
import styles from "./footer.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.iconCircle}>
            <svg
              className={styles.heartIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 21s-7.2-4.6-9.6-9.2C.4 8 .9 4.6 3.5 3.1 5.7 1.8 8.4 2.4 10 4.3L12 6.6l2-2.3c1.6-1.9 4.3-2.5 6.5-1.2 2.6 1.5 3.1 4.9 1.1 8.7C19.2 16.4 12 21 12 21z" />
            </svg>
          </div>

          <span className={styles.brandName}>Healthy Paw</span>
        </div>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}

          <Link href="/privacy-policy" className={styles.navLink}>
            Privacy
          </Link>

          <Link href="/terms-of-service" className={styles.navLink}>
            Terms
          </Link>
        </nav>

        <p className={styles.copy}>© 2025 Healthy Paw.</p>
      </div>
    </footer>
  );
}