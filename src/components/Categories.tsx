import React from "react";
import { IData } from "./types";

const Categories = ({ data }: { data: IData[] | null }) => {
  if (data === null) {
    return (
      <div>
        <div></div>
      </div>
    );
  }
  const [currentIndex, setCurrentIndex] = React.useState(0); // Current index of the carousel
  const maxIndex = data ? data.length - 1 : 0;

  const handleLeftArrowClick = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  };

  const handleRightArrowClick = () => {
    setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
  };

  function ArrayObj({ items }: { items: IData[] }) {
    let windowBox = [];

    for (let i = 0; i < items.length; i++) {
      // Check if photos array is empty or doesn't have an object at index 0
      if (items[i].photos.length > 0) {
        const photoReference = items[i].photos[0]?.photo_reference; // Use optional chaining to safely access photo_reference property
        const photoURL = items[i].place_id;
        if (photoReference) {
          let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${photoReference}&key=AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ`;
          let geo = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cgeometry&place_id=${photoURL}&key=AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ`;
          
          const compoundCode = items[i].plus_code.compound_code;          
          const cityStateRegex = /[0-9][^\s]+.([^.]+)/is
          const match = compoundCode.match(cityStateRegex);
          const city = match ? match[1] : '';
          
          windowBox.push(
            <div
              className="contentCard"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div
                key={i}
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "5px",
                }}
              ></div>
              <div className="contentText">
                <p className="title">{items[i].name}</p>
                <p className="city">{city}</p>
                <div className="contentDetails">
                <p>{items[i].rating}</p>
                <img src="src\images\star.svg" alt="rating star" style={{width:"16px"}} />
                {items[i].opening_hours.open_now ? (
                  <p className="status">OPEN</p>
                ) : (
                  <p className="statusC">CLOSED</p>
                )}
                </div>
              </div>
            </div>
          );
        }
      }
    }

    return (
      <div>
        <div className="carousel-content-wrapper">
          <div className="winBox">{windowBox}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ display:"flex", width:"975px", margin:"0 auto", marginBottom:"35px"}}>Popular Near You</h2>
      <ArrayObj items={data} />
    </div>
  );
};

export default Categories;
