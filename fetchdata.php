<?php
$host = "localhost"; // Update to your 000webhost database host if different
$dbname = "id22312400_environment"; // Update to your database name
$username = "id22312400_yliawt02"; // Update to your database username
$password = "ThankYou979!"; // Update to your database password

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, temperature, humidity, Date, Time FROM nodemcu_table ORDER BY id DESC LIMIT 10";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>
