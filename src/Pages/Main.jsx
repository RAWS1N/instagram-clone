import React from 'react'
import {Header,Feed,Modal} from '../Components'


function Main() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <Modal/>
      <Header />
      <Feed />
    </div>
  )
}

export default Main