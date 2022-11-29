import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { SearchBar } from '../components/SearchBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SearchBarSeries} from '../components/SearchBarSeries'

const usegetSeries = (page) => {
  return useQuery({
    queryKey: ['homepage/movies', page],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=331e14e782094dc12557a69cadeee6b6&page=${page}`
      );
      return data;
    },
  });
}

const useSearchSeries = (query) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=331e14e782094dc12557a69cadeee6b6&query=${query}`
      );
      return data;
    },
    enabled: query != ""

  });
}




export const TVSeries = () => {
  const [searchSeries, setsearchSeries] = useState("")
  const [pages, setpages] = useState(1)
  const { data, isLoading } = usegetSeries(pages)
  const { data: searchData, isLoading: isSearchLoading } = useSearchSeries(searchSeries)
  const navigate = useNavigate()

  return (
    <>
      <div className='flex flex-col items-center w-full '>
        <SearchBarSeries searchSeries={searchSeries} setsearchSeries={setsearchSeries} />
        <div></div>
      </div>

      {searchSeries == "" ? (
        <div className='hidden'></div>
      ) : (
        isSearchLoading ? (<div className="hidden"></div>)

          :
          <div className='flex flex-col items-center'>
            <div onClick={()=>{setsearchSeries(""); document.getElementById('searchBar').value = ""}} className='fixed left-0 top-0 w-full h-full bg-slate-200 opacity-30 z-10'></div>
            <div className='flex z-20 flex-col w-[50%] justify-start p-4'>
              {searchData.results.slice(0, 6).map((series, index) => {
                return (
                  <div key={index} className='flex flex-row justify-start gap-y-4 w-full h-[150px] p-4 border-b'>
                    <img onClick={() => navigate('/diziler/' + series.id)} src={`http://image.tmdb.org/t/p/w500/${series.poster_path}`} alt={`${series.name}`} className="w-[15%] h-[100%] cursor-pointer" />
                    <div onClick={() => navigate('/diziler/' + series.id)} className='mt-[10px] text-center cursor-pointer'>{series.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
      )}

      <div className='grid grid-cols-4 gap-4 mt-[40px] border shadow-xl'>

        {searchSeries == "" ? (isLoading ? (
          <div>Loading</div>
        ) : (
          data.results.map((series, index) => {
            return (
              <div key={index} className="flex flex-col w-[40%] mx-auto mt-[30px]">
                <img onClick={() => navigate('/diziler/' + series.id)} src={`http://image.tmdb.org/t/p/w500/${series.poster_path}`} alt={`${series.name}`} className="size-20 cursor-pointer" />
                <div onClick={() => navigate('/diziler/' + series.id)} className='mt-[10px] text-center cursor-pointer'>{series.name}</div>

              </div>
            )
          })
        )) : (<div className='hidden'></div>)}
      </div>
    </>

  )
}
