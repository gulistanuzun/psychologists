import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          The road to the depths of the human soul
        </h1>
        <p className={styles.text}>
          We help you to reveal your potential, overcome challenges, and enjoy
          your life together with our experienced psychologists.
        </p>
        <Link to="/psychologists" className={styles.cta}>
          Get started
          <span className={styles.arrow} aria-hidden="true">&#8599;</span>
        </Link>
      </div>

      <div className={styles.visual}>
        <img
          src="/hero.jpg"
          alt="Psychologist looking thoughtfully into the distance"
          className={styles.image}
        />
        <div className={styles.badge}>
          <span className={styles.badgeNumber}>10,000+</span>
          <span className={styles.badgeLabel}>Experienced psychologists</span>
        </div>
      </div>
    </main>
  );
}
