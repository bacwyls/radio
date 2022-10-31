import React, { FC, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { radio } from "../../api";

interface INavigateButton {
}

export const NavigateButton: FC<INavigateButton> = (props: INavigateButton) => {

    const navigate = useNavigate();

    const isNavigationOpen = () => {
        return window.location.pathname.includes('navMenu');
    }

    const toggleNavigaton = () => {
        isNavigationOpen() ?
            navigate(-1) :
            navigate(window.location.pathname.split('radio')[1] + '/navMenu')
    }

    return (
        <>
            <button
                className={`hover:pointer button border-gray-400 \
                    border px-4 text-center rounded bg-white\
                    flex-initial h-7 hover:border-black shadow
                    flex justify-center items-center relative 
                    `}
                // style={{
                //     boxShadow: 'rgba(50, 50, 93, 0.25) \
                // 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                // }}
                onClick={() => {
                    if (!location.pathname.includes('navMenu')) {
                        radio.gregRequest();
                    }
                    toggleNavigaton();
                }}
            >
                {/* <span className="text-xl align-middle">📻</span> */}
                <img src='/apps/radio/assets/favicon.ico' className='h-3 mr-1' />
                <span
                    className='font-bold'
                    style={{ fontSize: '.7rem' }}
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
            <Outlet />
        </>
    )
}