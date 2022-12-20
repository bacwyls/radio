import { ArrowsClockwise } from "phosphor-react";
import React from "react";
import { FC } from "react";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl, selectTunePatP } from "../../features/station/stationSlice";
import { selectIsDarkMode, selectPlayerInSync, setPlayerInSync } from "../../features/ui/uiSlice";
import { isPhone } from "../../util";

interface ISyncActions {
}

export const SyncActions: FC<ISyncActions> = (props: ISyncActions) => {

    const spinTime = useAppSelector(selectSpinTime);
    const tunePatP = useAppSelector(selectTunePatP);
    const playerInSync = useAppSelector(selectPlayerInSync);
    const spinUrl = useAppSelector(selectSpinUrl);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    const dispatch = useAppDispatch();

    return (
        !playerInSync ?
            <div className="absolute right-0 gap-2 flex justify-end "
            >
                <button
                    className={` 
                        flex-initial outline-none 
                        font-bold   rounded-md  
                        flex text-center items-center  
                           z-10  gap-1  shadow 
                           ${isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5 border-black-10'}
                        ${isPhone() ? 'w-full justify-start' : 'justify-center'}
                        	 `}
                    style={{
                        fontSize: '.65rem',
                        height: '40px', width: '120px'
                    }}
                    onClick={(e) => {
                        radio.seekToDelta(spinTime);
                        dispatch(setPlayerInSync(true));
                    }}
                >
                    Resync Self
                </button>
                {tunePatP === radio.our &&
                    <button
                        className={` 
                          flex-initial outline-none 
                          font-bold   rounded-md  
                          flex text-center items-center  gap-1
                           z-10  shadow 
                          ${isPhone() ? 'w-full justify-start' : 'justify-center'}
                          ${isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5 border-black-10'}
                          `}

                        style=
                        {{
                            whiteSpace: 'nowrap',
                            fontSize: '.65rem',
                            height: '40px',
                            width: '120px'
                        }}
                        onClick={(e) => {
                            radio.resyncAll(spinUrl)
                        }}
                    >
                        Resync All
                    </button>
                }
            </div >
            :
            <></>
    )
}