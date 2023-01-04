import { SignOut } from "phosphor-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { selectTunePatP } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { ExitWarning } from "./ExitWarning";

export const HomeButton = () => {

    const navigate = useNavigate();

    const isDarkMode = useAppSelector(selectIsDarkMode);
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
                <SignOut size={24} weight="bold" onClick={handleExit} />
                :
                <button
                    className={`   text-center  rounded   px-2 font-bold
            flex justify-center items-center relative mr-0.5  
            ${isDarkMode ? ' hover:bg-black-80 ' : 'hover:bg-black-10 '}
                    `}
                    onClick={handleExit}
                    style={{
                        height: '40px',
                    }}
                >
                    <SignOut className="mr-1" size={24} weight="bold" />
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