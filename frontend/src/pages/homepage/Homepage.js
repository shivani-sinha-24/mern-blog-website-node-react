import React from 'react'
import './Homepage.css'

//import component
import Search from '../../components/search/Search';
import Blog from '../../components/blog/Blog';
import { useSelector } from 'react-redux';

const Homepage = ({ isUserLoggedin, blogs }) => {
  const {searchQuery} = useSelector(state => state?.allBlogsReducer);

  return (
    <div className='homepage'>
      <Search />
      <div className="blogs d-flex justify-content-center">
        {blogs
        ?.filter(blog=>blog?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
        ?.map(blog => {
          return (
            <Blog
              isUserLoggedin={isUserLoggedin}
              title={blog.title}
              image={blog.image}
              key={blog._id}
              id={blog._id}
              content={blog.content}
              date={blog.date}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Homepage
