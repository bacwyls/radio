import React, { useEffect, useState } from "react"
import { MdOutlineMenu } from "react-icons/md";
import { Help } from "../ChatContainer/Help/Help";
import { SyncActions } from "../PlayerContainer/SyncActions";

export const PhoneActionsMenu = () => {
    const [showActionsMenu, setShowActionsMenu] = useState(false);

    const phoneActionsMenuId = "phone-actions-menu"

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsidePhoneActionsMenuClick
        )
        return () => document.removeEventListener('click', handleOutsidePhoneActionsMenuClick)
    }, []);

    const handleOutsidePhoneActionsMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var phoneActionsMenu = document.getElementById(phoneActionsMenuId);

        if (
            phoneActionsMenu && clicked != phoneActionsMenu && !phoneActionsMenu.contains(clicked)
        ) {
            setShowActionsMenu(false);
        }
    }

    return (
        <button
            className={` text-lg 
                     ${showActionsMenu && 'bg-gray-100'}
                     `}
            id={phoneActionsMenuId}
        >
            <MdOutlineMenu
                onClick={() => setShowActionsMenu(prev => !prev)}
            />
            {showActionsMenu &&
                <div
                    className="fixed flex flex-col-reverse gap-1 py-2
                                border-t border-b border-gray-400 bg-white"
                    style={{
                        bottom: '8vh',
                        width: '100vw',
                        left: 0
                    }}
                >
                    <Help />
                    <SyncActions />
                </div>
            }
        </button>
    )




}