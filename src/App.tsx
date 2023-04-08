import React from 'react'
import Nav from './components/Nav'
import Nearyou from './components/Nearyou'
import Categories from './components/Categories'

const App = () => {
  return (
    <div>
      <Categories />
      <Nav />
      <Nearyou />
    </div>
  )
}

export default App