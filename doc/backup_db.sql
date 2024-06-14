--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: job; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA job;


ALTER SCHEMA job OWNER TO postgres;

--
-- Name: usr; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA usr;


ALTER SCHEMA usr OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: company; Type: TABLE; Schema: job; Owner: postgres
--

CREATE TABLE job.company (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "position" character varying(255) NOT NULL,
    type_work_day integer NOT NULL,
    type_work_place integer NOT NULL,
    type_user_company smallint NOT NULL,
    placement character varying(255) NOT NULL,
    applied_at date NOT NULL,
    status integer NOT NULL,
    source_job character varying(255) NOT NULL,
    created_by character varying(50) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    updated_date timestamp without time zone
);


ALTER TABLE job.company OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: usr; Owner: postgres
--

CREATE TABLE usr.role (
    id character varying(50) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE usr.role OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: usr; Owner: postgres
--

CREATE TABLE usr."user" (
    id character varying(50) NOT NULL,
    first_name character varying(30) NOT NULL,
    middle_name character varying(50),
    last_name character varying(50),
    email character varying(100) NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(255) NOT NULL,
    created_date timestamp without time zone NOT NULL,
    updated_by character varying(50),
    updated_date timestamp without time zone
);


ALTER TABLE usr."user" OWNER TO postgres;

--
-- Name: user_profile; Type: TABLE; Schema: usr; Owner: postgres
--

CREATE TABLE usr.user_profile (
    user_id character varying(50) NOT NULL,
    link_cv character varying(50),
    summary text
);


ALTER TABLE usr.user_profile OWNER TO postgres;

--
-- Name: user_role; Type: TABLE; Schema: usr; Owner: postgres
--

CREATE TABLE usr.user_role (
    user_id character varying(50) NOT NULL,
    role_id character varying(50) NOT NULL
);


ALTER TABLE usr.user_role OWNER TO postgres;

--
-- Data for Name: company; Type: TABLE DATA; Schema: job; Owner: postgres
--

COPY job.company (id, name, email, "position", type_work_day, type_work_place, type_user_company, placement, applied_at, status, source_job, created_by, created_date, updated_date) FROM stdin;
d8b9df2c-4c59-4c0c-8e98-9b4c13b9a0cd	Traveloka	email3@company.com	Manager	1	3	1	Location C	2024-03-01	3	Referral	c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	2024-01-01 00:00:00	\N
e9b9df2c-4c59-4c0c-8e98-9b4c13b9a0de	GoTo Fintech	email4@company.com	Analyst	3	1	2	Location D	2024-04-01	4	Website	c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	2024-01-01 00:00:00	\N
fab9df2c-4c59-4c0c-8e98-9b4c13b9a0ef	BKPM	email5@company.com	Developer	2	2	1	Location E	2024-05-01	5	LinkedIn	c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	2024-01-01 00:00:00	\N
acb9df2c-4c59-4c0c-8e98-9b4c13b9a0af	Dropshipedia	email6@company.com	Designer	3	3	2	Location F	2024-06-01	6	Indeed	c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	2024-01-01 00:00:00	\N
bdb9df2c-4c59-4c0c-8e98-9b4c13b9a0bf	Indocyber	email7@company.com	Manager	1	1	1	Location G	2024-07-01	1	Referral	c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	2024-01-01 00:00:00	\N
377121ef-7da7-4c48-945e-df7660595d1b	tiket.com	hr@tiket.com	Backend Devloper	1	1	1	jakarta	2022-05-05	1	linkedin	c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	2024-06-13 14:01:51.333381	2024-06-14 15:03:28.857584
c7b9df2c-4c59-4c0c-8e98-9b4c13b9a0bc	Bank Mandiri	email2@company.com	Designer	2	2	2	Location B	2024-02-01	1	Indeed	c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	2024-01-01 00:00:00	2024-06-14 15:04:14.179292
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: usr; Owner: postgres
--

COPY usr.role (id, name) FROM stdin;
a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6	Admin
b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e	User
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: usr; Owner: postgres
--

COPY usr."user" (id, first_name, middle_name, last_name, email, username, password, created_date, updated_by, updated_date) FROM stdin;
c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	Admin	Salim	Keren	admin@gmail.com	admin	Myh53tsrx8U3vXjxYPXyhYnDO*#*Nf2TKhovX8rjaG+OA=	2024-01-01 00:00:00	c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	2024-06-14 15:22:29.925763
\.


--
-- Data for Name: user_profile; Type: TABLE DATA; Schema: usr; Owner: postgres
--

COPY usr.user_profile (user_id, link_cv, summary) FROM stdin;
c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	https://s.id/cv-salim-segaf-alqosam	Permisi punten
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: usr; Owner: postgres
--

COPY usr.user_role (user_id, role_id) FROM stdin;
c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6
c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f	b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e
\.


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: job; Owner: postgres
--

ALTER TABLE ONLY job.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: usr; Owner: postgres
--

ALTER TABLE ONLY usr.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: usr; Owner: postgres
--

ALTER TABLE ONLY usr."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_profile user_profile_pkey; Type: CONSTRAINT; Schema: usr; Owner: postgres
--

ALTER TABLE ONLY usr.user_profile
    ADD CONSTRAINT user_profile_pkey PRIMARY KEY (user_id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: usr; Owner: postgres
--

ALTER TABLE ONLY usr.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: usr; Owner: postgres
--

ALTER TABLE ONLY usr."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: company fkcompany202370; Type: FK CONSTRAINT; Schema: job; Owner: postgres
--

ALTER TABLE ONLY job.company
    ADD CONSTRAINT fkcompany202370 FOREIGN KEY (created_by) REFERENCES usr."user"(id);


--
-- Name: user_profile fkuser_profi696410; Type: FK CONSTRAINT; Schema: usr; Owner: postgres
--

ALTER TABLE ONLY usr.user_profile
    ADD CONSTRAINT fkuser_profi696410 FOREIGN KEY (user_id) REFERENCES usr."user"(id);


--
-- Name: user_role fkuser_role868982; Type: FK CONSTRAINT; Schema: usr; Owner: postgres
--

ALTER TABLE ONLY usr.user_role
    ADD CONSTRAINT fkuser_role868982 FOREIGN KEY (role_id) REFERENCES usr.role(id);


--
-- Name: user_role fkuser_role943458; Type: FK CONSTRAINT; Schema: usr; Owner: postgres
--

ALTER TABLE ONLY usr.user_role
    ADD CONSTRAINT fkuser_role943458 FOREIGN KEY (user_id) REFERENCES usr."user"(id);


--
-- PostgreSQL database dump complete
--

