import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

const usegetSerie = (diziID) => {
  return useQuery({
    queryKey: ['serie', diziID],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${diziID}?api_key=331e14e782094dc12557a69cadeee6b6&`
      );
      return data;
    },
    enabled: diziID != undefined
  });
}

export const Serie = () => {
  // Bu syafata gfelindiğinde yazıkan useQuery hookuna id yollanacak
  // spesifik film idsi ile veri çekilecek
  const { diziID } = useParams()
  const { data: serieData, isLoading: serieLoading } = usegetSerie(diziID)
  return (
    <>
      {diziID == undefined ? (
        <div className='hidden'></div>
      ) : (
        serieLoading ? (
          <div className='mt-[50px] flex flex-col justify-center items-center'><div role="status">
            <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div></div>
        ) : (
          <div className='mt-[50px] flex flex-col justify-start w-full  h-[600px] bg-gray-200 border shadow-xl p-4 rounded-xl'>
            <div className='flex flex-row w-full gap-x-10 my-auto'>
              <img src={`http://image.tmdb.org/t/p/w500/${serieData.poster_path}`} alt={`${serieData.name}`} className="w-[40%] h-[500px]" />
              <div className='flex flex-col gap-y-10 bg-slate-700 w-full p-3'>
                <h1 className='font-mono text-3xl text-white font-bold tracking-[10px] text-center'>{serieData.name}</h1>
                <div className='flex flex-row gap-5 text-white font-light justify-center text-xs'>
                  {serieData.genres.map((value, index)=> {
                    return (
                      <p key={index} className="bg-red-500 p-2 rounded-xl">{value.name}</p>
                    )
                  })}
                </div>
                <h1 className='text-xl text-white font-semibold mt-[5px] p-2'>Overview</h1>
                <p className='text-bs text-gray-200 bg-slate-900 p-4 text-justify rounded-xl'>{serieData.overview}</p>

              </div>
            </div>
          </div>
        )

      )}
    </>
  )

}
