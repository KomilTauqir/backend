-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: books
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `authorID` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `nationality` varchar(30) NOT NULL,
  `birthYear` int unsigned NOT NULL,
  `deathYear` int unsigned DEFAULT NULL,
  PRIMARY KEY (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Miguel','de Cervantes Saavedra','Spanish',1547,1616),(2,'Charles','Dickens','British',1812,1870),(3,'J.R.R.','Tolkien','British',1892,1973),(4,'Antoine','de Saint-Exupery','French',1900,1944),(5,'J.K.','Rowling','British',1965,NULL),(6,'Agatha','Christie','British',1890,1976),(7,'Cao','Xueqin','Chinese',1715,1763),(8,'Henry',' Rider Haggard','British',1856,1925),(9,'C.S.','Lewis','British',1898,1963);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `bookID` int unsigned NOT NULL AUTO_INCREMENT,
  `bookTitle` varchar(255) NOT NULL,
  `originalTitle` varchar(255) DEFAULT NULL,
  `yearofPublication` int NOT NULL DEFAULT '0',
  `genre` varchar(30) NOT NULL,
  `millionsSold` int unsigned NOT NULL,
  `languageWritten` varchar(30) NOT NULL,
  `coverImagePath` varchar(255) NOT NULL,
  `authorID` int unsigned NOT NULL,
  PRIMARY KEY (`bookID`),
  KEY `fk_author` (`authorID`),
  CONSTRAINT `fk_author` FOREIGN KEY (`authorID`) REFERENCES `author` (`authorID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Don Quixote','El Ingenioso Hidalgo Don Quixote de la Mancha',1605,'Novel',500,'Spanish','a-stem-of-flowers-over-a-boor.jpg',1),(2,'A Tale of Two Cities','A Tale of Two Cities',1859,'Historical Fiction',200,'English','black-book.jpg',2),(3,'The Lord of the Rings','The Lord of the Rings',1954,'Fantasy/Adventure',150,'English','close-up-of-a-bible.jpg',3),(4,'The Litle Prince','Le Petit Prince',1943,'Fable',142,'French','close-up-of-black-book.jpg',4),(5,'Harry Potter and the Sorcerer\'s Stone','Harry Potter and the Sorcerer\'s Stone',1997,'Fantasy Fiction',107,'English','close-up-photo-of-books.jpg',5),(6,'And Then There Were None','Ten Little Niggers',1939,'Mystery',100,'English','close-up-photo-of-eyeglasses-near-books.jpg',6),(7,'The Dream of the Red Chamber','The Story of the Stone',1792,'Novel',100,'Chinese','close-up-photo-of-open-book-on-red-surface.jpg',7),(8,'The Hobbit ','There and Back Again',1937,'High Fantasy',100,'English','close-up-photo-of-opened-book.jpg',3),(9,'She: A History of Adventure','She',1886,'Fiction',100,'English','fountain-pen-on-top-of-open-notebook.jpg',8),(10,'The Lion, the Witch and the Wardrobe','The Lion, the Witch and the Wardrobe',1950,'Fantasy',85,'English ','selective-focus-photography-of-purple-flowers-on-book-page.jpg',9);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookplot`
--

DROP TABLE IF EXISTS `bookplot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookplot` (
  `bookPlotID` int unsigned NOT NULL AUTO_INCREMENT,
  `plot` blob NOT NULL,
  `plotSource` varchar(255) NOT NULL,
  `bookID` int unsigned NOT NULL,
  PRIMARY KEY (`bookPlotID`),
  KEY `fk_bookID_P` (`bookID`),
  CONSTRAINT `fk_bookID_P` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookplot`
--

LOCK TABLES `bookplot` WRITE;
/*!40000 ALTER TABLE `bookplot` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookplot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `changeLogID` int unsigned NOT NULL AUTO_INCREMENT,
  `dateCreated` datetime NOT NULL,
  `dateChanged` datetime DEFAULT NULL,
  `bookID` int unsigned NOT NULL,
  `userID` int unsigned NOT NULL,
  PRIMARY KEY (`changeLogID`),
  KEY `fk_bookID_C` (`bookID`),
  KEY `fk_userID_C` (`userID`),
  CONSTRAINT `fk_bookID_C` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userID_C` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accessRights` varchar(200) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Smith','John@Smith.com','JSmith','$2b$06$d69oSJRoYRcyN54M7ojH4uwq7im08kxBL4EPk5lwLLdUVdjkE9cJ2','Yes'),(2,'Sally','Jones','Sally@Jones.com','SJones','$2b$06$IASnDWz92ZnyE2zpNlyRt.0Z3Rm6Z.3QgQFuKpzszWpmBkT3JK/Rm','No'),(13,'Terry','Lam','dai_lam88@hotmail.com','Tezza','$2b$06$Ml7McQ2vVjZR.X6maJP4j.E.ymy9uNbbJnWshEVo8H0Wcu35khiy2','Yes'),(70,'One','Two','One@Two.com','One','$2b$06$OHaWebbtqY1dp8bHI03wyu9mslXa7ysusbRO83HqEuYog55HimdZK','No');
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

-- Dump completed on 2021-11-21 14:45:09
