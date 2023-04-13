import React, { useState, useEffect } from "react";

interface Props {
    text: string;
}

const TypingText: React.FC<Props> = ({ text }) => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        let timeoutId: number;

        const animateTyping = () => {
            timeoutId = setTimeout(() => {
                setShowText(true);
            }, Math.random() * 200 + 100);
        };

        animateTyping();

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <span>
            {text.split("").map((char, index) => (
                <span
                    key={`${char}-${index}`}
                    style={{
                        visibility: showText ? "visible" : "hidden",
                        animation: showText
                            ? `typing ${Math.random() * 0.2 + 0.1}s ease-out ${index * 0.05
                            }s 1 normal forwards`
                            : "none",
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

export default TypingText;
