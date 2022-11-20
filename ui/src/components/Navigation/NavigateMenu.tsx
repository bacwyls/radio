import React, { FC, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { radio } from "../../api";
import { NavigateStations } from "./NavigateStations/NavigateStations";

interface INavigateMenu {
    setIsNavigationOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const NavigateMenu: FC<INavigateMenu> = (props: INavigateMenu) => {

    const { setIsNavigationOpen } = props;

    const navigateBackgroundId = 'navigate-background';

    function handleMenuClose() {
        setIsNavigationOpen(false);
    }

    function handleMenuBackgroundClick(e: any) {
        if (e.target == document.getElementById(navigateBackgroundId)) {
            handleMenuClose();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

    const handleKeyDown = (event: any) => {
        if (event.key == 'Escape') {
            event.preventDefault();
            handleMenuClose();
        }
    }

    return (
        <div
            className='w-full h-full fixed z-50 flex items-center justify-center'
            style={{
                backdropFilter: 'blur(10px) brightness(0.8)',
                top: 0,
                left: 0
            }}
            id={navigateBackgroundId}
            onClick={handleMenuBackgroundClick}
        >
            <div
                className='py-8 px-6 flex  items-center
                            flex-col rounded bg-white relative
                             '
                style={{
                    maxWidth: '42em',
                    width: '100vw',
                    boxShadow: 'rgba(50, 50, 93, 0.25) \
                                    0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                    backgroundColor: 'rgb(253 253 253)',
                }}
            >
                <button
                    className='absolute flex items-center
                         border-gray-400 rounded border hover:border-black
                         text-bold px-2 py-1 mt-4 z-10 h-6
                         bg-gray-50 '
                    style={{
                        right: 0,
                        top: 0,
                        marginRight: '2.42em',
                        boxShadow: 'rgba(50, 50, 93, 0.25) \
                            0px 2px 5px -1px, rgba(0, 0, 0, 0.3)`\
                             0px 1px 3px - 1px ',
                    }}
                    onClick={handleMenuClose}
                >
                    <span
                        className='font-semibold '
                        style={{ fontSize: '.65rem' }}
                    >
                        Close
                    </span>
                    <span className=' text-gray-500 ml-1 px-1 shadow
                                       bg-white border-gray-400 rounded border'
                        style={{
                            fontSize: '.6rem', right: '0.1em', top: '0.1em',
                            // boxShadow: 'rgba(50, 50, 93, 0.25) \
                            //               0px 2px 5px -1px, rgba(0, 0, 0, 0.3) \
                            //               0px 1px 3px -1px' 
                        }}
                    >
                        Esc
                    </span>
                </button>
                <NavigateStations />
            </div>
        </div >
    )
}

export const Navigate = () => {

    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

    const location = useLocation();

    //close menu when navigate between stations
    useEffect(() => {
        setIsNavigationOpen(false);
    }, [location])

    return (
        <>
            <button
                className={`hover:pointer button border-gray-400 
                    border px-4 text-center rounded bg-white
                     h-6 hover:border-black shadow
                    hidden sm:flex justify-center items-center relative 
                    `}
                // style={{
                //     boxShadow: 'rgba(50, 50, 93, 0.25) \
                // 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                // }}
                onClick={() => {
                    !isNavigationOpen && radio.gregRequest();
                    setIsNavigationOpen(prev => !prev);
                }}
            >
                {/* <span className="text-xl align-middle">📻</span> */}
                <img src='/apps/radio/assets/favicon.ico' className='h-3 mr-1' />
                <span
                    className='font-medium flex items-center'
                    style={{ fontSize: '.65rem' }}
                >
                    Navigate
                </span>
                {/* <span className=' text-gray-500 ml-1 px-1 
                          border-gray-400 rounded border'
                    style={{
                        fontSize: '.6rem', right: '0.1em', top: '0.1em',
                        boxShadow: 'rgba(50, 50, 93, 0.25) \
                            0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                    }}>Tab</span> */}
            </button>
            {isNavigationOpen && <NavigateMenu setIsNavigationOpen={setIsNavigationOpen} />}
        </>
    )
}