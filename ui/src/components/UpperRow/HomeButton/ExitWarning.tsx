import { SignOut, Warning } from "phosphor-react"
import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";

interface IExitWarning {
    onCancel: Function,
}

export const ExitWarning = ({ onCancel }: IExitWarning) => {

    const navigate = useNavigate();
    const isDarkMode = useAppSelector(selectIsDarkMode);

    const warningId = 'warning';
    const cancelButtonId = 'cancel-button';


    useEffect(() => {
        document.addEventListener(
            "click",
            handleWarningClose
        )

        // document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener('click', handleWarningClose)
            // document.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    // const handleKeyDown = (event: any) => {
    //     if (event.key == 'Escape') {
    //         event.preventDefault();
    //         onCancel();
    //     }
    // }

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
        radio.stop();
        navigate('/');
    }

    return (
        <div
            className='w-full h-full fixed z-50 flex items-center justify-center cursor-default'
            style={{
                backdropFilter: 'blur(0px) brightness(0.8)',
                top: 0,
                left: 0,
                fontSize: '16px',
            }}
        >
            <div
                id={warningId}
                className={`bg-white shadow-lg flex justify-center 
                items-center z-50 rounded-md font-bold cursor-default px-10
                ${isDarkMode ? ' bg-black-95 ' : ' bg-white border-black-10'}

                `}
                style={{
                    width: '24em',
                    height: '12em',
                }}
            >
                <div className="flex flex-col">
                    <div className={`flex items-center w-full 
                                    ${isDarkMode ? ' text-red-300 ' : ' text-red-700'}
                                
                                    `}

                    >
                        <Warning className="mr-1" size={32} weight="bold" />
                        Warning
                    </div>
                    <div className=" flex flex-col   h-7">
                        <span >Are you sure you want to stop the broadcast?</span>
                    </div>
                    <div className="gap-1 flex items-center mt-4 justify-end w-full"
                        style={{ fontSize: '16px' }}
                    >
                        <button
                            id={cancelButtonId}
                            className={`flex items-center justify-center
                        rounded-md 
                         text-bold px-2 py-1 h-6
                         
                         ${isDarkMode ? 'bg-black-80 hover:bg-black-70' : ' bg-black-10 hover:bg-black-20'}
                         `}
                            style={{
                                boxShadow: 'rgba(50, 50, 93, 0.25) \
                            0px 2px 5px -1px, rgba(0, 0, 0, 0.3)`\
                             0px 1px 3px - 1px ',
                                height: '40px',
                            }}
                        >
                            <span
                                className='font-bold '
                            >
                                Cancel
                            </span>
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
            flex justify-center items-center  text-red-700 bg-red-300 hover:bg-red-400
                    `}
                            onClick={() => handleStop()}
                            style={{
                                height: '40px',
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