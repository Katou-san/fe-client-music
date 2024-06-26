import React from "react";
import ".scss/Loading.scss";
function LoadingSVG1({ w, color }: { w: number, color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554l-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172l3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742l.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22z"
      />
    </svg>
  );
}

function LoadingSVG({ w, color }: { w: number, color: string }) {
  return (
    <div className="loader triangle">
      <svg
        width={w || 24}
        height={w || 24}
        fill={color || "#fff"}
        className="SVGLoading"
        viewBox="0 0 86 80"
        xmlns="http://www.w3.org/2000/svg"
        stroke={color || "#fff"}
      >
        <polygon points="43 8 79 72 7 72" />
      </svg>
    </div>
  );
}

function LoadingSVGChanging({ w, color }: { w: number, color: string }) {
  return (
    <svg
      version="1.1"
      id="L3"
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
    >
      <circle
        fill="none"
        stroke={color || "#fff"}
        strokeWidth="4"
        cx="50"
        cy="50"
        r="44"
        style={{ opacity: 1 }}
      />
      <circle fill="#fff" stroke="#e74c3c" strokeWidth="3" cx="8" cy="54" r="6">
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function LoadingSVGWatting({ w, color, strokeWidth }: { w: number, color: string, strokeWidth: number }) {
  return (
    <svg
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      strokeWidth={strokeWidth || 24}
    >
      <path
        fill={color || "#fff"}
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export { LoadingSVGWatting, LoadingSVG1, LoadingSVG, LoadingSVGChanging };
