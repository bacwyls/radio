import { Radio, Television } from "phosphor-react";
import React from "react"
import { useNavigate } from "react-router-dom";
import { radio } from "../../../api"
import { useAppSelector } from "../../../app/hooks";
import { selectIsDarkMode, selectIsLandscape } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import './style.css';

export const ShortcutButtons = () => {

    const navigate = useNavigate();
    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (

        <div className={`flex gap-2 items-center align-middle
          ${isPhone() && !isLandscape && 'shorcut-phone-portrait'}
        `}>
            {radio.tunedTo !== radio.our &&
                <button
                    className={`rounded text-center 
                                flex-initial flex items-center 
                            justify-center px-1 overflow-hidden h-6 
                            ${isDarkMode ? 'hover:bg-hover-gray-dark text-white-dark ' : 'hover:bg-gray-100 '}
                            `}
                    style={{
                        whiteSpace: 'nowrap',
                        width: '6.5em',
                    }}
                    onClick={() => navigate('/station/' + radio.our)}
                >
                    <Radio size={32} weight="bold" />
                    <span
                        className='ml-1	flex items-center
                 font-bold leading-3 '
                        style={{
                            fontSize: '.7rem',
                            whiteSpace: 'nowrap',
                            wordWrap: 'break-word',
                        }}>
                        My Station
                    </span>
                </button >
            }
            {
                radio.tunedTo !== radio.hub &&
                <button
                    className={`  rounded text-center 
                flex-initial  flex items-center  
                justify-center px-4  overflow-hidden  h-6
                ${isDarkMode ? 'hover:bg-hover-gray-dark text-white-dark' : 'hover:bg-hover-gray-light '}
                `}
                    style={{
                        whiteSpace: 'nowrap',
                        width: '6.5em',
                    }}
                    onClick={() => navigate('/station/' + radio.hub)}
                >
                    <Television size={32} weight="bold" />
                    <span
                        className='ml-1	flex items-center font-bold leading-3 '
                        style={{
                            fontSize: '.7rem',
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                        }}>
                        Hub
                    </span>
                </button >
            }
        </div >
    )

}