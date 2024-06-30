<?php
header('Content-Type: application/json');

$host = "localhost";
$username = "id22365822_liawyee";
$password = "ThankYou979!";
$dbname = "id22365822_liawyeeplantmonitoringsystem";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

// Aggregate queries for temperature, humidity, and gas
$query = "SELECT MAX(temperature) AS maxTemp, MIN(temperature) AS minTemp, AVG(temperature) AS avgTemp,
MAX(humidity) AS maxHumidity, MIN(humidity) AS minHumidity, AVG(humidity) AS avgHumidity,
MAX(gasValue) AS maxGas, MIN(gasValue) AS minGas, AVG(gasValue) AS avgGas
FROM plantmonitor;";
$result = $conn->query($query);
if ($result) {
    $aggregates = $result->fetch_assoc();
} else {
    die(json_encode(['error' => 'Query error: ' . $conn->error]));
}

// Recent entries for table
$entriesQuery = "SELECT date, time, temperature, humidity, gasValue FROM plantmonitor ORDER BY date DESC, time DESC LIMIT 10;";
$entriesResult = $conn->query($entriesQuery);
if ($entriesResult) {
    $entries = [];
    while ($row = $entriesResult->fetch_assoc()) {
        $entries[] = $row;
    }
} else {
    die(json_encode(['error' => 'Query error: ' . $conn->error]));
}

$data = array_merge($aggregates, ['entries' => $entries]);
echo json_encode($data);

$conn->close();
?>
