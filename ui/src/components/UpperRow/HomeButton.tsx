import { SignOut } from "phosphor-react";
import React from "react";
import { MdLogout, MdOutlineHome } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { isPhone } from "../../util";

export const HomeButton = () => {

    const navigate = useNavigate();

    return (
        <button
            className={`   text-center  rounded  hover:bg-gray-100
            flex justify-center items-center relative 
            ${isPhone() ? '' : ' '}
                    `}
            onClick={() => navigate('/')}
            style={{ width: '2em', height: '2em' }}
        >
            <SignOut size={26} weight="bold" />
        </button>

    )

}