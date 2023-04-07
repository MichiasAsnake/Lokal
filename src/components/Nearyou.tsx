import React from 'react';

class PlacesFetcher extends React.Component {
  fetchPlaces = () => {
    // Make an API call to your back-end server
    fetch('/api/places')
      .then(response => response.json())
      .then(data => {
        // Access the entire data object and log it to the console
        console.log(data);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchPlaces}>Fetch Places</button>
      </div>
    );
  }
}

export default PlacesFetcher;