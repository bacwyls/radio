import { Radio, Television } from "phosphor-react";
import React from "react"
import { GoRadioTower } from "react-icons/go";
import { MdOutlineRadio } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { radio } from "../../../api"
import { useAppSelector } from "../../../app/hooks";
import { selectIsLandscape } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import './style.css';

export const ShortcutButtons = () => {

    const navigate = useNavigate();
    const isLandscape = useAppSelector(selectIsLandscape);

    return (

        <div className={`flex gap-2 items-center align-middle
          ${isPhone() && !isLandscape && 'shorcut-phone-portrait'}
        `}>
            {radio.tunedTo !== radio.our &&
                <button
                    className=" rounded
            text-center bg-white hover:bg-gray-100
            flex-initial flex items-center 
            justify-center px-1 overflow-hidden h-6"
                    style={{
                        whiteSpace: 'nowrap',
                        width: '6.5em'
                    }
                    }
                    onClick={() => navigate('/station/' + radio.our)}
                >
                    {/* <MdOutlineRadio className="text-xs " /> */}
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
                    className="  rounded bg-white 
                text-center 
                flex-initial  flex items-center  hover:bg-gray-100
                justify-center px-4  overflow-hidden  h-6"
                    style={{
                        whiteSpace: 'nowrap',
                        width: '6.5em'
                    }}
                    onClick={() => navigate('/station/' + radio.hub)}
                >
                    {/* <GoRadioTower className="text-xs" />
                     */}
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