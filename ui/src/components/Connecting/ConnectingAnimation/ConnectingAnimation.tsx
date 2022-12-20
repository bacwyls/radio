import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import './style.css';

export const ConnectingAnimation = () => {

    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (

        <div className="connecting "
            style={
                isDarkMode ? {
                    borderTop: '1.2em solid rgba(233,232,233, 0.2)',
                    borderRight: '1.2em solid rgba(233,232,233, 0.2)',
                    borderBottom: '1.2em solid rgba(233,232,233, 0.2)',
                    borderLeft: '1.2em solid #E9E8E9'
                }
                    : {
                        borderTop: '1.2em solid rgba(74,73,72, 0.2)',
                        borderRight: '1.2em solid rgba(74,73,72, 0.2)',
                        borderBottom: '1.2em solid rgba(74,73,72, 0.2)',
                        borderLeft: '1.2em solid #4A4948'
                    }
            }
        > Connecting...</div >
    )
}