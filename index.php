<?php
//Entry point
$page = $_GET['page'] ?? 'first';

switch($page) {
    case 'first':
        include 'firstPage.html';
        break;
    case 'second':
        include 'secondPage.html';
        break;
    case 'settings':
        include 'settings_page.html';
        break;
    default:
        echo "404 - Page not found";
}
?>
