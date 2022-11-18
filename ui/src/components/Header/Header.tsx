import { MoonStars } from "phosphor-react";
import React from "react"
import { useAppSelector } from "../../app/hooks";
import { selectIsLandscape } from "../../features/ui/uiSlice";
import { isPhone } from "../../util";
import { ThemeButton } from "../UpperRow/ThemeButton";
import './style.css';

export const Header = () => {

    const isLandscape = useAppSelector(selectIsLandscape);

    return (
        <div className={`
                            ${!isLandscape && isPhone() ? 'header-phone-portrait text-lg' : 'header '}
                    `}>
            <div className=" flex items-center ">
                <img
                    src='/apps/radio/assets/favicon.ico'
                    className={`h-auto
                    ${!isLandscape && isPhone() ? 'w-7' : 'w-10 sm:w-12 md:w-6 mr-1'}
                    `}
                    style={{ marginBottom: '0.15em' }}
                />
                <span
                    className="font-black whitespace-nowrap
                  mr-2 flex tracking-tighter	tracking-wide	 flex items-end "
                    style={{ color: '#5B4D2A' }}
                >
                    Radio
                </span>
            </div>
            <ThemeButton />
        </div>

    )

}