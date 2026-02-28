<?php
// Database connection
$servername = "mysql_db";
$username = "app_user";
$password = "app_pass";
$database = "app_db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create tables if not exists
$userTable = "
CREATE TABLE IF NOT EXISTS users (
    uID INT AUTO_INCREMENT PRIMARY KEY,
    uName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
)
";
$conn->query($usersTable);

$budgetTable = "
CREATE TABLE IF NOT EXISTS Budget (
    bID INT AUTO_INCREMENT PRIMARY KEY,
    uID INT NOT NULL,
    bName VARCHAR(50),
    TotalAmt DECIMAL(10,2),
    Goal DECIMAL(10,2),
    Period VARCHAR(50),
    FOREIGN KEY (uID) REFERENCES users(uID) ON DELETE CASCADE
)
";
$conn->query($budgetTable);

$categoryTable = "
CREATE TABLE IF NOT EXISTS Category (
    cID INT AUTO_INCREMENT PRIMARY KEY,
    uID INT NOT NULL,
    cName VARCHAR(20),
    FOREIGN KEY (uID) REFERENCES users(uID) ON DELETE CASCADE
)
";
$conn->query($categoryTable);

$expenseTable = "
CREATE TABLE IF NOT EXISTS Expense (
    eID INT AUTO_INCREMENT PRIMARY KEY,
    bID INT,
    cID INT,
    uID INT NOT NULL,
    eName VARCHAR(50),
    Cost DECIMAL(10,2),
    Date DATE,
    FOREIGN KEY (bID) REFERENCES Budget(bID) ON DELETE CASCADE,
    FOREIGN KEY (cID) REFERENCES Category(cID) ON DELETE CASCADE,
    FOREIGN KEY (uID) REFERENCES users(uID) ON DELETE CASCADE
)
";
$conn->query($expenseTable);

$conn->close();
?>