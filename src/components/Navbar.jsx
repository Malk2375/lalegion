import React from 'react'
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useState } from "react";
import Logo from "../Assets/FRANCE_JUDO_LOGOTYPE_RVB_PRINCIPAL-BLEU 2_layerstyle.png"
import Burger from "../Assets/Group973.png"
import { motion } from "framer-motion";
import {Link} from "react-router-dom"


const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];
  return (
    <nav className='nav-logo-container'>
      <div className="nav-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <motion.svg
      className="svg-container"
        width="150"
        height="150"
        viewBox="0 0 700 800"
        initial="hidden"
        animate="visible"
      >
        {/* Anneau bleu */}
        <motion.circle
          cx="200"
          cy="300"
          r="80"
          stroke="#0099ff" // Bleu
          variants={draw}
          custom={1}
        />
        {/* Anneau noir */}
        <motion.circle
          cx="300"
          cy="400"
          r="80"
          stroke="#000000" // Noir
          variants={draw}
          custom={2}
        />
        {/* Anneau rouge */}
        <motion.circle
          cx="400"
          cy="300"
          r="80"
          stroke="#ff0000" // Rouge
          variants={draw}
          custom={3}
        />
        {/* Anneau jaune */}
        <motion.circle
          cx="500"
          cy="400"
          r="80"
          stroke="#ffff00" // Jaune
          variants={draw}
          custom={4}
        />
        {/* Anneau vert */}
        <motion.circle
          cx="600"
          cy="300"
          r="80"
          stroke="#00ff00" // Vert
          variants={draw}
          custom={5}
        />
      </motion.svg>
      <div className="navbar-links-container">
        <div className="navbar-menu-container">
          <Link to="/login">
          <button className='Connexion'></button>
          </Link>
        </div>
      </div>

    </nav>
  )
}

export default Navbar