import { useEffect, useState } from "react";
import Categories from "./Categories";


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

function SearchBar(){
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

  useEffect(()=>{
    
  if (search.length !== 0){
    handleSearch()
  }

  }, [search])


  const jobcard = [
    { name: 'Oil Change', photo: 'src/images/Oil Change.jpg' },
    { name: 'Beauty Supply' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
    { name: 'Book Store' },
  ];
  
  const JobCards = () => {
    return (
      <div className="page">
        {jobcard.map((card, index) => (
          <div key={index} className="details">
            <div
              style={{
                backgroundImage: `url(${card.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "5px",
                height: "163.15px",
                width: "259.66px",
                border: "solid 2px black",
              }}
              onClick={()=> {setSearch(card.name);}}
            />
            <div style={{fontSize:"22px"}}>{card.name}</div>
          </div>
        ))}
      </div>
    );
  };
console.log(search)
  return (
    <div>
      
       <img src="src\images\lokal.svg" style={{display:"flex", margin:'0 auto', width:"200px",paddingTop:"30px", paddingBottom:"20px"}}></img>
        <div style={{width:'1102px', margin:'0 auto', fontFamily:'Apercu Bold', fontSize:'27.57px', paddingBottom:'10px'}}>
         {search ? '' : <div>Top Services</div> } 
        </div>

        <div>
          {search ? <Categories data={responseData} /> : JobCards()}
       </div>
       
    </div>
  );
};

export default SearchBar;
