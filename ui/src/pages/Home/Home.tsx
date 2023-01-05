import React, { useEffect, useState } from "react";
import { FC } from "react";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Header } from "../../components/Header/Header";
import { NavigateStations } from "../../components/Navigation/NavigateStations/NavigateStations";
import { selectIsDarkMode, selectIsLandscape, } from "../../features/ui/uiSlice";
import { isPhone, tuneTo } from "../../util";
import './style.css';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(selectIsDarkMode);

    useEffect(() => {
        tuneTo(null, radio, dispatch);
    }, []);

    return (
        <div
            className={` 
                    home-container
                    ${isDarkMode ? 'bg-black-100 text-black-10' : 'bg-black-2 text-black-70'}
                    `}
            style={{
                fontSize: '16px',
            }}
        >
            <Header />
            <NavigateStations />
        </div >
    )
}