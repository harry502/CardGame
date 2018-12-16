CREATE TABLE User
(
userid int AUTO_INCREMENT PRIMARY KEY,
gamenum int,
wealth int DEFAULT 100,
score int DEFAULT 0,
username varchar(20),
password varchar(32),
decklist varchar(1024) DEFAULT '0:2|1:2|2:2|3:2|4:2|5:2|6:2|7:2|8:2|9:2',
owncardlist varchar(1024) DEFAULT '0:2|1:2|2:2|3:2|4:2|5:2|6:2|7:2|8:2|9:2|10:0|11:0|12:0|13:0|14:0|15:0|16:0|17:0|18:0|19:0'
);