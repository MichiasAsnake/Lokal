import React from "react";

interface IData {
  name: string;
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
  plus_code:{
    compound_code: string;
  };
}

const Categories = ({ data }: { data: IData[] | null }) => {
  if (data === null) {
    return <div>Loading...</div>;
  }

  function ArrayObj({ data }: { data: IData[] }) {
    let windowBox = [];

    for (let i = 0; i < data.length; i++) {
      // Check if photos array is empty or doesn't have an object at index 0
      if (data[i].photos.length > 0) {
        const photoReference = data[i].photos[0]?.photo_reference; // Use optional chaining to safely access photo_reference property
        if (photoReference) {
          let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${photoReference}&key=AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ`;
          windowBox.push(
            <div> 
              <div
              key={i}
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                
                borderRadius:"5px",
              }}
            >
            </div>
              <div>
                <p className="title">{data[i].name}</p>
                <p>{data[i].plus_code.compound_code}</p>
                <p>{data[i].rating}</p>
                {(data[i].opening_hours.open_now) ? <p className="status">OPEN</p> : <p className="statusC">CLOSED</p>}
                </div>
                </div>
           
          );
        }
      }
    }

    return <div className="winBox">
      {windowBox}
      </div>;
  }
console.log(data)
  return <ArrayObj data={data} />;
};

export default Categories;

