import { CaretDown, CaretUp } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { IMinitower, selectTowers } from "../../../features/station/stationSlice";
import { selectIsDarkMode, selectIsLandscape } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { DiscoveryInfo } from "../DiscoveryInfo";
import { Filter } from "../NavigateStations/FilterDropdown";
import { NavItem } from "../NavItem/NavItem";
import './style.css';

export const DiscoverList = () => {
    // const towers = useAppSelector(selectTowers);
    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const [filter, setFilter] = useState<Filter>('All');
    const hardCodedTowers = ['~wed', '~harlys-forbec', '~fidwed-sipwyn'];

    return (
        <div
            className={`
            discover-list   
             right-0 bottom-0  
            border-l  overflow-y-auto  overflow-x-hidden
            
            ${isDarkMode ? 'bg-black-95 border-black-85 ' : 'bg-white border-black-10 text-black-80 '}
        `}
            style={{
                width: '20rem',
                fontSize: '16px',
                zIndex: 2,
            }}
        >
            <div
                className={`discover-list-header flex justify-between  h-9
                    mb-2 items-center 
                    ${isDarkMode ? 'bg-black-95' : 'bg-white'}

                    `}
                style={{
                    zIndex: 3,
                    paddingLeft: '24px',
                    width: 'calc(20rem - 24px)',
                    right: '22px',
                }}
            >
                <div
                    className={`flex items-center  h-6 font-bold 
                `}
                    style={{ fontSize: '.8rem' }}
                >
                    Discover
                    <DiscoveryInfo />
                    {/* {towers && towers.length > 0 && <DiscoveryInfo />} */}
                </div>
                {/* <FilterDropdown filter={filter} setFilter={setFilter} /> */}
            </div>
            <div
                className={` flex flex-col gap-3 h-full pt-10  overflow-y-auto overflow-x-hidden
                `}
                style={{
                    paddingLeft: '24px',
                    paddingRight: 'calc(24px - calc(1 * calc(20rem - 100%)))',
                }}
            >
                {/* {!towers || towers.length == 0 &&
                    <div
                        className="fixed flex   h-full 
                        items-center whitespace-normal break-words
                        font-semibold text-center
                        "
                        style={{
                            top: 0,
                            right: 0,
                            width: '20rem',
                            fontSize: '18px',
                            padding: '0 24px',
                        }}
                    >
                        Published stations with the most viewers will appear here.
                    </div>
                } */}
                <NavItem
                    key={radio.hub}
                    patp={radio.hub}
                    title='Hub'
                    flare={0 + ''}
                    description={'The Hub is always there for you.'}
                    isPublic={false}
                />
                {
                    hardCodedTowers.map((tower: string, i: number) =>
                        // <NavItem
                        //     key={tower.location}
                        //     patp={tower.location}
                        //     flare={tower.viewers - 1 + ''}
                        //     description={tower.description}
                        //     isPublic={tower.public}
                        // />
                        <NavItem
                            key={tower}
                            patp={tower}
                            flare={20 + ''}
                            description={'Listening to music and watching random memes'}
                            isPublic={true}
                        />
                    )
                }
            </div >
        </div >
    )

}