import React, { useState } from 'react'
import './image.css'
function Image() {
  const [input, setInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [pages, setPages] = useState(1)
  const accessKey = "4X_o3f2GHaNAAKR_UGWnC892nwcTj2C0BiohSbvzdlc"
  const searchImage = async () => {
    const url = `https://api.unsplash.com/search/photos?page=${pages}&query=${input}&client_id=${accessKey}`;
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results
    if (pages === 1) {
      setSearchResult([])
    }

    setSearchResult(prevRes => [...prevRes, ...results])
    setPages(prevPage => prevPage + 1)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setPages(1)
    searchImage()
  }
  const handleShow = () => {
    searchImage()
  }

  return (
    <div>
      <h1>Image Search App</h1>
      <form action='' onSubmit={handleSubmit} >
        <input type='text' id='search-input' placeholder='Search for Images ' onChange={(e) => setInput(e.target.value)} value={input} />
        <button id='search-button' >Search</button>
      </form>
      <div className='search-results'>
        {
          searchResult.map((result, index) => (
            <div className='search-result' key={index}>
              <img src={result.urls.small} alt={result.alt_description} />
              <a href={result.links.html} target='_blank'>{result.alt_description}</a>
            </div>
          ))
        }

      </div>

      {
        searchResult.length > 0 && (
          <button id='show-more-button' onClick={handleShow} >Search more</button>
        )
      }


    </div>
  )
}

export default Image