import React from "react";
import { SearchStationRow } from "../SearchStationsRow/SearchStationRow";
import './style.css';
import { DiscoveryList } from "../DiscoveryList/DiscoveryList";

export const NavigateStations = () => {

    return (
        <div
            className="navigate-stations "

        >
            <div className="join-station-container">
                <div className={` join-station  `}>
                    <div
                        className={` flex items-center  relative  
                whitespace-nowrap font-bold tracking-tighter mb-1 text-text-default text-4xl
                `}
                        style={{
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