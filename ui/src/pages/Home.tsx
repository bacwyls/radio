import React, { useEffect, useState } from "react";
import { FC } from "react";
import { radio } from "../api";
import { useAppDispatch } from "../app/hooks";
import { NavigateStations } from "../components/Navigation/NavigateStations";
import { tuneTo } from "../util";

export const Home: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        tuneTo(null, radio, dispatch);
    }, []);

    return (
        <div
            className='flex justify-center items-start
                 overflow-x-hidden overflow-y-auto 
                    px-2 sm:px-5 lg:px-10'
            style={{
                backgroundColor: 'rgb(253,253,253)',
                height: '100%',
                minHeight: '100vh',
                width: '100%',
                paddingTop: '10vh',
            }}
        >
            <div
                className=" overflow-hidden h-full "
                style={{ width: '100%', maxWidth: '25em', }}
            >
                <div className="flex flex-col  ">
                    <div className="flex items-center mb-1 	">
                        <span
                            className="font-black text-gray-700 whitespace-nowrap
                         text-2xl sm:text-3xl md:text-4xl mr-2 flex  flex items-end "
                        >
                            Urbit Radio
                        </span>
                        <img
                            src='/apps/radio/assets/favicon.ico'
                            className='h-auto w-10 sm:w-12 md:w-14  '
                        />
                    </div>
                </div>
                <NavigateStations />
            </div>
        </div >
    )
}