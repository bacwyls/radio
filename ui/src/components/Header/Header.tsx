import { Broadcast, MoonStars, Radio } from "phosphor-react";
import { GrSatellite } from 'react-icons/gr';
import React from "react"
import { useNavigate } from "react-router-dom";
import { radio } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { selectIsDarkMode, selectIsLandscape } from "../../features/ui/uiSlice";
import { isPhone } from "../../util";
import { ThemeButton } from "../UpperRow/ThemeButton";
import './style.css';

export const Header = () => {

    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const navigate = useNavigate();

    return (
        <div className={`
                            ${!isLandscape && isPhone() ? 'header-phone-portrait text-lg' : 'header '}
                            ${isDarkMode ? 'bg-black-95 border-black-85 text-black-10' : 'bg-white text-black-80 border-black-10'}
                    `}
            style={{ zIndex: 3 }}
        >
            <div className=" flex items-center ">
                <img
                    src='/apps/radio/assets/favicon.ico'
                    className={`h-auto
                    ${!isLandscape && isPhone() ? 'w-7' : 'w-10 sm:w-12 md:w-6 mr-1'}
                    `}
                />
                <span
                    className="font-black whitespace-nowrap 
                  mr-4 flex tracking-tighter	tracking-wide	 flex items-end "
                >
                    radio
                </span>
            </div>
            <div className="flex items-center">
                <button
                    className={`rounded text-center 
                                flex-initial flex items-center
                            justify-center px-2 overflow-hidden h-7 
                            ${isDarkMode ? ' hover:bg-black-80' : ' hover:bg-black-10 text-black-80'}
                            `}
                    style={{
                        whiteSpace: 'nowrap',
                        // width: '6.5em',
                    }}
                    onClick={() => {
                        radio.start()
                        navigate('/station/' + radio.our)
                    }}
                >
                    <Broadcast size={24} weight="bold" />
                    {/* <GrSatellite size={22} style={{ fontWeight: '900', strokeWidth: '5', stroke: 'black' }} /> */}
                    <span
                        className='ml-1	flex items-center
                 font-bold leading-3 '
                        style={{
                            fontSize: '.7rem',
                            whiteSpace: 'nowrap',
                            wordWrap: 'break-word',
                        }}>
                        Broadcast
                    </span>
                </button >
                <ThemeButton />
            </div>
        </div >

    )

}
