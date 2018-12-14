DROP DATABASE IF EXISTS cats;

CREATE DATABASE cats;

USE cats;

CREATE TABLE cats (
  id int NOT NULL AUTO_INCREMENT,
  addedAt DATE NOT NULL,
  breed varchar(50),
  birthdate DATE,
  imageUrl varchar(200),
  lastSeenAt DATE NOT NULL,
  name varchar(50) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(150) NOT NULL,
  weight decimal(5,2) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
