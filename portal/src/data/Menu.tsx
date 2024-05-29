import task from "../assets/menu/task.svg";
import grid from "../assets/menu/grid-8.svg";
import settings from "../assets/menu/settings.svg";

export const Menu = [
  {
    text: "Tasks Management",
    route: "/",
    icon: grid,
  },
  {
    text: "Simultaneous Tasks",
    route: "simultaneous",
    icon: task,
  },
  {
    text: "User Management",
    route: "settings",
    icon: settings,
  },
];
