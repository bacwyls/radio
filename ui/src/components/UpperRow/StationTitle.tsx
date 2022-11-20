import { reactRenderer, sigil } from '@tlon/sigil-js';
import { Radio, Television, Users } from 'phosphor-react';
import React from 'react';
import { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectIsPublic, selectTunePatP } from '../../features/station/stationSlice';
import { selectIsDarkMode } from '../../features/ui/uiSlice';
import { ViewersButton } from './Viewers/ViewersButton';
import { SettingsMenu } from './SettingsMenu/SettingsMenu';

interface IStationTitle {
}

export const StationTitle: FC<IStationTitle> = (props: IStationTitle) => {

    const tunePatP = useAppSelector(selectTunePatP);
    // const viewers = useAppSelector(selectViewers);
    const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~zod'];
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const isPublic = useAppSelector(selectIsPublic);

    return (

        // tunePatP && tunePatP == '~nodmyn-dosrux' ?
        //     <div className='flex flex-col'
        //         style={{
        //             height: '2em', lineHeight: '.6rem',
        //         }}
        //     >
        //         <div className={`flex items-center font-bold
        //         ${isDarkMode ? 'text-white-dark' : 'text-black'}
        //     `}
        //             style={{
        //             }}
        //         >
        //             <Television size={26} weight="bold" className='mr-1 ' />
        //             Hub

        //         </div>
        //     </div>

        //     :
        tunePatP ?
            <div
                className='flex items-start '
                style={{ height: '2.5em' }}
            >
                {tunePatP == radio.hub &&
                    <span
                        className={`rounded flex items-center  px-2  py-1  ${isDarkMode ? 'bg-white-dark  ' : ' bg-gray-200 '}`}
                    >
                        <Television
                            size={30}
                            weight="bold"
                            className={` ${isDarkMode ? 'text-black' : ''}`}
                        />
                    </span>
                }
                {tunePatP == radio.our &&
                    <span
                        className={`rounded flex items-center px-2 py-1   ${isDarkMode ? 'bg-white-dark  text-white-dark ' : '  bg-gray-200 '}`}
                    >
                        <Radio
                            size={30}
                            weight="bold"
                            className={` ${isDarkMode ? 'text-black' : ''}`}
                        />
                    </span>

                }

                {
                    tunePatP != radio.hub && tunePatP != radio.our && tunePatP.length <= 14 &&
                    <span
                        className={` py-0.5 px-1 overflow-hidden 
                           rounded flex justify-center items-center
                           ${isDarkMode ? 'bg-white-dark' : 'bg-black'}
                           `}
                    >{
                            sigil({
                                patp: '~harlys-forbec',
                                renderer: reactRenderer,
                                size: 30,
                                colors: isDarkMode ? ['rgb(253,253,253)', 'black'] : ['black', 'white'],
                            })
                        }
                    </span>
                }
                <div
                    className={`flex flex-col pt-0.5 flex-wrap
                              ${isDarkMode ? 'text-white-dark' : ''}
                            `}
                    style={{
                        lineHeight: '.6rem',
                        marginTop: '-0.2em'
                    }}
                >
                    <div
                        className='flex items-center font-bold z-10 ml-1 '
                    >
                        {tunePatP == radio.our &&
                            <span className='flex items '>My Station</span>
                        }

                        {tunePatP == radio.hub &&
                            <span className=''>Hub</span>
                        }

                        {
                            tunePatP != radio.our && tunePatP != radio.hub &&
                            <span
                                style={{
                                    maxWidth: '8em'
                                }}
                            >
                                {tunePatP}
                            </span>
                        }
                        <span className='flex items-center justify-center rounded text-black ml-0.5 mt-0.5 px-1 font-semibold'
                            style={{
                                backgroundColor: 'rgb(239,246,255)',
                                fontSize: '.55rem',
                                paddingBottom: '0.2em',
                            }}
                        >
                            {isPublic ? 'public' : 'private'}
                        </span>
                    </div>
                    <ViewersButton />
                </div>
            </div >
            : <></>


    )
}