// src/pages/Projects.jsx
import styles from '../styles/Projects.module.css';

const Projects = () => {
  const projects = [
    {
      title: 'Distributed System Recovery',
      link: 'https://github.com/Brasprin/Machine-Projects/tree/main/Concurrency_MasterSlaveRecovery',
      description:
        'This project implements master-slave recovery in MySQL. It consists of three nodes: one master node and two slave nodes. The master node is responsible for handling CRUD operations, while the slave nodes replicate its data. In case the master node fails, the system promotes the most up-to-date slave node to master, ensuring data consistency. Additionally, the web application implements concurrency control to prevent multiple transactions from being processed at the same time.',
    },
    {
      title: 'Adidas Webstore Analytics',
      link: 'https://github.com/Brasprin/Machine-Projects/tree/main/Adidas%20Webstore%20Analytics',
      description:
        'This project focuses on analyzing data from the Adidas webstore to generate insights and predictions. Using data science techniques such as data preprocessing, exploratory data analysis (EDA), and machine learning, we transformed raw data into meaningful information. The goal was to uncover patterns and provide analytics that support decision-making.',
    },
    {
      title: 'Laboratory Reservation System',
      link: 'https://github.com/Brasprin/Machine-Projects/tree/main/LaboratoryReservationSystem',
      description:
        'This project is a web-based Laboratory Reservation System designed for Lasallians. It allows users to register and log in to book specific seats for available time slots in various laboratory rooms. Each reservation is associated with the user’s account to ensure accountability and traceability. User authentication is secured using password hashing and cookie-based session management. Administrators have the ability to create accounts and make bookings for walk-in students. Additionally, users can update their profile information, including their description and profile photo. The system was implemented using HTML, CSS, Handlebars, and JavaScript for the front end, while MongoDB was used for the database.',
    },
    {
      title: 'Client Oriented Payroll System',
      link: 'https://github.com/Brasprin/Machine-Projects/tree/main/ClientPayrollSystem',
      description:
        'This project is a web-based payroll system developed using React and MySQL, and was successfully delivered to a client. It was built using the Agile methodology, where I served as the Scrum Master. In this role, I facilitated Agile ceremonies such as daily stand-ups, sprint planning, and retrospectives. I managed task assignments, ensured smooth project flow, and supported the team’s well-being to maintain productivity and collaboration. Through effective leadership and teamwork, we were able to complete and hand over the project on time.',
    },
    {
      title: 'Predictive Modeling of Labor Force Data (2016)',
      link: 'https://github.com/Brasprin/Machine-Projects',
      description:
        'This project involved analyzing labor force data from 2016 to build predictive models. We performed data preprocessing and exploratory data analysis (EDA), followed by training models using Neural Networks, Decision Trees, and Random Forests. We optimized each model using hyperparameter tuning with GridSearch and applied feature engineering to enhance model performance and accuracy.',
    },
    {
      title: 'File Exchange System',
      link: 'https://github.com/Brasprin/Machine-Projects/tree/main/TamseAndrei_FileExchangeSystem',
      description:
        'This project implements a Client-Server File Exchange System using socket programming in Python. It allows clients to connect to a server via a specified IP address and port to facilitate file sharing. Users can upload files to the server, which can then be downloaded by other clients, enabling file exchange.',
    },
    {
      title: 'Z Distance Calculation (X86 Assembly & C)',
      link: 'https://github.com/Brasprin/Machine-Projects/tree/main/TamseAndrei_x86AssemblyToCZdistance',
      description:
        'This project calculates the Z distance using X86 assembly and C language. The C program handles input retrieval and stores the values in memory. Once the data is passed to X86 assembly, it performs the computation by optimizing memory registers for efficiency. The result is then returned to the C program for displaying result.',
    },
    {
      title: 'Vending Machine (OOP)',
      link: 'https://github.com/Brasprin/Machine-Projects/tree/main/TamseAndrei_VendingMachine',
      description:
        'This project implements a vending machine simulation using Object-Oriented Programming (OOP). It simulates a real-world vending machine scenario where users can insert money, select items, and receive change. The system follows OOP principles such as encapsulation, inheritance, polymorphism, and abstraction, ensuring a structured and modular design.',
    },
  ];

  return (
    <>
      <div className={styles.title}>
        <h1>School Projects</h1>
      </div>

      {projects.map((proj, index) => (
        <div key={index} className={styles.project}>
          <h2>
            <span
              className={styles.projectLink}
              onClick={() => window.open(proj.link, '_blank')}
            >
              {proj.title}
            </span>
          </h2>
          <p>{proj.description}</p>
          {index !== projects.length - 1 && <hr />}
        </div>
      ))}
    </>
  );
};

export default Projects;
