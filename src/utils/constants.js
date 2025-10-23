export const weatherOptions = [
    {
        day: true,
        condition: "clear",
        url: new URL("../assets/day/clear.svg", import.meta.url).href,
    },
    {
        day: true,
        condition: "clouds",
        url: new URL("../assets/day/cloudy.svg", import.meta.url).href,
    },
    {
        day: true,
        condition: "fog",
        url: new URL("../assets/day/fogday.svg", import.meta.url).href,
    },
    {
        day: true,
        condition: "rain",
        url: new URL("../assets/day/rainday.svg", import.meta.url).href,
    },
    {
        day: true,
        condition: "snow",
        url: new URL("../assets/day/snowday.svg", import.meta.url).href,
    },
    {
        day: true,
        condition: "thunderstorm",
        url: new URL("../assets/day/stormday.svg", import.meta.url).href,
    },
    {
        day: false,
        condition: "clear",
        url: new URL("../assets/night/clearnight.svg", import.meta.url).href,
    },
    {
        day: false,
        condition: "clouds",
        url: new URL("../assets/night/cloudynight.svg", import.meta.url).href,
    },
    {
        day: false,
        condition: "fog",
        url: new URL("../assets/night/fognight.svg", import.meta.url).href,
    },
    {
        day: false,
        condition: "rain",
        url: new URL("../assets/night/rainnight.svg", import.meta.url).href,
    },
    {
        day: false,
        condition: "snow",
        url: new URL("../assets/night/snownight.svg", import.meta.url).href,
    },
    {
        day: false,
        condition: "thunderstorm",
        url: new URL("../assets/night/stormnight.svg", import.meta.url).href,
    },
];

export const defaultWeatherOptions = {
    day: {
        url: new URL("../assets/day/default.svg", import.meta.url).href,
    },
    night: {
        url: new URL("../assets/night/default.svg", import.meta.url).href,
    },
};

export const coordinates = {
    latitude: 39.952583,
    longitude: -75.165222,
}

export const apiKey = "51829f627a37d9058fac72440de050e5";