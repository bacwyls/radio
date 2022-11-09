import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { radio } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { selectTowers } from "../../features/station/stationSlice";
import { NavItem } from "./NavItem";
import { isValidPatp } from 'urbit-ob'
import { GrSatellite, GrSearch } from "react-icons/gr";
import { reactRenderer, sigil } from "@tlon/sigil-js";
import { MdOutlineDeviceHub, MdOutlineInfo, MdOutlineRadio } from "react-icons/md";
import { GoRadioTower } from "react-icons/go";
import { SearchStationRow } from "./SearchStationRow";
import { DiscoveryInfo } from "./DiscoveryInfo";
import { isMobile, isBrowser } from 'react-device-detect';
import { ShortcutButtons } from "./ShortcutButtons";

interface INavigateStations {

}

export const NavigateStations: FC<INavigateStations> = (props: INavigateStations) => {

    // const towers = useAppSelector(selectTowers);
    const hardCodedTowers = ['~harlys-forbec', '~fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn', '~fidwed-sipwyn', '~tidreg', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec',]
    const [queriedTowers, setqueriedTowers] = useState(hardCodedTowers);

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
            className="text-sm w-full  m-h-full"
        >
            <div className='text-base md:text-lg whitespace-nowrap font-semibold mb-1'>
                Join station:
            </div>

            <SearchStationRow setqueriedTowers={setqueriedTowers} />

            {isMobile && <div className="mb-3"><ShortcutButtons />
            </div>
            }

            <div
                className="bg-white border  relative py-2 px-2 sm:px-4 rounded "
            >
                <div
                    className="flex justify-between 
                            mb-2 items-center "
                >
                    <  DiscoveryInfo />
                    {isBrowser && <div className="hidden sm:inline">
                        <ShortcutButtons />
                    </div>
                    }
                </div>

                <div className='flex mb-2 overflow-x-auto gap-2'
                    style={{ height: '170px' }}>
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
                                key={i}
                                patp={tower}
                                flare={'' + (100 - i)} />
                        )
                    }
                </div>
            </div>
        </div >
    )
}