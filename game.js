const game = {
    laps: 15,
    currentLap: 0,
    weather: "sunny",
    tyre: "hard",
    tyreChangeTime: 5,
    pit: false,
    trackRadius: 120,
    trackCenter: { x: 150, y: 150 },
    intervalDuration: (2 * 1000) / 15, // 2 seconds per lap, in milliseconds
    carElement: null,
    trackPath: null,
    pathLength: 0,
    table: null,
    racetime: 0,

    init() {
        this.currentLap = 0;
        this.weather = randomWeather();
        this.tyre = "hard";
        this.pit = false;
        this.carElement = document.getElementById("car");
        this.trackPath = document.getElementById("silverstonePath");
        this.pathLength = this.trackPath.getTotalLength();
        this.startRace();
        this.table = document.querySelector('table');
    },

    logRaceInfo(message) {
        const raceLog = document.getElementById("raceLog");
        const logMessage = document.createElement("p");
        logMessage.innerText = ">>> " +  message;
        raceLog.appendChild(logMessage);
        logMessage.scrollIntoView({ behavior: "smooth", block: "end" });
    },

    pitStopTime() {
        const baseTime = 20;
        const randomness = Math.random() * 3 - 1.5; // Random value between -1.5 and 1.5
        const slowPitProbability = 0.3;
        const slowPitTime = 10 * (Math.random() * 2 - 1); // Random value between -10 and 10

        if (Math.random() < slowPitProbability) {
            this.logRaceInfo("Slow pit stop")
            return baseTime + randomness + slowPitTime;
        } else {
            return baseTime + randomness;
        }
    },


    lapTime(weather, tyre) {
        let minTime, maxTime;

        if (weather === "sunny") {
            if (tyre === "hard") {
                minTime = 60;
                maxTime = 75;
            } else if (tyre === "soft") {
                minTime = 55;
                maxTime = 65;
            } else if (tyre === "wet") {
                minTime = 80;
                maxTime = 90;
            }
        } else if (weather === "rainy") {
            if (tyre === "hard") {
                minTime = 85;
                maxTime = 120;
            } else if (tyre === "soft") {
                minTime = 90;
                maxTime = 130;
            } else if (tyre === "wet") {
                minTime = 65;
                maxTime = 80;
            }
        }

        return (Math.random() * (maxTime - minTime) + minTime).toFixed(2);
    },

    changeTyre() {
        const tyreSelect = document.getElementById("tyreSelect");
        const newTyre = tyreSelect.value;

        if (game.tyre === tyreSelect.value) {
            this.logRaceInfo("Car is already on " + tyreSelect.value + " tyres -- do not box");
            return;
        }

        if (newTyre === "hard" || newTyre === "soft" || newTyre === "wet") {
            this.tyre = newTyre;
            this.pit = true;
            // Add any additional logic for tire change time cost
        }
        this.logRaceInfo("Box Box!")
    },

    startRace() {
        this.logRaceInfo("It's lights out and away they go!")
        const gameStatusElement = document.getElementById("gameStatus");
        const changeTyreBtn = document.getElementById("changeTyreBtn");
        const tyreSelect = document.getElementById("tyreSelect");

        changeTyreBtn.disabled = false;
        tyreSelect.disabled = false;

        let intervalCount = 0;
        const raceInterval = setInterval(() => {
            intervalCount++;

            if (intervalCount % 30 === 0) {
                this.currentLap++;
                let newWeather = nextWeather(this.weather);
                if (newWeather != this.weather) {
                    this.logRaceInfo("Weather change from " + this.weather + " to " + newWeather)
                    this.weather = newWeather;
                }
                let lapTime = this.lapTime(this.weather, this.tyre);
                this.racetime += parseFloat(lapTime);

                // Add pit stop time if necessary
                if (this.pit) {
                    let pitstopTime = this.pitStopTime().toFixed(2);
                    lapTime = parseFloat(lapTime) + parseFloat(pitstopTime);
                    this.pit = false;
                    this.logRaceInfo("Pit stop time: " + pitstopTime)
                }

                updateLapInfo(this.currentLap, this.weather, this.tyre, lapTime);
                this.logRaceInfo("Lap: " + this.currentLap.toString());

                if (this.currentLap === this.laps) {
                    this.logRaceInfo("Race finish")
                    this.logRaceInfo("Final time " + this.racetime.toFixed(2).toString())

                    clearInterval(raceInterval);
                    changeTyreBtn.disabled = true;
                    tyreSelect.disabled = true;
                }
            }

            // Update car position on the track
            const progress = (intervalCount % 30) / 30; // Use modulo operator to reset progress after each lap
            updateCarPosition(this.carElement, this.trackPath, this.pathLength, progress);
        }, this.intervalDuration);
    },

};
