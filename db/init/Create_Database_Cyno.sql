-- ==========================================================
-- Création de la base de données
-- ==========================================================
DROP DATABASE if EXISTS cyno_client;

CREATE DATABASE if NOT exists cyno_client 
CHARACTER SET UTF8MB4 
COLLATE UTF8MB4_GENERAL_CI;

USE cyno_client;

-- ==========================================================
-- Table : Location
-- ==========================================================
DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
	id INT AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(200) NOT NULL,
	postal_code VARCHAR(20) NOT NULL,
	postal_code_extra VARCHAR(20),
	toponym VARCHAR(200),
	canton_code CHAR(2) NOT NULL,
	lang_code CHAR(2) NOT NULL
	);
-- ==========================================================
-- Table : Clients
-- ==========================================================
DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
    id int PRIMARY KEY Auto_increment ,
    last_name VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT null,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    postal_address TEXT NOT null
);

-- ==========================================================
-- Table : Breeds
-- ==========================================================
DROP TABLE IF EXISTS breeds;
CREATE TABLE breeds (
    id INT auto_increment PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL,
    url_details TEXT NOT NULL,
    url_images TEXT NOT NULL,
    category VARCHAR(20) NOT NULL,
    morphotype VARCHAR(100) NOT NULL,
    classification text NOT NULL,
    min_size_male decimal(5,2) NOT NULL,
    max_size_male decimal(5,2) NOT NULL,
    min_size_female decimal(5,2) NOT NULL,
    max_size_female decimal(5,2) NOT NULL,
    min_weight_male decimal(5,2) NOT NULL,
    max_weight_male decimal(5,2) NOT NULL,
    min_weight_female decimal(5,2) NOT NULL,
    max_weight_female decimal(5,2) NOT NULL,
    life_expectancy VARCHAR(100) NOT NULL
);

-- ==========================================================
-- Table : Dogs
-- ==========================================================
DROP TABLE IF EXISTS dogs;
CREATE TABLE dogs (
    id int auto_increment PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    sex VARCHAR(10) NOT null,
    cross_breed BOOLEAN DEFAULT FALSE NOT NULL,
    birthdate DATE NOT null,
    sterilized BOOLEAN DEFAULT FALSE,
    deceased BOOLEAN DEFAULT FALSE,
    client_id INT,
    breed_id INT,
    -- disease_id INT,
    -- service_id INT,
    CONSTRAINT fk_dogs_clients FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    CONSTRAINT fk_dogs_breeds FOREIGN KEY (breed_id) REFERENCES breeds(id) ON DELETE CASCADE
    -- CONSTRAINT fk_dogs_diseases FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE,
    -- CONSTRAINT fk_dogs_clients FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    
);

-- ==========================================================
-- Table : Diseases
-- ==========================================================
DROP TABLE IF EXISTS diseases;
CREATE TABLE diseases (
    id int auto_increment PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT ,
    symptoms TEXT NOT null,
    prevention TEXT,
    treatment TEXT NOT null,
    vaccine BOOLEAN DEFAULT FALSE,
    zoonosis BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- Table: services
-- =====================================================
DROP TABLE IF EXISTS services;
CREATE TABLE services (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	dog_id INT NOT NULL, 
	service_date DATE NOT NULL,
	location_id INT,
	duration_minutes INT,
	FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE,
	FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL
	);
	
	-- ==========================================================
-- Table associative : Dog diseases (relation N,N)
-- ==========================================================
DROP TABLE IF EXISTS dog_diseases;
CREATE TABLE dog_diseases (
    dog_id INT NOT null,
    disease_id INT NOT NULL,
    PRIMARY KEY (dog_id, disease_id),
    FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE,
    FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
);