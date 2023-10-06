import React from "react";
import { a, useSpring } from "@react-spring/web";
import { RC as TwitterIcon } from "../../assets/twitter.svg";

const url =
  "https://house.us21.list-manage.com/subscribe/post-json?u=f9cd12d07ddbdbe80d68c3e28&amp;id=792284a5e1&amp&c=1;f_id=00ddeae6f0";

export const OnlyMobile: React.FC = () => {
  const contentSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1200,
    config: { friction: 120, tension: 240 },
  });

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    console.log(email);

    fetch(url + "&" + formData, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "default",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["result"] !== "success") {
          // ERROR
          console.log(data["msg"]);
        } else {
          // SUCCESS - Show notification
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <a.div
      // style={backgroundSpring}
      className="grid place-items-center w-screen h-screen text-center z-10"
    >
      <div className="fixed top-0 left-0 flex justify-end w-full py-3 items-center px-6">
        <a
          className="w-10 h-10 flex justify-end items-center"
          href="https://twitter.com/waves_house"
          target="_blank"
        >
          <TwitterIcon
            className={`fill-black cursor-pointer opacity-80 hover:opacity-100 transform-gpu transition-opacity duration-200 ease-in-out`}
            height={30}
            width={30}
          />
        </a>
      </div>
      <a.div style={contentSpring} className="flex flex-col gap-12">
        <div className="justify-self-start flex flex-col gap-2">
          <h1 className="text-9xl font-bold leading-[6rem]">WAVES</h1>
          <p className="text-4xl tracking-wider">
            Fusing Generative Art & Live Culture.
          </p>
        </div>
        <p className="text-2xl font-normal tracking-wide">
          More info coming soon, stay updated
          {/* 📲 Visit <span className="font-bold">app.waves.house</span> on phone
          to install app */}
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col gap-2 justify-self-start"
        >
          <input
            className="w-96 h-14 px-4 py-2 rounded-md bg-gray-100"
            name="email"
            type="email"
            placeholder="Your email"
          />
          <button
            className="w-96 h-14 px-4 py-2 rounded-md bg-black text-white font-bold"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </a.div>
    </a.div>
  );
};