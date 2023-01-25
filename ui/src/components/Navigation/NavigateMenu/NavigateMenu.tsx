import React, { useEffect, } from 'react';
import { radio } from '../../../api';
import { useAppSelector } from '../../../app/hooks';
import { IMinitower, selectRadioSub, selectTowers } from '../../../features/station/stationSlice';
import { NavItem } from '../NavItem/NavItem';
import { SearchStationRow } from '../SearchStationsRow/SearchStationRow';

interface INavigateMenu {
    onCancel: Function,
}

export const NavigateMenu = ({ onCancel }: INavigateMenu) => {

    const navigateMenuId = 'navigate-menu';
    const closeNavigateMenuButtonId = 'close-navigate-menu-button';

    const towers = useAppSelector(selectTowers);
    const radioSub = useAppSelector(selectRadioSub);

    useEffect(() => {
        document.addEventListener(
            "click",
            handleWarningClose
        )

        return () => {
            document.removeEventListener('click', handleWarningClose)
        }
    }, []);

    useEffect(() => {
        radio.gregRequest()

        const gregInterval = setInterval(() => {
            radio.gregRequest();
        }, 1000 * 30)

        return () => clearInterval(gregInterval);

    }, [radioSub]);


    const handleWarningClose = (event: any) => {
        var clicked = event.target as Element;
        var navigateMenu = document.getElementById(navigateMenuId);
        var closeNavigateMenuButton = document.getElementById(closeNavigateMenuButtonId);

        if (closeNavigateMenuButton && (clicked == closeNavigateMenuButton || closeNavigateMenuButton.contains(clicked))) {
            onCancel();
        }
        else if (
            navigateMenu && clicked != navigateMenu && !navigateMenu.contains(clicked)
        ) {
            onCancel();
        }
    }


    return (
        <div
            className='w-full top-0 left-0 text-base h-full fixed z-50 flex items-center justify-center cursor-default'
            style={{
                backdropFilter: 'brightness(0.2)',
            }}
        >
            <div
                id={navigateMenuId}
                className={` shadow-lg  flex-col border relative
                items-center z-50 rounded-md font-bold cursor-default
                    bg-background-default border-border-default  overflow-x-hidden overflow-y-auto
                `}
                style={{
                    width: '35vw',
                    height: '80vh',
                    minWidth: '18rem',
                    minHeight: '20rem',
                }}
            >
                <div className='px-6  w-full flex items-end sticky z-10 top-0 bg-background-default  pb-1 '
                    style={{
                        height: '3.5rem',
                    }}
                >
                    <SearchStationRow />
                </div>
                <div className='flex flex-col  w-full'
                    style={{
                        height: 'calc(100% - 3.5rem)',
                    }}
                >
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
            </div>
        </div>
    )

}