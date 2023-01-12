import { Globe, Lock } from "phosphor-react";
import { radio } from "../../../api";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectIsPublic, setIsPublic } from "../../../features/station/stationSlice";
import React from 'react'

export const IsPublicSettings = () => {

    const isPublic = useAppSelector(selectIsPublic);
    const dispatch = useAppDispatch();

    return (
        <div className=" flex flex-col">
            <div className="font-bold flex items-center relative mb-2"
            >DJ commands (Play & Talk)
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
                className={`flex relative items-center h-12 p-2 rounded-md  border  mb-1.5  border-border-intense
                ${!isPublic ? 'bg-hover-default' : 'cursor-pointer'}
                `}
                onClick={() => {
                    dispatch(setIsPublic(false))
                    radio.private()
                }}
            >
                <div className={`flex items-center justify-center  rounded-md text-text-button bg-text-default
                `}
                    style={{
                        height: '1.666rem',
                        width: '1.666rem',
                    }}
                >
                    <Lock className="text-xl" weight="bold" />
                </div>
                <div className=" flex flex-col ml-1.5  justify-center h-full">
                    <span className="font-bold text-text-primary " >
                        Private
                    </span>
                    <span className={`font-semibold h-3 text-sm text-text-secondary
                    `} style={{ lineHeight: '0.583rem' }}>
                        Only you can use DJ commands
                    </span>
                </div>
                {/* <input className={`absolute right-2  
                ${isPublic && 'cursor-pointer'}
                `}
                    style={{ top: '13.5px', height: '.85em', width: '.85em', }}
                    type={'radio'}
                    checked={!isPublic}
                    onChange={() => null}
                /> */}
            </div >
            <div className={`flex relative items-center h-12 p-2 rounded-md  border   border-border-intense 
                ${isPublic ? 'bg-hover-default' : 'cursor-pointer'}
             `}
                onClick={() => {
                    dispatch(setIsPublic(true))
                    radio.public()
                }}
            >
                <div className={`flex items-center justify-center  rounded-md text-text-button bg-text-default
                `}
                    style={{
                        height: '1.666rem',
                        width: '1.666rem',
                    }}
                >
                    <Globe className="text-xl" weight="bold" />
                </div>
                <div className=" flex flex-col ml-1.5  justify-center h-full">
                    <span className="font-bold text-text-primary " >
                        Public
                    </span>
                    <span className={`  font-semibold h-3  text-sm text-text-secondary
                    `} style={{ lineHeight: '0.583rem' }}>
                        Everybody can use DJ commands
                    </span>
                </div>
                {/* <input className={`absolute right-2 cursor-pointer
                ${!isPublic && 'cursor-pointer'}
                ` }
                    style={{ top: '13.5px', height: '.85em', width: '.85em', }}
                    type={'radio'}
                    checked={isPublic}
                    onChange={() => null}
                /> */}
            </div>
        </div >

    )
}