import React from "react";

type IData = {
  name: string;
  photos: string[];
  opening_hours: {
    open_now: boolean;
  };
  rating: number;
  plus_code: {
    compound_code: string;
  };
};

const Categories = ({ data }: { data: IData[] | null }) => { // Update the type of "data" prop to IData[] | null
  // Check if data is null, and render appropriate UI
  if (data === null) {
    return <div>Loading...</div>; // or any other UI for handling null data
  }

  // Access the data prop and use it to render the UI

  function ArrayObj({ data }: { data: IData[] }) { // Update the type of "data" prop for ArrayObj
    let windowBox = [];

    for (let i = 0; i < data.length; i++) {
      windowBox.push(
        <div key={i}>
          <p style={{ backgroundImage: `url(${data[i].photos[0]})`}} >d</p>
          <p>{data[i].name}</p>
        </div>
      );
    }

    return (
      <div>
      {windowBox}
      </div>
    );
  }

  console.log(data);
  return <ArrayObj data={data} />; // Render the ArrayObj component and pass "data" as a prop
};

export default Categories;
