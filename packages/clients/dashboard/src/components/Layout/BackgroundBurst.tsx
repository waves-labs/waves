import { css } from "@emotion/react";

interface BackgroundBurstProps {
  color?: string;
}

export const BackgroundBurst: React.FC<BackgroundBurstProps> = ({ color }) => {
  return (
    <div
      css={css`
        background-color: ${color ? color : "#efe9e4"};
        border-radius: 620px;
        transform: translateX(-50%);
        filter: blur(180px);
        max-width: 32rem;
      `}
      className="absolute -top-36 left-1/2 z-[1] w-2/5 aspect-[5/3]"
    />
  );
};
