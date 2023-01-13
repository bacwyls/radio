import React, { useEffect } from "react";
import { FC } from "react";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector, } from "../../app/hooks";
import { Header } from "../../components/Header/Header";
import { NavigateStations } from "../../components/Navigation/NavigateStations/NavigateStations";
import { selectTunePatP } from "../../features/station/stationSlice";
import { tuneTo } from "../../util";
import './style.css';

export const Home: FC = () => {
    const dispatch = useAppDispatch();
    const tunePatP = useAppSelector(selectTunePatP);

    useEffect(() => {
        tunePatP && tuneTo(null, radio, dispatch);
    }, []);

    return (
        <div className='home-container'>
            <Header />
            <NavigateStations />
        </div >
    )
}