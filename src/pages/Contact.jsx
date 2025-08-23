import styles from '../styles/Contact.module.css';


const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      {/* Left Side */}
      <div className={styles.contactInfo}>
        <h1>Get in Touch</h1>
        <p className={styles.subheading}>I'd love to hear from you.</p>
        <p className={styles.description}>Feel free to reach out with any inquiries or simply to say hi! </p>
        <p className={styles.contactDetails}>📞 +63 9777377606</p>
        <p className={styles.contactDetails}>📧 tamseandrei@gmail.com</p>

        <div className={styles.socialIcons}>
          <a href="https://www.instagram.com/andrei_tamse" target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="https://github.com/Brasprin" target="_blank" rel="noreferrer" aria-label="GitHub">
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
          <a href="https://www.linkedin.com/in/agtamse" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      {/* Right Side */}
      <form
        className={styles.contactForm}
        action="https://formspree.io/f/xpwdrkrd"
        method="POST"
      >
        <div className={styles.inputRow}>
          <div>
            <label htmlFor="first-name">First Name *</label>
            <input type="text" id="first-name" name="first-name" required />
          </div>
          <div>
            <label htmlFor="last-name">Last Name * </label>
            <input type="text" id="last-name" name="last-name" required />
          </div>
        </div>

        <label htmlFor="email">Email *</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required onInput={handleAutoResize} />
          
          
          
          <select id="role" name="role" required>
            <option value="">Select one</option>
            <option value="Student">Student</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Employer">Employer</option>
            <option value="Client">Freelancer/Client</option>
          </select>

        <button type="submit">Send</button>
      </form>

    </div>
  );
};

const handleAutoResize = (e) => {
  const el = e.target;
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 300) + "px";
  el.style.overflowY = el.scrollHeight > 300 ? "auto" : "hidden";
};

export default Contact;
