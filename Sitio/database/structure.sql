CREATE DATABASE  IF NOT EXISTS `ohshots` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ohshots`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ohshots
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `_idx` (`userId`),
  KEY `productId_idx` (`productId`),
  CONSTRAINT `` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'productos'),(2,'bebidas blancas'),(3,'vinos'),(4,'packs'),(5,'promos'),(6,'recetas');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'gin.png','2021-10-24 00:00:00','2021-10-24 00:00:00'),(2,'vino.png','2021-10-24 00:00:00','2021-10-24 00:00:00'),(3,'andesroja.png','2021-10-24 00:00:00','2021-10-24 00:00:00'),(4,'yuGin.png','2021-10-24 00:00:00','2021-10-24 00:00:00'),(5,'sidraPeer.png','2021-10-24 00:00:00','2021-10-24 00:00:00'),(6,'absolutVodka.png','2021-10-24 00:00:00','2021-10-24 00:00:00'),(7,'packBrahma.png','2021-10-24 00:00:00','2021-10-24 00:00:00'),(8,'packStella.png','2021-10-24 00:00:00','2021-10-24 00:00:00'),(9,'patagoniaLatas.png','2021-10-24 00:00:00','2021-10-24 00:00:00');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `origenes`
--

DROP TABLE IF EXISTS `origenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origenes`
--

LOCK TABLES `origenes` WRITE;
/*!40000 ALTER TABLE `origenes` DISABLE KEYS */;
INSERT INTO `origenes` VALUES (1,'nacional'),(2,'importado');
/*!40000 ALTER TABLE `origenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `imageId` int NOT NULL,
  `origenId` int NOT NULL,
  `sectionId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_images1_idx` (`imageId`),
  KEY `fk_products_origenes1_idx` (`origenId`),
  KEY `fk_products_sections1_idx` (`sectionId`),
  KEY `fk_products_categories1_idx` (`categoryId`),
  CONSTRAINT `fk_products_categories1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_products_images1` FOREIGN KEY (`imageId`) REFERENCES `images` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_products_origenes1` FOREIGN KEY (`origenId`) REFERENCES `origenes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_products_sections1` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Alquimista Gin','Es un gin pensado y diseñado para ser armónico, elegante y disruptivo',1799,'2021-10-24 00:00:00','2021-10-24 00:00:00',1,1,1,2),(2,'Vino Estancia Mendoza','De estilo frutado, en estos vinos destacan los aromas varietales y sus taninos redondos.',230,'2021-10-24 00:00:00','2021-10-24 00:00:00',2,1,1,3),(3,'Cerveza Andes Roja','Pack de 24 unidades, 473ml',2760,'2021-10-24 00:00:00','2021-10-24 00:00:00',3,1,1,4),(4,'Yu Gin','Un gin refrescante y único, elaborado en Francia.',7600,'2021-10-24 00:00:00','2021-10-24 00:00:00',4,2,2,2),(5,'Sidra Peer','Peer Maracuyá es una sidra de pera con Maracuyá. Pack de 4 unidades por 500ml',1000,'2021-10-24 00:00:00','2021-10-24 00:00:00',5,1,2,5),(6,'Absolut Peach','Vodka con sabor a durazno, 750ml',2600,'2021-10-24 00:00:00','2021-10-24 00:00:00',6,2,2,2),(7,'Cerveza Brahma','Pack de 24 unidades, 473 ml.',1900,'2021-10-24 00:00:00','2021-10-24 00:00:00',7,1,3,4),(8,'Stella Artois','Pack de 24 unidades, 473 ml.',2300,'2021-10-24 00:00:00','2021-10-24 00:00:00',8,2,3,4),(9,'Cerveza Patagonia','Pack de 24 unidades, 473 ml.',3000,'2021-10-24 00:00:00','2021-10-24 00:00:00',9,1,3,4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'destacados'),(2,'interes'),(3,'packs');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rolId` int NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_roles1_idx` (`rolId`),
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`rolId`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'eric','mena','ericmena@gmail.com','$2a$10$BJLttZXy7CCM6FPhnykhs.J2U5dCEiQElujUQ3vJTbSKw9kZ/moXO','2021-10-01 00:14:58','2021-10-01 00:14:58',1,'default.png'),(3,'juanito','perez','juanitoperez@hotmail.com','$2a$10$yobrwMdiDkPHY5wALbqS7.F5G8jf6PktJOhyXJtgwgiPBKOHQzlL.','2021-10-01 00:16:43','2021-10-01 00:16:43',1,'default.png'),(4,'Segundo','Fernandez','juancruzfernandez108@gmail.com','$2a$10$k6g5z4HryaOerQDDX1cZSuYm62O398zdYD814L32pC/FqhxgERM..','2021-10-01 02:26:28','2021-10-19 23:30:24',1,'default.png'),(5,'Renato','Saucedo','renisaucedo@gmail.com','$2a$10$V25LL8rfviD9fBQy.WX9buIsDae8jJ3HSZ92NQX8lpLu9Ec3E.AJS','2021-10-01 02:28:08','2021-10-01 02:28:08',1,'default.png'),(6,'ramon','nodo','ramonodo@hotmail.com','$2a$10$uC2JhoVofShdX/r3XLGWqOGArtKYJHytC7cRZ.d7nGaUXQtg73Nem','2021-10-05 21:46:25','2021-10-05 21:46:25',1,'default.png'),(7,'rika','rika','rikarika@gmail.com','$2a$10$vsVcipVq7BWLEPgz1Yuy8OfyASzefOK0xMZI4cfwma201eAv0250.','2021-10-08 22:04:57','2021-10-08 22:04:57',1,'default.png'),(8,'rana','rene','ranarene@gmail.com','$2a$10$N3.YL/rQgAAmBHC3jv2SV.Jb700Zd1VLDBdnx/P.1vdzMhe.hjvuu','2021-10-08 22:08:09','2021-10-08 22:08:09',1,'default.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-25 14:53:38
