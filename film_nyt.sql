-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 20. 06 2019 kl. 12:31:26
-- Serverversion: 10.1.30-MariaDB
-- PHP-version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- k
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `film_nyt`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `heading` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `author` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `site_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `articles`
--

INSERT INTO `articles` (`id`, `heading`, `description`, `author`, `content`, `site_id`) VALUES
(4, 'God film', 'JA', '', 'Der er intet indhold', NULL),
(7, 'Kozuh skaber kunst i \'sure gamle mænd\'', '', '1', '', NULL),
(8, '\'Lad de døde hvile\' er en smuk ungdomsfilm', 'Spænding uden lige', '11', 'Sohail har skabt noget unikt i \'Lad de døde hvile\'. Sigurd Barret er med', NULL),
(9, 'Dellepude er sej', 'Så for søren', '13', 'Plukker i skoven, du ukendte svampe,\nså lad først lillebror smage derpå.\n\nDersom han dør under skrigen og krampe,\nså bør du selv lade svampene stå.\n\nMen sker der intet med den lille?\nså gik den portion svampe til spilde!', NULL),
(11, 'Test man - G', 'HFHFHS', '1', 'asdfghjklæ', NULL),
(12, 'Et kunstværk', 'Ja, dét er det', '13', 'Et sandt kunstværk', NULL);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `menu_name` varchar(45) NOT NULL,
  `url` varchar(20) NOT NULL,
  `menu_position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `menu`
--

INSERT INTO `menu` (`id`, `menu_name`, `url`, `menu_position`) VALUES
(1, 'Hjem', '', 10),
(2, 'Nyt', 'news', 20),
(3, 'Kontakt', 'contact', 30);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `name` varchar(110) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `photos`
--

INSERT INTO `photos` (`id`, `name`) VALUES
(1, 'hej.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `bio` text,
  `user_id` int(11) DEFAULT NULL,
  `photos_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `profiles`
--

INSERT INTO `profiles` (`id`, `firstname`, `lastname`, `bio`, `user_id`, `photos_id`) VALUES
(1, 'Dellepude', 'Hej', 'Mit navn er dellepude!', 1, NULL),
(2, NULL, NULL, NULL, 2, NULL),
(3, 'Andreas', 'A', 'Agag', 9, NULL),
(4, 'Gunnar', 'Guldfeber', 'Jeg elsker film', 11, NULL),
(5, NULL, NULL, NULL, 12, NULL),
(6, 'Dellepude', 'Klipnakke', '', 13, NULL),
(7, NULL, NULL, NULL, 14, NULL),
(8, NULL, NULL, NULL, 14, NULL),
(9, NULL, NULL, NULL, 15, NULL),
(10, NULL, NULL, NULL, 16, NULL),
(11, NULL, NULL, NULL, 17, NULL);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `roles`
--

CREATE TABLE `roles` (
  `id` int(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `roles`
--

INSERT INTO `roles` (`id`, `name`, `level`) VALUES
(1, 'Super admin', 100),
(2, 'Admin', 90),
(3, 'User', 50),
(4, 'Guest', 10);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `sites`
--

CREATE TABLE `sites` (
  `id` int(11) NOT NULL,
  `sitename` varchar(45) NOT NULL,
  `desc` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `sites`
--

INSERT INTO `sites` (`id`, `sitename`, `desc`) VALUES
(1, 'Nyheder', NULL),
(2, 'Teorier', NULL);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `passphrase` varchar(200) NOT NULL,
  `email` varchar(45) NOT NULL,
  `roles_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `passphrase`, `email`, `roles_id`) VALUES
(1, 'admin', '$2a$10$T8KdtH/efr2idnb1J.31X.86vjjiUku1s/niveH9A4jmeuL.qchIO', '', 1),
(13, 'dellepude', '$2a$10$Zzkgiv8cw7KowCoACHwzU.DNRFkcIXJlryfxTzHy1U5TIMgCqDS86', 'dellepude@gmail.com', 3),
(15, 'Mat', '$2a$10$t3ndlZp2ECg/b87/JEtg.O..KcEAMzFWihqbvdhiO/Rsb8IAN8Iku', 'mat@mat.mat', 3),
(16, 'gg', '$2a$10$8QBBPTYEDr4wJ37NCTJjf.IlewTKKCJAKFQ4m8OUO0X19ouIuWHOm', 'a@a.a', 3),
(17, 'd', '$2a$10$8gGDUUKMrJ2NzdG7K5lnpuCHRtNvuNYFObNxa5Yi0xM8GwJ/5buqa', 'd@d.dk', 3);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tilføj AUTO_INCREMENT i tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tilføj AUTO_INCREMENT i tabel `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tilføj AUTO_INCREMENT i tabel `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tilføj AUTO_INCREMENT i tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `sites`
--
ALTER TABLE `sites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
