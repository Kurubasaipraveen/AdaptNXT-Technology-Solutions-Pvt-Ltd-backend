const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())

const API_KEY = '424c22e3ccea1bb8cfc19290a9d937fa';

app.get('/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = response.data;

        res.json({
            name: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            weather: data.weather[0].main,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        });
    } catch (error) {
        res.status(500).json({ error: 'Provide city,Zip code not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
