import { sigil, reactRenderer } from "@tlon/sigil-js";
import React, { useState, useEffect, useRef } from "react";
import { radio } from "../../../../api";
import { isPhone } from "../../../../util";
import { isValidPatp } from 'urbit-ob'
import { ViewersTabOption } from "../ViewersButton";
import './ViewersMenu.css';
import { MdOutlineSearch } from "react-icons/md";

interface IViewer {
    ship: string,
    index: number
}

const Viewer = (props: IViewer) => {

    const { ship, index } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleViewerClick = (ship) => {
        setIsFocused(true);
        document.addEventListener('click', handleClickOutsideViewer);
    }

    const handleClickOutsideViewer = (e) => {
        let viewer = document.getElementById('viewer-' + ship);

        if (!viewer) {
            setIsFocused(false);
        }
        else if (!(e.target == viewer || viewer?.contains(e.target))) {
            setIsFocused(false);
            document.removeEventListener('click', handleClickOutsideViewer);
        }
    }

    return (
        <div
            id={'viewer-' + ship}
            className={`flex  px-2 rounded-md
                                    hover:bg-gray-100 justify-between py-1
                        ${isFocused ? 'bg-gray-100 py-2 gap-1 items-center flex-wrap'
                    : 'items-center '
                } `}
            onClick={() => handleViewerClick(ship)}
        >
            <span className='flex items-center ' >
                {
                    ship && isValidPatp(ship) && ship.length <= 14 &&
                    <span className='bg-black p-0.5 mr-1 
                                     rounded flex justify-center 
                                     items-center'
                    >
                        {sigil({
                            patp: ship,
                            renderer: reactRenderer,
                            size: 18,
                            colors: ['black', 'white'],
                        })}
                    </span>
                }
                <span
                    className={' whitespace-nowrap'}
                    style={{ fontSize: '0.7rem' }}
                    key={index}
                >
                    {ship == radio.our ? 'You' : ship}
                </span>
            </span>
            {isFocused && <div className={`flex items-center justify-end gap-1`}>
                <a
                    href={'/apps/landscape/~profile/' + ship}
                    target="_blank"
                >
                    <span className='cursor-pointer font-semibold
                                    border border-gray-400 hover:border-black
                                    hover:shadow h-4 w-10 flex items-center justify-center
                                    rounded bg-white'
                        style={{ fontSize: '.6rem' }}
                    >
                        profile
                    </span>
                </a>
                <span className='cursor-pointer font-semibold
                                    border border-gray-400  hover:border-red-400
                                    hover:shadow  h-4 w-7 flex items-center justify-center 
                                     rounded bg-white text-red-800'
                    style={{ fontSize: '.6rem' }}
                    onClick={() => radio.isAdmin() && radio.ban(ship)}
                >
                    ban
                </span>
            </div>}
        </div>
    )
}

export const ViewersMenu = () => {
    // const viewers = useAppSelector(selectViewers);
    // const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel',]
    const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel',]

    const [openTab, setOpenTab] = useState<ViewersTabOption>('Viewers');
    const [viewersQuery, setViewersQuery] = useState('');
    const [queriedList, setQueriedList] = useState<string[]>(viewers.filter(x => x != radio.our));

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
            setQueriedList(newv);
        }
        else if (openTab == 'Banned') {
            setQueriedList([]);
        }
    }, [viewersQuery]);

    return (
        <div
            className={` flex flex-col  border z-20 bg-white
                   ${isPhone() ? 'viewers-menu-phone' : 'rounded viewers-menu'}
                    `}
        >
            <div className='flex border-b-2 h-7 '>
                <button
                    className={`w-1/2 border-b-2 py-2 
                            flex justify-center items-center
                             ${openTab == 'Viewers' ?
                            'border-black font-semibold'
                            : 'border-transparent'
                        }
                      ` }
                    style={{ marginBottom: '-0.1em' }}
                    onClick={() => handleTabClick('Viewers')}
                >
                    Viewers
                    <span className='ml-1'
                        style={{ fontSize: '.55rem' }}>
                        ({viewers.length})
                    </span>
                </button>
                <button
                    className={`w-1/2 border-b-2 
                    py-2 flex justify-center items-center
                        ${openTab == 'Banned'
                            ? 'border-black font-semibold'
                            : 'border-transparent'
                        } `}
                    style={{ marginBottom: '-0.1em' }}
                    onClick={() => handleTabClick('Banned')}
                >
                    Banned
                    <span className='ml-1'
                        style={{ fontSize: '.55rem' }}>
                        (0)
                    </span>
                </button>
            </div>
            <div className=' py-1 overflow-y-auto 
                            overflow-x-hidden flex flex-col'
            >
                <div
                    className="flex mb-1 px-2 h-8 relative 
                                 items-center justify-between "
                >
                    <MdOutlineSearch className="absolute ml-2 font-base	" />
                    < input
                        type="text"
                        className=" pl-6 pb-0.5 inline-block 
                   w-full  h-6 bg-white placeholder-black
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
                    <Viewer key={x} ship={x} index={i} />
                )}
            </div>
        </div>
    )
}

