<?php
//Entry point
$page = $_GET['page'] ?? 'first';

switch($page) {
    case 'first':
        include 'pages/sign_in.html';
        break;
    case 'second':
        include 'pages/secondPage.html';
        break;
    case 'settings':
        include 'pages/settings_page.html';
        break;
    default:
        echo "404 - Page not found";
}
?>
