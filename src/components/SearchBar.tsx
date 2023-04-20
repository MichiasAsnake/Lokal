import { useEffect, useState } from "react";
import Categories from "./Categories";
import Nearyou from "./Nearyou";

interface IData {
  name: string;
  title: string;
  place_id:string;
  photos: string[];
  opening_hours: {
    open_now: boolean;
  };
  rating: number;
  plus_code: {
    compound_code: string;
  };
}

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [lat, setLat] = useState(Number);
  const [long, setLong] = useState(Number);
  const [responseData, setResponseData] = useState<IData | null>(null); // State to store the API response data

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude)
        setLong(longitude)
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }

  const handleSearch = () => {
    // Trigger the GET request with the values of search and loc
    fetch(`http://localhost:5000/api/search?search=${search}&lat=${lat}&long=${long}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response data as needed
      setResponseData(data); // Update the state with the API response data
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error(error);
    });
  };
  
  return (
    <div>
      <div className="searchBar">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Enter search keyword"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <Categories data={responseData} /> 
      
    </div>
  );
};

export default SearchBar;
