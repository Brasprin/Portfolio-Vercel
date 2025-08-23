// src/pages/Home.jsx
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h1>
            Hi, I am <span className={styles.highlight}>Andrei!</span>
          </h1>
          <p className={styles.subtitle}>
            Aspiring Computer Scientist specializing in Software Technology.
          </p>
          <p className={styles.description}>
            Computer Science student passionate about Software Development and Business Intelligence Analytics, providing technology-driven solutions to real-world problems.
          </p>
        </div>

        <div className={styles.profile}>
          <img src="/images/profile.png" alt="Andrei Tamse" />
        </div>
      </div>
    </>
  );
}
