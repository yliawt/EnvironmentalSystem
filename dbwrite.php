<?php
header('Content-Type: text/plain'); // For easier debugging

// Set the default timezone to Kuala Lumpur
date_default_timezone_set('Asia/Kuala_Lumpur');

$host = "localhost";
$username = "id22365822_liawyee";
$password = "ThankYou979!";
$dbname = "id22365822_liawyeeplantmonitoringsystem";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
die('Database connection failed: ' . $conn->connect_error);
}

// Retrieve data from POST
$temperature = isset($_POST['temperature']) ? $_POST['temperature'] : null;
$humidity = isset($_POST['humidity']) ? $_POST['humidity'] : null;
$gasValue = isset($_POST['gasValue']) ? $_POST['gasValue'] : null;
$date = date('Y-m-d'); // Today's date in Kuala Lumpur timezone
$time = date('H:i:s'); // Current time in Kuala Lumpur timezone

// Insert data into the database
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
