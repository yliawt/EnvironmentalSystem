<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "localhost"; // Update to your 000webhost database host if different
$dbname = "id22312400_environment"; // Update to your database name
$username = "id22312400_yliawt02"; // Update to your database username
$password = "ThankYou979!"; // Update to your database password

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

date_default_timezone_set('Asia/Kuala_Lumpur');
$d = date("Y-m-d");
$t = date("H:i:s");

if (isset($_POST['sendtemperature']) && isset($_POST['sendhumidity'])) {
    $temperature = $_POST['sendtemperature'];
    $humidity = $_POST['sendhumidity'];

    $sql = "INSERT INTO nodemcu_table (temperature, humidity, Date, Time) VALUES ('$temperature', '$humidity', '$d', '$t')";

    if ($conn->query($sql) === TRUE) {
        echo "Values inserted in MySQL database table.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Temperature or humidity not set in POST data.";
}

$conn->close();
?>
