import { Gear, Question, Lock, Globe } from "phosphor-react";
import React, { useEffect, useState } from "react"
import { radio } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectDescription, selectHasPublishedStation, selectIsPublic, setDescription, setHasPublishedStation, setIsPublic } from "../../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util";
import './style.css';

const IsPublicSettings = () => {

    const isPublic = useAppSelector(selectIsPublic);
    const [showInfo, setShowInfo] = useState(false);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const dispatch = useAppDispatch();

    return (
        <div className=" flex flex-col">
            <div className="font-bold flex items-center relative mb-2"
            >DJ commands
                <button
                    className={`cursor-pointer rounded p-1 
    `}
                // onClick={() => setShowInfo(prev => !prev)}

                >
                    {/* <Question
                        size={22}
                        weight="bold"
                    /> */}
                    {/* {showInfo &&
                        <div
                            className="absolute shadow bg-white top-6 z-10
                         px-2 py-4 rounded-md flex right-0 font-bold"
                            style={{ fontSize: '16px' }}
                        >
                            Change the acess to DJ commands (Play & Talk).
                        </div>
                    } */}
                </button>
            </div>
            <div
                className={`flex relative items-center h-12 p-2 rounded-md  border   border-black-60 mb-1.5
                ${!isPublic ? (isDarkMode ? 'bg-black-70' : 'bg-black-10 ') : (isDarkMode ? ' hover:bg-black-80 cursor-pointer ' : 'cursor-pointer hover:bg-black-5 ')}
                `}
                onClick={() => {
                    dispatch(setIsPublic(false))
                    radio.private()
                }}
            >
                <div className={`flex items-center justify-center  rounded-md
                ${(isDarkMode ? 'bg-black-10 text-black-90' : 'bg-black-80 text-black-10 ')}

                `}
                    style={{
                        height: '2.5em',
                        width: '2.5em'
                    }}
                >
                    <Lock size={24} weight="bold" />
                </div>
                <div className=" flex flex-col ml-1 mb-0.5 justify-center h-full">
                    <span className="font-bold  h-3" >
                        Private
                    </span>
                    <span className="font-semibold h-3 " style={{ fontSize: '14px', }}>
                        Only you can use DJ commands
                    </span>
                </div>
                <input className={`absolute right-2  
                ${isPublic && 'cursor-pointer'}
                `}
                    style={{ top: '13.5px', height: '.85em', width: '.85em', }}
                    type={'radio'}
                    checked={!isPublic}
                />
            </div>
            <div className={`flex relative items-center h-12 p-2 rounded-md  border border-black-60
                ${isPublic ? (isDarkMode ? 'bg-black-70' : 'bg-black-10 ') : (isDarkMode ? ' hover:bg-black-80 ' : 'cursor-pointer hover:bg-black-5 ')}
                    `}
                onClick={() => {
                    dispatch(setIsPublic(true))
                    radio.public()
                }}
            >
                <div className={`flex items-center justify-center  rounded-md
                ${(isDarkMode ? 'bg-black-10 text-black-90' : 'bg-black-80 text-black-10 ')}
                `}
                    style={{
                        height: '2.5em',
                        width: '2.5em'
                    }}
                >
                    <Globe size={24} weight="bold" />
                </div>
                <div className=" flex flex-col ml-1 mb-0.5 justify-center h-full">
                    <span className="font-bold  h-3" >
                        Public
                    </span>
                    <span className="font-semibold h-3 " style={{ fontSize: '14px', }}>
                        Everybody can use DJ commands
                    </span>
                </div>
                <input className={`absolute right-2 cursor-pointer
                ${!isPublic && 'cursor-pointer'}
                ` }
                    style={{ top: '13.5px', height: '.85em', width: '.85em', }}
                    type={'radio'}
                    checked={isPublic}
                />
            </div>
        </div >

    )
}

