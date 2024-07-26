import React from 'react';
import './_wave.scss'
const Wavev2Icon = ({ w, h = 80, color = "#fff" }: { w?: number | string; color?: string, h?: number | string }) => {
    return (
        <svg viewBox="0 0 1320 500">
            <path fill={color} fill-opacity='0.4' />
            <path fill={color} fill-opacity='0.5' />
            <path fill={color} fill-opacity='0.6' />
        </svg>
    );
}

export default Wavev2Icon;
