import { sigil, reactRenderer } from "@tlon/sigil-js";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectDocumentFontSize, selectIsDarkMode } from "../features/ui/uiSlice";
import { isValidPatp } from 'urbit-ob'
import { radio } from "../api";

interface ISigil {
    patp: string,
    size: number,
}

export const Sigil = ({ patp, size }: ISigil) => {

    const isDarkMode = useAppSelector(selectIsDarkMode);
    const documentFontSize = useAppSelector(selectDocumentFontSize);

    return (
        (patp.length <= 14 && isValidPatp(patp)) ?
            (
                sigil({
                    patp: patp,
                    renderer: reactRenderer,
                    size: size * documentFontSize,
                    colors:
                        isDarkMode ? ['#60605E', '#F3F2F2'] : ['#4A4948', 'white'],
                }))
            :
            <div></div>
    )
}