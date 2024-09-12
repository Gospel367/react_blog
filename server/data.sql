
CREATE TABLE category(
    id varchar(255) primary key,
    category varchar(255),
    description varchar(255)

    
)

CREATE TABLE users(
    id varchar(255) primary key,
    fullname varchar(255),
    email varchar(255),
    hashed_password varchar(255),
    class_name varchar(255) DEFAULT 'visitor'

)

CREATE TABLE posts (
    id varchar(255) primary key,
    category varchar(255) references category(id),
    title varchar(255),
    body varchar(10000),
    author varchar(255) references users(id),
    post_date date,
    edit_date date NULL

);


ALTER TABLE users ADD CONSTRAINT constraint_name UNIQUE (email);


INSERT INTO posts(id,category,title,body,author,post_date) VALUES(
    2,
    1,
    'Jonnic Wins again',
    'MesJohnnicsi have declared the winner of the 2020 cmputer based football',
    1,
    '2024-07-22'
);


INSERT INTO category(id, category, description) VALUES 
    (3,
    'Entertainment',
    'Entertainment section'),
    (4,
    'Finance',
    'Finance section'),
     (5,
    'Romance',
    'Romamnce section');
