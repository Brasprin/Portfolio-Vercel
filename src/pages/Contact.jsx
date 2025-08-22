// src/pages/Contact.jsx
import styles from '../styles/Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact me!</h1>
      <p className={styles.description}>Have any questions? ...</p>
      <p className={styles.description}>+63 9777377606 | tamseandrei@gmail.com</p>

      <form className={styles.contactForm} action="https://formspree.io/f/xpwdrkrd" method="POST">
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" name="first-name" required />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" name="last-name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <div className={styles.checkboxGroup}>
          <p>Which are you?</p>
          <label><input type="checkbox" name="role[]" value="Student" /> Student</label><br />
          <label><input type="checkbox" name="role[]" value="Recruiter" /> Recruiter</label><br />
          <label><input type="checkbox" name="role[]" value="Employer" /> Employer</label><br />
          <label><input type="checkbox" name="role[]" value="Freelancer/Client" /> Freelancer/Client</label><br />
        </div>

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
