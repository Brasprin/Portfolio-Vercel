import React, { useState } from 'react';
import { Star, Calendar } from 'lucide-react';
import styles from '../styles/Bookshelf.module.css';
import { getBooks } from "../datas/Books";

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
      book.author.join(", ").toLowerCase().includes(q) ||
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
        // Primary: rating descending
        // Secondary: title alphabetically
        if (b.rating === a.rating) {
          return a.title.localeCompare(b.title);
        }
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.join(", ").localeCompare(b.author.join(", "))
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
                onChange={(e) => handleSortChange(e.target.value)}
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
              <div className={styles.cover}>
                <img src={book.coverImage} alt={book.title} className={styles.coverImage} />
                <div className={styles.coverOverlay}></div>
                <div className={styles.coverContent}>
                  <h3 className={styles.coverTitle}>{book.title}</h3>
                  <p className={styles.coverAuthor}>{book.author.join(", ")}</p>
              </div>
                <div className={styles.coverOverlay}></div>
                <div className={styles.coverContent}>
                  <h3 className={styles.coverTitle}>{book.title}</h3>
                  <p className={styles.coverAuthor}>{book.author.join(", ")}</p>
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

}
