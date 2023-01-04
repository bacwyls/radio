import { Users } from 'phosphor-react';
import React, { useEffect, } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTunePatP, selectViewers } from '../../../features/station/stationSlice';
import { selectIsDarkMode, selectIsViewersMenuOpen, setIsViewersMenuOpen } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { ViewersMenu } from './ViewersMenu/ViewersMenu';

export type ViewersTabOption = 'Online' | 'Banned';

export const ViewersButton = () => {
    const viewers = useAppSelector(selectViewers);
    const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen)
    const tunePatP = useAppSelector(selectTunePatP);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    const dispatch = useAppDispatch();

    const viewersMenuId = 'viewers-menu';

    useEffect(() => {
        if (isPhone()) return;

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
            dispatch(setIsViewersMenuOpen(false));
        }
    }

    return (
        <div id='viewers-menu' className='w-max	ml-0.5'>
            <button
                className={` flex items-center tracking-wide px-2 py-1	rounded  font-bold 	
            ${tunePatP && tunePatP.length > 14 && 'justify-center'}   
            ${isDarkMode ? 'hover:bg-black-40 text-gray-dark bg-black-80' : 'hover:bg-black-30 text-gray-light bg-black-10'}
            ${isViewersMenuOpen && (isDarkMode ? 'bg-black-40' : 'bg-black-30')}
          `}

                onClick={() => dispatch(setIsViewersMenuOpen(!isViewersMenuOpen))}
            >
                <Users
                    size={24}
                    weight="bold"
                    className='mr-0.5'
                />
                {viewers.length}
            </button>
            {
                isViewersMenuOpen &&
                < ViewersMenu />
            }
        </div>
    )
}