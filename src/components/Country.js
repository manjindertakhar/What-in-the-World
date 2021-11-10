import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Box, Typography } from "@mui/material";

const Country = ({ queryCountry }) => {
  const today = new Date();
  const [countryNames, setCountryNames] = useState({});
  const [countryTimezone, setCountryTimezone] = useState({});
  const [countryCurrency, setCountryCurrency] = useState({});
  const [countryLanguages, setCountryLanguages] = useState({});
  const [countryWaterDetails, setCountryWaterDetails] = useState({});
  const [countryTravelAdvise, setTravelCountryAdvise] = useState({});

  //GET COUNTRY DATA FROM API
  useEffect(() => {
    async function getCountryData() {
      try {
        const response = await axios.get(
          `https://travelbriefing.org/${queryCountry}?format=json`
        );

        const data = await response.data;
        //update state values
        setCountryNames(data.names);
        setCountryTimezone(data.timezone);
        setCountryCurrency(data.currency);
        setCountryWaterDetails(data.water);
        setTravelCountryAdvise(data.advise);
        setCountryLanguages(data.language);
      } catch (error) {
        console.log(error);
      }
    }
    getCountryData();
  }, [queryCountry]);

  let langAppend = "";
  let showLang = false;
  let languages = "";

  if (Object.keys(countryLanguages)?.length > 0) {
    showLang = true;
    if (Object.keys(countryLanguages)?.length > 1) {
      langAppend = "s";
    }

    //get all languages
    let prependLang = "";
    languages = countryLanguages.map((lang, i) => {
      if (countryLanguages.length > 1) {
        if (countryLanguages.length - 1 === i) {
          prependLang = " and ";
        } else if (i !== 0) {
          prependLang = ", ";
        }
      }
      return prependLang + lang.language;
    });
  }

  const travelAdvise = Object.entries(countryTravelAdvise).map(([key, adv]) => {
    //remove comments in string
    adv.advise = adv.advise.replace(/<!--[\s\S]*?-->/g, "");
    return (
      <li key={key}>
        <strong>{key}:</strong> {adv.advise}
      </li>
    );
  });

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", p: 2 }}>
        <Typography variant="h2" sx={{ fontSize: "h4.fontSize" }}>
          {countryNames.name}
        </Typography>
        <Typography variant="overline" gutterBottom>
          {countryNames.full !== countryNames.name ? countryNames.full : ""}
        </Typography>
      </Box>
      <CardContent>
        <ul>
          <li>
            <strong>Timezone: </strong>
            {countryTimezone.name}
            <br />
            {today.toLocaleString("en-US", {
              timeZone: countryTimezone.name,
              timeZoneName: "short",
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </li>
          <li>
            <strong>Currency: </strong>
            {countryCurrency.name}
            {countryCurrency.code ? " (" + countryCurrency.code + ")" : ""}
          </li>
          {
          showLang ?
            <li>
              <strong>Language{langAppend}: </strong>{languages}.
            </li> : ""
          }
          {
            countryWaterDetails.short ? <li>Drinking tap water is {countryWaterDetails.short}.</li> : ""
          }
        </ul>

        {
          travelAdvise.length > 0 ?
            <>
              <h4>Travel Advise</h4>
              <ul>{travelAdvise}</ul>
            </> :  ""
        }
      </CardContent>
    </Card>
  );
};

export default Country;
