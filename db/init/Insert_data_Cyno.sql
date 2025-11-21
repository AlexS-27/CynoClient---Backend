USE cyno_client;

-- ================================
-- INSERT Locations
-- ================================
INSERT INTO locations (name, postal_code, postal_code_extra, toponym, canton_code, lang_code)
VALUES
('Genève', '1201', NULL, 'Ville de Genève', 'GE', 'FR'),
('Lausanne', '1003', NULL, 'Chef-lieu du canton de Vaud', 'VD', 'FR'),
('Nyon', '1260', NULL, 'District de Nyon', 'VD', 'FR'),
('Zürich', '8001', NULL, 'Stadt Zürich', 'ZH', 'DE'),
('Lugano', '6900', NULL, 'Città di Lugano', 'TI', 'IT');

-- ================================
-- INSERT Clients
-- ================================
INSERT INTO clients (last_name, first_name, gender, email, phone_number, postal_address)
VALUES
('Dupont', 'Jean', 'Male', 'jean.dupont@mail.com', '+41221234567', 'Rue du Rhône 12, 1201 Genève'),
('Martin', 'Sophie', 'Female', 'sophie.martin@mail.com', '+41223456789', 'Avenue de la Gare 22, 1003 Lausanne'),
('Rossi', 'Marco', 'Male', 'marco.rossi@mail.com', '+41912223344', 'Via Nassa 11, 6900 Lugano'),
('Keller', 'Anna', 'Female', 'anna.keller@mail.com', '+41448887766', 'Bahnhofstrasse 5, 8001 Zürich'),
('Morel', 'Claire', 'Female', 'claire.morel@mail.com', '+41229995544', 'Rue des Alpes 14, 1260 Nyon');

-- ================================
-- INSERT Breeds
-- ================================
INSERT INTO breeds
(name, url_details, url_images, category, morphotype, classification,
 min_size_male, max_size_male, min_size_female, max_size_female,
 min_weight_male, max_weight_male, min_weight_female, max_weight_female,
 life_expectancy)
VALUES
('Labrador Retriever', 'https://example.com/lab', 'https://images.com/lab.jpg',
 'Sporting', 'Mésomorphe', 'Groupe 8',
 55, 62, 54, 60, 29, 36, 25, 32, '10-12 ans'),

('Berger Allemand', 'https://example.com/gsd', 'https://images.com/gsd.jpg',
 'Working', 'Mésomorphe', 'Groupe 1',
 60, 65, 55, 60, 30, 40, 22, 32, '9-13 ans'),

('Chihuahua', 'https://example.com/chihuahua', 'https://images.com/chihuahua.jpg',
 'Companion', 'Dolicomorphe', 'Groupe 9',
 15, 20, 15, 20, 1, 3, 1, 3, '12-20 ans'),

('Golden Retriever', 'https://example.com/golden', 'https://images.com/golden.jpg',
 'Sporting', 'Mésomorphe', 'Groupe 8',
 56, 61, 51, 56, 27, 34, 25, 30, '10-12 ans'),

('Beagle', 'https://example.com/beagle', 'https://images.com/beagle.jpg',
 'Hound', 'Mésomorphe', 'Groupe 6',
 33, 41, 33, 41, 9, 14, 8, 13, '12-15 ans');

-- ================================
-- INSERT Dogs
-- ================================
INSERT INTO dogs (name, sex, cross_breed, birthdate, sterilized, deceased, client_id, breed_id)
VALUES
('Rex', 'Male', FALSE, '2019-03-15', TRUE, FALSE, 1, 2),
('Bella', 'Female', FALSE, '2020-07-01', FALSE, FALSE, 2, 1),
('Luna', 'Female', TRUE, '2018-11-20', TRUE, FALSE, 3, 4),
('Max', 'Male', FALSE, '2017-02-10', FALSE, FALSE, 4, 5),
('Milo', 'Male', FALSE, '2021-05-25', FALSE, FALSE, 5, 3);

-- ================================
-- INSERT Diseases
-- ================================
INSERT INTO diseases (name, description, symptoms, prevention, treatment, vaccine, zoonosis)
VALUES
('Parvovirus', 'Maladie virale grave', 'Vomissements, diarrhée', 'Vaccination', 'Soins intensifs', TRUE, FALSE),
('Rage', 'Virus mortel transmissible à l’humain', 'Fièvre, agressivité', 'Vaccination', 'Aucun traitement en phase avancée', TRUE, TRUE),
('Leptospirose', 'Bactérie transmissible', 'Fièvre, vomissements', 'Vaccination, éviter eaux stagnantes', 'Antibiotiques', TRUE, TRUE),
('Toux du chenil', 'Tracheobronchite infectieuse', 'Toux sèche', 'Vaccination', 'Repos, antibiotiques', TRUE, FALSE),
('Maladie de Lyme', 'Borréliose transmise par tiques', 'Boiterie, fatigue', 'Antiparasitaires', 'Antibiotiques', FALSE, TRUE);

-- ================================
-- INSERT Dog Diseases (Pivot Many-to-Many)
-- ================================
INSERT INTO dog_diseases (dog_id, disease_id)
VALUES
(1, 1),
(1, 4),
(2, 3),
(3, 2),
(3, 5),
(4, 1),
(5, 4);

-- ================================
-- INSERT Services
-- ================================
INSERT INTO services (dog_id, service_date, location_id, duration_minutes)
VALUES
(1, '2024-01-10', 1, 60),
(2, '2024-02-12', 2, 45),
(3, '2024-03-05', 3, 90),
(4, '2024-01-22', 4, 30),
(5, '2024-04-01', 1, 120);