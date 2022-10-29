import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { radio } from "../api";
import { NavigateStations } from "../components/Navigation/NavigateStations";
import { tuneTo } from "../util";

export const Home: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        tuneTo(null, radio, dispatch);
    }, []);

    return (
        <div className='flex justify-center items-center'
            style={{
                backgroundColor: 'rgb(253 253 253)',
                height: '100vh',
                width: '100vw'
            }}
        >
            <div style={{
                width: '31em',
                height: '90vh',
            }}
                className=" px-8 ">
                <div className="flex items-center mb-2  font-mono">
                    <span className="font-bold whitespace-nowrap text-xl mr-2 flex h-8 flex items-end">urbit radio</span>
                    <img src='/apps/radio/assets/favicon.ico' className='h-auto w-8 ' />
                </div>
                <NavigateStations />

            </div >
        </div >
    )
}