import { sigil, reactRenderer } from "@tlon/sigil-js";
import React, { useState, useEffect, useRef } from "react";
import { radio } from "../../../../api";
import { isPhone } from "../../../../util";
import { isValidPatp } from 'urbit-ob'
import { ViewersTabOption } from "../ViewersButton";
import { MagnifyingGlass } from "phosphor-react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsDarkMode } from "../../../../features/ui/uiSlice";
import './ViewersMenu.css';
import { selectBanned, selectViewers, setBanned, setViewers } from "../../../../features/station/stationSlice";

interface IViewer {
    ship: string,
    index: number,
}

const Viewer = (props: IViewer) => {

    const { ship, index } = props;

    const [isFocused, setIsFocused] = useState(false);

    const isDarkMode = useAppSelector(selectIsDarkMode);
    const viewers = useAppSelector(selectViewers);
    const dispatch = useAppDispatch();

    const handleViewerClick = (ship) => {
        if (ship == radio.our) return;
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
            className={`flex  px-2 
                                     justify-between py-1
                                    ${isDarkMode ? 'hover:bg-black-80' : 'hover:bg-black-5'}
                        ${isFocused ? (isDarkMode ? 'bg-black-80 py-2 gap-1 items-center flex-wrap' : 'bg-black-5  py-2 gap-1 items-center flex-wrap')
                    : 'items-center '
                } `}
            onClick={() => handleViewerClick(ship)}
        >
            <span className='flex items-center ' >
                {
                    ship && isValidPatp(ship) && ship.length <= 14 &&
                    <span className={` p-0.5 mr-1 
                                     rounded flex justify-center 
                                     items-center
                                     ${isDarkMode ? 'bg-black-70' : 'bg-black-80'}

                                     `}
                    >
                        {sigil({
                            patp: '~harlys-forbec',
                            renderer: reactRenderer,
                            size: 18,
                            colors: isDarkMode ? ['#60605E', '#FCFDFC'] : ['#4A4948', 'white'],
                        })}
                    </span>
                }
                <span
                    className={'font-medium'}
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
                    <span className={`cursor-pointer font-semibold
                                    pb-0.5
                                     h-4 w-10 flex items-center justify-center
                                    rounded  font-bold 
                                    ${isDarkMode ? ' bg-black-1  hover:bg-black-20 text-black-90 hover:shadow ' : ' bg-white shadow border border-black-10 hover:bg-black-5 '}

                                    `}
                        style={{ fontSize: '.6rem' }}
                    >
                        profile
                    </span>
                </a>
                {radio.isAdmin() && <span className={`cursor-pointer font-bold
                                      pb-0.5
                                    hover:shadow  h-4 w-7 flex items-center justify-center  text-red-600 
                                     rounded bg-white   
                                     ${isDarkMode ? ' bg-black-1  hover:bg-black-20  hover:shadow' : ' bg-white shadow border border-black-10 hover:bg-black-5 '}
                
                                     `}
                    style={{ fontSize: '.6rem' }}
                    onClick={() => {
                        dispatch(setViewers(viewers.filter(x => x != ship)))
                        radio.ban(ship)
                    }}
                >
                    ban
                </span>}
            </div>}
        </div>
    )
}

const Banned = (props: IViewer) => {

    const { ship, index } = props;

    const [isFocused, setIsFocused] = useState(false);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const dispatch = useAppDispatch();
    const banned = useAppSelector(selectBanned);

    const handleViewerClick = (ship) => {
        if (ship == radio.our) return;
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
            className={`flex  px-2 
                                     justify-between py-1
                                    ${isDarkMode ? 'hover:bg-hover-gray-dark' : 'hover:bg-hover-gray-light'}
                        ${isFocused ? (isDarkMode ? 'bg-hover-gray-dark py-2 gap-1 items-center flex-wrap' : 'bg-hover-gray-light py-2 gap-1 items-center flex-wrap')
                    : 'items-center '
                } `}
            onClick={() => handleViewerClick(ship)}
        >
            <span className='flex items-center ' >
                {
                    ship && isValidPatp(ship) && ship.length <= 14 &&
                    <span className={` p-0.5 mr-1 
                                     rounded flex justify-center 
                                     items-center
                                     `}
                        style={{
                            backgroundColor: `${isDarkMode ? 'rgb(253,253,253)' : 'black'}`
                        }}
                    >
                        {sigil({
                            patp: ship,
                            renderer: reactRenderer,
                            size: 18,
                            colors: isDarkMode ? ['rgb(253,253,253)', 'black'] : ['black', 'white'],
                        })}
                    </span>
                }
                <span
                    className={'font-medium'}
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
                    <span className={`cursor-pointer font-semibold
                                    hover:shadow h-4 w-10 flex items-center justify-center
                                    rounded bg-white text-black hover:font-bold 
                                    ${isDarkMode ? 'hover:border-white-dark ' : 'hover:border-black'}
                                    `}
                        style={{ fontSize: '.6rem' }}
                    >
                        profile
                    </span>
                </a>
                {radio.isAdmin() && <span className='cursor-pointer font-semibold
                                      hover:border-red-400
                                    hover:shadow  h-4 w-9 flex items-center justify-center 
                                     rounded bg-white text-red-800  hover:font-bold'
                    style={{ fontSize: '.6rem' }}
                    onClick={() => {
                        dispatch(setBanned(banned.filter(x => x != ship)))
                        radio.unban(ship)
                    }}
                >
                    unban
                </span>}
            </div>}
        </div>
    )
}

