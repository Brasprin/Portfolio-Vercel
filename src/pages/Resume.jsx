// src/pages/Resume.jsx
import styles from '../styles/Resume.module.css';

export default function Resume() {
  return (
    <>
      <section className={styles.education}>
        <h2>EDUCATION</h2>
        <hr />

        <div className={styles.educationEntry}>
          <div className={styles.educationLine}>
            <span className={styles.school}><strong>De La Salle University</strong>, Manila, Philippines</span>
            <span className={styles.degreeInfo}>
              <em><strong>Bachelor of Science in Computer Science Major in Software Technology</strong></em>
              <span className={styles.degreeDate}>(Sept 2022 - Present)</span>
            </span>
          </div>
        </div>

        <div className={styles.educationEntry}>
          <div className={styles.educationLine}>
            <span className={styles.school}><strong>National University</strong>, Quezon City, Philippines</span>
            <span className={styles.degreeInfo}>
              <em><strong>Science, Technology, Engineering, and Mathematics</strong></em>
              <span className={styles.degreeDate}>(Aug 2020 - 2022)</span>
            </span>
          </div>
        </div>
      </section>

      <section className={styles.experience}>
        <h2>EXPERIENCE</h2>
        <hr />
        <h3>Guildford</h3>
        <p><strong><em>IT Support Specialist</em></strong> (Sept 2020 - Present)</p>
        <ul>
          <li>Provided on-call technical support, troubleshooting software and hardware issues, including Windows repairs and virus removal.</li>
          <li>Managed and maintained the company's centralized network and printers, ensuring seamless operations.</li>
          <li>Built and configured all company computers, optimizing performance and system reliability.</li>
          <li>Diagnosed and resolved technical issues efficiently to minimize downtime.</li>
        </ul>
      </section>

      <section className={styles.skills}>    
        <h2>ADDITIONAL</h2>
        <hr />
        <h3>Technical Skills:</h3>
        <p>C, Java, Javascript, MongoDB, MySQL, Python, HTML, CSS</p>

        <h3>Tools:</h3>
        <p>Github, Figma, Jupyter Notebook, VS Code</p>

        <h3>Soft Skills:</h3>
        <p>Strong analytical and problem-solving skills, empathetic with emotional intelligence, able to work well in a team, and possess grit.</p>
      </section>

      <section className={styles.coursesTaken}>
        <h2>RELEVANT COURSEWORK</h2>
        <p className={styles.note}>* Indicates courses currently being taken</p>
        <hr />
        <div className={`${styles.coursesRow} ${styles.threeCol}`}>
          <div className={styles.coursesCol}>
            <h3>Computer Science</h3>
            <table className={styles.coursesTable}>
              <thead>
                <tr><th>Course Code</th><th>Name</th></tr>
              </thead>
              <tbody>
                  <tr><td>CSMATH1</td><td>Differential Calculus</td></tr>
                  <tr><td>CSMATH2</td><td>Linear Algebra for Computer Science Students</td></tr>
                  <tr><td>CSALGCM</td><td>Algorithms and Complexity</td></tr>
                  <tr><td>CSADPRG</td><td>Advanced Programming and Theory of Programming Languages</td></tr>
                  <tr><td>CSARCH1</td><td>Intro to Computer Organization & Architecture 1</td></tr>
                  <tr><td>CSARCH2</td><td>Intro to Computer Organization and Architecture 2</td></tr>
                  <tr><td>LBYARCH</td><td>Lab for Computer Organization and Architecture</td></tr>
                  <tr><td>CSNETWK</td><td>Introduction to Computer Networks</td></tr>
                  <tr><td>CSOPESY</td><td>Introduction to Operating Systems</td></tr>
                  <tr><td>CSSWENG</td><td>Software Engineering</td></tr>
                  <tr><td>CSMODEL</td><td>Statistical Modelling and Simulation</td></tr>
                  <tr><td>CSINTSY</td><td>Introduction to Intelligent Systems</td></tr>
                  <tr><td>CSSECDV*</td><td>Secure Web Development</td></tr>
              </tbody>
            </table>
          </div>

          <div className={styles.coursesCol}>
            <h3>Software Technology</h3>
            <table className={styles.coursesTable}>
              <thead>
                <tr><th>Course Code</th><th>Name</th></tr>
              </thead>
              <tbody>
                <tr><td>ST-MATH</td><td>Integral Calculus for Computer Science Students</td></tr>
                <tr><td>STALGCM</td><td>Advanced Algorithms and Complexities</td></tr>
                <tr><td>STSWENG</td><td>Advanced Software Engineering</td></tr>
                <tr><td>STHCIUX</td><td>Human Computer Interactions</td></tr>
                <tr><td>STINTSY</td><td>Advanced Intelligent Systems</td></tr>
                <tr><td>STDISCM*</td><td>Distributed Computing</td></tr>
                <tr><td>STCLOUD</td><td>Introduction to Cloud Computing</td></tr>
                <tr><td>STMETHD*</td><td>ST Research Methods</td></tr>
                <tr><td>SOLLDA1</td><td>Business Intelligence and Data Analytics</td></tr>
                <tr><td>SOLLDT1</td><td>Digital Transformation for Executives</td></tr>
                <tr><td>SOLLDV1</td><td>DevOps</td></tr>
                <tr><td>DSGNPAT</td><td>Design Patterns</td></tr>
                {/* <tr><td>THS-ST1-3</td><td>Thesis in Software Technology 1–3</td></tr> */}
              </tbody>
            </table>
          </div>

          <div className={styles.coursesCol}>
            <h3>Computer Core</h3>
            <table className={styles.coursesTable}>
              <thead>
                <tr><th>Course Code</th><th>Name</th></tr>
              </thead>
              <tbody>
                  <tr><td>CCICOMP</td><td>Introduction to Computing</td></tr>
                  <tr><td>CCPROG1</td><td>Logic Formulation and Introductory Programming</td></tr>
                  <tr><td>CCPROG2</td><td>Programming with Structured Data Types</td></tr>
                  <tr><td>CCPROG3</td><td>Object Oriented Programming</td></tr>
                  <tr><td>CCDSALG</td><td>Data Structures and Algorithms</td></tr>
                  <tr><td>CCDSTRU</td><td>Discrete Structures</td></tr>
                  <tr><td>CCINFOM</td><td>Information Management</td></tr>
                  <tr><td>CCAPDEV</td><td>Web Application Development</td></tr>
                  <tr><td>CCINOV8*</td><td>Innovation and Technology Management</td></tr>
                  <tr><td>MTH101A</td><td>Foundation Course in Mathematics</td></tr>
                  <tr><td>STT101A</td><td>Foundation Course in Statistics</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.downloadResume}>
        <a href="/resume.pdf" download="Andrei_Tamse_Resume.pdf">
          <button>Download Resume</button>
        </a>
      </section>
    </>
  );
}
