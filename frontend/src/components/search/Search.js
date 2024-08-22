import React from 'react'
import './Search.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../../reducers/allBlogsSlice'

const Search = () => {
  const dispatch = useDispatch()
  const {searchQuery} = useSelector(state => state?.allBlogsReducer);
  return (
    <div className="search my-5 d-flex justify-content-center">
        <div className="col-11">
        <input name="searchusertext" value={searchQuery} type="search" className="form-control " placeholder='&#128269; Search...' autoFocus={true} onChange={e=>{
          dispatch(setSearchQuery(e?.target?.value))
        }}/>
        </div>
    </div>
  )
}

export default Search
