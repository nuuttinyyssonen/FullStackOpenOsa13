CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Nuutti Nyyssönen', 'www.fullstackopen.com', 'Relational Databases', 0);
INSERT INTO blogs (author, url, title, likes) VALUES ('Test user', 'www.test.com', 'Test Title', 0);