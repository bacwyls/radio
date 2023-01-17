import { SignOut } from "phosphor-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { selectTunePatP } from "../../../features/station/stationSlice";
import { isPhone } from "../../../util";
import { ExitWarning } from "./ExitWarning";

export const HomeButton = () => {

    const navigate = useNavigate();

    const tunePatP = useAppSelector(selectTunePatP);

    const [showWarning, setShowWarning] = useState(false);

    let { patp } = useParams();

    const handleExit = () => {
        if (tunePatP != radio.our) {
            navigate('/')
        }
        else {
            setShowWarning(true);
        }
    }

    const closeWarning = () => {
        setShowWarning(false);
    }

    return (
        <>
            {isPhone() ?
                <SignOut weight="bold" onClick={handleExit} className='text-xl' />
                :
                <button
                    className={`   text-center  rounded   px-2 font-bold
            flex justify-center items-center relative mr-0.5  hover:bg-hover-default
                    `}
                    onClick={handleExit}
                    style={{
                        height: '1.7rem',
                    }}
                >
                    <SignOut className="mr-1 text-xl" weight="bold" />
                    <span className="hidden sm:flex whitespace-nowrap" >
                        {patp == radio.our ? 'Stop Broadcast' :
                            'Exit Station'}
                    </span>
                    <span className="flex sm:hidden" >
                        {patp == radio.our && 'Exit'}
                    </span>
                </button>
            }
            {showWarning && <ExitWarning onCancel={closeWarning} />}
        </>
    )
}