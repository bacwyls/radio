import { Broadcast, } from "phosphor-react";
import React from "react"
import { useNavigate } from "react-router-dom";
import { radio } from "../../api";
import { ThemeButton } from "../ThemeButton";
import './style.css';

export const Header = () => {

    const navigate = useNavigate();

    return (
        <div className='header'
        >
            <div className=" flex items-center text-2xl "
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
                                flex-initial flex items-center whitespace-nowrap
                            justify-center px-2 overflow-hidden h-7 hover:bg-hover-default
                            `}
                    onClick={() => {
                        radio.start()
                        navigate('/station/' + radio.our)
                    }}
                >
                    <Broadcast weight="bold" className='text-xl' />
                    <span
                        className='ml-1	flex items-center 
                 font-bold'
                    >
                        Broadcast
                    </span>
                </button >
                <ThemeButton />
            </div>
        </div >

    )

}
