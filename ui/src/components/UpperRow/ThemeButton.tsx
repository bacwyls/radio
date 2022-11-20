import { MoonStars, Sun } from "phosphor-react"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectIsDarkMode, setIsDarkMode } from "../../features/ui/uiSlice"

export const ThemeButton = () => {
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const dispatch = useAppDispatch();

    return (
        <button
            className={` ml-0.5 rounded flex items-center justify-center
            ${isDarkMode ? ' hover:bg-hover-gray-dark' : ' hover:bg-hover-gray-light'}
    `}
            style={{
                width: '2em',
                height: '2em',
                color: `${isDarkMode ? 'rgb(254,255,254)' : ''}`
            }}
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
        >
            {isDarkMode ?
                <Sun size={26} weight="bold" />
                :
                <MoonStars size={26} weight="bold" />
            }
        </button>
    )

}