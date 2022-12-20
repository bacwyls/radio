import React, { useEffect, useState } from "react";
import { FC } from "react";
import Snowfall from "react-snowfall";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Header } from "../../components/Header/Header";
import { DiscoverList } from "../../components/Navigation/DiscoverList/DiscoverList";
import { NavigateStations } from "../../components/Navigation/NavigateStations/NavigateStations";
import { selectIsPublic, selectDescription, setDescription } from "../../features/station/stationSlice";
import { selectIsDarkMode, selectIsLandscape } from "../../features/ui/uiSlice";
import { isPhone, tuneTo } from "../../util";
import './style.css';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const isPublic = useAppSelector(selectIsPublic);
    const description = useAppSelector(selectDescription);

    useEffect(() => {
        tuneTo(null, radio, dispatch);
    }, []);

    useEffect(() => {
        radio.gregRequest();

        setInterval(() => {
            radio.gregRequest();
        }, 1000 * 60)

    }, []);

    return (
        <div
            className={` flex flex-col justify-center items-center
                    ${(!isLandscape && isPhone())
                    ?
                    'home-container-phone-portrait'
                    : 'home-container'}
                    
                    ${isDarkMode ? 'bg-black-100 text-black-10' : 'bg-black-2 text-black-80'}
                    `}
        >
            <Header />
            <NavigateStations />
        </div >
    )
}