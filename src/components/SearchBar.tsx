import { useEffect, useState } from "react";

function SearchBar(){
  const [search, setSearch] = useState('');
  const [loc, setLoc] = useState('');

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      fetch('http://localhost:5000/api/trigger-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'test': 'event'
        })
      })
      .then(response => {
        // Handle response from backend, if needed
        console.log(response);
      })
      .catch(error => {
        // Handle error, if needed
        console.error(error);
      });
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  

  const handleSearch = () => {
    // Trigger the GET request with the values of search and loc
    fetch(`http://localhost:5000/api/search?search=${search}&loc=${loc}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response data as needed
      let places = data;
      console.log(places);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error(error);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Enter search keyword"
      />
      <input
        type="text"
        value={loc}
        onChange={e => setLoc(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
