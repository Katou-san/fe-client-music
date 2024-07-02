import React from "react";
const typeActive = "#37cdff";
function CompleteIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      width={w || 24}
      height={w || 24}
      fill={color || "green"}
    >
      <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z" />
    </svg>
  );
}

function ErrorIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={w || 24}
      height={w || 24}
      fill={color || "red"}
    >
      <path d="M8,16c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S12.411,16,8,16z M8,0.941C4.107,0.941,0.941,4.107,0.941,8  S4.107,15.059,8,15.059S15.059,11.893,15.059,8S11.893,0.941,8,0.941z" />
      <path d="M10.637,9.938c0.195,0.195,0.195,0.512-0.001,0.707l0,0c-0.195,0.195-0.512,0.194-0.707-0.001L5.363,6.062  C5.168,5.866,5.168,5.55,5.364,5.354l0,0C5.56,5.16,5.876,5.16,6.071,5.356L10.637,9.938z" />
      <path d="M5.363,9.938c-0.195,0.195-0.195,0.512,0.001,0.707l0,0c0.195,0.195,0.512,0.194,0.707-0.001l4.565-4.583  c0.195-0.196,0.195-0.512-0.001-0.708l0,0C10.439,5.16,10.124,5.16,9.929,5.356L5.363,9.938z" />
    </svg>
  );
}

function PlayIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      className="PlayIcon"
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 500 500"
    >
      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
    </svg>
  );
}

function PauseIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      className="PauseIcon"
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 500 500"
    >
      <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
    </svg>
  );
}

function ShuffleIcon({ w, color, active }: { w?: number, color?: string, active: boolean }) {
  return (
    <svg
      className="ShuffleIcon"
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      fill={active ? typeActive : color || "#fff"}
      viewBox="0 0 512 512"
    >
      <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" />
    </svg>
  );
}

function RepeatIcon({ w, color, active }: { w?: number, color?: string, active: boolean }) {
  return (
    <svg
      className="RepeatIcon"
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      fill={active ? typeActive : color || "#fff"}
      viewBox="0 0 512 512"
    >
      <path d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z" />
    </svg>
  );
}

function ForwardIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      className="ForwardIcon"
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 320 512"
    >
      <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" />
    </svg>
  );
}

function BackwardIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      className="BackwardIcon"
      xmlns="http://www.w3.org/2000/svg"
      width={w || 24}
      height={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 320 512"
    >
      <path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" />
    </svg>
  );
}

function VolumeIcon({ w, color, value }: { w?: number, color?: string, value: number }) {
  const volume_Off =
    "M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160H64c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64h67.8L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448V64z";
  const volume_Low =
    "M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z";
  const volume_Medium =
    "M 756 424 z M 473.1 107 c 43.2 35.2 70.9 88.9 70.9 149 s -27.7 113.8 -70.9 149 c -10.3 8.4 -25.4 6.8 -33.8 -3.5 s -6.8 -25.4 3.5 -33.8 C 475.3 341.3 496 301.1 496 256 s -20.7 -85.3 -53.2 -111.8 c -10.3 -8.4 -11.8 -23.5 -3.5 -33.8 s 23.5 -11.8 33.8 -3.5 z m -60.5 74.5 C 434.1 199.1 448 225.9 448 256 s -13.9 56.9 -35.4 74.5 c -10.3 8.4 -25.4 6.8 -33.8 -3.5 s -6.8 -25.4 3.5 -33.8 C 393.1 284.4 400 271 400 256 s -6.9 -28.4 -17.7 -37.3 c -10.3 -8.4 -11.8 -23.5 -3.5 -33.8 s 23.5 -11.8 33.8 -3.5 z M 301.1 34.8 C 312.6 40 320 51.4 320 64 V 448 c 0 12.6 -7.4 24 -18.9 29.2 s -25 3.1 -34.4 -5.3 L 131.8 352 H 64 c -35.3 0 -64 -28.7 -64 -64 V 224 c 0 -35.3 28.7 -64 64 -64 h 67.8 L 266.7 40.1 c 9.4 -8.4 22.9 -10.4 34.4 -5.3 ";
  const volume_Hight =
    "M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || 45}
      height={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 320 512"
    >
      <path
        d={
          value <= 0
            ? volume_Off
            : value > 0 && value < 50
              ? volume_Low
              : value > 50 && value < 100
                ? volume_Medium
                : volume_Hight
        }
      />
    </svg>
  );
}

function HomeIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 576 512"
    >
      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
    </svg>
  );
}

function RecommedIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 448 512"
    >
      <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
    </svg>
  );
}

function MoonIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 384 512"
    >
      <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
    </svg>
  );
}

function AIIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 448 512"
    >
      <path d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z" />
    </svg>
  );
}

function UserIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 448 512"
    >
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
    </svg>
  );
}

function ImageIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 512 512"
    >
      <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
    </svg>
  );
}

function LikeIcon({ w, color, active }: { w?: number, color?: string, active: boolean }) {
  const liked =
    "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z";
  const like =
    "M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 512 512"
    >
      <path d={active ? liked : like} />
    </svg>
  );
}

function AIIcon2({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 512 512"
      id="icons"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M208,512a24.84,24.84,0,0,1-23.34-16l-39.84-103.6a16.06,16.06,0,0,0-9.19-9.19L32,343.34a25,25,0,0,1,0-46.68l103.6-39.84a16.06,16.06,0,0,0,9.19-9.19L184.66,144a25,25,0,0,1,46.68,0l39.84,103.6a16.06,16.06,0,0,0,9.19,9.19l103,39.63A25.49,25.49,0,0,1,400,320.52a24.82,24.82,0,0,1-16,22.82l-103.6,39.84a16.06,16.06,0,0,0-9.19,9.19L231.34,496A24.84,24.84,0,0,1,208,512Zm66.85-254.84h0Z" />
      <path d="M88,176a14.67,14.67,0,0,1-13.69-9.4L57.45,122.76a7.28,7.28,0,0,0-4.21-4.21L9.4,101.69a14.67,14.67,0,0,1,0-27.38L53.24,57.45a7.31,7.31,0,0,0,4.21-4.21L74.16,9.79A15,15,0,0,1,86.23.11,14.67,14.67,0,0,1,101.69,9.4l16.86,43.84a7.31,7.31,0,0,0,4.21,4.21L166.6,74.31a14.67,14.67,0,0,1,0,27.38l-43.84,16.86a7.28,7.28,0,0,0-4.21,4.21L101.69,166.6A14.67,14.67,0,0,1,88,176Z" />
      <path d="M400,256a16,16,0,0,1-14.93-10.26l-22.84-59.37a8,8,0,0,0-4.6-4.6l-59.37-22.84a16,16,0,0,1,0-29.86l59.37-22.84a8,8,0,0,0,4.6-4.6L384.9,42.68a16.45,16.45,0,0,1,13.17-10.57,16,16,0,0,1,16.86,10.15l22.84,59.37a8,8,0,0,0,4.6,4.6l59.37,22.84a16,16,0,0,1,0,29.86l-59.37,22.84a8,8,0,0,0-4.6,4.6l-22.84,59.37A16,16,0,0,1,400,256Z" />
    </svg>
  );
}

function SunIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256,118a22,22,0,0,1-22-22V48a22,22,0,0,1,44,0V96A22,22,0,0,1,256,118Z" />
      <path d="M256,486a22,22,0,0,1-22-22V416a22,22,0,0,1,44,0v48A22,22,0,0,1,256,486Z" />
      <path d="M369.14,164.86a22,22,0,0,1-15.56-37.55l33.94-33.94a22,22,0,0,1,31.11,31.11l-33.94,33.94A21.93,21.93,0,0,1,369.14,164.86Z" />
      <path d="M108.92,425.08a22,22,0,0,1-15.55-37.56l33.94-33.94a22,22,0,1,1,31.11,31.11l-33.94,33.94A21.94,21.94,0,0,1,108.92,425.08Z" />
      <path d="M464,278H416a22,22,0,0,1,0-44h48a22,22,0,0,1,0,44Z" />
      <path d="M96,278H48a22,22,0,0,1,0-44H96a22,22,0,0,1,0,44Z" />
      <path d="M403.08,425.08a21.94,21.94,0,0,1-15.56-6.45l-33.94-33.94a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.55,37.56Z" />
      <path d="M142.86,164.86a21.89,21.89,0,0,1-15.55-6.44L93.37,124.48a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.56,37.55Z" />
      <path d="M256,358A102,102,0,1,1,358,256,102.12,102.12,0,0,1,256,358Z" />
    </svg>
  );
}

function AddIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 448 512"
    >
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  );
}

function CloseIcon({ w = 24, color = "#fff" }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 512 512"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
    </svg>
  );
}

function ArrowRightIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 320 512"
    >
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
}

function ArrowLeftIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 320 512"
    >
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  );
}

function ListMusicIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-list-music"
    >
      <path d="M21 15V6" />
      <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M12 12H3" />
      <path d="M16 6H3" />
      <path d="M12 18H3" />
    </svg>
  );
}

function AddListMusicIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-list-plus"
    >
      <path d="M11 12H3" />
      <path d="M16 6H3" />
      <path d="M16 18H3" />
      <path d="M18 9v6" />
      <path d="M21 12h-6" />
    </svg>
  );
}

function AudioLineIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 24 24"
      stroke={color || "#fff"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-audio-lines"
      id="audio-lines"
    >
      <path d="M2 10v3" />
      <path d="M6 6v11" />
      <path d="M10 3v18" />
      <path d="M14 8v7" />
      <path d="M18 5v13" />
      <path d="M22 10v3" />
    </svg>
  );
}

function SearchIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ChangeAccountIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "#fff"}
      viewBox="0 0 512 512"
    >
      <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
    </svg>
  );
}

function SettingIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "transparent"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-bolt Lucide"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function AddSongIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      width={w || 24}
      fill={color || "transparent"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-plus-circle Lucide"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

function LogoutIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      fill={color || "#fff"}
      width={w || 24}
      viewBox="0 0 512 512"
    >
      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
    </svg>
  );
}
function MoreIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      fill={color || "#fff"}
      width={w || 24}
      viewBox="0 0 128 512"
    >
      <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
    </svg>
  );
}

function CheckIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      fill={color || "#fff"}
      width={w || 24}
      viewBox="0 0 448 512"
    >
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  );
}
function FailIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      fill={color || "#fff"}
      width={w || 24}
      viewBox="0 0 384 512"
    >
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
  );
}

function ViewIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      fill={color || "#fff"}
      width={w || 24}
      viewBox="0 0 512 512"
    >
      <path d="M320 64A64 64 0 1 0 192 64a64 64 0 1 0 128 0zm-96 96c-35.3 0-64 28.7-64 64v48c0 17.7 14.3 32 32 32h1.8l11.1 99.5c1.8 16.2 15.5 28.5 31.8 28.5h38.7c16.3 0 30-12.3 31.8-28.5L318.2 304H320c17.7 0 32-14.3 32-32V224c0-35.3-28.7-64-64-64H224zM132.3 394.2c13-2.4 21.7-14.9 19.3-27.9s-14.9-21.7-27.9-19.3c-32.4 5.9-60.9 14.2-82 24.8c-10.5 5.3-20.3 11.7-27.8 19.6C6.4 399.5 0 410.5 0 424c0 21.4 15.5 36.1 29.1 45c14.7 9.6 34.3 17.3 56.4 23.4C130.2 504.7 190.4 512 256 512s125.8-7.3 170.4-19.6c22.1-6.1 41.8-13.8 56.4-23.4c13.7-8.9 29.1-23.6 29.1-45c0-13.5-6.4-24.5-14-32.6c-7.5-7.9-17.3-14.3-27.8-19.6c-21-10.6-49.5-18.9-82-24.8c-13-2.4-25.5 6.3-27.9 19.3s6.3 25.5 19.3 27.9c30.2 5.5 53.7 12.8 69 20.5c3.2 1.6 5.8 3.1 7.9 4.5c3.6 2.4 3.6 7.2 0 9.6c-8.8 5.7-23.1 11.8-43 17.3C374.3 457 318.5 464 256 464s-118.3-7-157.7-17.9c-19.9-5.5-34.2-11.6-43-17.3c-3.6-2.4-3.6-7.2 0-9.6c2.1-1.4 4.8-2.9 7.9-4.5c15.3-7.7 38.8-14.9 69-20.5z" />
    </svg>
  );
}

