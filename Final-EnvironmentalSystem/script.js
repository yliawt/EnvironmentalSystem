$(document).ready(function() {
    var tempChart, humidityChart, gasChart;
    initializeCharts();

    fetchData();
    setInterval(fetchData, 5000);

    function initializeCharts() {
        var ctxTemp = document.getElementById('tempChart').getContext('2d');
        var ctxHumidity = document.getElementById('humidityChart').getContext('2d');
        var ctxGas = document.getElementById('gasChart').getContext('2d');

        tempChart = new Chart(ctxTemp, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{ label: 'Temperature', data: [], borderColor: 'red', backgroundColor: 'rgba(255, 99, 132, 0.5)' }]
            }
        });

        humidityChart = new Chart(ctxHumidity, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{ label: 'Humidity', data: [], borderColor: 'blue', backgroundColor: 'rgba(54, 162, 235, 0.5)' }]
            }
        });

        gasChart = new Chart(ctxGas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{ label: 'Gas Level', data: [], borderColor: 'green', backgroundColor: 'rgba(75, 192, 192, 0.5)' }]
            }
        });
    }

    function fetchData() {
        $.ajax({
            url: 'fetch_data.php',
            type: 'get',
            dataType: 'json',
            success: function(data) {
                console.log("Data received:", data);
                if (data.error) {
                    console.error("Server Error:", data.error);
                } else {
                    updateUI(data);
                    updateTable(data.entries);
                    generateInsights(data.entries);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error);
            }
        });
    }

    function updateUI(data) {
        console.log("Updating UI with data:", data);
        if (data.entries && data.entries.length > 0) {
            $("#latestTemp").text(data.entries[0].temperature);
            $("#minTemp").text(data.minTemp);
            $("#maxTemp").text(data.maxTemp);
            $("#avgTemp").text(parseFloat(data.avgTemp).toFixed(2));

            $("#latestHumidity").text(data.entries[0].humidity);
            $("#minHumidity").text(data.minHumidity);
            $("#maxHumidity").text(data.maxHumidity);
            $("#avgHumidity").text(parseFloat(data.avgHumidity).toFixed(2));

            $("#latestGas").text(data.entries[0].gasValue);
            $("#minGas").text(data.minGas);
            $("#maxGas").text(data.maxGas);
            $("#avgGas").text(parseFloat(data.avgGas).toFixed(2));

            updateChart(tempChart, data.entries, 'temperature');
            updateChart(humidityChart, data.entries, 'humidity');
            updateChart(gasChart, data.entries, 'gasValue');
        } else {
            console.error("No entries data available to update UI.");
        }
    }

    function updateTable(entries) {
        const table = $("#recentDataTable");
        table.empty();

        if (entries && entries.length > 0) {
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
        } else {
            console.error("No entries data available to update table.");
        }
    }

    function updateChart(chart, entries, key) {
        if (!chart || !entries) {
            console.error("Chart or entries data is undefined.");
            return;
        }

        const labels = entries.map(entry => entry.time);
        const data = entries.map(entry => entry[key]);
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    }

    function generateInsights(entries) {
        if (!entries || entries.length === 0) {
            console.error("No entries available to generate insights.");
            return;
        }

        let latestEntry = entries[0];
        console.log("Generating insights based on latest entry:", latestEntry);

        let temperatureInsight;
        if (latestEntry.temperature > 35) {
            temperatureInsight = "extremely hot";
        } else if (latestEntry.temperature > 32) {
            temperatureInsight = "hot";
        } else if (latestEntry.temperature > 27) {
            temperatureInsight = "room temperature";
        } else if (latestEntry.temperature > 22) {
            temperatureInsight = "cool";
        } else if (latestEntry.temperature > 16) {
            temperatureInsight = "cold";
        } else {
            temperatureInsight = "freezing";
        }

        let humidityInsight;
        if (latestEntry.humidity > 70) {
            humidityInsight = "tropical";
        } else if (latestEntry.humidity > 65) {
            humidityInsight = "humid";
        } else if (latestEntry.humidity > 60) {
            humidityInsight = "sticky";
        } else {
            humidityInsight = "pleasant";
        }

        let gasInsight;
        if (latestEntry.gasValue > 1000) {
            gasInsight = "drowsiness and danger";
        } else if (latestEntry.gasValue > 700) {
            gasInsight = "acceptable level";
        } else if (latestEntry.gasValue > 450) {
            gasInsight = "normal";
        } else {
            gasInsight = "fresh air";
        }

        let insights = `Today's temperature is ${temperatureInsight}, the humidity is ${humidityInsight}, air quality is ${gasInsight}.`;
        console.log("Generated insights:", insights);
        $("#insights").html(insights);
    }
});
