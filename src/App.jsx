import React from 'react'
import SideBar from './Components/SideBar'
import Search from './Components/Search'
import ChatContainer from './Components/ChatContainer'

const App = () => {
  return (
    <div>
      <SideBar/>
      <ChatContainer setUserInput={setUserInput}/>
      <Search/>
      
    </div>
  )
}

export default App
