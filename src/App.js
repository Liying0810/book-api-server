import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);

  const searchBooks = async () => {
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    setSearchResults(res.data.items || []);
  };

const saveBook = async (book) => {
  const title = book?.volumeInfo?.title || 'No title';
  const authors = book?.volumeInfo?.authors || ['Unknown author'];
  const description = book?.volumeInfo?.description || 'No description';
  const thumbnail = book?.volumeInfo?.imageLinks?.thumbnail || '';

  const bookData = { title, authors, description, thumbnail, note: '' };

  console.log("🧪 Save button clicked for:", title);
  console.log("📦 Sending book data:", bookData);

  try {
    const res = await axios.post('https://book-api-server-bm8l.onrender.com/api/books', bookData);
    console.log("✅ Saved:", res.data);
    await loadSavedBooks();
  } catch (error) {
    console.error('❌ Save failed:', error.response?.data || error.message);
  }
};



  const loadSavedBooks = async () => {
    const res = await axios.get('https://book-api-server-bm8l.onrender.com/api/books');
    setSavedBooks(res.data);
  };

  useEffect(() => {
    loadSavedBooks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Search</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title..."
      />
      <button onClick={searchBooks}>Search</button>

      <h3>Results</h3>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <b>{book.volumeInfo.title}</b> by {book.volumeInfo.authors?.join(', ')}
            <button onClick={() => saveBook(book)}>Save</button>
          </li>
        ))}
      </ul>

      <h3>Saved Books</h3>
      <ul>
        {savedBooks.map((book) => (
          <li key={book._id}>
            <b>{book.title}</b> by {book.authors.join(', ')} - {book.note || "No note"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

