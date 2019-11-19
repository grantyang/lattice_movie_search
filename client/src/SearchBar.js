import React from 'react'

export default function SearchBar({setQuery, query}) {

  // When input is changed, update query state
  function handleInputChange(e){
    setQuery(e.target.value);
  }
  
  return (
    <div>
      <input id="search-bar" type="text" value={query} placeholder="Search for a movie here" onChange={handleInputChange} />
    </div>
  )
}
