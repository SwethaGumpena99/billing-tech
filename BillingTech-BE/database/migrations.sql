-- Create table for storing users
CREATE DATABASE IF NOT EXISTS billing_tech;
USE billing_tech;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for storing invoices
CREATE TABLE invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    invoice_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create table for storing line items
CREATE TABLE line_items (
    line_item_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id)
);

-- Create table for storing change requests
CREATE TABLE change_requests (
    change_request_id INT AUTO_INCREMENT PRIMARY KEY,
    line_item_id INT NOT NULL,
    user_id INT NOT NULL,
    request_description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (line_item_id) REFERENCES line_items(line_item_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create table for storing refund requests
CREATE TABLE refund_requests (
    refund_request_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    user_id INT NOT NULL,
    request_description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


SHOW TABLES;