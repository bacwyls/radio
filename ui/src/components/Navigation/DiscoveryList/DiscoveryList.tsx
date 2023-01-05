import { CaretDown, CaretUp } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { IMinitower, selectRadioSub, selectTowers } from "../../../features/station/stationSlice";
import { selectIsDarkMode, selectIsLandscape } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { DiscoveryInfo } from "./DiscoveryInfo";
import { Filter } from "../NavigateStations/FilterDropdown";
import { NavItem } from "../NavItem/NavItem";
import './style.css';

export const DiscoveryList = () => {
    const towers = useAppSelector(selectTowers);
    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const radioSub = useAppSelector(selectRadioSub);

    // const [filter, setFilter] = useState<Filter>('All');
    // const hardCodedTowers = ['~wed', '~harlys-forbec', '~fidwed-sipwyn', '~darpub', '~fidwed', '~tirrel', '~toblut-midmug'];

    useEffect(() => {
        radio.gregRequest()

        const gregInterval = setInterval(() => {
            radio.gregRequest();
        }, 1000 * 30)

        return () => clearInterval(gregInterval);

    }, [radioSub]);

    return (
        <div
            className={`
            ${isPhone() ? 'discovery-list-phone' : 'discovery-list '}              
            ${isDarkMode ? 'bg-black-95 border-black-85' : 'bg-white border-black-10  '}
        `}
        >
            <div
                className={`
                ${isPhone() ? 'discovery-list-header-phone' : 'discovery-list-header'} 
                    ${isDarkMode ? 'bg-black-95' : 'bg-white'}
                    `}
            >
                <div
                    className={`flex items-center  h-6 font-bold  gap-0.5
                    
                `}
                    style={{ fontSize: '20px' }}
                >
                    Discovery
                    <DiscoveryInfo />
                </div>
                {/* <FilterDropdown filter={filter} setFilter={setFilter} /> */}
            </div>
            <NavItem
                key={radio.hub}
                patp={radio.hub}
                title='Hub'
                flare={0 + ''}
                description={'The Hub is always there for you.'}
                isPublic={false}
            />
            {
                towers.map((tower: IMinitower, i: number) =>
                    // <NavItem
                    //     key={tower.location}
                    //     patp={tower.location}
                    //     flare={tower.viewers - 1 + ''}
                    //     description={tower.description}
                    //     isPublic={tower.public}
                    // />
                    <NavItem
                        key={tower.location}
                        patp={tower.location}
                        flare={tower.viewers + ''}
                        description={tower.description}
                        isPublic={tower.public}
                    />
                )
            }
        </div >
    )

}