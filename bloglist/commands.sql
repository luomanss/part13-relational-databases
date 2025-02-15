CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(100),
    url VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title) 
VALUES 
('Dan Abramov', 'https://example.com', 'On let vs const'),
('Laurenz Albe', 'https://example.com', 'Gaps in sequences in PostgreSQL');