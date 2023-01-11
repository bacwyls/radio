import { ArrowLeft } from 'phosphor-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { DiscoveryList } from '../../components/Navigation/DiscoveryList/DiscoveryList';
import { SearchStationRow } from '../../components/Navigation/SearchStationsRow/SearchStationRow';
import { ThemeButton } from '../../components/ThemeButton';
import { selectIsDarkMode } from '../../features/ui/uiSlice';
import { isPhone } from '../../util';

export const JoinStationPhone = () => {

    const navigate = useNavigate();
    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (
        <div
            className={`
            ${isDarkMode ? 'bg-black-100 text-black-10' : 'bg-black-2 text-black-80'}
        `}
            style={{ padding: '0 24px', fontSize: '16px' }}

        >
            <div className={`fixed top-0 left-0  w-full flex justify-between items-center  border-b
                   ${isDarkMode ? 'bg-black-95 border-black-85' : 'bg-white  border-black-10'}
                   `}
                style={{ height: '64px', padding: '0 24px', }}
            >
                <div className='flex items-center font-bold'
                    style={{ fontSize: '24px' }}
                >

                    Join Station
                </div>
                <ThemeButton />
            </div>
            <DiscoveryList />
            <div className={`fixed  bottom-0 left-0  flex items-center w-full 
                   ${isDarkMode ? 'bg-black-95' : 'bg-white '}
                   `}
                style={{ height: '65px', padding: '0 24px' }}
            >
                {isPhone() &&
                    <ArrowLeft className="mr-2" size={28} weight="bold"
                        onClick={() => navigate('/')}
                    />}
                <SearchStationRow />
            </div>
        </div>
    )
}