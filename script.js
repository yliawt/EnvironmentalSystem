var tempChart, humidityChart, gasChart;

$(document).ready(function() {
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

fetchData();
setInterval(fetchData, 5000);
});

function fetchData() {
    $.ajax({
        url: 'fetch_data.php',
        type: 'get',
        dataType: 'json',
        success: function(data) {
            if (data.error) {
                console.error("Server Error:", data.error);
            } else {
                const lastData = data.temperature[data.temperature.length - 1];
                $("#latestDate").text(lastData.timestamp.split(' ')[0]);
                $("#latestTemp").text(lastData.value);
                $("#latestHumidity").text(data.humidity[data.humidity.length - 1].value);
                $("#latestGas").text(data.gasLevel[data.gasLevel.length - 1].value);

                updateChart(tempChart, data.temperature);
                updateChart(humidityChart, data.humidity);
                updateChart(gasChart, data.gasLevel);

                updateTable(data);
            }
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error:", status, error);
        }
    });
}

function updateTable(data) {
    const table = $("#recentDataTable");
    table.empty();
    data.temperature.forEach((temp, index) => {
        const row = `<tr>
            <td>${temp.timestamp.split(' ')[0]}</td>
            <td>${temp.timestamp.split(' ')[1]}</td>
            <td>${temp.value}°C</td>
            <td>${data.humidity[index].value}%</td>
            <td>${data.gasLevel[index].value}ppm</td>
        </tr>`;
        table.append(row);
    });
}


function updateChart(chart, dataPoints) {
    chart.data.labels = dataPoints.map(d => {
        // Split the timestamp into date and time, and return only the time part
        return d.timestamp.split(' ')[1];
    });
    chart.data.datasets.forEach((dataset) => {
        dataset.data = dataPoints.map(d => d.value);
    });
    chart.update();
}
