import "./App.css";
import axios from "axios";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
////////////////////////react//////////////////////////////
import { useEffect, useState } from "react";
import dayjs from "dayjs";
/////////////////////////////mui////////////////////////////
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { red } from "@mui/material/colors";

///////////////////////////////transction//////////////////////////////
const transaction = {
  en: {
    checkCity: "check your city",
    language:'language',
    search: "search",
    loading: "Loading...",
    noData: "No data available for this city",
    max: "max",
    min: "min",
    humidity: "humidity",
    windSpeed: "wind speed",
  },
  fr: {
    checkCity: "vérifiez votre ville",
    language:'langue',
    search: "chercher",
    loading: "Chargement...",
    noData: "Aucune donnée disponible pour cette ville",
    max: "max",
    min: "min",
    humidity: "humidité",
    windSpeed: "vitesse du vent",
  },
  ar: {
    checkCity: "تحقق من مدينتك",
    language:'اللغة',
    search: "بحث",
    loading: "جار التحميل...",
    noData: "لا توجد بيانات متاحة لهذه المدينة",
    max: "الحد الأقصى",
    min: "الحد الأدنى",
    humidity: "الرطوبة",
    windSpeed: "سرعة الرياح",
  },
};

function App() {
  ///////////////////////reponsive design////////////////////////
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  ////////////////////apirequest////////////////////////
  const [data, setData] = useState(null);
  /////////////////////city input////////////////////////
  const [city, setCity] = useState("jijel");
  const [inputcity, setinputcity] = useState("");
  const [error, setError] = useState(null);
  const [fivedata, setfivedata] = useState(null);
  ///////////////////temps et date////////////////////////
  const time = dayjs().format("HH:mm A");
  const date = dayjs().format("DD/MM/YYYY");
  //////////////////////context////////////////////////

  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    setError(null);
    setData(null);
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: `${city}`,
          appid: "4a9c9127017821026e4045b30d94f318",
          units: "metric",
        },
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        setError(transaction[currentLanguage].noData);
      });
  }, [city, currentLanguage]);

  useEffect(() => {
    setError(null);
    setfivedata(null);
    axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: `${city}`,
          appid: "4a9c9127017821026e4045b30d94f318",
          units: "metric",
        },
      })
      .then(function (response) {
        setfivedata(response.data.list);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [city]);
  console.log(fivedata);
  // ////////////////////////////////////////////////////// jsx /////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          direction: currentLanguage === "ar" ? "rtl" : "ltr",
          overflow:'scroll',
          py:isMobile?10:0
        
        }}
      >
        {/* ******************************************************input******************************************************** */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap:isMobile? 2:3,
            width: isMobile ? "95%" : isTablet ? "70%" : "40%",
           
          }}
        >
          <TextField
            id="outlined-basic"
            label={transaction[currentLanguage].checkCity}
            variant="outlined"
            onChange={(e) => {
              setinputcity(e.target.value);
            }}
            sx={{ width: "50%", borderRadius: "10px" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              setCity(inputcity);
            }}
            sx={{ width: "10%", fontSize: "0.8rem" }}
          >
            {transaction[currentLanguage].search}
          </Button>
          <Box sx={{width:'35%'}}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">{transaction[currentLanguage].language}</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Age"
                value={currentLanguage}
                onChange={(e)=>{
                  setCurrentLanguage(e.target.value)
                }}
                
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={'en'}>en</MenuItem>
                <MenuItem value={'ar'}>ar</MenuItem>
                <MenuItem value={'fr'}>fr</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* **************************************************body**************************************************************************** */}
        <Box
          sx={{
            bgcolor: "rgb(255,255,255,0.5)",
            minHeight:isMobile?450: 350,
            width: isMobile ? "95%" : isTablet ? "70%" : "40%",
            borderRadius: "10px",
            mx: "auto",
          }}
        >
          {data ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Typography
                  variant={isMobile ? "h4" : "h4"}
                  sx={{
                    pt: 2,
                    pl: 1,
                    color: "GREY",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {city}
                </Typography>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{ color: "grey", pt: isMobile ? 3 : 3 }}
                >
                  {date}
                </Typography>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{ color: "grey", pt: isMobile ? 3 : 3 }}
                >
                  {time}
                </Typography>
              </Box>

              <hr style={{ color: "grey", margin: "10px 0" }} />

              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
                sx={{ mt: 2 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: isMobile
                        ? "space-evenly"
                        : "space-between",
                      alignItems: "center",
                      mt: isMobile ? 1 : 0,
                      width: isMobile ? "50%" : "40%",
                    }}
                  >
                    <Typography
                      variant={isMobile ? "h4" : "h2"}
                      sx={{ color: "grey" }}
                    >
                      {data.main.temp}°C
                    </Typography>
                    <Box>
                      <img
                        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                        alt="Weather icon"
                        style={{
                          height: "80px",
                          width: "80px",
                          transform: isMobile 
                            ? `translateX(${currentLanguage === "ar" ? "-20px" : "20px"})`
                            : `translateX(${currentLanguage === "ar" ? "-50px" : "50px"})`,

                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant={isMobile?'h5':'h3'} sx={{ mx:0.5}} color="grey">
                      {data.weather[0].description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Typography variant="h6" color="grey">
                        {transaction[currentLanguage].max}: {data.main.temp_max}°C
                      </Typography>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: "skyblue" }}
                      />
                      <Typography variant="h6" color="grey">
                        {transaction[currentLanguage].min}: {data.main.temp_min}°C
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" color="grey" sx={{ mt: 2 }}>
                        {transaction[currentLanguage].humidity}: {data.main.humidity}%
                      </Typography>
                      <Typography variant="h6" color="grey" sx={{ mt: 2 }}>
                        {transaction[currentLanguage].windSpeed}: {data.wind.speed} m/s
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <FilterDramaIcon
                    sx={{
                      height: "200px",
                      width: "150px",
                      color: "skyblue",
                      transform: "translateY(50px)",
                    }}
                  ></FilterDramaIcon>
                </Box>
              </Box>
            </>
          ) : (
            <Typography
              variant={isMobile ? "h5" : "h4"}
              textAlign={"center"}
              sx={{ pt: 19 }}
            >
              {error ? error : transaction[currentLanguage].loading}
            </Typography>
          )}
        </Box>

        {/********************************************** *le foooter********************************************* */}
        <Box
          sx={{
            bgcolor: "rgb(255,255,255,0.4)",
            width: isMobile ? "95%" : isTablet ? "70%" : "40%",
            borderRadius: "10px",
          }}
        >
          {fivedata ? (
            fivedata
              .filter((element, index) => index % 8 === 0)
              .map((item, index) => {
                return (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h6">
                        {item.dt_txt.split(" ")[0]}
                      </Typography>
                      <Typography variant="h6" color="white">
                        {item.main.temp}°C
                      </Typography>
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt="Weather icon"
                        style={{
                          height: "50px",
                          width: "50px",
                        }}
                      />
                    </Box>
                  </Box>
                );
              })
          ) : (
            <Typography
              variant={isMobile ? "h5" : "h4"}
              textAlign={"center"}
              sx={{ py: 2 }}
            >
              {error ? error : transaction[currentLanguage].loading}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
