CREATE TABLE posts (
    id SERIAL UNIQUE, 
    titulo VARCHAR(25), 
    img VARCHAR(1000), 
    descripcion VARCHAR(255), 
    likes INT
    );

SELECT * FROM posts;

INSERT INTO posts (titulo, img, descripcion, likes) VALUES (
    'Ola k ase', 'enlace', 'Este es un test o k ase', 100
);

SELECT * FROM posts WHERE id = 2;

SELECT COALESCE(SUM(likes + 1), -1) AS total FROM posts WHERE id=1;

UPDATE posts SET likes = 0 WHERE id = 4;

UPDATE posts SET likes = (SELECT SUM(likes + 1) AS total FROM posts WHERE id=26) WHERE id = 26;

DELETE FROM posts WHERE id = 3;