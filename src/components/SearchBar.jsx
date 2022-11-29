import React from 'react'

export const SearchBar = ({
    searchMovie,
    setsearchMovie
}) => {
  
    return (
    <input id='searchBar' onKeyDown={(event)=> {if(event.key == "Enter"){
      setsearchMovie(event.target.value)
    }}} className='p-2 focus:ring-0 text-center mt-[30px] border shadow-xl w-[20%]' onClick={()=> setsearchMovie("")} type="text"/>
  )
}
