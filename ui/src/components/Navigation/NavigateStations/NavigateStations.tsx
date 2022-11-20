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

interface INavigateStations {

}

export const NavigateStations: FC<INavigateStations> = (props: INavigateStations) => {

    // const towers = useAppSelector(selectTowers);
    const hardCodedTowers = ['~harlys-forbec', '~fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn', '~fidwed-sipwyn', '~tidreg', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec',]
    const [queriedTowers, setqueriedTowers] = useState(hardCodedTowers);
    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    // const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (
    //         queriedTowers.length != hardCodedTowers.length
    //         && queriedTowers.length == 0
    //     ) {
    //         setNotFound(true);
    //     }
    //     else if (setNotFound) {
    //         setNotFound(false);
    //     }
    // }, [queriedTowers]);

    return (
        <div
            className="text-sm w-full  m-h-full  "
        >
            <div
                className={`${!isLandscape && isPhone() && 'join-station-phone-portrait'}
            `}>
                <div
                    className='text-base md:text-2xl w-full 
                whitespace-nowrap font-bold tracking-tighter mb-1'
                    style={{ color: `${isDarkMode ? 'rgb(253,253,253)' : ''}` }}
                >
                    Join Station:
                </div>

                <SearchStationRow setqueriedTowers={setqueriedTowers} />

                {isPhone() && <div className="mb-3"><ShortcutButtons />
                </div>
                }
            </div>

            <div
                className={` relative  px-2 sm:px-4 rounded 
                    ${(isPhone() && !isLandscape) ? 'discovery-box-phone-portrait' : 'py-2 border '}
                    ${isDarkMode ? 'bg-lighter-black border-lighter-border-dark' : 'bg-white '}
                `}
            >
                <div
                    className="flex justify-between 
                            mb-2 items-center "
                >
                    <  DiscoveryInfo />
                    {!isPhone() && <div className="hidden sm:inline">
                        <ShortcutButtons />
                    </div>
                    }
                </div>
                <div
                    className={` mb-2    
                    ${(isPhone() && !isLandscape) ?
                            'discovery-list-phone-portrait '
                            : 'discovery-list'}
                `}
                >
                    {/* {notFound &&
                        <div
                            className=" flex justify-center"
                            style={{ height: '60vh' }}
                        >
                            <span
                                className=" flex justify-start  text-xs"
                                style={{
                                    fontSize: '.9rem',
                                    color: 'orange',
                                }}
                            >station is not in the discovery pool</span>
                        </div>} */}

                    {/* <NavItem tuneTo={tuneTo} patp={null} logout/> */}

                    {/* {radio.tunedTo !== radio.our && tuneToText.length == 0 &&
                    <NavItem
                        patp={radio.our}
                        title={'My Station'} />
                }

                {radio.tunedTo !== radio.hub && tuneToText.length == 0 &&
                    <NavItem
                        patp={radio.hub}
                        title={'Hub'} />
                } */}
                    {/* <NavItem tuneTo={tuneTo} patp={'~littel-wolfur'} />
<NavItem tuneTo={tuneTo} patp={'~sorwet'} /> */}
                    {/* <NavItem tuneTo={tuneTo} patp={'~poldec-tonteg'} flare={'🎷'}/> */}

                    {/* {towers.map((tower: any, i: number) =>
            <NavItem
                key={i}
                patp={tower.location}
                flare={tower.viewers} />
        )} */}
                    {
                        queriedTowers.map((tower: any, i: number) =>
                            <NavItem
                                key={tower}
                                patp={tower}
                                flare={'' + (100 - i)} />
                        )
                    }
                </div>
            </div>
        </div >
    )
}