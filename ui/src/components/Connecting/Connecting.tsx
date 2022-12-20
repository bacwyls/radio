import React, { useEffect } from "react"
import { ConnectingAnimation } from "./ConnectingAnimation/ConnectingAnimation"
import { isValidPatp } from 'urbit-ob'
import { useAppSelector } from "../../app/hooks";
import { selectIsDarkMode } from "../../features/ui/uiSlice";
import { reactRenderer, sigil } from "@tlon/sigil-js";
import { useNavigate } from "react-router-dom";
import { radio } from "../../api";
import { Television } from "phosphor-react";
import Snowfall from "react-snowfall";

interface IConnecting {
    patp: string;
}

export const Connecting = ({ patp }: IConnecting) => {
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/');
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

    const handleKeyDown = (event: any) => {
        if (event.key == 'Escape') {
            event.preventDefault();
            handleCancel();
        }
    }

    return (
        <div
            className='w-full h-full fixed z-50 flex items-center justify-center'
            style={{
                backdropFilter: 'blur(10px) brightness(0.8)',
                top: 0,
                left: 0
            }}
        >
            <Snowfall
                // color="#dee4fd"
                radius={[4, 6]}
                snowflakeCount={100}
                speed={[0.1, 0.3]}
                wind={[-0.1, 0.1]}
                style={{ position: 'fixed' }}
            />
            <div
                className={`bg-white shadow flex items-center  rounded-md
                ${isDarkMode ? ' bg-black-90 text-black-10' : ' bg-white border-black-10 text-black-80'}
        `}
                style={{
                    width: '30em',
                    height: '14em',
                    paddingLeft: '6em',
                    zIndex: 51,
                }}
            >

                <div style={{ marginTop: '-3em' }}>
                    <ConnectingAnimation />
                </div>
                <div className=" flex flex-col gap-2 font-bold ml-6"
                >
                    <span
                        className={`
                    ${isDarkMode ? 'text-black-30' : 'text-black-40'}
                    `}
                        style={{ fontSize: '1rem' }}
                    >
                        Connecting to:
                    </span>
                    <div className={`flex items-center
                    
                    `}>
                        {patp == radio.hub &&
                            <>
                                <span
                                    className={`rounded flex items-center mr-1 px-1.5  py-1  ${isDarkMode ? 'bg-white-dark  ' : ' bg-gray-200 '}`}
                                >
                                    <Television
                                        size={30}
                                        weight="bold"
                                        className={` ${isDarkMode ? 'text-black' : ''}`}
                                    />
                                </span>
                            </>
                        }
                        {patp != radio.hub && patp.length <= 14 && isValidPatp(patp)
                            &&
                            <span
                                className={`mr-1 h-4 w-4  overflow-hidden 
                                       rounded flex justify-center items-center
                                       ${isDarkMode ? 'bg-black-10 ' : 'bg-black-80 '}
                                       `}
                            >{
                                    sigil({
                                        patp: patp,
                                        renderer: reactRenderer,
                                        size: 16,
                                        colors: isDarkMode ? ['#E9E8E9', '#1D1B1A'] : ['#4A4948', 'white'],
                                    })
                                }
                            </span>
                        }
                        {patp == radio.hub ? 'Hub' : patp}
                    </div>
                    <button
                        className={` flex items-center justify-center
                         border-gray-400 rounded  hover:border-black
                         text-bold px-2 py-1 mt-2 z-10 h-6
                         ${isDarkMode ? ' bg-black-80 ' : ' bg-black-10 border-black-10 '}

                         `}
                        style={{
                            right: 0,
                            top: 0,
                            marginRight: '2.42em',
                            boxShadow: 'rgba(50, 50, 93, 0.25) \
                            0px 2px 5px -1px, rgba(0, 0, 0, 0.3)`\
                             0px 1px 3px - 1px ',
                        }}
                        onClick={handleCancel}
                    >
                        <span
                            className='font-bold '
                            style={{ fontSize: '.65rem' }}
                        >
                            Cancel
                        </span>
                        <span className={`ml-1 px-1  font-bold
                                        rounded border
                                        ${isDarkMode ? '   border-black-85 bg-black-60 text-black-1' : ' bg-white border-black-10'}
                                        `}
                            style={{
                                fontSize: '.6rem', right: '0.1em', top: '0.1em',
                                // boxShadow: 'rgba(50, 50, 93, 0.25) \
                                //               0px 2px 5px -1px, rgba(0, 0, 0, 0.3) \
                                //               0px 1px 3px -1px' 
                            }}
                        >
                            Esc
                        </span>
                    </button>
                </div>
            </div>
        </div >
    )
} 