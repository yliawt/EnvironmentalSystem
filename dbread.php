<?php
$host = "localhost";
$dbname = "id22365822_liawyeeplantmonitoringsystem";
$username = "id22365822_liawyee";
$password = "ThankYou979!";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, temperature, humidity, gasValue, date, time FROM plantmonitor ORDER BY id DESC LIMIT 10";
$result = $conn->query($sql);

echo "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Sensor Data Readings</title></head><body>";
echo "<table border='1'><tr><th>ID</th><th>Temperature</th><th>Humidity</th><th>Gas Level</th><th>Date</th><th>Time</th></tr>";

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr><td>{$row['id']}</td><td>{$row['temperature']}</td><td>{$row['humidity']}</td><td>{$row['gasValue']}</td><td>{$row['date']}</td><td>{$row['time']}</td></tr>";
    }
} else {
    echo "<tr><td colspan='6'>No data found</td></tr>";
}
echo "</table></body></html>";
$conn->close();
?>
