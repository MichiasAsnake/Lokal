import { useEffect, useState } from "react";
import Categories from "./Categories";
import { IData } from "./types";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [responseData, setResponseData] = useState<IData[] | null>(null); // State to store the API response data
  const [cat, setCat] = useState(false);

  console.log(cat)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLong(longitude);
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }

  const handleSearch = () => {
    // Trigger the GET request with the values of search and loc
    fetch(
      `https://lokal-5xf5.onrender.com/api/search?search=${search}&lat=${lat}&long=${long}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        setResponseData(data || null); // Update the state with the API response data
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

  useEffect(() => {
    if (search.length !== 0) {
      handleSearch();
    }
  }, [search]);

  const jobcard = [
    {
      name: "Oil Change",
      photo:
        "https://assets.firestonecompleteautocare.com/content/dam/bsro-sites/fcac/blog/images/2022/01-jan/pouring-motor-oil-into-engine.jpg",
    },
    {
      name: "Beauty Supply",
      photo:
        "https://grossmontcenter.com/wp-content/uploads/2021/09/Empire-Beauty-Supply-Header.jpg",
    },
    {
      name: "Book Store",
      photo:
        "https://static01.nyt.com/images/2017/05/11/t-magazine/bookstore-slide-2MCD/bookstore-slide-2MCD-superJumbo.jpg",
    },
    {
      name: "Fitness",
      photo:
        "https://images.everydayhealth.com/images/everything-you-need-know-about-fitness-1440x810.jpg",
    },
    {
      name: "Restaurants",
      photo:
        "https://assets.bonappetit.com/photos/631788f25635b01b337f6bb4/4:3/w_2000,h_1500,c_limit/220827_GuangXu_BA-UncleLou_014.jpg",
    },
    {
      name: "Sporting goods",
      photo:
        "https://s3.amazonaws.com/images.investorsobserver.com/wp-content/uploads/2019/11/19151333/191119-SportingGoods3.jpg",
    },
    {
      name: "Groceries",
      photo:
        "https://ecocart.io/wp-content/uploads/resized/2023/01/iStock-1371318211-1120x455-c-default.jpg",
    },
    {
      name: "Hiking Trails",
      photo:
        "https://menla.org/wp-content/uploads/2018/03/Hiking-Trail-No-People-2.jpg",
    },
    {
      name: "Entertainment",
      photo: "https://www.popoptiq.com/wp-content/uploads/2019/01/1-26-1.jpg",
    },
    {
      name: "Gas Stations",
      photo:
        "https://www.gannett-cdn.com/presto/2021/07/28/USAT/903608f2-94ba-42c7-ad1d-72ef85a49124-GettyImages-1199749863.jpg?crop=4241%2C2386%2Cx0%2Cy214&width=1200",
    },
    {
      name: "Art/ Crafts",
      photo:
        "https://assets.londonist.com/uploads/2022/01/i875/23000279_1444872512232424_3561806617259127834_o.jpg",
    },
    {
      name: "Parks",
      photo:
        "https://cdn.britannica.com/30/128430-050-D6578398/Boston-Public-Garden.jpg",
    },
    {
      name: "Alcohol",
      photo:
        "https://static.theprint.in/wp-content/uploads/2018/05/alcohol-e1589898194994.jpg",
    },
    {
      name: "Home Services",
      photo:
        "https://beachsidehandyman.com.au/wp-content/uploads/property-maintenance-repairs.jpg",
    },
    {
      name: "Salon",
      photo:
        "https://images.squarespace-cdn.com/content/v1/584ee28fd482e938207faabe/1633629466126-R7JTZAVLF26WTBKZ7GIJ/IMG_3122.JPG",
    },
    {
      name: "Pets",
      photo:
        "https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Pet-shops-in-Dubai-C-22-03-1024x640.jpg",
    },
  ];

  const JobCards = () => {
    return (
      <div className="page">
        {jobcard.map((card, index) => (
          <div className="details">
            <div
              key={index}
              style={{ backgroundImage: `url(${card.photo})` }}
              className="cardPhoto"
              onClick={() => {
                setSearch(card.name);
              }}
            />
            <div style={{ fontSize: "22px" }}>{card.name}</div>
          </div>
        ))}
      </div>
    );
  };

  function handleClick() {
    setSearch("");
  }

  return (
    <div>
      <img
        src="\images\lokal.svg"
        style={{
          display: "flex",
          margin: "0 auto",
          width: "200px",
          paddingTop: "30px",
          paddingBottom: "20px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      ></img>
      <div
        style={{
          width: "1102px",
          margin: "0 auto",
          fontSize: "27.57px",
          paddingBottom: "10px",
        }}
      >
        {search ? "" : <div>Top Services</div>}
      </div>

      <div>{search ? <Categories data={responseData} /> : JobCards()}</div>
      
    </div>
  );
}

export default SearchBar;
