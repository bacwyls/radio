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
        <button
            className={`   text-center  rounded   px-2 font-bold
            flex justify-center items-center relative mr-0.5 
            ${isPhone() ? '' : ' '} 
            ${isDarkMode ? 'text-white-dark  hover:bg-black-80 ' : 'hover:bg-black-10 '}
                    `}
            onClick={handleExit}
            style={{
                fontSize: '16px',
                height: '40px',
            }}
        >
            <SignOut className="mr-1" size={24} weight="bold" />
            {patp == radio.our ? 'Stop Broadcast' :
                'Exit Station'}
            {showWarning && <ExitWarning onCancel={closeWarning} />}
        </button>
    )
}