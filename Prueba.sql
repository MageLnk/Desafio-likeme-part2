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