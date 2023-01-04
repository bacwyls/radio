import { Radio, Television } from 'phosphor-react';
import React from 'react';
import { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectTunePatP } from '../../features/station/stationSlice';
import { selectIsDarkMode } from '../../features/ui/uiSlice';
import { renderSigil } from '../../util';
import { IsPublicInfo } from './IsPublicInfo/IsPublicInfo';


interface IStationTitle {
}

export const StationTitle: FC<IStationTitle> = (props: IStationTitle) => {

    const tunePatP = useAppSelector(selectTunePatP);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (
        tunePatP && !isValidPatp(tunePatP) ?
            <div
                className={`flex items-center font-bold  whitespace-nowrap
            ${isDarkMode ? 'text-black-10' : 'text-black-70'}
            `}
                style={{
                    fontSize: '18px',
                }}
            >
                (Loading...)
            </div>
            :
            <div
                className={`flex items-center  w-full
            `}
                style={{
                    fontSize: '18px',
                }}
            >
                {tunePatP == radio.hub &&
                    <>
                        <span
                            className={`rounded flex items-center justify-center     
                               ${isDarkMode ? 'bg-black-70 text-black-1' : ' bg-black-80 text-white'}`}
                            style={{ maxHeight: '40px', maxWidth: '40px', minHeight: '40px', minWidth: '40px' }}
                        >
                            <Television
                                size={24}
                                weight="bold"
                            />
                        </span>
                        <span className='ml-1.5 font-bold'>Hub</span>
                        <IsPublicInfo />
                    </>
                }
                {
                    tunePatP == radio.our && tunePatP != radio.hub &&
                    <>
                        < span
                            className={`rounded flex items-center justify-center 
                        ${isDarkMode ? 'bg-black-70 text-black-1 ' : ' bg-black-80 text-white'}
                         `}
                            style={{ maxHeight: '40px', maxWidth: '40px', minHeight: '40px', minWidth: '40px' }}

                        >
                            <Radio
                                size={24}
                                weight="bold"
                            />
                        </span >
                        <div
                            className={`flex items-center font-bold  ml-1.5  
                         ${isDarkMode ? 'text-black-10' : 'text-black-70'}
                            `}

                        >
                            <span className='flex items whitespace-nowrap'>My Station</span>
                            <IsPublicInfo />
                        </div>
                    </>
                }
                {
                    tunePatP &&
                    tunePatP != radio.hub
                    && tunePatP != radio.our &&
                    <>
                        <span
                            className={`  overflow-hidden  
                           rounded flex justify-center items-center
                           ${isDarkMode ? 'bg-black-70' : 'bg-black-80'}
                           `}
                            style={{
                                maxHeight: '40px',
                                maxWidth: '40px',
                                minHeight: '40px',
                                minWidth: '40px'
                            }}
                        >
                            {
                                tunePatP.length <= 14
                                && isValidPatp(tunePatP) &&
                                renderSigil(tunePatP, 24, isDarkMode)
                            }
                        </span>
                        <span
                            className='ml-1.5 font-bold'
                            style={{
                                maxWidth: '8.5em',
                                lineHeight: '16px',
                            }}
                        >
                            {tunePatP}
                        </span>
                        <IsPublicInfo />
                    </>
                }
            </div >
    )
}