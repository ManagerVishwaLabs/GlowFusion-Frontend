import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <span>© 2024 GrowFusion. All rights reserved.</span>

      <div className={styles.footerLinks}>
        <a href="#">Privacy Policy</a>

        <span className={styles.separator}>·</span>

        <a href="#">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
