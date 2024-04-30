import { useEffect, useState } from "react";
import { Menu } from "../data/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAuth } from "../store/slices/authSlice";
import { resetSchedule } from "../store/slices/scheduleSlice";

export default function Sidebar({ activeRoute }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeMenuRoute, setActiveMenu] = useState(activeRoute);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const segments = currentPath.split("/");
    const lastSegment =
      segments[segments.length - 1] === activeRoute
        ? "/" + activeRoute
        : segments[segments.length - 1];
    setActiveMenu(lastSegment);
  }, []);

  const logout = () => {
    dispatch(resetSchedule());
    dispatch(resetAuth());
    navigate("/");
  };

  return (
    <aside className="w-[18.75rem] flex-none dark:bg-dark-grey h-full py-6 pr-6">
      {Menu.map((item: any, index: number) => {
        const isActive = item.route === activeMenuRoute;
        return (
          <Link
            key={index}
            to={item.route}
            onClick={() => setActiveMenu(item.route)}
          >
            <div
              className={`${
                isActive
                  ? "rounded-tr-full rounded-br-full bg-blue-500 text-white"
                  : "text-black"
              } cursor-pointer flex items-center 
                  space-x-2 pl-[2.12rem] py-3 pb-3`}
            >
              <img src={item.icon} className="w-[2vw] h-auto" alt="" />
              <p className="text-lg capitalize">{item.text}</p>
            </div>
          </Link>
        );
      })}
      <div
        className="cursor-pointer flex items-center text-black space-x-2 pl-[4rem] p-3"
        onClick={logout}
      >
        <p className="text-lg text-red-400 hover:text-red-800">Logout</p>
      </div>
    </aside>
  );
}
