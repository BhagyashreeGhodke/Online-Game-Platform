import React from 'react'
import { useSelector } from 'react-redux'


export default function Home() {
    const authStatus = useSelector((state) => state.auth.status);
    console.log("authStatus: ", authStatus);
    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    
                </div>

                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                    <img className="w-96" src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="image1" />
                </div>
            </aside>

            <div className="grid  place-items-center sm:mt-20">
                <img className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>
        {
            authStatus && 
            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Welcome to Online Game Platform</h1>
        }
        
        {
            !authStatus && 
            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Login to see Website</h1>
        }
            
        </div>
    );
}

