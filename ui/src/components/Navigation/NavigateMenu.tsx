import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateStations } from './NavigateStations';

interface INavigateMenu {
    // towers: Array<IMinitower>,
}

export const NavigateMenu: FC<INavigateMenu> = (props: INavigateMenu) => {

    // const { towers } = props;

    const navigateBackgroundId = 'navigate-background';

    const navigate = useNavigate();

    function handleMenuClose() {
        navigate(-1);
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
            className='w-full h-full fixed z-50'
            style={{
                backdropFilter: 'blur(10px) brightness(0.8)',
                top: 0,
                left: 0
            }}
            id={navigateBackgroundId}
            onClick={handleMenuBackgroundClick}
        >
            <div
                className='py-4 px-6 flex fixed items-center
                            flex-col rounded bg-white 
                             border overflow-y-auto'
                style={{
                    top: '5vh',
                    maxWidth: '40em',
                    width: '100vw',
                    height: '90vh',
                    right: '50vw',
                    boxShadow: 'rgba(50, 50, 93, 0.25) \
                                    0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                    transform: 'translateX(50%)',
                    backgroundColor: 'rgb(253 253 253)',
                }}
            >
                <button
                    className='absolute flex items-center
                         border-gray-400 rounded border hover:border-black
                         text-bold px-2 py-1 mt-4 z-10
                         bg-gray-100 shadow'
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
                        className='font-bold '
                        style={{ fontSize: '.7rem' }}
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