import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IconMovie } from '@tabler/icons'


export const Dashboard = () => {


    return (
        <div className='flex flex-col container mx-auto mt-[25px]'>
            <nav className='flex flex-row justify-between items-center border-slate-100 shadow-xl rounded-lg p-4'>
                <Link to="/"><IconMovie size={40} /></Link>
                <div className='inline-flex gap-4'>
                    <a href="http://localhost:5173/diziler">Diziler</a>
                    <a href="http://localhost:5173/filmler">Fimler</a>
                </div>
            </nav>

            
            <Outlet />


        </div>
    )
}
