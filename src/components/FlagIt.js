import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  InputLabel,
  Select,
  FormControl,
  MenuItem
} from "@mui/material";

const FlagIt = () => {
  const [region, setRegion] = useState('americas');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getCountryInfo() {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
        const data = await response.data;
        //sort alphabetically by country name
        const countriesData = data.sort((a, b) =>{
          return a.name.common > b.name.common ? 1 : -1;
        });
        setCountries(countriesData);
      } catch (error) {
        console.log(error);
      }
    }
    getCountryInfo();
  }, [region]);

  const handleSelectChange = (event) =>{
    setRegion(event.target.value);
  }

  return (
    <>
    <Box
    component="form"
    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },mb: 5}}
    noValidate
    autoComplete="off">
      <FormControl>
        <InputLabel id="region-select-label">Region</InputLabel>
        <Select
        labelId="region-select-label"
        id="region-select"
        value={region}
        label="Region"
        onChange={handleSelectChange}>
          <MenuItem value="africa">Africa</MenuItem>
          <MenuItem value="americas">Americas</MenuItem>
          <MenuItem value="asia">Asia</MenuItem>
          <MenuItem value="europe">Europe</MenuItem>
          <MenuItem value="oceania">Oceania</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Grid container spacing={4}>
      {countries.map((country, i) => {
        return (
          <Grid item xs={3} key={country.altSpellings[0]}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={country.flags.png}
                alt={country.name.official}
                height="200"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {country.name.common}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Capital: </strong>
                  {country.capital}
                  <br />
                  <strong>Region: </strong>
                  {country.subregion}, {country.region}
                  <br />
                  <strong>Population: </strong>
                  {country.population.toLocaleString("en-US")}
                  <br />
                  <strong>Area: </strong>
                  {country.area.toLocaleString("en-US")} km<sup>2</sup>
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
    </>
  );
};

export default FlagIt;
