import React, { useRef } from 'react'
import { useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { json, useNavigate } from 'react-router-dom'


const usegetMovies = (page) => {
  return useQuery({
    queryKey: ['homepage/movies', page],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=331e14e782094dc12557a69cadeee6b6&page=${page}`
      );
      return data;
    },
  });
}


const useSearchMovies = (query) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=331e14e782094dc12557a69cadeee6b6&query=${query}`
      );
      return data;
    },
    enabled: query != ""

  });
}




export const HomePage = () => {
  const [searchMovie, setsearchMovie] = useState("")
  const [pages, setpages] = useState(1)
  const { data, isLoading } = usegetMovies(pages)
  const { data: searchData, isLoading: isSearchLoading } = useSearchMovies(searchMovie)
  const navigate = useNavigate()
  console.log(searchData)
  return (
    <>
      <div className='flex flex-col items-center w-full '>
        <SearchBar searchMovie={searchMovie} setsearchMovie={setsearchMovie} />
        <div></div>
      </div>

      {searchMovie == "" ? (
        <div className='hidden'></div>
      ) : (
        isSearchLoading ? (<div className="hidden"></div>)

          :
          <div className='flex flex-col items-center'>
            <div onClick={()=>{setsearchMovie(""); document.getElementById('searchBar').value = ""}} className='fixed left-0 top-0 w-full h-full bg-slate-200 opacity-30 z-10'></div>
            <div className='flex z-20 flex-col w-[50%] justify-start p-4'>
              {searchData.results.slice(0, 6).map((movie, index) => {
                return (
                  <div key={index} className='flex flex-row justify-start gap-y-4 w-full h-[150px] p-4 border-b'>
                    <img onClick={() => navigate('/filmler/' + movie.id)} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.original_title}`} className="w-[15%] h-[100%] cursor-pointer" />
                    <div onClick={() => navigate('/filmler/' + movie.id)} className='mt-[10px] text-center cursor-pointer'>{movie.original_title}</div>
                  </div>
                )
              })}
            </div>
          </div>
      )}

      <div className='grid grid-cols-4 gap-4 mt-[40px] border shadow-xl'>

        {searchMovie == "" ? (isLoading ? (
          <div>Loading</div>
        ) : (
          data.results.map((movie, index) => {
            return (
              <div key={index} className="flex flex-col w-[40%] mx-auto mt-[30px]">
                <img onClick={() => navigate('/filmler/' + movie.id)} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.original_title}`} className="size-20 cursor-pointer" />
                <div onClick={() => navigate('/filmler/' + movie.id)} className='mt-[10px] text-center cursor-pointer'>{movie.original_title}</div>

              </div>
            )
          })
        )) : (<div className='hidden'></div>)}
      </div>
    </>

  )
}
