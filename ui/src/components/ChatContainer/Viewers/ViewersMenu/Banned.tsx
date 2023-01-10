import React, { useState } from "react";
import { radio } from "../../../../api";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { selectBanned, setBanned } from "../../../../features/station/stationSlice";
import { Sigil } from "../../../Sigil";

interface IBanned {
    ship: string,
    index: number,
}

export const Banned = (props: IBanned) => {

    const { ship, index } = props;

    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useAppDispatch();
    const banned = useAppSelector(selectBanned);

    const handleBannedClick = (ship) => {
        if (ship == radio.our) return;
        setIsFocused(true);
        document.addEventListener('click', handleClickOutsideViewer);
    }

    const handleClickOutsideViewer = (e) => {
        let viewer = document.getElementById('banned-' + ship);

        if (!viewer) {
            setIsFocused(false);
        }
        else if (!(e.target == viewer || viewer?.contains(e.target))) {
            setIsFocused(false);
            document.removeEventListener('click', handleClickOutsideViewer);
        }
    }

    return (
        <button
            id={'banned-' + ship}

            className={`flex  hover:bg-hover-default
            justify-between py-1.5
            ${!radio.isAdmin() && 'cursor-default'}
            ${isFocused ? 'bg-hover-default py-2.5 gap-1 items-center flex-wrap'
                    : 'items-center '
                } `}
            style={{ paddingLeft: '24px', paddingRight: '24px' }}
            onClick={() => handleBannedClick(ship)}
        >
            <span className='flex items-center ' >
                <span className={`  mr-1.5 h-4 w-4
                                     rounded flex justify-center 
                                     items-center bg-background-icon
                                     `}
                    style={{ minWidth: '1rem' }}
                >
                    <Sigil patp={ship} size={18} />
                </span>
                <span
                    className={'font-medium'}
                    style={{ textAlign: 'left' }}
                >
                    {ship}
                </span>
            </span>
            {isFocused && <div className={`flex items-center justify-end gap-1 `}>
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
                <span className={`cursor-pointer font-bold 
                                      h-4 w-9 flex items-center justify-center  text-red-600 
                                     rounded bg-white shadow hover:shadow-none  text-sm hover:bg-black-5   hover:border hover:border-red-600
                   text-sm
                                     `}
                    onClick={() => {
                        dispatch(setBanned(banned.filter(x => x != ship)))
                        radio.unban(ship)
                    }}
                >
                    unban
                </span>
            </div>}
        </button>
    )
}