import { Warning } from "phosphor-react"
import React, { useEffect } from "react"
import { useNavigate, } from "react-router-dom";
import { radio } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setHasPublishedStation } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";

interface IExitWarning {
    onCancel: Function,
}

export const ExitWarning = ({ onCancel }: IExitWarning) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isDarkMode = useAppSelector(selectIsDarkMode);

    const warningId = 'warning';
    const cancelButtonId = 'cancel-button';

    useEffect(() => {
        document.addEventListener(
            "click",
            handleWarningClose
        )

        return () => {
            document.removeEventListener('click', handleWarningClose)
        }
    }, []);


    const handleWarningClose = (event: any) => {
        var clicked = event.target as Element;
        var warning = document.getElementById(warningId);
        var cancelButton = document.getElementById(cancelButtonId);

        if (cancelButton && (clicked == cancelButton || cancelButton.contains(clicked))) {
            onCancel();
        }
        else if (
            warning && clicked != warning && !warning.contains(clicked)
        ) {
            onCancel();
        }
    }

    const handleStop = () => {
        dispatch(setHasPublishedStation(false));
        radio.stop();
        navigate('/');
    }

    return (
        <div
            className='w-full top-0 left-0 text-base h-full fixed z-50 flex items-center justify-center cursor-default'
            style={{
                backdropFilter: 'brightness(0.2)',
            }}
        >
            <div
                id={warningId}
                className={` shadow-lg flex justify-center border
                items-center z-50 rounded-md font-bold cursor-default px-10
                    bg-background-default border-border-default 
                `}
                style={{
                    width: '17rem',
                    height: '8.5rem',
                }}
            >
                <div className="flex flex-col ">
                    <div className={`flex items-center w-full text-bigger mb-1
                                ${isDarkMode ? 'text-red-400' : 'text-red-700'}
                                    `}

                    >
                        <Warning className="mr-1 text-2xl" weight="bold" />
                        Warning
                    </div>
                    <div className=" flex flex-col   h-7 mb-4">
                        <span >Are you sure you want to stop the broadcast?</span>
                    </div>
                    <div className="gap-1.5 flex items-center  justify-end w-full text-base"
                    >
                        <button
                            id={cancelButtonId}
                            className={`flex items-center justify-center
                        rounded-md 
                         text-bold w-14 h-6 font-bold 
                            bg-hover-default hover:bg-hover-intense
                         `}
                            style={{
                                boxShadow: 'rgba(50, 50, 93, 0.25) \
                            0px 2px 5px -1px, rgba(0, 0, 0, 0.3)`\
                             0px 1px 3px - 1px ',
                                height: '1.7rem',
                            }}
                        >
                            Cancel
                            {/* <span className=' text-gray-500 ml-1 px-1  font-bold
                                       bg-white border-gray-300 rounded-md border'
                                style={{
                                    fontSize: '.6rem', right: '0.1em', top: '0.1em',
                                }}
                            >
                                Esc
                            </span> */}
                        </button>
                        <button
                            className={`   text-center  rounded-md   px-2 font-bold
            flex justify-center items-center  text-red-700 bg-red-300 hover:bg-red-400  w-14 
                    `}
                            onClick={() => handleStop()}
                            style={{
                                height: '1.7rem',
                            }}
                        >
                            {/* <SignOut className="mr-1" size={26} weight="bold" /> */}
                            Stop
                        </button>
                    </div>
                </div>
            </div>

        </div >

    )
}