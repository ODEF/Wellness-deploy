import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = [
  { label: "Services", href: "#features" },
  { label: "Grooming", href: "#features" },
  { label: "Wellness Plans", href: "#features" },
  { label: "About", href: "#features" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
   <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>♥</span>
          <span className={styles.logoText}>Dogs Wellness Co.</span>
        </Link>

        <nav className={styles.links} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copy}>© 2026 Dogs Wellness Co.</p>
      </div>
    </footer>
  );
}