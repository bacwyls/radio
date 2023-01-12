import React, { useState } from "react";
import { radio } from "../../../../api";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { selectViewers, setViewers } from "../../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../../features/ui/uiSlice";
import { Sigil } from "../../../Sigil";

interface IViewer {
    ship: string,
    index: number,
}

export const Viewer = (props: IViewer) => {

    const { ship, index } = props;

    const [isFocused, setIsFocused] = useState(false);

    const isDarkMode = useAppSelector(selectIsDarkMode);
    const viewers = useAppSelector(selectViewers);

    const dispatch = useAppDispatch();

    const handleViewerClick = () => {
        setIsFocused(true);
        document.addEventListener('click', handleClickOutsideViewer);
    }

    const handleClickOutsideViewer = (e) => {
        let viewer = document.getElementById('viewer-' + ship);

        if (!viewer) {
            setIsFocused(false);
        }
        else if (!(e.target == viewer || viewer?.contains(e.target))) {
            setIsFocused(false);
            document.removeEventListener('click', handleClickOutsideViewer);
        }
    }

    return (
        ship === radio.our ?
            <div
                id={'viewer-' + ship}
                className={`flex   
                                     justify-between py-1.5 hover:bg-hover-default px-4
                       items-center 
                   `}
            >
                <span className='flex items-center ' >
                    <span className={`  mr-1.5 h-4 w-4
                         rounded flex justify-center 
                         items-center bg-background-icon
                         `}
                        style={{ minWidth: '1rem' }}
                    >
                        <Sigil patp={ship} size={0.75} />
                    </span>
                    <span
                        className={'font-medium'}
                    >
                        You
                    </span>
                </span>
            </div >
            :
            <button
                id={'viewer-' + ship}
                className={`flex  hover:bg-hover-default
                                     justify-between py-1.5 px-4
                              
                        ${isFocused ? 'bg-hover-default py-2.5 gap-1 items-center flex-wrap'
                        : 'items-center '
                    } `}
                onClick={() => handleViewerClick()}
            >
                <span className='flex items-center ' >
                    <span className={`  mr-1.5 h-4 w-4
                                     rounded flex justify-center 
                                     items-center bg-background-icon
                                     `}
                        style={{ minWidth: '1rem' }}
                    >
                        <Sigil patp={ship} size={0.75} />
                    </span>
                    <span
                        className={'font-medium whitespace-normal break-words'}
                        style={{ textAlign: 'left', lineHeight: '0.666rem' }}

                    >
                        {ship}
                    </span>
                </span>
                {isFocused && <div className={`flex items-center  gap-1	`}>
                    {/* <a
                        href={'/apps/landscape/~profile/' + ship}
                        target="_blank"
                    >
                        <span className={`cursor-pointer font-semibold
                                     h-4 w-10 flex items-center justify-center
                                    rounded  font-bold 
                                    ${isDarkMode ? ' bg-black-1  hover:bg-black-20 text-black-90 hover:shadow ' : ' bg-white shadow border border-black-10 hover:bg-black-5 '}

                                    `}
                        >
                            profile
                        </span>
                    </a> */}
                    <a
                        href={'/apps/talk/dm/' + ship}
                        target="_blank"
                    >
                        <button className={` font-semibold
                                     h-4 w-7 flex items-center justify-center
                                    rounded  font-bold text-text-primary text-sm text-black bg-white
                                       text-sm   
                                ${isDarkMode ? ' hover:bg-black-30    ' : 'shadow hover:border hover:border-black'}
                                    `}
                        >
                            chat
                        </button>
                    </a>
                    {radio.isAdmin() && <button className={` font-bold 
                                      h-4 w-7 flex items-center justify-center  text-red-600 
                                     rounded bg-white  text-sm   
                                     ${isDarkMode ? ' hover:bg-red-200    ' : 'shadow hover:border hover:border-red-600 '}

                                     `}
                        onClick={() => {
                            dispatch(setViewers(viewers.filter(x => x != ship)))
                            radio.ban(ship)
                        }}
                    >
                        ban
                    </button>}
                </div>}
            </button>
    )
}
