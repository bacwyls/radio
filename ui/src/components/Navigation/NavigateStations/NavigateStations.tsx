import React, { useState } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { NavItem } from "../NavItem/NavItem";
import { SearchStationRow } from "../SearchStationsRow/SearchStationRow";
import { DiscoveryInfo } from "../DiscoveryInfo";
import { ShortcutButtons } from "../ShortcutButtons/ShortcutButtons";
import { isPhone } from "../../../util";
import './style.css';
import { selectIsDarkMode, selectIsLandscape } from "../../../features/ui/uiSlice";
import { Radio, Television } from "phosphor-react";
import { radio } from "../../../api";
import Snowfall from "react-snowfall";
import { selectTowers } from "../../../features/station/stationSlice";
import { DiscoverList } from "../DiscoverList/DiscoverList";

interface INavigateStations {

}

export const NavigateStations: FC<INavigateStations> = (props: INavigateStations) => {
    const towers = useAppSelector(selectTowers);

    // const [queriedTowers, setqueriedTowers] = useState(hardCodedTowers);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const [toSnow, setToSnow] = useState(false);

    const navigate = useNavigate();

    return (
        <div
            className="navigate-stations  "
        >
            {toSnow && <Snowfall
                // color="#dee4fd"
                radius={[4, 6]}
                snowflakeCount={100}
                speed={[0.1, 0.3]}
                wind={[-0.1, 0.1]}
                style={{ zIndex: 10 }}
            />}
            <div className={` join-station `}
            >
                <div
                    className={`md:text-2xl w-full  relative
                whitespace-nowrap font-bold tracking-tighter mb-1
                ${isDarkMode ? 'text-black-5' : 'text-black-80'}
                `}
                    style={{ fontSize: '40px', }}
                >
                    <img
                        src='/apps/radio/assets/santahat.svg'
                        className={`absolute h-5  cursor-text
                    `}
                        style={{ right: '6em', top: '-.3em', zIndex: 1 }}
                    // onClick={() => setToSnow(prev => !prev)}
                    />
                    Join Station:
                </div>
                <SearchStationRow />
                {/* <div>
                    <span className="font-bold">Don't know where to start?</span>
                    <button
                        className={`mt-1  rounded-md text-center 
                flex-initial  flex items-center  bg-gray-200
                justify-center px-2  py-1
                ${isDarkMode ? 'hover:bg-hover-gray-dark text-white-dark' : 'hover:bg-hover-gray-light '}
                `}
                        style={{
                            whiteSpace: 'nowrap',
                        }}
                        onClick={() => navigate('/station/' + radio.hub)}
                    >
                        <Television size={24} weight="bold" />
                        <span
                            className='ml-1	flex items-center font-bold '
                        >
                            Join Hub
                        </span>
                    </button >
                </div> */}
                {/* <div>
                    <span className="font-bold">Start a Broadcast:</span>
                    <button
                        className={`mt-1  rounded-md text-center 
                flex-initial  flex items-center  bg-gray-200
                justify-center px-2  py-1
                ${isDarkMode ? 'hover:bg-hover-gray-dark text-white-dark' : 'hover:bg-hover-gray-light '}
                `}
                        style={{
                            whiteSpace: 'nowrap',
                        }}
                        onClick={() => {
                            radio.start()
                            navigate('/station/' + radio.our)
                        }}
                    >
                        <Radio size={24} weight="bold" />
                        <span
                            className='ml-1	flex items-center font-bold '
                        >
                            My Station
                        </span>
                    </button >
                </div> */}
                <DiscoverList />

            </div >

        </div >
    )
}