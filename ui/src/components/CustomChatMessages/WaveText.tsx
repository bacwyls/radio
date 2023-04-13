import React, { useState, useEffect } from "react";

interface Props {
    text: string;
}

const WaveText: React.FC<Props> = ({ text }) => {
    const [waveAmplitude, setWaveAmplitude] = useState(2); // adjust this to change the amplitude of the wave
    const [waveFrequency, setWaveFrequency] = useState(0.05); // adjust this to change the frequency of the wave
    const [wavePhase, setWavePhase] = useState(0); // adjust this to change the starting phase of the wave

    const getTransformY = (index: number) => {
        const radians = (index * waveFrequency * Math.PI) / 2 + wavePhase;
        const offsetY = Math.sin(radians) * waveAmplitude;
        return offsetY;
    };

    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            setWavePhase((prev) => prev + waveFrequency);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [waveFrequency]);

    return (
        <span
            style={{

                overflowWrap: "break-word",
                display: "inline-block",
                wordBreak: 'break-word'
            }}
        >
            {text.split("").map((char, index) => (
                <span
                    key={`${char}-${index}`}
                    style={{
                        whiteSpace: "pre",
                        display: "inline-block",
                        transform: `translateY(${getTransformY(index)}px)`,
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

export default WaveText;
