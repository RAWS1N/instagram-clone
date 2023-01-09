import React from 'react'

function SuggestedUser({firstname,lastname,username,id,avatar}) {
  return (
        <div className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-4 mt-5">
          <img
            src={avatar}
            alt="user"
            className="h-10 w-10 p-1 rounded-full border"
          />
          <div>
            <h3 className="font-semibold text-sm capitalize">{firstname} {lastname}</h3>
            <h4 className="text-sm capitalize text-gray-500">{username}</h4>
          </div>
        </div>
        <button className="text-sm font-semibold text-cyan-500 capitalize">follow</button>
      </div>
    
  )
}

export default SuggestedUser