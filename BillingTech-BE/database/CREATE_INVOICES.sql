
USE billing_tech;
-- Insert mock data into the invoices table
INSERT INTO invoices (user_id, invoice_date, total_amount, status)
VALUES
(1, '2025-04-01', 150.75, 'Paid'),
(2, '2025-04-02', 200.00, 'Pending'),
(3, '2025-04-03', 99.99, 'Cancelled'),
(1, '2025-04-03', 300.50, 'Paid'),
(2, '2025-04-04', 450.00, 'Pending');