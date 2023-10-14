import { css } from "@emotion/react";
import { a } from "@react-spring/web";

const Views = () => {
  return (
    <a.main
      className={`relative h-[calc(100svh+4rem)] py-4 sm:py-16 md:py-24`}
      css={css`
        background: linear-gradient(
          151deg,
          #e9e3dd 10.39%,
          #b2a79e 56.43%,
          #d6d0cb 100%
        );
      `}
    >
      <div className="relative h-full z-10 py-8 px-6 md:px-12 sm:px-8 max-w-screen-xl sm:mx-auto flex flex-col sm:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-24"></div>
    </a.main>
  );
};

export default Views;