function MinusIcon({ w, color }: { w?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={w || 24}
      fill={color || "#fff"}
      width={w || 24}
      viewBox="0 0 448 512"
    >
      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
    </svg>
  );
}

function SlidersIcon({ w = 24, color = "#fff" }: { w?: number, color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={w}
      width={w}
      fill={color}
      viewBox="0 0 512 512">
      <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" /></svg>
  )
}

function ChartIcon({ w = 24, color = "#fff" }: { w?: number, color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={w}
      width={w}
      fill={color}
      viewBox="0 0 448 512">
      <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" /></svg>
  )
}

function PiedIcon({ w = 24, color = "#fff" }: { w?: number, color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={w}
      width={w}
      fill={color}
      viewBox="0 0 480 512">
      <path d="M455.9 23.2C429.2 30 387.8 51.7 341.4 90.7A206 206 0 0 0 240 64C125.1 64 32 157.1 32 272s93.1 208 208 208 208-93.1 208-208a207.3 207.3 0 0 0 -58.8-144.8 155.4 155.4 0 0 0 -17 27.4A176.2 176.2 0 0 1 417.1 272c0 97.7-79.4 177.1-177.1 177.1a175.8 175.8 0 0 1 -87.6-23.4c82.9-107.3 150.8-37.8 184.3-226.7 5.8-32.6 28-94.3 126.2-160.2C471 33.5 465.4 20.8 455.9 23.2zM125 406.4A176.7 176.7 0 0 1 62.9 272C62.9 174.3 142.4 94.9 240 94.9a174 174 0 0 1 76.6 17.8C250.6 174.8 189.8 265.5 125 406.4z" /></svg>
  )
}

function BellIcon({ w = 24, color = "#fff" }: { w?: number, color?: string }) {
  return (<svg xmlns="http://www.w3.org/2000/svg"
    height={w}
    width={w}
    fill={color}
    viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg>
  )
}

const EditIcon = (props: { props?: any }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

const DeleteIcon = (props: { props?: any }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);


const EyeIcon = (props: { props?: any }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

function PlusIcon({ size = 24, width, height, ...props }: { props?: any, size?: any, width?: any, height?: any }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  )
}

export {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  EyeIcon,
  CompleteIcon,
  ErrorIcon,
  PlayIcon,
  PauseIcon,
  ShuffleIcon,
  RepeatIcon,
  ForwardIcon,
  BackwardIcon,
  VolumeIcon,
  HomeIcon,
  RecommedIcon,
  AIIcon,
  AIIcon2,
  MoonIcon,
  UserIcon,
  ImageIcon,
  LikeIcon,
  SunIcon,
  AddIcon,
  CloseIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ListMusicIcon,
  AddListMusicIcon,
  AudioLineIcon,
  SearchIcon,
  ChangeAccountIcon,
  SettingIcon,
  AddSongIcon,
  LogoutIcon,
  MoreIcon,
  CheckIcon,
  FailIcon,
  ViewIcon,
  MinusIcon,
  SlidersIcon,
  ChartIcon,
  PiedIcon,
  BellIcon
};
