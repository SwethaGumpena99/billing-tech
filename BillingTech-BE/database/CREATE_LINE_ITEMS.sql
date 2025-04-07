
USE billing_tech;
-- Insert mock data into the line_items table with office supplies descriptions
INSERT INTO line_items (invoice_id, description, quantity, unit_price, total_price)
VALUES
(1, 'Pens', 10, 1.50, 15.00),
(1, 'Notebooks', 5, 3.00, 15.00),
(2, 'Staplers', 2, 12.50, 25.00),
(3, 'Paper Reams', 3, 5.00, 15.00),
(4, 'Markers', 8, 2.00, 16.00),
(5, 'Folders', 6, 1.75, 10.50);