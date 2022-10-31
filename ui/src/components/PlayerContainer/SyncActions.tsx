import React from "react";
import { FC } from "react";
import { IoMdSync } from "react-icons/io";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl, selectTunePatP } from "../../features/station/stationSlice";
import { selectPlayerInSync, setPlayerInSync } from "../../features/ui/uiSlice";

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
                    className={` px-2  ml-2 mr-2\
                        flex-initial outline-none \
                        font-bold border-black rounded \
                        flex text-center items-center 
                        justify-center hover:bg-gray-100
                        	 `}
                    style={{ fontSize: '.65rem' }}
                    onClick={(e) => {
                        radio.seekToDelta(spinTime);
                        dispatch(setPlayerInSync(true));
                    }}
                >
                    <IoMdSync className='mr-1 text-sm' /> Resync self
                </button>
                {tunePatP === radio.our &&
                    <button
                        className={` px-2  mr-2\
                          flex-initial outline-none \
                          font-bold  border-black rounded \
                          flex text-center items-center 
                          justify-center hover:bg-gray-100
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
                        <IoMdSync className='mr-1 text-sm' /> Resync all
                    </button>
                }
            </>
            :
            <></>
    )
}