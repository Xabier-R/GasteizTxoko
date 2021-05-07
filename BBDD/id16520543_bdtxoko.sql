-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-05-2021 a las 07:25:30
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdtxoko`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

DROP TABLE IF EXISTS `mesas`;
CREATE TABLE IF NOT EXISTS `mesas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Txoko` int(11) NOT NULL,
  `Sillas` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Txoko` (`ID_Txoko`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`ID`, `ID_Txoko`, `Sillas`) VALUES
(1, 1, 4),
(2, 2, 12),
(3, 1, 2),
(4, 1, 6);

--
-- Disparadores `mesas`
--
DROP TRIGGER IF EXISTS `CapacidadTxoko`;
DELIMITER $$
CREATE TRIGGER `CapacidadTxoko` AFTER INSERT ON `mesas` FOR EACH ROW UPDATE txokos SET Capacidad = (SELECT sum(Sillas) FROM mesas where mesas.ID_Txoko = txokos.ID) WHERE new.ID_Txoko = txokos.ID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

DROP TABLE IF EXISTS `reservas`;
CREATE TABLE IF NOT EXISTS `reservas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) NOT NULL,
  `Cant_Per` int(11) NOT NULL,
  `Fecha_reserva` date NOT NULL,
  `Turno` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `ID_Mesa` int(11) NOT NULL,
  `Precio` double NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_Mesa` (`ID_Mesa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `txokos`
--

DROP TABLE IF EXISTS `txokos`;
CREATE TABLE IF NOT EXISTS `txokos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Capacidad` int(4) NOT NULL,
  `Precio_reserva` float NOT NULL,
  `Ubicacion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Valoracion` float NOT NULL,
  `N_valoraciones` int(4) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `txokos`
--

INSERT INTO `txokos` (`ID`, `Nombre`, `Descripcion`, `Capacidad`, `Precio_reserva`, `Ubicacion`, `Valoracion`, `N_valoraciones`) VALUES
(1, 'Txoko Vitoria', '', 12, 19.69, 'Vitoria-Gasteiz', 4.5, 1),
(2, 'El Txoko Taberna', '', 6, 13.4, 'Vitoria-Gasteiz', 3.4, 1),
(3, 'Gure Txoko Taberna', '', 0, 54.9, 'Vitoria-Gasteiz', 2.2, 1),
(4, 'Bar Gure Txoko', '', 0, 15.99, 'Vitoria-Gasteiz', 4.2, 1),
(5, 'Txoko andalu', '', 0, 18.5, 'Vitoria-Gasteiz', 3.8, 1),
(6, 'Txoko 2 C.B.', '', 0, 41.2, 'Vitoria-Gasteiz', 5, 1),
(7, 'Txoko Antonio', '', 0, 92.1, 'Vitoria-Gasteiz', 4.1, 1),
(8, 'Txoko Eguzkilore', '', 0, 47.7, 'Bilbao', 3.2, 1),
(9, 'Txoko Deusto', '', 0, 62.2, 'Bilbao', 3.9, 1),
(10, 'Txoko La Estación del Norte', '', 0, 22.4, 'Bilbao', 2.6, 1),
(11, 'Txoko', '', 0, 36.9, 'San Sebastian', 3.5, 1),
(12, 'Bar Gure Txoko', '', 0, 21.1, 'San Sebastian', 2.3, 1),
(13, 'Txoko Jaiak Barakaldo', '', 0, 43.89, 'Barakaldo', 4.4, 1),
(14, 'Txoko La Cuchara', '', 0, 72.6, 'Barakaldo', 4.1, 2),
(15, 'Txokolore', '', 0, 18.8, 'Barakaldo', 3.8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD CONSTRAINT `Mesas_ibfk_1` FOREIGN KEY (`ID_Txoko`) REFERENCES `txokos` (`ID`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `Reservas_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `Reservas_ibfk_2` FOREIGN KEY (`ID_Mesa`) REFERENCES `mesas` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
