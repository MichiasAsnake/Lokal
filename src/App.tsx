import React from 'react'
import Nav from './components/Nav'
import Nearyou from './components/Nearyou'
import Categories from './components/Categories'
import SearchBar from './components/SearchBar'
const App = () => {
  return (
    <div>
      <Nav />
      <SearchBar />
      <Categories />
      <Nearyou />
    </div>
  )
}

export default App