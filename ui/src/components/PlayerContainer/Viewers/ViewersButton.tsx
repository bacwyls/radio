import React, { useEffect, useState } from 'react';
import { useMobileOrientation } from 'react-device-detect';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import { selectViewers } from '../../../features/station/stationSlice';
import { isPhone } from '../../../util';
import { ViewersMenu } from './ViewersMenu/ViewersMenu';

export type ViewersTabOption = 'Viewers' | 'Banned';


export const ViewersButton = () => {
    // const viewers = useAppSelector(selectViewers);
    const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~zod']
    const [viewersMenuOpen, setViewersMenuOpen] = useState(false);

    const viewersMenuId = 'viewers-menu';

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsideIsPublicDropdownClick
        )

        return () => document.removeEventListener('click', handleOutsideIsPublicDropdownClick)
    }, []);

    const handleOutsideIsPublicDropdownClick = (event: any) => {
        var clicked = event.target as Element;
        var viewersMenu = document.getElementById(viewersMenuId);

        if (
            clicked != viewersMenu && !viewersMenu?.contains(clicked)
        ) {
            setViewersMenuOpen(false);
        }
    }

    return (
        <div id='viewers-menu'>
            <div
                className={`flex items-center text-center hover:bg-gray-100 rounded px-1
                              cursor-pointer ${viewersMenuOpen && 'bg-gray-100 '} 
                              ${isPhone() ? 'mt-0' : 'mt-1'}
                              `}
                style={{ fontSize: '0.7rem' }}
                onClick={() => setViewersMenuOpen((previous) => !previous)}
            >
                <MdOutlinePeopleAlt className={` text-base mr-1`} />
                <span className='font-semibold'
                >
                    {viewers.length == 0 ? 0 : viewers.length - 1} {!isPhone() && 'viewer(s)'}
                </span>
            </div>
            {
                viewersMenuOpen && viewers.length > 1 &&
                <ViewersMenu />
            }
        </div >
    )
}