import React, { useState } from 'react';
import { Star, Calendar, BookOpen } from 'lucide-react';
import styles from '../styles/Bookshelf.module.css';

export default function Bookshelf() {
  const [books] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      year: 2018,
      readIn: 2023,
      rating: 5,
      coverColor: "blue",
      note: "Life-changing approach to building good habits and breaking bad ones",
      takeaway: "1% better every day compounds into remarkable results"
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      year: 2008,
      readIn: 2023,
      rating: 4,
      coverColor: "green",
      note: "Essential reading for any serious developer",
      takeaway: "Code should be written for humans to read, not just machines"
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      year: 1999,
      readIn: 2024,
      rating: 5,
      coverColor: "purple",
      note: "Timeless wisdom that shaped my development mindset",
      takeaway: "Don't repeat yourself (DRY) and always think critically"
    },
    {
      id: 4,
      title: "Deep Work",
      author: "Cal Newport",
      year: 2016,
      readIn: 2024,
      rating: 4,
      coverColor: "orange",
      note: "Really helped me understand focus and productivity",
      takeaway: "Quality work = Time spent × Intensity of focus"
    },
    {
      id: 5,
      title: "Deep Work",
      author: "Cal Newport",
      year: 2016,
      readIn: 2024,
      rating: 4,
      coverColor: "green",
      note: "Really helped me understand focus and productivity",
      takeaway: "Quality work = Time spent × Intensity of focus"
    },
    {
      id: 6,
      title: "Deep Work",
      author: "Cal Newport",
      year: 2016,
      readIn: 2024,
      rating: 4,
      coverColor: "blue",
      note: "Really helped me understand focus and productivity",
      takeaway: "Quality work = Time spent × Intensity of focus"
    },
    // {
    //   id: 6,
    //   title: "Deep Work",
    //   author: "Cal Newport",
    //   year: 2016,
    //   readIn: 2024,
    //   rating: 4,
    //   coverColor: "orange",
    //   note: "Really helped me understand focus and productivity",
    //   takeaway: "Quality work = Time spent × Intensity of focus"
    //     },
    // {
    //   id: 5,
    //   title: "Deep Work",
    //   author: "Cal Newport",
    //   year: 2016,
    //   readIn: 2024,
    //   rating: 4,
    //   coverColor: "orange",
    //   note: "Really helped me understand focus and productivity",
    //   takeaway: "Quality work = Time spent × Intensity of focus"
    // },
    // {
    //   id: 6,
    //   title: "Deep Work",
    //   author: "Cal Newport",
    //   year: 2016,
    //   readIn: 2024,
    //   rating: 4,
    //   coverColor: "orange",
    //   note: "Really helped me understand focus and productivity",
    //   takeaway: "Quality work = Time spent × Intensity of focus"
    // },
  ]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${styles.star} ${i < rating ? styles.starFilled : ''}`}
      />
    ));
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.maxWidth}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            My Reading Journey
          </h1>
          <p className={styles.subtitle}>
            Books that shaped my thinking and skills as a developer
          </p>
        </div>

        {/* Books Grid */}
        <div className={styles.grid}>
          {books.map((book) => (
            <div
              key={book.id}
              className={`${styles.card} ${hoveredCard === book.id ? styles.cardHover : ''}`}
              onMouseEnter={() => setHoveredCard(book.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Book Cover */}
              <div className={`${styles.cover} ${styles[`cover${book.coverColor.charAt(0).toUpperCase() + book.coverColor.slice(1)}`]}`}>
                <div className={styles.coverOverlay}></div>
                <div className={styles.coverContent}>
                  <h3 className={styles.coverTitle}>
                    {book.title}
                  </h3>
                  <p className={styles.coverAuthor}>
                    {book.author}
                  </p>
                </div>
                
                {/* Read Year Badge */}
                <div className={styles.badge}>
                  <Calendar className={styles.badgeIcon} />
                  <span className={styles.badgeText}>{book.readIn}</span>
                </div>
              </div>

              {/* Book Details */}
              <div className={styles.content}>
                {/* Rating */}
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {renderStars(book.rating)}
                  </div>
                  <span className={styles.ratingText}>
                    ({book.rating}/5)
                  </span>
                </div>

                {/* Publication Year */}
                <p className={styles.year}>
                  Published: {book.year}
                </p>

                {/* Personal Note */}
                <div className={styles.noteContainer}>
                  <p className={styles.note}>
                    "{book.note}"
                  </p>
                </div>

                {/* Key Takeaway */}
                <div className={styles.takeawayContainer}>
                  <p className={styles.takeawayLabel}>
                    Key Takeaway
                  </p>
                  <p className={styles.takeawayText}>
                    {book.takeaway}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={styles.stats}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.statBlue}`}>
                {books.length}
              </div>
              <div className={styles.statLabel}>Books Read</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.statGreen}`}>
                {(books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1)}
              </div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.statPurple}`}>
                {new Set(books.map(book => book.readIn)).size}
              </div>
              <div className={styles.statLabel}>Years Active</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            This bookshelf reflects my continuous journey of learning and growth 📚
          </p>
        </div>
      </div>
    </div>
  );
}