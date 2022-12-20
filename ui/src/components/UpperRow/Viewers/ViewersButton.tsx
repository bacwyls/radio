import { Users } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useMobileOrientation } from 'react-device-detect';
import { useAppSelector } from '../../../app/hooks';
import { selectTunePatP, selectViewers } from '../../../features/station/stationSlice';
import { selectIsDarkMode } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { ViewersMenu } from './ViewersMenu/ViewersMenu';

export type ViewersTabOption = 'Online' | 'Banned';

export const ViewersButton = () => {
    const viewers = useAppSelector(selectViewers);
    const [viewersMenuOpen, setViewersMenuOpen] = useState(false);
    const tunePatP = useAppSelector(selectTunePatP);
    const isDarkMode = useAppSelector(selectIsDarkMode);

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
        <div id='viewers-menu' className='w-max	ml-0.5'>
            <div

                className={` flex cursor-pointer items-center tracking-wide px-2 py-1	z-0 rounded  font-bold 	
            ${tunePatP && tunePatP.length > 14 && 'justify-center'}   
            ${isDarkMode ? 'hover:bg-black-30 text-gray-dark bg-black-70' : 'hover:bg-black-30 text-gray-light bg-black-10'}
            ${viewersMenuOpen && 'bg-black-30'}
          `}

                onClick={() => setViewersMenuOpen((previous) => !previous)}
                style={{
                    fontSize: '16px',
                    lineHeight: '.3rem',
                }}
            >
                <Users
                    size={24}
                    weight="bold"
                    className='mr-0.5'
                />
                {viewers.length}
            </div>
            {
                viewersMenuOpen &&
                <ViewersMenu />
            }
        </div>
    )
}