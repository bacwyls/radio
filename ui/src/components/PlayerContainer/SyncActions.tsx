import React from "react";
import { FC } from "react";
import { MdOutlineSync } from "react-icons/md";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl, selectTunePatP } from "../../features/station/stationSlice";
import { selectPlayerInSync, setPlayerInSync } from "../../features/ui/uiSlice";
import { isPhone } from "../../util";

interface ISyncActions {
}

export const SyncActions: FC<ISyncActions> = (props: ISyncActions) => {

    const spinTime = useAppSelector(selectSpinTime);
    const tunePatP = useAppSelector(selectTunePatP);
    const playerInSync = useAppSelector(selectPlayerInSync);
    const spinUrl = useAppSelector(selectSpinUrl);

    const dispatch = useAppDispatch();

    return (
        !playerInSync ?
            <>
                <button
                    className={` px-2   \
                        flex-initial outline-none \
                        font-semibold border-black rounded \
                        flex text-center items-center  
                         hover:bg-gray-100  
                        ${isPhone() ? 'w-full justify-start' : 'justify-center'}
                        	 `}
                    style={{ fontSize: '.65rem' }}
                    onClick={(e) => {
                        radio.seekToDelta(spinTime);
                        dispatch(setPlayerInSync(true));
                    }}
                >
                    <MdOutlineSync className='mr-1 text-sm' /> Resync self
                </button>
                {tunePatP === radio.our &&
                    <button
                        className={` px-2 \
                          flex-initial outline-none \
                          font-semibold  border-black rounded \
                          flex text-center items-center 
                          hover:bg-gray-100  
                          ${isPhone() ? 'w-full justify-start' : 'justify-center'}
                          `}
                        style=
                        {{
                            whiteSpace: 'nowrap',
                            fontSize: '.65rem',
                        }}
                        onClick={(e) => {
                            radio.resyncAll(spinUrl)
                        }}
                    >
                        <MdOutlineSync className='mr-1 text-sm' /> Resync all
                    </button>
                }
            </>
            :
            <></>
    )
}