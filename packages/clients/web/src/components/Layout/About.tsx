import { RC as CloseIcon } from "../../assets/close.svg";

interface AboutProps {}

export const About: React.FC<AboutProps> = () => {
  return (
    <dialog id="about" className="modal backdrop-brightness-[12%]">
      <CloseIcon
        // @ts-ignore
        onClick={() => document.getElementById("about").close()}
        className="sm:hidden absolute top-4 z-50 right-6 cursor-pointer"
      />
      <form
        method="dialog"
        className="modal-box shadow-none bg-transparent text-white max-w-prose"
      >
        <h3 className="text-3xl sm:text-4xl uppercase tracking-widest mb-3">
          About
        </h3>
        <p className="py-4 text-base xs:text-lg sm:text-xl tracking-wide">
          Synesthesia is a creative platform centered around generative art.
          <br />
          <br />
          Through this genesis collection, we plan to demonstrate the potential
          for collectors and artists of all kinds to share in experiences never
          before seen in Web3. A collector can connect their wallet, receive a
          visual synthesis of their NFT collection and then use this collection
          as input to create beautiful, unique generative art.
          <br />
          <br />
          Built by creatives, for creatives, Synesthesia seeks to spark
          inspiration across digital art forms by using generative art on the
          blockchain for true collector collaboration.
        </p>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button />
      </form>
    </dialog>
  );
};
