import React from "react"
import { GoRadioTower } from "react-icons/go";
import { MdOutlineRadio } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { radio } from "../../api"

export const ShortcutButtons = () => {

    const navigate = useNavigate();

    return (

        <div className="flex gap-2 items-center align-middle">
            {radio.tunedTo !== radio.our &&
                <button
                    className="hover:border-black rounded
            border-gray-400 text-center bg-white 
            flex-initial flex items-center border hover:shadow
            justify-center px-1 overflow-hidden h-6"
                    style={{
                        whiteSpace: 'nowrap',
                        width: '6em'
                    }
                    }
                    onClick={() => navigate('/station/' + radio.our)}
                >
                    <MdOutlineRadio className="text-xs " />
                    <span
                        className='ml-1	flex items-center
                 font-semibold leading-3 '
                        style={{
                            fontSize: '.6rem',
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                        }}>
                        My station
                    </span>
                </button >
            }
            {
                radio.tunedTo !== radio.hub &&
                <button
                    className="hover:border-black  rounded bg-white 
                border-gray-400 text-center 
                flex-initial  flex items-center border hover:shadow
                justify-center px-4  overflow-hidden  h-6"
                    style={{
                        whiteSpace: 'nowrap',
                        width: '6em'

                    }}
                    onClick={() => navigate('/station/' + radio.hub)}
                >
                    <GoRadioTower className="text-xs" />
                    <span
                        className='ml-1	flex items-center font-semibold leading-3 '
                        style={{
                            fontSize: '.6rem',
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