export const ViewersMenu = () => {
    const viewers = useAppSelector(selectViewers);
    const banned = useAppSelector(selectBanned);

    // const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel',]
    // const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel']

    const [openTab, setOpenTab] = useState<ViewersTabOption>('Online');
    const [viewersQuery, setViewersQuery] = useState('');
    const [queriedList, setQueriedList] = useState<string[]>(viewers);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    function handleTabClick(option: ViewersTabOption) {
        setOpenTab(option);
        setViewersQuery('');

        if (option == 'Online') {
            setQueriedList(viewers)
        }

        else if (option == 'Banned') {
            setQueriedList(banned)
        }

    }

    function handleViewersInputTextChange(e) {
        setViewersQuery(e.target.value);
    }

    useEffect(() => {
        if (openTab == 'Online') {
            let newv = viewers.filter(x => x.includes(viewersQuery))
            setQueriedList(newv);
        }
        else if (openTab == 'Banned') {
            let newb = banned.filter(x => x.includes(viewersQuery))
            setQueriedList(newb);
        }
    }, [viewersQuery, viewers, banned]);

    return (
        <div
            className={` flex flex-col  border z-20 
            ${isDarkMode ? ' bg-black-95  border-black-85  ' : ' bg-white border-black-10'}
               ${isPhone() ? 'viewers-menu-phone' : ' viewers-menu'}
                    `}
        >
            <div className={`flex border-b h-7 
            ${(isDarkMode ? 'border-light-border-dark ' : 'border-light-border-light')}
            `}>
                <button
                    className={`w-1/2  py-2 
                            flex justify-center items-center
                             ${openTab == 'Online' ?
                            (isDarkMode ? 'border-white-dark border-b-2 font-semibold' :
                                'border-black  border-b-2 font-semibold')
                            : 'border-transparent'
                        }
                      ` }
                    style={{
                        marginBottom: '-0.1em',
                        fontSize: '.7rem'
                    }}
                    onClick={() => handleTabClick('Online')}
                >
                    Online
                    <span className='ml-1'
                        style={{ fontSize: '.55rem' }}>
                        ({viewers.length})
                    </span>
                </button>
                {radio.isAdmin() &&
                    <button
                        className={`w-1/2 border-b b
                    py-2 flex justify-center items-center
                        ${openTab == 'Banned'
                                ? (isDarkMode ? 'border-white-dark  border-b-2 font-semibold' : 'border-black  border-b-2 font-semibold')
                                : 'border-transparent'
                            } `}
                        style={{
                            marginBottom: '-0.1em',
                            fontSize: '.7rem'

                        }}
                        onClick={() => handleTabClick('Banned')}
                    >
                        Banned
                        <span className='ml-1'
                            style={{ fontSize: '.55rem' }}>
                            ({banned.length})
                        </span>
                    </button>}
            </div>
            <div className=' py-1 overflow-y-auto  border-b border-gray-200  
                            overflow-x-hidden flex flex-col '
                style={{ height: 'calc(100vh - 64px - 42px)' }}
            >
                <div
                    className="flex  px-2 h-8 relative 
                                 items-center justify-between "
                >
                    < input
                        type="text"
                        className={` pl-2 pr-6  pb-0.5 absolute top-1 focus:shadow
                     h-6 border  hover:shadow
                   rounded            outline-none
                     ${isDarkMode ? 'bg-black-70 focus:bg-black-80 border-black-70  text-black-1 placeholder-white' : ' text-black-80  bg-black-10 border-black-10 placeholder-black-80 focus:bg-black-1'}

                   `}
                        style={{
                            width: '95%',
                            fontSize: '.6rem'
                        }}
                        autoCorrect={'off'}
                        autoCapitalize={'off'}
                        autoComplete={'off'}
                        placeholder="e.g. ~sampel-palnet"
                        value={viewersQuery}
                        onChange={handleViewersInputTextChange}
                    />
                    <MagnifyingGlass className="absolute right-3 top-2.5 " size={16} weight="bold" />
                </div>
                {openTab == 'Online' ?
                    queriedList.map((x, i) =>
                        <Viewer key={x} ship={x} index={i} />
                    )
                    :
                    queriedList.map((x, i) =>
                        <Banned key={x} ship={x} index={i} />
                    )
                }
            </div>
        </div>
    )
}

