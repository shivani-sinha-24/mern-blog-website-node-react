import React from 'react'
import './Blog.css'
import { Link, useNavigate } from 'react-router-dom'

const Blog = ({ isUserLoggedin, title, image, id, date, content }) => {
  const navigate = useNavigate()

  return (
    <div className="card blog-enlarge m-4 all-side-shadow" style={{ width: "20rem" }}>
      {image &&
        <img src={image} className="card-img-top" alt="..." onClick={() => navigate(`/blog/${id}`)} />
      }
      <div className="card-body">
        <h5 className="card-title" onClick={() => navigate(`/blog/${id}`)}>{title}</h5>
        <p className="card-text content" onClick={() => navigate(`/blog/${id}`)}>{content?.length > 100 ? content.substr(0, 100) + '...' : content}</p>
        <p className="card-text text-sm text-muted" onClick={() => navigate(`/blog/${id}`)}> {date} </p>
        <Link to={`/edit-blog/${id}`} className="text-right btn-warning">Edit Blog &#9998;</Link>
      </div>
    </div>
  )
}

export default Blog
