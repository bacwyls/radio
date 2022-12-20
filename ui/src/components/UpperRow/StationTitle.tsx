import { reactRenderer, sigil } from '@tlon/sigil-js';
import { Radio, Television, Users } from 'phosphor-react';
import React, { useState } from 'react';
import { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectIsPublic, selectTunePatP } from '../../features/station/stationSlice';
import { selectIsDarkMode } from '../../features/ui/uiSlice';

const IsPublicInfo = () => {
    const [showInfo, setShowInfo] = useState(false);
    const isPublic = useAppSelector(selectIsPublic);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (
        <span className={`flex items-center justify-center rounded-full
        ml-1 font-bold text-black-90 h-4 relative
        ${isDarkMode ? 'bg-blue-50' : 'bg-blue-70'}
        `}
            style={{
                fontSize: '14px',
                padding: '0 .6em'
            }}
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
        >
            {isPublic ? 'Public' : 'Private'}
            {showInfo &&
                <div
                    className={`absolute top-5 left-0 shadow py-2 px-3
                      rounded h-12 font-semibold   flex items-center border
                      ${isDarkMode ? ' bg-black-90 border-black-85 text-black-10' : ' bg-white text-black-80 border-black-10'}

                      `}
                    style={{ width: '21.4em', fontSize: '16px', lineHeight: '18px', zIndex: 2 }}

                >
                    {isPublic ? 'This station is public and everybody can use DJ commands (Play & Talk).'
                        :
                        'This station is private and only the host can use DJ commands (Play & Talk).'
                    }
                </div>}
        </span>
    )
}

interface IStationTitle {
}

export const StationTitle: FC<IStationTitle> = (props: IStationTitle) => {

    const tunePatP = useAppSelector(selectTunePatP);
    // const viewers = useAppSelector(selectViewers);
    const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~zod'];
    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (
        <div
            className={`flex items-center  
            ${isDarkMode ? 'text-black-10' : 'text-black-80'}
            `}
        >
            {tunePatP == radio.hub &&
                <>
                    <span
                        className={`rounded flex items-center justify-center    
                               ${isDarkMode ? 'bg-black-70 text-black-1' : ' bg-black-80 text-white'}`}
                        style={{ minHeight: '40px', minWidth: '40px' }}
                    >
                        <Television
                            size={25}
                            weight="bold"
                        />
                    </span>
                    <span className='ml-2 font-bold'>Hub</span>
                    <IsPublicInfo />
                </>
            }
            {
                tunePatP == radio.our && tunePatP != radio.hub &&
                <>
                    < span
                        className={`rounded flex items-center px-1.5 py-1  
                        ${isDarkMode ? 'bg-black-70 text-black-1 ' : ' bg-black-80 text-white'}
                         `}

                    >
                        <Radio
                            size={25}
                            weight="bold"
                        />
                    </span >
                    <div
                        className='flex items-center font-extrabold z-10 ml-2 '
                    >
                        <span className='flex items whitespace-nowrap'>My Station</span>
                        <IsPublicInfo />
                    </div>
                </>
            }
            {
                tunePatP &&
                tunePatP != radio.hub
                && tunePatP != radio.our
                && tunePatP.length <= 14
                && isValidPatp(tunePatP) &&
                <>
                    <span
                        className={`  overflow-hidden 
                           rounded flex justify-center items-center
                           ${isDarkMode ? 'bg-black-70' : 'bg-black-1'}
                           `}
                        style={{ height: '40px', width: '40px' }}
                    >{
                            sigil({
                                patp: '~fidwed-sipwyn',
                                renderer: reactRenderer,
                                size: 30,
                                colors: isDarkMode ? ['#60605E', 'white'] : ['#4A4948', 'white'],
                            })
                        }
                    </span>
                    <span
                        className='ml-2 font-bold'
                        style={{
                            maxWidth: '80%'
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