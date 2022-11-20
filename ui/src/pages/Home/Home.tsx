import React, { useEffect, useState } from "react";
import { FC } from "react";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Header } from "../../components/Header/Header";
import { NavigateStations } from "../../components/Navigation/NavigateStations/NavigateStations";
import { selectIsDarkMode, selectIsLandscape } from "../../features/ui/uiSlice";
import { isPhone, tuneTo } from "../../util";
import './style.css';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    useEffect(() => {
        tuneTo(null, radio, dispatch);
    }, []);

    return (
        <div
            className={` flex justify-center items-center
                 overflow-x-hidden 
                    ${(!isLandscape && isPhone())
                    ?
                    'home-container-phone-portrait'
                    : 'home-container'}
                    
                    ${isDarkMode ? 'bg-default-bg-dark' : 'bg-default-bg-light'}
                    `}
        >
            <Header />
            <div
                className={`overflow-y-auto  h-full  	
                ${(!isLandscape && isPhone()) ? '' : 'px-5 pt-7'} 
                `}
                style={{
                    width: '100%',
                    maxWidth: '30em',
                }}
            >
                <NavigateStations />
            </div>
        </div >
    )
}