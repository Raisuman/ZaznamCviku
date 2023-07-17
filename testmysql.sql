-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Pon 17. čec 2023, 15:47
-- Verze serveru: 10.4.28-MariaDB
-- Verze PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `testmysql`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `cviky`
--

CREATE TABLE `cviky` (
  `CvikyId` int(8) NOT NULL,
  `DruhCviku` varchar(255) DEFAULT NULL,
  `CasCviku` time DEFAULT NULL,
  `DenCviku` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `cviky`
--

INSERT INTO `cviky` (`CvikyId`, `DruhCviku`, `CasCviku`, `DenCviku`) VALUES
(1, 'Běhaní', '01:06:59', '2023-06-17'),
(2, 'Posilování', '02:00:00', '2023-05-17'),
(3, 'Hody', '00:30:00', '2023-06-19'),
(4, 'Dřepy', '00:45:00', '2023-06-17'),
(5, 'Kliky', '00:20:00', '2023-04-19'),
(7, 'Techniky', '02:00:00', '2023-07-26'),
(8, 'Skákaní', '00:20:00', '2023-06-13'),
(9, 'Plavání', '01:30:00', '2023-07-16');

-- --------------------------------------------------------

--
-- Struktura tabulky `trenink`
--

CREATE TABLE `trenink` (
  `TreninkId` int(10) UNSIGNED NOT NULL,
  `DenTrenink` varchar(500) NOT NULL,
  `OdCasTrenink` time NOT NULL,
  `DoCasTrenink` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `trenink`
--

INSERT INTO `trenink` (`TreninkId`, `DenTrenink`, `OdCasTrenink`, `DoCasTrenink`) VALUES
(1, 'Pondělí', '19:00:00', '21:00:00'),
(2, 'Úterý', '00:00:00', '00:00:00'),
(3, 'Středa', '19:00:00', '21:00:00'),
(4, 'Čtrvtek', '00:00:00', '00:00:00'),
(5, 'Pátek', '00:00:00', '00:00:00'),
(6, 'Sobota', '00:00:00', '00:00:00'),
(7, 'Neděle', '00:00:00', '00:00:00');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `cviky`
--
ALTER TABLE `cviky`
  ADD PRIMARY KEY (`CvikyId`);

--
-- Indexy pro tabulku `trenink`
--
ALTER TABLE `trenink`
  ADD PRIMARY KEY (`TreninkId`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `cviky`
--
ALTER TABLE `cviky`
  MODIFY `CvikyId` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pro tabulku `trenink`
--
ALTER TABLE `trenink`
  MODIFY `TreninkId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
