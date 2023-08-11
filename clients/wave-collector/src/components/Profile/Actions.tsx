import { themes, useApp } from "../../hooks/useApp";
import { useWeb3 } from "../../hooks/useWeb3";

import { Button } from "../Button";

interface ProfileActionsProps {}

// TODO: Polish styles to match designs

export const ProfileActions: React.FC<ProfileActionsProps> = () => {
  const { address, error, login, logout } = useWeb3();
  const { theme, toggleTheme, handlseSetTheme } = useApp();

  return (
    <div className="flex flex-col gap-3 items-center mt-16">
      <div className="shadow-lg bg-base-100 px-3 py-6 rounded-xl w-full gap-3 flex flex-col max-w-xs">
        <h3 className="mb-3 font-bold text-2xl">Wallet</h3>
        <Button
          title={address ? "Disconnect" : "Connect"}
          onClick={address ? logout : login}
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="shadow-lg bg-base-100 px-3 py-6 rounded-xl w-full gap-3 flex flex-col max-w-xs">
        <h3 className="mb-3 font-bold text-2xl">Theme</h3>
        <select
          className="select select-primary w-full"
          value={theme}
          onChange={handlseSetTheme}
        >
          {themes.map((theme) => (
            <option key={theme} value={theme} className="capitalize">
              {theme.toUpperCase()}
            </option>
          ))}
        </select>
        <label className=" label w-full">
          <span className="label-text text-xl font-semibold">
            Enable Dark Mode
          </span>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-lg"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
        </label>
      </div>
    </div>
  );
};
