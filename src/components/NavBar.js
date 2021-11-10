import React, { useState } from "react";
import { Box, AppBar, Tabs, Tab, Typography } from "@mui/material";
import worldLogo from "../world-logo.svg";
import {Link as RouterLink} from "react-router-dom";

const NavBar = () => {
  const [navValue, setNavValue] = useState(0);

  const handleChange = (event, newNavValue) => {
    setNavValue(newNavValue);
  };

  return (
    <AppBar position="fixed" sx={{color: "#fff" }}>
      <Box display="flex" sx={{ alignItems: "center", p: 2 }}>
      <img src={worldLogo} width="40px" alt="What in the world" />
        <Typography
          variant="h5"
          component="h1"
          sx={{ flexGrow: 1, ml: 2}}
        >
          What in the World
        </Typography>
        <Tabs value={navValue} onChange={handleChange} aria-label="Menu" textColor="inherit"
        indicatorColor="secondary">
          {
          /* 
          Orginal way of implementing react router
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/flagit">flagit</RouterLink> */
          }
          <Tab label="Map It" to="/" component={RouterLink} />
          <Tab label="Flag It" to="/flagit" component={RouterLink} />
        </Tabs>
      </Box>
    </AppBar>
  );
};

export default NavBar;