const PublishSettings = () => {

    const isDarkMode = useAppSelector(selectIsDarkMode);
    const [showInfo, setShowInfo] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const description = useAppSelector(selectDescription);
    const newDescriptionRef = React.useRef(newDescription);

    const hasPublishedStation = useAppSelector(selectHasPublishedStation);
    const dispatch = useAppDispatch();

    const publishInfoId = 'publish-id';

    useEffect(() => {
        setNewDescription(description);
        newDescriptionRef.current = description;

        return () => {
            dispatch(setDescription(newDescriptionRef.current))
        }
    }, [description]);


    useEffect(() => {

        document.addEventListener(
            "click",
            handleOutsidePublishInfoMenuClick
        )

        return () => {
            document.removeEventListener('click', handleOutsidePublishInfoMenuClick)
        }
    }, []);

    const handleOutsidePublishInfoMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var publishInfo = document.getElementById(publishInfoId);

        if (
            clicked != publishInfo && !publishInfo?.contains(clicked)
        ) {
            setShowInfo(false);
        }
    }

    const handleNewDescriptionChange = (e) => {
        let text = e.target.value;
        setNewDescription(text)
        newDescriptionRef.current = text;
    }

    return (
        <div className=" flex flex-col  left-0">
            <div className="font-bold flex items-center relative"
            >Publish Station
                <button
                    id={publishInfoId}
                    className={`cursor-pointer rounded p-1 
                ${showInfo ? (isDarkMode ? 'hover:bg-black-80' : '  hover:bg-black-10') : ''}
                ${isDarkMode ? ' hover:bg-black-80' : '  hover:bg-black-10'}
                `}
                    onClick={() => setShowInfo(prev => !prev)}

                >
                    <Question
                        size={22}
                        weight="bold"
                    />
                    <div
                        className={`absolute shadow top-6 z-10
                         px-2 py-4 rounded-md flex  font-bold
                         
                        ${isDarkMode ? 'bg-black-80' : 'bg-white'}
                         `}
                        style={{ fontSize: '16px', visibility: showInfo ? 'visible' : 'hidden' }}
                    >
                        Publishing the station makes it available to the discovery pool.
                    </div>
                </button>
            </div>
            <div className="flex font-bold"
            >
                <div className={`flex items-center mr-2 px-2 py-1   rounded-md 
                ${hasPublishedStation ? (isDarkMode ? 'cursor-pointer hover:bg-black-80' : 'cursor-pointer hover:bg-black-10') : ''}

                `}
                    onClick={() => dispatch(setHasPublishedStation(false))}
                    style={{ marginLeft: '-.5rem' }}
                >
                    <input className={`mr-1 ${hasPublishedStation && 'cursor-pointer'}`}
                        style={{ top: '13.5px', height: '.85em', width: '.85em' }}
                        type={'radio'}
                        checked={!hasPublishedStation}
                    />
                    No
                </div>
                <div className={`flex items-center px-2 py-1 rounded-md 
                ${!hasPublishedStation ? (isDarkMode ? 'cursor-pointer hover:bg-black-80' : 'cursor-pointer hover:bg-black-10') : ''}
                `}
                    onClick={() => dispatch(setHasPublishedStation(true))}
                >
                    <input className={`mr-1 
                    ${!hasPublishedStation && 'cursor-pointer'}`

                    }
                        style={{ top: '13.5px', height: '.85em', width: '.85em' }}
                        type={'radio'}
                        checked={hasPublishedStation}
                    />
                    Yes
                </div>
            </div>
            {
                hasPublishedStation &&
                <div className="flex flex-col">
                    <span className="font-semibold mb-1">Description</span>
                    <div className="relative">
                        <textarea
                            className={` rounded-md border w-full font-semibold
                             px-2 py-1 outline-none focus:shadow	resize-none
                            ${isDarkMode ? 'bg-black-80 border-black-85 placeholder-black-10 ' : 'bg-black-5 placeholder-black-80 border-black-10'}
                            `}
                            placeholder="Write a description..."
                            maxLength={64}
                            rows={4}
                            value={newDescription}
                            onChange={handleNewDescriptionChange}
                        />
                        <>
                            <span className="absolute bottom-2.5 left-2 font-bold">{newDescription.length + '/64'}</span>
                            {/* <div
                                className="absolute bottom-2.5 right-14 font-bold px-2 rounded-md bg-gray-300 "
                            >Cancel</div>
                            <div className="absolute bottom-2.5 right-2 font-bold px-2 rounded-md "
                                style={{ backgroundColor: '#B8E4FA' }}
                            >Save</div> */}
                        </>
                    </div>
                </div>
            }
        </div >
    )
}

export const SettingsMenu = () => {
    const [showConfigMenu, setShowConfigMenu] = useState(false);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsideSettingsMenuClick
        )

        return () => document.removeEventListener('click', handleOutsideSettingsMenuClick)
    }, []);

    const handleOutsideSettingsMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var settingsMenu = document.getElementById('settings-menu');

        if (
            settingsMenu && clicked != settingsMenu && !settingsMenu.contains(clicked)
        ) {
            setShowConfigMenu(false);
        }
    }

    return (
        <div
            id="settings-menu"
            style={{
                fontSize: '16px'
            }}
        >
            <button
                className={`rounded-md shadow absolute left-0 flex
                 items-center justify-center  font-bold 
            ${isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5 border-black-10'}
             ${showConfigMenu && (isDarkMode ? 'bg-black-70' : 'bg-black-5')}
             `}
                onClick={() => setShowConfigMenu((prev) => !prev)}
                style={{
                    height: '40px',
                    width: '120px'
                }}
            >
                <Gear size={20} weight="bold" className="mr-1" />
                Settings
            </button >
            {showConfigMenu
                &&
                <div className={`fixed z-20  
                             flex flex-col p-4  rounded-md
                            gap-2 shadow
                            ${isDarkMode ? 'bg-black-90' : 'bg-white '}
                            ${isPhone() ? 'settings-menu-phone  ' : 'settings-menu '}
                            `}
                >
                    <div className="flex justify-between">
                        <div className="flex items-center font-bold mb-2"
                            style={{ fontSize: '18px' }}
                        >
                            <Gear size={22} weight="bold" className="mr-1" />
                            Settings</div>
                        {/* <button
                        className=' flex items-center justify-center
                         border-gray-400 rounded-md  hover:border-black
                         text-bold px-2 py-1 h-6
                         bg-gray-100 '
                        style={{
                            boxShadow: 'rgba(50, 50, 93, 0.25) \
                            0px 2px 5px -1px, rgba(0, 0, 0, 0.3)`\
                             0px 1px 3px - 1px ',
                            height: '40px',

                        }}
                        onClick={() => setShowConfigMenu(false)}
                    >
                        <span
                            className='font-bold '
                        >
                            Close
                        </span>
                    </button> */}
                    </div>
                    <IsPublicSettings />
                    <PublishSettings />
                </div>}
        </div>

    )
}   