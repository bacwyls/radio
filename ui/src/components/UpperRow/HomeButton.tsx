import React from "react";
import { MdLogout, MdOutlineHome } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { isPhone } from "../../util";

export const HomeButton = () => {

    const navigate = useNavigate();

    return (
        <button
            className={`border-gray-400 
            sm:border sm:shadow   text-center rounded 
             h-6 hover:border-black 
            flex justify-center items-center relative 
            ${isPhone() ? '' : 'ml-2 px-2 bg-white'}
            `}
            onClick={() => navigate('/')}
        >
            <MdLogout className="text-base" />
        </button>

    )

}