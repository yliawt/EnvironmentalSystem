<?php
header('Content-Type: application/json');
$host = "localhost";
$dbname = "id22365822_liawyeeplantmonitoringsystem";
$username = "id22365822_liawyee";
$password = "ThankYou979!";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

$result = $conn->query("SELECT temperature, humidity, gasValue, CONCAT(date, ' ', time) AS timestamp FROM plantmonitor ORDER BY date DESC, time DESC LIMIT 10");

if ($result) {
    $temperatures = [];
    $humidity = [];
    $gasLevels = [];
    while ($row = $result->fetch_assoc()) {
        $temperatures[] = ['timestamp' => $row['timestamp'], 'value' => $row['temperature']];
        $humidity[] = ['timestamp' => $row['timestamp'], 'value' => $row['humidity']];
        $gasLevels[] = ['timestamp' => $row['timestamp'], 'value' => $row['gasValue']];
    }
    echo json_encode(['temperature' => $temperatures, 'humidity' => $humidity, 'gasLevel' => $gasLevels]);
} else {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
}

$conn->close();
?>

