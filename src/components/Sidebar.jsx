import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Allchat from './Allchat'

function Sidebar() {
  return (
    <div className='sidebar'>
        <Navbar/>
        <Allchat/>
    
    </div>
  )
}

export default Sidebar
