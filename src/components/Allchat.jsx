import React from 'react'
import Searchbar from './Searchbar'

import Chats from './Chats'
function Allchat() {
  return (
    <div className='allchat'>
      <Searchbar/>
      <Chats/>
    </div>
  )
}

export default Allchat
