CREATE DATABASE  IF NOT EXISTS `pulse_portal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pulse_portal`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: pulse_portal
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `sets` varchar(45) NOT NULL,
  `reps` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `difficulty` varchar(45) NOT NULL,
  `gif_url` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (1,'Bench Press','A compound exercise that targets the chest, shoulders, and triceps.','4','6-8','Strength','Intermediate','barbell-bench-press.gif'),(2,'Squat','A lower body exercise that primarily targets the quadriceps and gluteal muscles.','4','8-10','Strength','Intermediate','barbell-full-squat.gif'),(3,'Deadlift','A full-body exercise that targets the posterior chain, including the hamstrings, glutes, back, and core.','3','5-6','Strength','Advanced','barbell-deadlift-movement.gif'),(4,'Overhead Press','An upper body exercise targeting the shoulders, triceps, and upper back.','3','8-10','Strength','Intermediate','military-press.gif'),(5,'Pull-Up','An upper body compound exercise that primarily targets the back muscles and biceps.','4','As many as possible (AMAP)','Strength','Advanced','pull-up.gif'),(6,'Barbell Row','A compound exercise targeting the back muscles, particularly the latissimus dorsi.','3','8-10','Strength','Intermediate','barbell-bent-over-row.gif'),(7,'Leg Press','A compound leg exercise that targets the quads, hamstrings, and glutes.','4','10-12','Strength','Beginner','leg-press.gif'),(8,'Bicep Curl','An isolation exercise targeting the bicep muscles.','4','10-12','Strength','Beginner','dumbbell-bicep-curl.gif'),(9,'Tricep Pushdown','An isolation exercise targeting the triceps.','3','10-12','Strength','Intermediate','straight-bar-tricep-pushdown.gif'),(20,'Lunges','A lower body exercise that targets the quads, glutes, and hamstrings.','3','12 each leg','Strength','Intermediate','bodyweight-forward-lunge.gif'),(24,'Plank','An isometric core exercise to strengthen the abdominal muscles and improve stability.','4','30 seconds','Balance','Beginner','plank.gif'),(25,'Pullover','A compound exercise engaging the chest, lats, and core for strength and stability.','3','10','Strength','Intermediate','pullover.gif');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_role` varchar(45) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'elissa@gmail.com','$2a$08$EpSXsE96qR4PhzrWLDowm.dMwHbQWsGseJVu0/M9ees7pL7V91i1G','Elissa','Abou Hassan','admin'),(3,'john@gmail.com','$2a$08$hi85/5hbdtiEfIL0jgkJGu723o.rN.ypAi8p9iGLpBsfqDbqYarnS','John','Doe','admin'),(4,'jack@gmail.com','$2a$08$L139Cb3ddLeaV3bvX9iGIeZxGeLEKQB9n55yZEVeuu4y4iTQyUT.m','Jack','Smith','user'),(5,'sam@gmail.com','$2a$08$D.95a6YndZDw3HxZToJSzOzGh1dMdWskGy4YGaMBJaiwmthSh7Ok.','Sam','Smith','user'),(7,'test@hotmail.com','$2a$08$hcBVtKeDILEkf3QZtmBCm.92qSe3evLxJvqYr7TgDkAQwNw580oDm','test','testt','user'),(8,'dinah@gmail.com','$2a$08$3Jv/5nkrbrIAjF3SmRac3eq/CUnQLMhHTXBM5xUXkTBnU//ghBaf.','Dinah','Jane','user'),(9,'testtt@gmail.com','$2a$08$zbREFxwwQrEOJwf6lkx1gucNuqacbjjg5q6OU0n45l9cTT4w7/8Vy','testtt','testtt','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_exercise`
--

DROP TABLE IF EXISTS `workout_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout_exercise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `workout_id` int NOT NULL,
  `exercise_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_exercise`
--

LOCK TABLES `workout_exercise` WRITE;
/*!40000 ALTER TABLE `workout_exercise` DISABLE KEYS */;
INSERT INTO `workout_exercise` VALUES (1,4,1),(2,4,2),(4,2,5),(5,2,1),(6,4,10);
/*!40000 ALTER TABLE `workout_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workouts`
--

DROP TABLE IF EXISTS `workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workouts`
--

LOCK TABLES `workouts` WRITE;
/*!40000 ALTER TABLE `workouts` DISABLE KEYS */;
INSERT INTO `workouts` VALUES (1,'test','2023-11-07','test','1'),(2,'test1','2023-11-08','test1','1'),(3,'test2','2023-11-08','test2','3'),(4,'test3','2023-11-08','test33','5');
/*!40000 ALTER TABLE `workouts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-23 21:54:45
