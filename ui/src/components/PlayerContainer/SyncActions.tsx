import { ArrowsClockwise } from "phosphor-react";
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
            <div className="flex gap-2 justify-center mt-2">
                <button
                    className={` px-2   \
                        flex-initial outline-none \
                        font-semibold border-2 border-gray-300  rounded \
                        flex text-center items-center  px-2 py-0.5
                         hover:bg-gray-200  z-10 bg-white  gap-1
                        ${isPhone() ? 'w-full justify-start' : 'justify-center'}
                        	 `}
                    style={{ fontSize: '.65rem' }}
                    onClick={(e) => {
                        radio.seekToDelta(spinTime);
                        dispatch(setPlayerInSync(true));
                    }}
                >
                    <ArrowsClockwise size={20} weight="bold" />
                    Resync Self
                </button>
                {tunePatP === radio.our &&
                    <button
                        className={` px-2 \
                          flex-initial outline-none bg-white \
                          font-semibold  border-2 border-gray-300 rounded \
                          flex text-center items-center  gap-1
                          hover:bg-gray-200  z-10  px-2 py-0.5
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
                        <ArrowsClockwise size={20} weight="bold" />
                        Resync All
                    </button>
                }
            </div>
            :
            <></>
    )
}