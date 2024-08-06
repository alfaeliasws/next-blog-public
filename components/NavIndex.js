import Logo from "./Logo";
import Nav from "./Nav";
import classNames from "classnames";
import { useState } from "react";

export default function NavIndex({ className }) {
  const [offCanvas, setOffCanvas] = useState(false);

  return (
    <div
      className={classNames(
        "flex bg-main-300 text-white text-xl text-center h-[120px] rounded-br-2xl rounded-bl-2xl shadow-skill",
        className,
      )}
    >
      <div className="w-2/12 pt-4">
        <Logo />
      </div>
      <div className="w-4/12"></div>
      <div className="lg:w-6/12 md:visible invisible">
        <Nav />
      </div>

      <div className="absolute md:hidden w-full top-12 right-8 flex justify-end">
        <img
          alt="Menu"
          src="/menu.svg"
          className="h-[25px]"
          onClick={() => setOffCanvas(true)}
        />
      </div>

      <div
        className={classNames(
          "fixed text-xl bg-main-200 z-10 top-0 h-full w-full md:hidden transition-all",
          offCanvas ? "right-0" : "-right-full",
        )}
      >
        <img
          alt="close"
          src="/x.svg"
          className="absolute top-10 right-10 bg-transparent"
          onClick={() => setOffCanvas(false)}
        />
        <div onClick={() => setOffCanvas(false)}>
          <Nav className="flex-col text-white space-y-8 justify-center pt-24" />
        </div>
      </div>
    </div>
  );
}

