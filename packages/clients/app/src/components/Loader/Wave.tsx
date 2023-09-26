import React from "react";
import { a, config, useSpring } from "@react-spring/web";
import { css } from "@emotion/react";

export const WaveLoader: React.FC = () => {
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
        display: flex;
        /* height: 100vh;
        width: 100vw; */
        position: absolute;
        align-items: center;
        justify-content: center;

        @keyframes arrows {
          0%,
          100% {
            color: black;
            transform: translateY(0);
          }
          50% {
            /* color: #3ab493; */
            transform: translateY(20px);
          }
        }

        span {
          --delay: 0s;
          animation: arrows 1s var(--delay) infinite ease-in;
        }
      `}
    >
      <span className="dark:text-[#e9e3dd] text-[#171d1d] text-2xl">C</span>
      <span
        className="dark:text-[#e9e3dd] text-[#171d1d] text-2xl"
        style={{ "--delay": "0.1s" } as React.CSSProperties}
      >
        A
      </span>
      <span
        className="dark:text-[#e9e3dd] text-[#171d1d] text-2xl"
        style={{ "--delay": "0.3s" } as React.CSSProperties}
      >
        T
      </span>
      <span
        className="dark:text-[#e9e3dd] text-[#171d1d] text-2xl"
        style={{ "--delay": "0.4s" } as React.CSSProperties}
      >
        C
      </span>
      <span
        className="dark:text-[#e9e3dd] text-[#171d1d] text-2xl"
        style={{ "--delay": "0.5s" } as React.CSSProperties}
      >
        H
      </span>
      <span
        className="dark:text-[#e9e3dd] text-[#171d1d] text-2xl"
        style={{ "--delay": "0.6s" } as React.CSSProperties}
      >
        I
      </span>
      <span
        className="dark:text-[#e9e3dd] text-[#171d1d] text-2xl"
        style={{ "--delay": "0.7s" } as React.CSSProperties}
      >
        N
      </span>
      <span
        className="dark:text-[#e9e3dd] text-[#171d1d] text-2xl"
        style={{ "--delay": "0.8s" } as React.CSSProperties}
      >
        G
      </span>
    </a.div>
  );
};
