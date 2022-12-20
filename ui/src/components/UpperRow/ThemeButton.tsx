import { MoonStars, Sun } from "phosphor-react"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectIsDarkMode, setIsDarkMode } from "../../features/ui/uiSlice"

export const ThemeButton = () => {
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const dispatch = useAppDispatch();

    return (
        <button
            className={` rounded flex items-center justify-center 
            h-7  px-2 rounded-md font-bold
            ${isDarkMode ? ' hover:bg-black-80' : ' hover:bg-black-10'}
    `}
            style={{
                fontSize: '16px',
            }}
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
        >
            {isDarkMode ?
                <span className="flex items-center"
                >
                    <Sun className="mr-1" size={24} weight="bold" />
                    Light
                </span>
                :
                <span className="flex items-center">
                    <MoonStars className="mr-1" size={24} weight="bold" />
                    Dark
                </span>
            }
        </button>
    )

}