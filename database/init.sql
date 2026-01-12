-- TODO: Tulis query SQL kalian di sini (CREATE TABLE & INSERT) untuk inisialisasi database otomatis
-- Membuat tabel Categories (Pendukung)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Membuat tabel Transactions (Utama)
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT,
    type ENUM('Income', 'Expense') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Insert Data Dummy (Agar tidak kosong saat demo)
INSERT INTO categories (category_name) VALUES ('Makanan'), ('Gaji'), ('Transportasi');

INSERT INTO transactions (category_id, amount, description, type) 
VALUES 
(2, 5000000, 'Gaji Bulanan', 'Income'),
(1, 25000, 'Makan Siang', 'Expense');