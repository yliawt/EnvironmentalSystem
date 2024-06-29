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
updateChart(tempChart, data.temperature);
updateChart(humidityChart, data.humidity);
updateChart(gasChart, data.gasLevel);
}
},
error: function(xhr, status, error) {
console.error("AJAX Error:", status, error);
}
});
}

function updateChart(chart, dataPoints) {
chart.data.labels = dataPoints.map(d => d.timestamp);
chart.data.datasets.forEach((dataset) => {
dataset.data = dataPoints.map(d => d.value);
});
chart.update();
}
