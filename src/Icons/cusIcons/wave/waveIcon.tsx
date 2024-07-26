import React from 'react';
import './_wave.scss'
const WaveIcon = ({ w, h = 23, color = "#fff" }: { w?: number | string; color?: string, h?: number | string }) => {
    return (
        <svg width={w || '100%'} height={h} viewBox="0 -50 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" overflow="hidden" shape-rendering="auto" fill='none' className='waveV1'>
            <defs>
                <path id="wavepath" d="M -2 558 L -2 558 Q 379 421 523 491 t 272 0 t 272 0 t 272 0 t 272 0 t 171 70 v 0 z" />
                <path id="motionpath" d="M -416 0 0 0" />
            </defs>
            <g >
                <use xlinkHref="#wavepath" y="392" fill={color}>
                    <animateMotion
                        dur="5s"
                        repeatCount="indefinite">
                        <mpath xlinkHref="#motionpath" />
                    </animateMotion>
                </use>
            </g>
        </svg>
    );
}

export default WaveIcon;
