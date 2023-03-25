function updateLapInfo(lapNumber, weather, tyre, lapTime) {
    // create a new table row
    const newRow = document.createElement('tr');

    // add lap number cell
    const lapNumberCell = document.createElement('td');
    lapNumberCell.innerText = lapNumber;
    newRow.appendChild(lapNumberCell);

    // add weather cell
    const weatherCell = document.createElement('td');
    weatherCell.innerText = weather;
    newRow.appendChild(weatherCell);

    // add tyre cell
    const tyreCell = document.createElement('td');
    tyreCell.innerText = tyre;
    newRow.appendChild(tyreCell);

    // add lap time cell
    const lapTimeCell = document.createElement('td');
    lapTimeCell.innerText = lapTime + 's';
    newRow.appendChild(lapTimeCell);

    // add the new row to the table
    document.getElementById("lapinfotable").appendChild(newRow);

    if (weather === 'rainy') {
        weatherCell.innerHTML = '&#x2614';
    } else {
        weatherCell.innerHTML = '&#x1F31E';
    }

}