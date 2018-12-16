CREATE TABLE User
(
userid int AUTO_INCREMENT PRIMARY KEY,
gamenum int,
wealth int DEFAULT 100,
score int DEFAULT 0,
username varchar(20),
password varchar(32),
decklist varchar(1024),
owncardlist varchar(1024)
);