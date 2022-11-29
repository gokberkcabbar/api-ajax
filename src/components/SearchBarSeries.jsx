import React from 'react'

export const SearchBarSeries = ({
    searchSeries,
    setsearchSeries
}) => {
  
    return (
    <input id='searchBar' onKeyDown={(event)=> {if(event.key == "Enter"){
      setsearchSeries(event.target.value)
    }}} className='p-2 focus:ring-0 text-center mt-[30px] border shadow-xl w-[20%]' onClick={()=> setsearchSeries("")} type="text"/>
  )
}
