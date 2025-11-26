-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 77.222.32.225    Database: aavramenk5
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.1

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
-- Table structure for table `rewards`
--

DROP TABLE IF EXISTS `rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rewards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `img_url` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewards`
--

LOCK TABLES `rewards` WRITE;
/*!40000 ALTER TABLE `rewards` DISABLE KEYS */;
INSERT INTO `rewards` VALUES (1,'Медаль \"За оборону Одессы\"','https://i.ibb.co/twZ86bK5/m-oboron-odessy.jpg'),(2,'Медаль \"За оборону Севастополя\"','https://i.ibb.co/Mynfk0tj/m-oboron-sevastopolya.jpg'),(3,'Медаль \"За оборону Сталинграда\"','https://i.ibb.co/W47WjxX5/m-oboron-stalingrada.jpg'),(4,'Медаль \"За оборону Заполярья\"','https://i.ibb.co/fYty9DLN/m-oboron-zapolyarya.jpg-'),(5,'Медаль \"За освобождение Белграда\"','https://i.ibb.co/YFLgtVq1/m-osvob-belgrada.jpg'),(6,'Медаль \"За освобождение Праги\"','https://i.ibb.co/d4PRsGdV/m-osvob-pragi.jpg'),(7,'Медаль \"За освобождение Варшавы\"','https://i.ibb.co/tpynvK2K/m-osvob-varshavy.jpg'),(8,'Медаль \"Партизану Отечественной Войны\"','https://i.ibb.co/tMzKZJvn/m-partizanu.jpg'),(9,'Медаль \"За победу над Германией в Великой Отечественной Войне 1941-1945 гг.\"','https://i.ibb.co/67cDZ57W/m-pobed-nad-germaniey.jpg'),(10,'Медаль \"За победу над Японией\"','https://i.ibb.co/93h8NVK7/m-pobed-nad-yaponiey.jpg'),(11,'Медаль Ушакова','https://i.ibb.co/CpVbv5T5/m-ushakova.jpg'),(12,'Медаль \"За взятие Берлина\"','https://i.ibb.co/nNpzPhpx/m-vzyatie-berlina.jpg'),(13,'Медаль \"За взятие Будапешта\"','https://i.ibb.co/d4nNRcJ8/m-vzyatie-budapeshta.jpg'),(14,'Медаль \"За взятие Кенигсберга\"','https://i.ibb.co/20qGmfhn/m-vzyatie-kenigsberga.jpg'),(15,'Медаль \"За взятие Вены\"','https://i.ibb.co/Y4GmKgpG/m-vzyatie-veny.jpg'),(16,'Медаль \"ХХ лет рабоче-крестьянской Красной Армии\"','https://i.ibb.co/Y743fmtG/m-xx-let-rkka.jpg'),(17,'Медаль \"За боевые заслуги\"','https://i.ibb.co/60dF5VtT/m-za-boevye-zaslugi.jpg'),(18,'Медаль \"За Отвагу\"','https://i.ibb.co/r2S7NxS4/m-za-otvagu.jpg'),(19,'Медаль \"Золотая Звезда\"','https://i.ibb.co/zHbT28Bz/m-zolotaya-zvezda.jpg'),(20,'Орден Хмельницкого','https://i.ibb.co/RTbLtWqD/o-hmelnitskogo.jpg'),(21,'Орден \"Красное Знамя\"','https://i.ibb.co/Mx2y8yXK/o-krasnoe-znamya.jpg'),(22,'Орден Красной Звезды','https://i.ibb.co/gLs2zPDv/o-krasnoy-zvezdy.jpg'),(23,'Орден Кутузова','https://i.ibb.co/xK59kgRx/o-kutuzova.jpg'),(24,'Орден Ленина','https://i.ibb.co/KcpQ3FZ3/o-lenina.jpg'),(25,'Орден Нахимова','https://i.ibb.co/b50J7Y18/o-nahimova.jpg'),(26,'Орден Невского','https://i.ibb.co/990hN80n/o-nevskogo.jpg'),(27,'Орден Отечественной Войны','https://i.ibb.co/PvXcXJyR/o-otechestvennoy-voyny.jpg'),(28,'Орден \"Победа\"','https://i.ibb.co/Q7wc1SC0/o-pobeda.jpg'),(29,'Орден Славы','https://i.ibb.co/cX66SCL7/o-slavy.jpg'),(30,'Орден Суворова','https://i.ibb.co/wFQyxNx7/o-suvorova.jpg'),(31,'Орден Ушакова','https://i.ibb.co/Txbx8pq8/o-ushakova.jpg'),(32,'Медаль Нахимова','https://i.ibb.co/zV2yzywf/m-nahimova.jpg'),(33,'Медаль \"За оборону Кавказа\"','https://i.ibb.co/fYHLMx0Y/m-oboron-kavkaza.jpg'),(34,'Медаль \"За оборону Киева\"','https://i.ibb.co/LhhJtrJZ/m-oboron-kieva.jpg'),(35,'Медаль \"За оборону Ленинграда\"','https://i.ibb.co/5Ww526R0/m-oboron-leningrada.jpg'),(36,'Медаль \"За оборону Москвы\"','https://i.ibb.co/dsJ4ZQVp/m-oboron-moskvy.jpg');
/*!40000 ALTER TABLE `rewards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-28 19:19:09
