import React from "react";

interface Props {
    text: string;
    speed?: number;
}

const ScrollText: React.FC<Props> = ({ text, speed = 50 }) => {
    return (
        <div style={{ overflow: "hidden" }}>
            <div
                style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    animation: `scroll ${text.length / speed}s linear infinite`,
                }}
            >
                {text}
            </div>
        </div>
    );
};

export default ScrollText;
