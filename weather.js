function getWeatherSymbol(weather) {
    if (weather === 'rainy') {
        return '🌧️';
    } else if (weather === 'sunny') {
        return '☀️';
    } else {
        return '';
    }
}

function randomWeather() {
    return Math.random() < 0.5 ? "sunny" : "rainy";
}

function nextWeather(weather) {
    const transitionProb = 0.2;
    if (Math.random() < transitionProb) {
        return weather === "sunny" ? "rainy" : "sunny";
    }
    return weather;
}
