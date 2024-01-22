import React, { useState } from 'react';
import './image.css';

function Image() {
  const [inputData, setInputData] = useState('');
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const accessKey = "4X_o3f2GHaNAAKR_UGWnC892nwcTj2C0BiohSbvzdlc";

  const searchImages = async () => {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      setSearchResults([]);
    }

    setSearchResults(prevResults => [...prevResults, ...results]);
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    searchImages();
  };

  const handleShowMore = () => {
    searchImages();
  };

  return (
    <div>
      <h1>Image Search App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='search-input'
          placeholder='Search for Images'
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button type='submit' id='search-button'>Search</button>
      </form>

      <div className='search-results'>
        {searchResults.map((result, index) => (
          <div key={index} className='search-result'>
            <img src={result.urls.small} alt={result.alt_description} />
            <a href={result.links.html} target='_blank' rel='noopener noreferrer'>
              {result.alt_description}
            </a>
          </div>
        ))}
      </div>

      {searchResults.length > 0 && (
        <button id='show-more-button' onClick={handleShowMore}>
          Search more
        </button>
      )}
    </div>
  );
}

export default Image;
