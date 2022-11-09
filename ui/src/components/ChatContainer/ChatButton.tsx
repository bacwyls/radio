import React, { FC } from "react"
import { MdOutlineChat } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsChatFullScreen, setIsChatFullScreen } from "../../features/ui/uiSlice";

interface IChatButton {
}

export const ChatButton: FC<IChatButton> = (props: IChatButton) => {

    const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
    const dispatch = useAppDispatch();

    return (
        <MdOutlineChat
            onClick={() => dispatch(setIsChatFullScreen(!isChatFullScreen))}
            className="text-base"
        />
    )
}