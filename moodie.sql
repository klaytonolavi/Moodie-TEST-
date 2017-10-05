DROP DATABASE IF EXISTS moodie;
CREATE DATABASE moodie;

USE moodie;

DROP TABLE IF EXISTS userProfile;
CREATE TABLE userProfile(
    userID VARCHAR(50) NOT NULL,
    firstName VARCHAR (25) NOT NULL,
    lastNAME VARCHAR (25) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(16) NOT NULL,
    privacy BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (userID)
);  

CREATE TABLE gallery(
    userID VARCHAR(50) NOT NULL,
    photo TEXT(255) NOT NULL,
    emotion VARCHAR(50) NOT NULL,
    score DECIMAL(7, 3) NOT NULL,
	FOREIGN KEY (userID)
	REFERENCES userProfile(userID)
	ON DELETE CASCADE
	ON UPDATE CASCADE
    );
    
-- INSERT INTO userProfile (userID, password) VALUES (?, SHA1(?));