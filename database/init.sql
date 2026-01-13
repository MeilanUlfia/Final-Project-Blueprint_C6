-- TODO: Tulis query SQL kalian di sini (CREATE TABLE & INSERT) untuk inisialisasi database otomatis
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    type ENUM('Income', 'Expense') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tambahkan data dummy agar tidak kosong saat di-Read
INSERT INTO categories (category_name) VALUES ('Makanan'), ('Transportasi'), ('Gaji');