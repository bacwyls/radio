import { SignOut } from "phosphor-react";
import React from "react";
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import { selectIsDarkMode } from "../../features/ui/uiSlice";
import { isPhone } from "../../util";

export const HomeButton = () => {

    const navigate = useNavigate();
    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (
        <button
            className={`   text-center  rounded  
            flex justify-center items-center relative ml-0.5 
            ${isPhone() ? '' : ' '}
            ${isDarkMode ? 'text-white-dark hover:bg-hover-gray-dark ' : 'hover:bg-hover-gray-light'}
                    `}
            onClick={() => navigate('/')}
            style={{
                width: '2em',
                height: '2em',
            }}
        >
            <SignOut size={26} weight="bold" />
        </button>
    )
}