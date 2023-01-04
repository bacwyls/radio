import React from "react";
import { FC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { SearchStationRow } from "../SearchStationsRow/SearchStationRow";
import './style.css';
import { selectIsDarkMode, } from "../../../features/ui/uiSlice";
import { DiscoveryList } from "../DiscoveryList/DiscoveryList";

interface INavigateStations {

}

export const NavigateStations: FC<INavigateStations> = (props: INavigateStations) => {

    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (
        <div
            className="navigate-stations "
        >
            <div className="join-station-container">
                <div className={` join-station  `}>
                    <div
                        className={`md:text-2xl flex items-center  relative  
                whitespace-nowrap font-bold tracking-tighter mb-1
                ${isDarkMode ? 'text-black-5' : 'text-black-80'}
                `}
                        style={{
                            fontSize: '40px',
                            width: '15rem',
                            height: '2rem',

                        }}
                    >
                        Join Station:
                    </div>
                    <SearchStationRow />
                </div >
                <DiscoveryList />
            </div>

        </div >
    )
}




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