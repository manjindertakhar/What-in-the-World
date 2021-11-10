import React, { useState } from "react";
import { CountriesSVGPaths } from "./CountriesSVGPaths";
import Country from "./Country";
import { Grid, Tooltip } from "@mui/material";

const WorldMap = ({ color }) => {
  const [queryCountry, setQueryCountry] = useState("canada");

  //get country id on click
  function handleClick(event) {
    setQueryCountry(event.target.getAttribute("name"));
  }

  const countries = CountriesSVGPaths.map((country) => {
    return (
      <Tooltip title={country.name} key={country.id} arrow placement="top">
      <path
        d={country.svgpath}
        name={country.name}
        id={country.id}
        onClick={handleClick}
      />
      </Tooltip>
    );
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <svg id="worldMap" xmlns="http://www.w3.org/2000/svg" width="1010" height="666" fill={color}>
          {countries}
        </svg>
      </Grid>
      <Grid item xs={3}>
        <Country queryCountry={queryCountry} />
      </Grid>
    </Grid>
  );
};
export default WorldMap;
