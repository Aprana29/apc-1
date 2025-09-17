-- Add service and quantity columns to orders table if not present
ALTER TABLE orders ADD COLUMN service VARCHAR(255);
ALTER TABLE orders ADD COLUMN quantity INT;
