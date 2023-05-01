import React from "react";

<<<<<<< HEAD
const Categories = () => {
  return (
    <div className="cat_container">
        
        <div className="cat_box">
        <div style={{backgroundImage: 'url(src\images\Automotive.jpg)' , border: 'solid 2px', height:'86px', width:'86px',
          borderRadius:'90px'}}>
            
        </div>
        <div className="cat_txt">
            <p>Automotive</p>
        </div>
        </div>
=======
interface IData {
  name: string;
  place_id: string;
  photos: {
    photo_reference: string;
    html_attributions: string[];
    height: number;
    width: number;
  }[];
  opening_hours: {
    open_now: boolean;
  };
  rating: number;
  plus_code: {
    compound_code: string;
  };
}
>>>>>>> 392fd9b953150a5ed097e577fbde5aa156662b9f

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

  function ArrayObj({ data }: { data: IData[] }) {
    let windowBox = [];

    for (let i = 0; i < data.length; i++) {
      // Check if photos array is empty or doesn't have an object at index 0
      if (data[i].photos.length > 0) {
        const photoReference = data[i].photos[0]?.photo_reference; // Use optional chaining to safely access photo_reference property
        const photoURL = data[i].place_id;
        if (photoReference) {
          let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${photoReference}&key=AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ`;
          let geo = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cgeometry&place_id=${photoURL}&key=AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ`;
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
                <p className="title">{data[i].name}</p>
                <p>{data[i].plus_code.compound_code}</p>
                <div className="contentDetails">
                <p>{data[i].rating}</p>
                {data[i].opening_hours.open_now ? (
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
      <h2 style={{ marginLeft: "185px" }}>Popular Near You</h2>
      <ArrayObj data={data} />
    </div>
  );
};

export default Categories;
