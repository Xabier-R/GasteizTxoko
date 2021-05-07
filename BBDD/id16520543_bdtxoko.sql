-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 09-04-2021 a las 08:09:16
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id16520543_bdtxoko`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Mesas`
--

CREATE TABLE `Mesas` (
  `ID` int(11) NOT NULL,
  `ID_Txoko` int(11) NOT NULL,
  `Sillas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Reservas`
--

CREATE TABLE `Reservas` (
  `ID` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Cant_Per` int(11) NOT NULL,
  `Fecha_Ini` datetime NOT NULL,
  `Fecha_Fin` datetime NOT NULL,
  `ID_Mesa` int(11) NOT NULL,
  `Precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Txokos`
--

CREATE TABLE `Txokos` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Mesas`
--
ALTER TABLE `Mesas`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID_Txoko` (`ID_Txoko`);

--
-- Indices de la tabla `Reservas`
--
ALTER TABLE `Reservas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Usuario` (`ID_Usuario`),
  ADD KEY `ID_Mesa` (`ID_Mesa`);

--
-- Indices de la tabla `Txokos`
--
ALTER TABLE `Txokos`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Mesas`
--
ALTER TABLE `Mesas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Reservas`
--
ALTER TABLE `Reservas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Txokos`
--
ALTER TABLE `Txokos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Mesas`
--
ALTER TABLE `Mesas`
  ADD CONSTRAINT `Mesas_ibfk_1` FOREIGN KEY (`ID_Txoko`) REFERENCES `Txokos` (`ID`);

--
-- Filtros para la tabla `Reservas`
--
ALTER TABLE `Reservas`
  ADD CONSTRAINT `Reservas_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuarios` (`ID`),
  ADD CONSTRAINT `Reservas_ibfk_2` FOREIGN KEY (`ID_Mesa`) REFERENCES `Mesas` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
