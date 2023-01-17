import { ArrowsClockwise, CaretDown, CaretUp, UserSwitch } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { radio } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectSpinTime, selectSpinUrl, selectTunePatP } from "../../../features/station/stationSlice";
import { selectPlayerInSync, setPlayerInSync } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import './style.css';

interface ISyncActions {
}


export const SyncActions: FC<ISyncActions> = (props: ISyncActions) => {

    const spinTime = useAppSelector(selectSpinTime);
    const tunePatP = useAppSelector(selectTunePatP);
    const playerInSync = useAppSelector(selectPlayerInSync);
    const spinUrl = useAppSelector(selectSpinUrl);

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
                    <ArrowsClockwise weight="bold" className='text-xl' />
                    Resync
                    {
                        showOptions &&
                        <div className={`absolute     p-2 flex flex-col rounded-md border  gap-1
                        bg-background-default border-border-default 
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
                    resync-split-button  relative z-10 border 
                    ${showOptions ? ' bg-hover-intense rounded-b-md' : 'rounded-md'}
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
                                className={`z-20  border  border-l-border-intense  absolute top-0 right-0 h-full w-7 flex items-center justify-center
                                ${showOptions ? 'rounded-br-md ' : 'rounded-r-md '}
                                border-border-default  bg-background-player-button  hover:bg-hover-intense
                                `}
                                onClick={() => setShowOptions(prev => !prev)}
                            >
                                <CaretDown weight="bold" className={`text-lg ${showOptions ? 'visible' : 'hidden'} `} />
                                <CaretUp weight="bold" className={`text-lg ${showOptions ? 'hidden' : 'visible'} `} />
                            </button>
                            {showOptions &&
                                <button
                                    className={`resync-split-button absolute border-t    border-l  border-r   rounded-t 
                          `}
                                    style={{ bottom: '1.7rem' }}
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