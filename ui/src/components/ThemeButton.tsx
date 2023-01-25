import { MoonStars, Sun } from "phosphor-react"
import React from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectIsDarkMode, setIsDarkMode } from "../features/ui/uiSlice"
import { isPhone } from "../util"

export const ThemeButton = () => {
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const dispatch = useAppDispatch();

    return (
        <button
            className={` rounded flex items-center justify-center 
            h-7  px-2 rounded font-bold 
            ${!isPhone() && 'hover:bg-hover-default'}
            `}
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
        >
            {isDarkMode ?
                <>
                    <Sun className="mr-1 text-xl" weight="bold" />
                    <span className="hidden sm:flex " >
                        Light
                    </span >

                </>
                :
                <>
                    <MoonStars className="mr-1 text-xl" weight="bold" />
                    <span className="hidden sm:flex " >
                        Dark
                    </span >
                </>
            }
        </button>
    )

}