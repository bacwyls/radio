import { Broadcast, } from "phosphor-react";
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
                            ${!isLandscape && isPhone() ? 'header' : 'header '}
                             ${isDarkMode ? 'bg-black-95 border-black-85 ' : 'bg-white  border-black-10'}
                    `}
            style={{ zIndex: 3, }}
        >
            <div className=" flex items-center "
                style={{ fontSize: '28px' }}
            >
                <img
                    src='/apps/radio/assets/favicon.ico'
                    className={`h-auto w-6 mr-1
                    `}
                />
                <span
                    className="font-black whitespace-nowrap 
                  mr-4 flex 	 flex items-end "
                >
                    radio
                </span>
            </div>
            <div className="flex items-center">
                <button
                    className={`rounded text-center 
                                flex-initial flex items-center
                            justify-center px-2 overflow-hidden h-7 
                            ${isDarkMode ? ' hover:bg-black-80' : ' hover:bg-black-10 '}
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
                    <span
                        className='ml-1	flex items-center
                 font-bold leading-3 '
                        style={{
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
