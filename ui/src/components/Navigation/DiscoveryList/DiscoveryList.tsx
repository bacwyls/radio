import React, { useEffect } from "react";
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { IMinitower, selectRadioSub, selectTowers } from "../../../features/station/stationSlice";
import { isPhone } from "../../../util";
import { DiscoveryInfo } from "./DiscoveryInfo";
import { NavItem } from "../NavItem/NavItem";
import './style.css';

export const DiscoveryList = () => {
    const towers = useAppSelector(selectTowers);
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
        `}

        >
            <div
                className={`
                ${isPhone() ? 'discovery-list-header-phone' : 'discovery-list-header'} 
                    `}
            >
                <div
                    className={`flex items-center  h-6 font-bold  gap-0.5 text-lg
                `}
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
                    <NavItem
                        key={tower.location}
                        patp={tower.location}
                        flare={tower.viewers + ''}
                        description={tower.description}
                        isPublic={tower.public}
                    />
                )
            }
        </div>
    )

}