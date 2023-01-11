import React, { useEffect } from "react"
import { ConnectingAnimation } from "./ConnectingAnimation/ConnectingAnimation"
import { isValidPatp } from 'urbit-ob'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { radio } from "../../api";
import { Television } from "phosphor-react";
import { isPhone, tuneTo } from "../../util";
import { selectRadioSub } from "../../features/station/stationSlice";
import { Sigil } from "../Sigil";

export const Connecting = () => {
    let { patp } = useParams();

    const radioSub = useAppSelector(selectRadioSub);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        navigate('/');
    }

    useEffect(() => {
        if (!radioSub) return;

        if (patp && isValidPatp(patp)) {
            tuneTo(patp, radio, dispatch);
        }

        else {
            navigate('/');
            tuneTo(null, radio, dispatch);
        }

    }, [patp, radioSub]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        const retryInterval = setInterval(() => {
            if (patp && isValidPatp(patp)) {
                tuneTo(patp, radio, dispatch);
            }

            else {
                navigate('/');
                tuneTo(null, radio, dispatch);
            }
        }, 1000 * 40)

        return () => {
            clearInterval(retryInterval)
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [])

    const handleKeyDown = (event: any) => {
        if (event.key == 'Escape') {
            event.preventDefault();
            handleCancel();
        }
    }

    return (
        <div

            className={`w-full h-full fixed top-0 left-0 flex items-center justify-center
        ${patp == radio.our && 'invisible'} 
            `}
            style={{
                backdropFilter: 'blur(10px) brightness(0.8)',
                zIndex: 170,
            }}
        >
            <div
                className={`shadow-lg flex items-center  justify-center rounded-md bg-background-default border-border-default
                ${isPhone() ? '' : 'px-8'}
        `}
                style={{
                    width: '30em',
                    height: '14em',
                    zIndex: 51,
                }}
            >

                <div style={{ marginTop: '-3em' }}>
                    <ConnectingAnimation />
                </div>
                <div className=" flex flex-col gap-2 font-bold ml-6 "
                    style={{ maxWidth: '50%' }}
                >
                    <span
                        className={` text-text-secondary text-lg `}
                    >
                        Connecting to:
                    </span>
                    <div className={`flex items-center`}
                    >
                        {patp == radio.hub ?
                            <>
                                <span
                                    className={`rounded flex items-center justify-center mr-1 h-5 w-5 bg-background-icon text-text-icon`}
                                >
                                    <Television
                                        size={18}
                                        weight="bold"
                                    />
                                </span>
                            </>
                            :
                            patp && isValidPatp(patp) && patp.length <= 14 &&
                            <span className={`  mr-1.5 h-5 w-5
                                rounded flex justify-center
                                items-center bg-background-icon 
                         `}
                            >
                                <Sigil patp={patp} size={18} />
                            </span>
                        }
                        {patp == radio.hub ? 'Hub' : patp}
                    </div>
                    <button
                        className={` flex items-center justify-center
                         border-gray-400 rounded  hover:border-black
                         text-bold px-2 py-1 mt-2 z-10 h-6 w-20
                         border-border-default bg-hover-default
                         `}
                        style={{
                            right: 0,
                            top: 0,
                            marginRight: '2.42em',
                        }}
                        onClick={handleCancel}
                    >
                        <span
                            className='font-bold text-base text-text-default '
                        >
                            Cancel
                        </span>
                        {!isPhone() &&
                            <span className={`ml-1 px-1  font-bold 
                                        rounded border text-sm border-border-intense text-text-primary bg-background-shortcut-button
                                        `}
                                style={{
                                    right: '0.1em', top: '0.1em',

                                }}
                            >
                                Esc
                            </span>}
                    </button>
                </div>
            </div>
        </div >
    )
} 