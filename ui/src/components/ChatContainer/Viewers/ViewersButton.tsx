import { Users } from 'phosphor-react';
import React, { useEffect, } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectViewers } from '../../../features/station/stationSlice';
import { selectIsViewersMenuOpen, setIsViewersMenuOpen } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { ViewersMenu } from './ViewersMenu/ViewersMenu';

export type ViewersTabOption = 'Online' | 'Banned';

export const ViewersButton = () => {
    const viewers = useAppSelector(selectViewers);
    const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen)

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
                hover:bg-hover-super-intense
                ${viewers.length == 0 && 'cursor-default'}
                ${isViewersMenuOpen ? 'bg-hover-super-intense' : 'bg-hover-default'}
          `}

                onClick={() => {
                    if (viewers.length == 0) return;
                    dispatch(setIsViewersMenuOpen(!isViewersMenuOpen))
                }}
            >
                <Users
                    weight="bold"
                    className='mr-0.5 text-xl'
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