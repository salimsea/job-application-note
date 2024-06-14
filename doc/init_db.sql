CREATE SCHEMA job;
CREATE SCHEMA usr;
CREATE TABLE job.company (id varchar(36) NOT NULL, name varchar(255) NOT NULL, email varchar(255) NOT NULL, position varchar(255) NOT NULL, type_work_day int4 NOT NULL, type_work_place int4 NOT NULL, type_user_company int2 NOT NULL, placement varchar(255) NOT NULL, applied_at date NOT NULL, status int4 NOT NULL, source_job varchar(255) NOT NULL, created_by varchar(50) NOT NULL, created_date timestamp NOT NULL, updated_date timestamp, PRIMARY KEY (id));
CREATE TABLE usr.role (id varchar(50) NOT NULL, name varchar(50) NOT NULL, PRIMARY KEY (id));
CREATE TABLE usr."user" (id varchar(50) NOT NULL, first_name varchar(30) NOT NULL, middle_name varchar(50), last_name varchar(50), email varchar(100) NOT NULL, username varchar(30) NOT NULL UNIQUE, password varchar(255) NOT NULL, created_date timestamp NOT NULL, updated_by varchar(50), updated_date timestamp, PRIMARY KEY (id));
CREATE TABLE usr.user_role (user_id varchar(50) NOT NULL, role_id varchar(50) NOT NULL, PRIMARY KEY (user_id, role_id));
CREATE TABLE usr.user_profile (user_id varchar(50) NOT NULL, link_cv varchar(50), summary text, PRIMARY KEY (user_id));
ALTER TABLE usr.user_role ADD CONSTRAINT FKuser_role943458 FOREIGN KEY (user_id) REFERENCES usr."user" (id);
ALTER TABLE usr.user_role ADD CONSTRAINT FKuser_role868982 FOREIGN KEY (role_id) REFERENCES usr.role (id);
ALTER TABLE usr.user_profile ADD CONSTRAINT FKuser_profi696410 FOREIGN KEY (user_id) REFERENCES usr."user" (id);
ALTER TABLE job.company ADD CONSTRAINT FKcompany202370 FOREIGN KEY (created_by) REFERENCES usr."user" (id);

INSERT INTO usr."user" (id, first_name, middle_name, last_name, email, username, password, created_date, updated_by, updated_date)
VALUES 
('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'Admin', '', '', 'admin@admin.com', 'admin', 'Myh53tsrx8U3vXjxYPXyhYnDO*#*Nf2TKhovX8rjaG+OA=', '2024-01-01 00:00:00', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', '2024-01-01 00:00:00');

INSERT INTO usr.role (id, name)
VALUES 
('a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6', 'Admin'),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'User');

INSERT INTO usr.user_role (user_id, role_id)
VALUES 
('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6'),
('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');

INSERT INTO job.company (id, name, email, position, type_work_day, type_work_place, type_user_company, placement, applied_at, status, source_job, created_by, created_date, updated_date)
VALUES 
('b6b9df2c-4c59-4c0c-8e98-9b4c13b9a0ab', 'tiket.com', 'email1@company.com', 'Developer', 1, 1, 1, 'Location A', '2024-01-01', 1, 'LinkedIn', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '2024-01-01 00:00:00', NULL),
('c7b9df2c-4c59-4c0c-8e98-9b4c13b9a0bc', 'Bank Mandiri', 'email2@company.com', 'Designer', 2, 2, 2, 'Location B', '2024-02-01', 2, 'Indeed', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '2024-01-01 00:00:00', NULL),
('d8b9df2c-4c59-4c0c-8e98-9b4c13b9a0cd', 'Traveloka', 'email3@company.com', 'Manager', 1, 3, 1, 'Location C', '2024-03-01', 3, 'Referral', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '2024-01-01 00:00:00', NULL),
('e9b9df2c-4c59-4c0c-8e98-9b4c13b9a0de', 'GoTo Fintech', 'email4@company.com', 'Analyst', 3, 1, 2, 'Location D', '2024-04-01', 4, 'Website', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '2024-01-01 00:00:00', NULL),
('fab9df2c-4c59-4c0c-8e98-9b4c13b9a0ef', 'BKPM', 'email5@company.com', 'Developer', 2, 2, 1, 'Location E', '2024-05-01', 5, 'LinkedIn', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '2024-01-01 00:00:00', NULL),
('acb9df2c-4c59-4c0c-8e98-9b4c13b9a0af', 'Dropshipedia', 'email6@company.com', 'Designer', 3, 3, 2, 'Location F', '2024-06-01', 6, 'Indeed', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '2024-01-01 00:00:00', NULL),
('bdb9df2c-4c59-4c0c-8e98-9b4c13b9a0bf', 'Indocyber', 'email7@company.com', 'Manager', 1, 1, 1, 'Location G', '2024-07-01', 1, 'Referral', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '2024-01-01 00:00:00', NULL);



