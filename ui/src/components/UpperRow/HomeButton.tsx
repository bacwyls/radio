import React from "react"
import { MdLogout, MdOutlineHome } from "react-icons/md"
import { useNavigate } from "react-router-dom"


export const HomeButton = () => {

    const navigate = useNavigate();

    return (
        <button
            className={`border-gray-400 \
            border px-2 ml-2 text-center rounded bg-white\
            flex-initial h-7 hover:border-black shadow
            flex justify-center items-center relative 
            `}
            onClick={() => navigate('/')}
        >
            <MdLogout className="text-sm" />
        </button>

    )

}