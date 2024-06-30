<?php
header('Content-Type: text/plain');
date_default_timezone_set('Asia/Kuala_Lumpur');
$host = "localhost";
$username = "id22365822_liawyee";
$password = "ThankYou979!";
$dbname = "id22365822_liawyeeplantmonitoringsystem";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

$temperature = $_POST['temperature'] ?? null;
$humidity = $_POST['humidity'] ?? null;
$gasValue = $_POST['gasValue'] ?? null;
$date = date('Y-m-d');
$time = date('H:i:s');

$query = "INSERT INTO plantmonitor (date, time, temperature, humidity, gasValue) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
if ($stmt === false) {
    die('MySQL prepare error: ' . $conn->error);
}

$stmt->bind_param('sssss', $date, $time, $temperature, $humidity, $gasValue);
if ($stmt->execute()) {
    echo "Data inserted successfully\n";
} else {
    echo "Error inserting data: " . $stmt->error . "\n";
}

$stmt->close();
$conn->close();
?>
