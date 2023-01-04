import { ArrowsClockwise, CaretDown, CaretUp, UserSwitch } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { radio } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectSpinTime, selectSpinUrl, selectTunePatP } from "../../../features/station/stationSlice";
import { selectIsDarkMode, selectPlayerInSync, setPlayerInSync } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import './style.css';

interface ISyncActions {
}


export const SyncActions: FC<ISyncActions> = (props: ISyncActions) => {

    const spinTime = useAppSelector(selectSpinTime);
    const tunePatP = useAppSelector(selectTunePatP);
    const playerInSync = useAppSelector(selectPlayerInSync);
    const spinUrl = useAppSelector(selectSpinUrl);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    const dispatch = useAppDispatch();

    const [showOptions, setShowOptions] = useState(false);

    const syncActionsId = 'sync-actions';

    const showOptionsId = 'show-options-id';

    useEffect(() => {

        document.addEventListener(
            "click",
            handleClickOutsideSyncActions
        )
        return () => document.removeEventListener('click', handleClickOutsideSyncActions)
    }, []);

    const handleClickOutsideSyncActions = (event: any) => {
        var clicked = event.target as Element;
        var dropdown = document.getElementById(syncActionsId);

        if (
            dropdown && clicked != dropdown && !dropdown.contains(clicked)
        ) {
            setShowOptions(false);
        }
    }

    return (
        !playerInSync ?
            isPhone() ?
                <button
                    id={syncActionsId}
                    className={` 
                     resync-button-phone relative
                 `}
                    onClick={(e) => {
                        if (tunePatP != radio.our) {
                            radio.seekToDelta(spinTime);
                            dispatch(setPlayerInSync(true));
                        }
                        else {
                            setShowOptions(prev => !prev)
                        }
                    }}
                >
                    <ArrowsClockwise weight="bold" size={24} />
                    Resync
                    {
                        showOptions &&
                        <div className={`absolute     p-2 flex flex-col rounded-md border gap-1
                        ${isDarkMode ? ' bg-black-95 filter drop-shadow-md-dark border-black-85 ' : ' bg-white border-black-10 '}
                        `}
                            style={{ width: '20vw', bottom: '3rem' }}

                        >
                            <span
                                onClick={(e) => {
                                    radio.seekToDelta(spinTime);
                                    dispatch(setPlayerInSync(true));
                                }}
                            >Self</span>
                            <span
                                onClick={(e) => {
                                    radio.resyncAll(spinUrl)
                                }}
                            >All</span>
                        </div>
                    }
                </button >
                :
                <div id={syncActionsId} className="sync-actions  "
                >
                    {tunePatP != radio.our ?
                        <button
                            className={` 
                    resync-button 
                    ${isDarkMode ? ' border-black-85' : 'border-black-20'}
                           ${isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5 '}
                        	 `}
                            onClick={(e) => {
                                radio.seekToDelta(spinTime);
                                dispatch(setPlayerInSync(true));
                            }}
                        >
                            <UserSwitch weight="bold" className="resync-icon" />
                            Resync Self
                        </button>
                        :
                        <div className="relative ">
                            <button
                                className={` 
                    resync-split-button  relative z-10 border-l border-t border-b
                    ${showOptions && isDarkMode && 'filter drop-shadow-md-dark'}
                    ${showOptions ? 'rounded-b-md shadow' : 'rounded-md'}
                    ${isDarkMode ? ' border-black-85 bg-black-90  hover:bg-black-70' : 'border-black-20 bg-white hover:bg-black-5'}
                        	 `}
                                onClick={() => {
                                    radio.seekToDelta(spinTime);
                                    dispatch(setPlayerInSync(true));
                                }}
                            >
                                <UserSwitch weight="bold" className="resync-icon" />
                                Resync Self
                            </button>
                            <button
                                id={showOptionsId}
                                className={`z-20  border-t border-r border-b absolute top-0 right-0 h-full w-7 flex items-center justify-center
                                ${showOptions ? 'rounded-br-md' : 'rounded-r-md '}
                                ${isDarkMode ? ' border-black-85 border-l-black-80 bg-black-90 hover:bg-black-70 border-l-2 ' : 'border-l  border-black-20  hover:bg-black-10 bg-white'}
                                `}
                                onClick={() => setShowOptions(prev => !prev)}
                            >
                                <CaretDown size={20} weight="bold" className={showOptions ? 'visible' : 'hidden'} />
                                <CaretUp size={20} weight="bold" className={showOptions ? 'hidden' : 'visible'} />
                            </button>
                            {showOptions &&
                                <button
                                    className={`rounded-t resync-split-button absolute border-t border-l border-r 
                          ${isDarkMode ? ' bg-black-90  hover:bg-black-70  border-black-85 filter drop-shadow-md-dark' : ' bg-white hover:bg-black-5 border-black-20 shadow'}
                          `}
                                    style={{ bottom: '40px' }}
                                    onClick={(e) => {
                                        radio.resyncAll(spinUrl)
                                    }}
                                >
                                    <ArrowsClockwise weight="bold" className="resync-icon" />
                                    Resync All
                                </button>
                            }
                        </div>
                    }
                </div >
            :
            <></>
    )
}