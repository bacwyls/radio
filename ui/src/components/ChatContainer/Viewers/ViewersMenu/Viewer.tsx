import React, { useState } from "react";
import { radio } from "../../../../api";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { selectViewers, setViewers } from "../../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../../features/ui/uiSlice";
import { isValidPatp } from 'urbit-ob'
import { renderSigil } from "../../../../util";

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
        if (!radio.isAdmin()) return;

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
                                     justify-between py-1.5
                                    ${isDarkMode ? 'hover:bg-black-80' : 'hover:bg-black-5'}
                        : 'items-center '
                    } `}
                style={{ paddingLeft: '24px', paddingRight: '24px' }}
            >
                <span className='flex items-center ' >
                    <span className={`  mr-1.5 h-4 w-4
                         rounded flex justify-center 
                         items-center
                         ${isDarkMode ? 'bg-black-70' : 'bg-black-80'}

                         `}
                        style={{ minWidth: '1rem' }}
                    >{
                            ship && isValidPatp(ship) && ship.length <= 14 &&
                            renderSigil(ship, 18, isDarkMode)
                        }
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
                className={`flex 
                                     justify-between py-1.5
                                     ${!radio.isAdmin() && 'cursor-default'}
                                    ${isDarkMode ? 'hover:bg-black-80' : 'hover:bg-black-5'}
                        ${isFocused ? (isDarkMode ? 'bg-black-80 py-2.5 gap-1 items-center flex-wrap' : 'bg-black-5  py-2.5 gap-1 items-center flex-wrap')
                        : 'items-center '
                    } `}
                style={{ paddingLeft: '24px', paddingRight: '24px' }}
                onClick={() => handleViewerClick()}
            >
                <span className='flex items-center ' >
                    <span className={`  mr-1.5 h-4 w-4
                                     rounded flex justify-center 
                                     items-center
                                     ${isDarkMode ? 'bg-black-70' : 'bg-black-80'}

                                     `}
                        style={{ minWidth: '1rem' }}
                    >{
                            ship && isValidPatp(ship) && ship.length <= 14 &&
                            renderSigil(ship, 18, isDarkMode)
                        }
                    </span>
                    <span
                        className={'font-medium whitespace-normal break-words'}
                        style={{ textAlign: 'left' }}
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
                            style={{ fontSize: '14px' }}
                        >
                            profile
                        </span>
                    </a> */}
                    {radio.isAdmin() && <span className={`cursor-pointer font-bold
                                    hover:shadow  h-4 w-7 flex items-center justify-center  text-red-600 
                                     rounded bg-white   
                                     ${isDarkMode ? ' bg-black-1  hover:bg-black-20  hover:shadow' : ' bg-white shadow border border-black-10 hover:bg-black-4 '}
                
                                     `}
                        style={{ fontSize: '14px' }}
                        onClick={() => {
                            dispatch(setViewers(viewers.filter(x => x != ship)))
                            radio.ban(ship)
                        }}
                    >
                        ban
                    </span>}
                </div>}
            </button>
    )
}
