$(document).ready(function() {
    var ctxTemp = document.getElementById('tempChart').getContext('2d');
    var ctxHumidity = document.getElementById('humidityChart').getContext('2d');
    var ctxGas = document.getElementById('gasChart').getContext('2d');

    var tempChart = new Chart(ctxTemp, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ label: 'Temperature', data: [], borderColor: 'red', backgroundColor: 'rgba(255, 99, 132, 0.5)' }]
        }
    });

    var humidityChart = new Chart(ctxHumidity, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ label: 'Humidity', data: [], borderColor: 'blue', backgroundColor: 'rgba(54, 162, 235, 0.5)' }]
        }
    });

    var gasChart = new Chart(ctxGas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ label: 'Gas Level', data: [], borderColor: 'green', backgroundColor: 'rgba(75, 192, 192, 0.5)' }]
        }
    });

    fetchData();
    setInterval(fetchData, 5000); // Fetch data every 5 seconds

    function fetchData() {
        $.ajax({
            url: 'fetch_data.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log("Data received:", data);
                if (data.error) {
                    console.error("Error:", data.error);
                } else {
                    updateUI(data);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", error);
            }
        });
    }

    function updateUI(data) {
        $("#latestTemp").text(data.entries[0].temperature ? data.entries[0].temperature : 'N/A');
        $("#minTemp").text(data.minTemp ? data.minTemp : 'N/A');
        $("#maxTemp").text(data.maxTemp ? data.maxTemp : 'N/A');
        $("#avgTemp").text(data.avgTemp ? parseFloat(data.avgTemp).toFixed(2) : 'N/A');

        $("#latestHumidity").text(data.entries[0].humidity ? data.entries[0].humidity : 'N/A');
        $("#minHumidity").text(data.minHumidity ? data.minHumidity : 'N/A');
        $("#maxHumidity").text(data.maxHumidity ? data.maxHumidity : 'N/A');
        $("#avgHumidity").text(data.avgHumidity ? parseFloat(data.avgHumidity).toFixed(2) : 'N/A');

        $("#latestGas").text(data.entries[0].gasValue ? data.entries[0].gasValue : 'N/A');
        $("#minGas").text(data.minGas ? data.minGas : 'N/A');
        $("#maxGas").text(data.maxGas ? data.maxGas : 'N/A');
        $("#avgGas").text(data.avgGas ? parseFloat(data.avgGas).toFixed(2) : 'N/A');

        // Update charts
        if (data.entries && Array.isArray(data.entries)) {
            var tempData = data.entries.map(e => e.temperature);
            var humidityData = data.entries.map(e => e.humidity);
            var gasData = data.entries.map(e => e.gasValue);
            var labels = data.entries.map(e => e.time);

            updateChart(tempChart, labels, tempData);
            updateChart(humidityChart, labels, humidityData);
            updateChart(gasChart, labels, gasData);

            updateTable(data.entries);
        } else {
            console.error('Entries data is not an array:', data.entries);
        }
    }

    function updateChart(chart, labels, dataPoints) {
        chart.data.labels = labels;
        chart.data.datasets.forEach((dataset) => {
            dataset.data = dataPoints;
        });
        chart.update();
    }

    function updateTable(entries) {
        const table = $("#recentDataTable");
        table.empty();
        entries.forEach((entry) => {
            const row = `<tr>
                <td>${entry.date}</td>
                <td>${entry.time}</td>
                <td>${entry.temperature}°C</td>
                <td>${entry.humidity}%</td>
                <td>${entry.gasValue}ppm</td>
            </tr>`;
            table.append(row);
        });
    }
});
