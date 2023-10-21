import React from "react";
import Logo from "../../images/Nxtpasslogo.png";
import "./SideBar.css";
import {
  AiOutlineHistory,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {
  MdOutlineViewTimeline,
  MdOutlineDashboard,
  MdOutlineDirectionsBus,
} from "react-icons/md";
import { BiStats } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

const SideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "",
      icon: <MdOutlineDashboard className="fs-4" />,
      label: "Dashboard",
    },
    {
      key: "travel-history",
      icon: <AiOutlineHistory className="fs-4" />,
      label: "Travel History",
    },
    {
      key: "bus-timetable",
      icon: <MdOutlineViewTimeline className="fs-4" />,
      label: "Bus Timetable",
    },
    {
      key: "assign-busses",
      icon: <MdOutlineDirectionsBus className="fs-4" />,
      label: "Assign Buses",
    },
    {
      key: "assign-inspectors",
      icon: <AiOutlineUserAdd className="fs-4" />,
      label: "Assign Inspectors",
    },
    {
      key: "fare-rates",
      icon: <BiStats className="fs-4" />,
      label: "Fare Rates",
    },
    {
      key: "reports",
      icon: <HiOutlineDocumentReport className="fs-4" />,
      label: "Reports",
    },
    {
      key: "settings",
      icon: <AiOutlineSetting className="fs-4" />,
      label: "Settings",
    },
    {
      key: "signout",
      icon: <AiOutlineLogout className="fs-4" />,
      label: "Logout",
    },
  ];

  return (
    <div className="sidebar">
      <img
        src={Logo}
        alt="Logo"
        style={{
          width: "15.5rem",
          marginRight: "0.6rem",
          marginBottom: "0.2rem",
        }}
      />
      <Menu mode="inline" defaultSelectedKeys={[""]} className="my-custom-menu">
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className="my-custom-menu-item"
            onClick={() => {
              if (item.key === "signout") {
                // Perform your logout operation here
              } else {
                navigate(`/dashboard/${item.key}`);
              }
            }}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default SideBar;
