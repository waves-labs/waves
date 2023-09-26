import React from "react";
import { css } from "@emotion/react";
import { a, config, useSpring } from "@react-spring/web";

export const LineLoader: React.FC = () => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { ...config.default, clamp: true },
  });

  return (
    <a.div
      // className="relative h-12 w-12"
      style={spring}
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        /* margin-left: 10%; */
        transform: translate(-50%, -50%);

        .dot {
          width: 24px;
          height: 24px;
          border-radius: 100%;
          display: inline-block;
          animation: slide 1s infinite;
        }
        .dot:nth-child(1) {
          animation-delay: 0.1s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.3s;
        }
        .dot:nth-child(4) {
          animation-delay: 0.4s;
        }
        .dot:nth-child(5) {
          animation-delay: 0.5s;
        }

        @-moz-keyframes slide {
          0% {
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(2);
          }
          100% {
            transform: scale(1);
          }
        }
        @-webkit-keyframes slide {
          0% {
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(2);
          }
          100% {
            transform: scale(1);
          }
        }
        @-o-keyframes slide {
          0% {
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(2);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes slide {
          0% {
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}
    >
      <div className="dot dark:bg-[#e9e3dd] bg-[#171d1d]"></div>
      <div className="dot dark:bg-[#e9e3dd] bg-[#171d1d]"></div>
      <div className="dot dark:bg-[#e9e3dd] bg-[#171d1d]"></div>
      <div className="dot dark:bg-[#e9e3dd] bg-[#171d1d]"></div>
      <div className="dot dark:bg-[#e9e3dd] bg-[#171d1d]"></div>
    </a.div>
  );
};
