import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import NewsCard from "./components/NewsCard";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LargeCard from "./components/LargeCard";
import { Box, Grid } from "@mui/material";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import SmallCard from "./components/SmallCard";
import moment from "moment";

function App() {
  const [newsData, setNewsData] = useState([]); //state for New Post card
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [forecastData, setForecastData] = useState([]);
  const [singleWeatherInfo, setSingleWeatherInfo] = useState({});
  const [temp, setTemp] = useState("");
  const [breakingNews, setBreakingNews] = useState({});

  const date = new Date();
  const currentDate = moment(date).format("dddd Do MMMM YY");

  const upd = moment("2023-03-22T02:00:17Z", "YYYYMMDD").fromNow();
  console.log(upd);
  //Method to call 5-days weather forecasting
  const getForecastWeather = async () => {
    try {
      await axios
        .get(
          // `https://api.openweathermap.org/data/2.5/forecast/daily?lat=28.7041&lon=77.1025&cnt=5&appid=f79acf60c3b9e3c3813d102803adf2cc`
          `https://api.openweathermap.org/data/2.5/forecast?lat=28.7041&lon=77.1025&appid=f79acf60c3b9e3c3813d102803adf2cc`
        )
        .then((res) => {
          setForecastData(res?.data?.list);
          console.log(res?.data?.list);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //method to call for getting latest news article
  const getInitialNews = async () => {
    try {
      await axios
        .get(
          `https://newsapi.org/v2/everything?q=apple&pageSize=12&page=${page}&apiKey=75c3242fc219453f90bbf247d74e3943`
        )
        .then((res) => {
          setTotalRecords(res?.data?.totalResults);
          setNewsData(res?.data?.articles);
          setBreakingNews(res?.data?.articles[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInfiniteData = () => {
    setPage(page + 1);
    const getNewsAgain = async () => {
      try {
        await axios
          .get(
            `https://newsapi.org/v2/everything?q=apple&pageSize=16&page=${page}&apiKey=75c3242fc219453f90bbf247d74e3943`
          )
          .then((res) => {
            setTotalRecords(res?.data?.totalResults);
            setNewsData(newsData.concat(res?.data?.articles));
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getNewsAgain();
  };

  //Method for weather info
  const getSingleWeather = async () => {
    try {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=f79acf60c3b9e3c3813d102803adf2cc`
        )
        .then((res) => {
          setSingleWeatherInfo(res?.data);
          setTemp(Math.floor(res?.data?.main?.temp - 273.15));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInitialNews();
    getSingleWeather();
    getForecastWeather();
  }, []);

  return (
    <div className="App">
      <header className="sticky top-0 w-[100%] z-50 bg-white shadow-md py-3 px-32 md:px-32">
        <Navbar />
      </header>
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="relative pt-8 h-[480px] w-[100%] bg-white">
          <div className="flex relative items-center my-auto space-x-4 justify-between">
            <h2 className="w-[100%] text-4xl font-bold">Hot Topics</h2>
            <h2 className=" w-[100%] flex justify-end text-3xl font-normal">
              {currentDate}
            </h2>
          </div>
          <div className="bg-neutral-500 h-[390px] my-4">
            <div className="flex h-[390px]">
              <div className="grow bg-white">
                <LargeCard breakingNews={breakingNews}/>
              </div>
              <div className="w-64 p-4 bg-white">
                <Box
                  sx={{
                    p: 1,
                    bgcolor: "background.default",
                    display: "grid",
                    height: "80px",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <div>
                        <h2 className="text-start text-2xl font-semibold">
                          {temp} °C
                        </h2>
                        <h2 className="text-start text-gray-600">
                          {singleWeatherInfo?.name},{" "}
                          {singleWeatherInfo?.sys?.country}
                        </h2>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className="items-center">
                        <ThunderstormOutlinedIcon
                          fontSize="large"
                          sx={{ fontSize: "60px" }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
                <div className="sm:flex-row">
                  <SmallCard wname="Mon" temp="13` 11`" />
                  <SmallCard wname="Tue" temp="14` 10`" />
                  <SmallCard wname="Wed" temp="17` 14`" />
                  <SmallCard wname="Thu" temp="19` 17`" />
                  <SmallCard wname="Fri" temp="16` 12`" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-6 w-[100%] bg-white">
          <h2 className="text-2xl font-semibold pb-5">Latest News</h2>
          <InfiniteScroll
            dataLength={newsData.length} //This is important field to render the next data
            next={fetchInfiniteData}
            hasMore={true}
            loader={<h4>Please Wait, Data is Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <ul className="list-none flex flex-wrap justify-center">
              {newsData.map((item) => (
                <NewsCard newInfo={item} />
              ))}
            </ul>
          </InfiniteScroll>
        </section>
      </main>
    </div>
  );
}

export default App;
