import React from 'react'
import './Comment.css'

const Comment = ({userName,cmnt}) => {
  return (
    <div className="comment">
      <div className="comment-detail">
        <div className='user-logo text-center'>
          <h5 className='text-center'>{userName?.charAt(0).toUpperCase()}</h5></div>
        <div className="info">
          <span>{userName}</span>
          <p>{cmnt}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
