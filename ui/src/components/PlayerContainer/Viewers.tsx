import { reactRenderer, sigil } from '@tlon/sigil-js';
import React, { useEffect, useState } from 'react';
import { GrFormView, GrSearch } from 'react-icons/gr';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectViewers } from '../../features/station/stationSlice';

export type ViewersTabOption = 'Viewers' | 'Banned';

export const Viewers = () => {
    // const viewers = useAppSelector(selectViewers);
    const viewers = ['~harlys-forbec', '~fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel',]
    const [viewersMenuOpen, setViewersMenuOpen] = useState(false);
    const [openTab, setOpenTab] = useState<ViewersTabOption>('Viewers');
    const [viewersQuery, setViewersQuery] = useState('');
    const [queriedList, setQueriedList] = useState<string[]>(viewers.filter(x => x != radio.our));

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsideIsPublicDropdownClick
        )

        return () => document.removeEventListener('click', handleOutsideIsPublicDropdownClick)
    }, []);

    const handleOutsideIsPublicDropdownClick = (event: any) => {
        var clicked = event.target as Element;
        var viewersMenu = document.getElementById('viewers-menu');

        if (
            clicked != viewersMenu && !viewersMenu?.contains(clicked)
        ) {
            setViewersMenuOpen(false);
        }
    }

    function handleTabClick(option: ViewersTabOption) {
        setOpenTab(option);
        setViewersQuery('');

        if (option == 'Viewers') {
            setQueriedList(viewers.filter(x => x != radio.our))
        }
        else {
            setQueriedList([])
        }
    }

    function handleViewersInputTextChange(e) {
        setViewersQuery(e.target.value);
    }

    useEffect(() => {
        if (openTab == 'Viewers') {
            let newv = viewers.filter(x => x.includes(viewersQuery))
            console.log(newv)
            setQueriedList(newv);
        }
        else if (openTab == 'Banned') {
            setQueriedList([]);
        }
    }, [viewersQuery]);

    return (
        <div id='viewers-menu'>
            <div
                className='flex items-center text-center mt-1 cursor-pointer'
                style={{ fontSize: '0.7rem' }}
                onClick={() => setViewersMenuOpen((previous) => !previous)}
            >
                <GrFormView className='mr-1 text-lg ' />
                <span className='font-bold' >{
                    viewers.length == 0 ? 0 : viewers.length - 1}
                </span>
                <span className={'ml-1 font-bold '}>
                    viewer(s)
                </span>
            </div>
            {
                viewersMenuOpen && viewers.length > 1 &&
                <div

                    className='absolute flex border flex-col 
                                bg-white 
                               rounded 
                               '
                    style={{
                        height: '68vh',
                        width: '28vw',
                        maxWidth: '30vw',
                        top: '0',
                        left: '0',
                        boxShadow: 'rgba(50, 50, 93, 0.25) \
                             0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                    }}
                >
                    <div className='flex border-b-2 h-7'>
                        <button className={`w-1/2 border-b-2 ${openTab == 'Viewers' ? 'border-black font-bold' : 'border-transparent'}
                                         py-2 flex justify-center items-center` }
                            style={{ marginBottom: '-0.1em' }}
                            onClick={() => handleTabClick('Viewers')}
                        >
                            Viewers
                            <span className='rounded py-0.5 px-1'
                                style={{ fontSize: '.55rem' }}>
                                ({viewers.length - 1})
                            </span>
                        </button>
                        <button
                            className={`w-1/2 border-b-2 
                                    ${openTab == 'Banned'
                                    ? 'border-black font-bold'
                                    : 'border-transparent'}
                                     py-2 flex justify-center items-center`}
                            style={{ marginBottom: '-0.1em' }}
                            onClick={() => handleTabClick('Banned')}
                        >
                            Banned
                            <span className='rounded px-1 py-0.5 
                                 font-bold'
                                style={{ fontSize: '.55rem' }}>
                                (0)
                            </span>
                        </button>
                    </div>
                    <div className='px-2 py-1 overflow-y-auto overflow-x-hidden flex flex-col'>
                        <div className="flex mb-1 h-8 relative items-center justify-between ">
                            <GrSearch className="absolute ml-2 	"
                                style={{
                                    fontSize: '.6rem',
                                }}
                            ></GrSearch>
                            < input
                                type="text"
                                className=" pl-6  inline-block 
                               w-full  h-6 bg-white 
                               rounded border border-solid border-gray-400
                               "
                                style={{
                                    fontSize: '.6rem'
                                }}
                                autoCorrect={'off'}
                                autoCapitalize={'off'}
                                autoComplete={'off'}
                                placeholder="e.g. ~sampel-palnet"
                                value={viewersQuery}
                                onChange={handleViewersInputTextChange}
                            />
                        </div>
                        {queriedList.map((x, i) =>
                            <div className='flex items-center justify-between mb-2' key={x}>
                                <a
                                    href={'/apps/landscape/~profile/' + x}
                                    target="_blank"
                                >
                                    <span className='flex items-center ' >
                                        {
                                            isValidPatp(x) && x.length <= 14 &&
                                            <span className='bg-black p-0.5 mr-1 
                                                 rounded flex justify-center 
                                                 items-center'
                                            >
                                                {sigil({
                                                    patp: x,
                                                    renderer: reactRenderer,
                                                    size: 18,
                                                    colors: ['black', 'white'],
                                                })}
                                            </span>
                                        }
                                        <span
                                            className={' whitespace-nowrap'}
                                            style={{ fontSize: '0.7rem' }}
                                            key={i}
                                        >
                                            {x == radio.our ? 'You' : x}
                                        </span>
                                    </span>
                                </a>
                                <span className='hover:cursor-pointer font-bold
                                                border border-gray-400
                                                p-0.5 ml-2 px-1 bg-red-200 rounded'
                                >
                                    ban
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div >
    )
}