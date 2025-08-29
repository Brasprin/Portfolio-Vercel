import React, { useState } from 'react';
import { Star, Calendar } from 'lucide-react';
import styles from '../styles/Bookshelf.module.css';

export default function Bookshelf() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sortBy, setSortBy] = useState('recent'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const booksPerPage = 15;

  const books = getBooks();

  //Filter 
  const filteredBooks = books.filter((book) => {
    const q = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.note.toLowerCase().includes(q) ||
      book.takeaway.toLowerCase().includes(q)
    );
  });


  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.id - a.id;
      case 'oldest':
        return a.id - b.id;
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = sortedBooks.slice(startIndex, endIndex);


  // Handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // reset to page 1 when searching
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Pagination numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) pageNumbers.push('...');
      }

      for (let i = start; i <= end; i++) pageNumbers.push(i);

      if (end < totalPages) {
        if (end < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.maxWidth}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>My Reading Journey</h1>
          <p className={styles.subtitle}>
            Books that shaped my mindset and soft skills
          </p>
        </div>

        <div className={styles.controlsContainer}>
          {/* Pagination Info */}
            <div className={styles.paginationInfo}>
              <p>
                Showing {startIndex + 1}-{Math.min(endIndex, sortedBooks.length)} of {sortedBooks.length} books
              </p>
            </div>

          {/* Search Bar */}
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  placeholder="Search books by title, author, notes, or takeaways..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className={styles.clearButton}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className={styles.searchResults}>
                  Found {sortedBooks.length} book{sortedBooks.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </p>
              )}
            </div>

            
          {/* Sort Dropdown */}
            <div className={styles.sortContainer}>
              <label htmlFor="sortSelect" className={styles.sortLabel}>
                Sort by:
              </label>
              <select 
                id="sortSelect"
                value={sortBy} 
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className={styles.sortSelect}
              >
                <option value="recent">Most Recently Read</option>
                <option value="oldest">Least Recently Read</option>
                <option value="rating">Highest Rating</option>
                <option value="title">Title (A-Z)</option>
                <option value="author">Author (A-Z)</option>
              </select>
            </div>
            
          </div>
        </div>
        {/* Books Grid */}
        <div className={styles.grid}>
          {currentBooks.map((book) => (
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
                  <h3 className={styles.coverTitle}>{book.title}</h3>
                  <p className={styles.coverAuthor}>{book.author}</p>
                </div>
                <div className={styles.badge}>
                  <Calendar className={styles.badgeIcon} />
                  <span className={styles.badgeText}>{book.readIn}</span>
                </div>
              </div>

              {/* Book Details */}
              <div className={styles.content}>
                <div className={styles.rating}>
                  <div className={styles.stars}>{renderStars(book.rating)}</div>
                  <span className={styles.ratingText}>({book.rating}/5)</span>
                </div>
                <p className={styles.year}>Published: {book.year}</p>
                <div className={styles.noteContainer}>
                  <p className={styles.note}>"{book.note}"</p>
                </div>
                <div className={styles.takeawayContainer}>
                  <p className={styles.takeawayLabel}>Key Takeaway</p>
                  <p className={styles.takeawayText}>{book.takeaway}</p>
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


        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${styles.paginationBtn} ${styles.paginationPrev}`}
            >
              Previous
            </button>

            <div className={styles.paginationNumbers}>
              {getPageNumbers().map((pageNum, index) =>
                pageNum === '...' ? (
                  <span key={index} className={styles.paginationDots}>...</span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`${styles.paginationBtn} ${styles.paginationNumber} ${
                      currentPage === pageNum ? styles.paginationActive : ''
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${styles.paginationBtn} ${styles.paginationNext}`}
            >
              Next
            </button>
          </div>
        )}



      </div>
  );

  // Helpers
  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`${styles.star} ${i < rating ? styles.starFilled : ''}`} />
    ));
  }


  function getBooks() {
    return [
      { id: 1, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", year: 2016, readIn: "2022", rating: 4, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 2, title: "Everything Is F*cked: A Book About Hope", author: "Mark Manson", year: 2019, readIn: "2022", rating: 4, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", year: 1997, readIn: "2022", rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 4, title: "Atomic Habits", author: "James Clear", year: 2018, readIn: "2022", rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 5, title: "Rich Dad's Cashflow Quadrant", author: "Robert Kiyosaki", year: 1998, readIn: "2022", rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 6, title: "Think and Grow Rich", author: "Napoleon Hill", year: "1937", readIn: "2022", rating: 4, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 7, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", year: "1989", readIn: "2022", rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 8, title: "The Mountain Is You", author: "Brianna Wiest", year: "2020", readIn: 2022, rating: 3, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 9, title: "Who Moved My Cheese?", author: "Spencer Johnson", year: "1998", readIn: "2022", rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 10, title: "The Alchemist", author: "Paulo Coelho", year: "1988", readIn: 2022, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 11, title: "The Strength In Our Scars", author: "Bianca Sparacino", year: "2017", readIn: 2022, rating: 4, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 12, title: "The Psychology of Money", author: "Morgan Housel", year: "2020", readIn: 2022, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 13, title: "How to Win Friends & Influence People", author: "Dale Carnegie", year: "1936", readIn: 2022, rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 14, title: "Ikigai", author: " Francesc Miralles, Hector Garcia", year: "2018", readIn: 2022, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 15, title: "Can't Hurt Me", author: "David Goggins", year: "2018", readIn: 2022, rating: 4, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 16, title: "The Daily Stoic", author: "Ryan Holiday, Stephen Hanslemen", year: "2016", readIn: 2023, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 17, title: "The 80/20 Principle", author: "Richard Koch", year: "1997", readIn: 2023, rating: 3, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 18, title: "The Power of Habit", author: "Charles Duhigg", year: "2012", readIn: 2023, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 19, title: "Mindset", author: "Carol Dweck", year: "2016", readIn: 2023, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 20, title: "Zero to One", author: "Blake Masters, Peter Thiel", year: "2014", readIn: 2024, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 21, title: "Make Today Count", author: "John C. Maxwell", year: "2004", readIn: 2023, rating: 4, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 22, title: "What I Wish I Knew When I Was 20", author: "Tina Seelig", year: "2009", readIn: 2024, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 23, title: "The Obstacle Is the Way", author: "Ryan Holiday", year: "2014", readIn: 2024, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 24, title: "Stillness Is the Key", author: "Ryan Holiday", year: "2019", readIn: 2024, rating: 4, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 25, title: "Master Your Emotions", author: "Thibaut Meurisse", year: "2020", readIn: 2024, rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 26, title: "Ego Is the Enemy", author: "Ryan Holiday", year: "2016", readIn: 2024, rating: 4, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 27, title: "Declutter Your Mind", author: "S. J. Scott, Barrie Davenport", year: "2015", readIn: 2024, rating: 3, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 28, title: "When Breath Becomes Air", author: "Paul Kalanithi", year: "2016", readIn: 2024, rating: 4, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 29, title: "Limitless", author: "Jim Kwik", year: "2019", readIn: 2024, rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 30, title: "Educated", author: "Tara Westover", year: "2018", readIn: 2024, rating: 1, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 31, title: "The Infinite Game", author: "Simon Sinek", year: "2019", readIn: 2024, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 32, title: "Talk Like TED", author: "Carmine Gallo", year: "2016", readIn: 2024, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 33, title: "Emotional Intelligence", author: "Daniel Goleman", year: "1995", readIn: 2024, rating: 3, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 34, title: "Some People Need Killing", author: "Patricia Evangelista", year: "2019", readIn: 2024, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 35, title: "Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook", author: "Grant Smith", year: "2020", readIn: 2024, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 36, title: "Tuesdays with Morrie Book", author: "Mitch Albom", year: "1997", readIn: 2024, rating: 4, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 38, title: "The 5AM Club", author: "Robin Sharma", year: "2018", readIn: 2024, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 39, title: "Outliers", author: "Malcolm Gladwell", year: "2008", readIn: 2024, rating: 4, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 40, title: "Surrounded by Idiots", author: "Thomas Erikson", year: "2017", readIn: 2024, rating: 3, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 41, title: "21 Lessons for the 21st Century", author: "Yuval Noah Harari", year: "2018", readIn: 2024, rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 42, title: "The Art of Thinking Clearly", author: "Rolf Dobelli", year: "2011", readIn: 2024, rating: 2, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 43, title: "The Monk Who Sold His Ferrari", author: "Robin Sharma", year: "1996", readIn: 2024, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 44, title: "The Book of Ichigo Ichie", author: "Hector Garcia, Francesc Miralles", year: "2019", readIn: 2024, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 45, title: "The Richest Man in Babylon", author: "George Samuel Clason", year: "1926", readIn: 2024, rating: 1, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 46, title: "Blink", author: "Malcolm Gladwell", year: "2005", readIn: 2024, rating: 2, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 47, title: "Unlimited Power", author: "Tony Robbins", year: "1986", readIn: 2024, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 48, title: "The Art of Laziness", author: "Library Mindset", year: "2020", readIn: 2024, rating: 4, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 49, title: "On Speaking Well", author: "Peggy Noonan", year: "2006", readIn: 2024, rating: 2, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 50, title: "Anxiety Happens", author: "Georg H. Eifert, John P. Forsyth", year: "2018", readIn: 2024, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 52, title: "The Concise 48 Laws Of Power", author: "Robert Greene", year: "2000", readIn: "2022", rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 53, title: "What We Owe The Future", author: "William MacAskill", year: "2022", readIn: 2024, rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 54, title: "Start with Why", author: "Simon Sinek", year: "2009", readIn: 2024, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 55, title: "Eat That Frog!", author: "Brian Tracy", year: "2007", readIn: 2024, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 56, title: "Deep Work", author: "Cal Newport", year: "2016", readIn: 2024, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 57, title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", year: "2020", readIn: 2024, rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 58, title: "Don't Believe Everything You Think", author: "Joseph Nguyen", year: "2022", readIn: 2024, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 59, title: "Shoe Dog", author: "Phil Knight", year: "2016", readIn: 2025, rating: 2, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 60, title: "How to Stop Worrying and Start Living", author: "Dale Carnegie", year: "1948", readIn: 2025, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 61, title: "How to Talk to Anyone", author: "Leil Lowndes", year: "2003", readIn: 2025, rating: 4, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 62, title: "The Five People You Meet in Heaven", author: "Mitch Albom", year: "2003", readIn: 2025, rating: 2, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 63, title: "Think Like a Monk", author: "Jay Shetty", year: "2020", readIn: 2025, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 64, title: "Never Split the Difference", author: "Chris Voss, Tahl Raz", year: "2016", readIn: 2025, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 65, title: "The Compound Effect", author: "Darren Hardy", year: "2010", readIn: 2025, rating: 4, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 66, title: "The Courage to be Dislike", author: "Ichiro Kishimi, Fumitake Koga", year: "2013", readIn: 2025, rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
      { id: 67, title: "How to Become a Straight-A Student", author: "Cal Newport", year: "2006", readIn: 2025, rating: 5, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 68, title: "The Magic of Thinking Big", author: "David J. Schwartz", year: "1959", readIn: 2025, rating: 5, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 69, title: "The Millionaire Fastlane", author: "MJ DeMarco", year: "2011", readIn: 2025, rating: 5, coverColor: "blue", note: "Blank", takeaway: "Blank" },
      { id: 71, title: "Men Are from Mars, Women Are from Venus", author: "John Gray", year: "1992", readIn: 2025, rating: 4, coverColor: "purple", note: "Blank", takeaway: "Blank" },
      { id: 72, title: "Mind Management, Not Time Management", author: "David Kadavy", year: "2016", readIn: 2025, rating: 2, coverColor: "orange", note: "Blank", takeaway: "Blank" },
      { id: 73, title: "The 5AM Club", author: "Robin Sharma", year: "2018", readIn: "2025", rating: 5, coverColor: "green", note: "Blank", takeaway: "Blank" },
    ];
  }
}
