import { MoonStars } from "phosphor-react"
import React from "react"

export const ThemeButton = () => {
    return (
        <button
            className="hover:bg-gray-100  rounded flex items-center justify-center"
            style={{ width: '2em', height: '2em' }}

        >
            <MoonStars size={26} weight="bold" />
        </button>
    )

}