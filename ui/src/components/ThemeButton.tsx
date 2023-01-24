import { MoonStars, Sun } from "phosphor-react"
import React from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectIsDarkMode, setIsDarkMode } from "../features/ui/uiSlice"
import { isPhone } from "../util"

export const ThemeButton = () => {
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const dispatch = useAppDispatch();

    return (
        isPhone() ?
            (isDarkMode ?
                <Sun weight="bold" className="text-xl"
                    onClick={() => dispatch(setIsDarkMode(false))}
                />
                :
                <MoonStars weight="bold" className="text-xl"
                    onClick={() => dispatch(setIsDarkMode(true))}
                />
            )
            :
            <button
                className={` rounded flex items-center justify-center 
            h-7  px-2 rounded font-bold hover:bg-hover-default`}
                onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
            >
                {isDarkMode ?
                    <>
                        <Sun className="mr-1 text-xl" weight="bold" />
                        Light
                    </>
                    :
                    <>
                        <MoonStars className="mr-1 text-xl" weight="bold" />
                        Dark
                    </>
                }
            </button>
    )

}