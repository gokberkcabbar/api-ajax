import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './containers/Dashboard'
import { HomePage } from './containers/HomePage'
import { Movies } from './containers/Movies'
import { TVSeries } from './containers/TVSeries'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Movie } from './containers/Movie'
import { Serie } from './containers/Serie'



const queryClient = new QueryClient()


function App() {



  return (
    <>

      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route
              index
              element={<HomePage />}
            />
            <Route
              path="filmler/"
              
              >
                <Route index  element={<Movies />}/>
                <Route path=':filmID' element={<Movie />}/>
              </Route>
            <Route
              path='diziler/'
               
            >
              <Route index element={<TVSeries />} />
              <Route path=':diziID' element={<Serie />} />


            </Route>
          </Route>
        </Routes>
      </QueryClientProvider>


    </>
  )
}

export default App
