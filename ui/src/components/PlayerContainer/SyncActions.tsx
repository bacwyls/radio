import React from "react";
import { FC } from "react";
import { IoMdSync } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl, selectTunePatP } from "../../features/station/stationSlice";
import { selectPlayerInSync, setPlayerInSync } from "../../features/ui/uiSlice";
import { Radio } from "../../lib";

interface ISyncActions {
    radio: Radio;
    our: string;
}

export const SyncActions: FC<ISyncActions> = (props: ISyncActions) => {

    const { radio } = props;

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
                        font-bold border-black \
                        flex text-center items-center justify-center 
                        text-indigo-400	 `}
                    style={{ fontSize: '.7rem' }}
                    onClick={(e) => {
                        radio.seekToDelta(spinTime);
                        dispatch(setPlayerInSync(true));
                    }}
                >
                    <IoMdSync className='mr-1 text-sm' /> resync self
                </button>
                {tunePatP === props.our &&
                    <button
                        className={` px-2  mr-2\
                          flex-initial outline-none \
                          font-bold  \
                          text-yellow-500 \
                          flex text-center items-center justify-center
                         border-black
                          `}
                        style={{ whiteSpace: 'nowrap', fontSize: '.7rem' }}
                        onClick={(e) => {
                            radio.resyncAll(spinUrl)
                        }}
                    >
                        <IoMdSync className='mr-1 text-sm' /> resync all
                    </button>
                }
            </>
            :
            <></>
    )
}