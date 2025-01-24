-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema healthfasta
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema healthfasta
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `healthfasta` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `healthfasta` ;

-- -----------------------------------------------------
-- Table `healthfasta`.`patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `healthfasta`.`patient` (
  `PatientID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(60) NOT NULL,
  `Age` INT NOT NULL,
  `Gender` CHAR(1) NOT NULL,
  `Region` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PatientID`))
ENGINE = InnoDB
AUTO_INCREMENT = 211
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `healthfasta`.`diagnosis`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `healthfasta`.`diagnosis` (
  `DiagnosisID` INT NOT NULL AUTO_INCREMENT,
  `PatientID` INT NOT NULL,
  `DiagnosisSummary` TEXT NOT NULL,
  `DiagnosisDate` DATE NOT NULL,
  PRIMARY KEY (`DiagnosisID`),
  INDEX `PatientID_idx` (`PatientID` ASC) INVISIBLE,
  CONSTRAINT `Patient_ID`
    FOREIGN KEY (`PatientID`)
    REFERENCES `healthfasta`.`patient` (`PatientID`))
ENGINE = InnoDB
AUTO_INCREMENT = 421
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `healthfasta`.`physiologicaldata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `healthfasta`.`physiologicaldata` (
  `DataID` INT NOT NULL AUTO_INCREMENT,
  `PatientID` INT NOT NULL,
  `Temperature` DECIMAL(4,1) NOT NULL,
  `BloodPressure` VARCHAR(7) NOT NULL,
  `MeasurementDate` DATE NOT NULL,
  PRIMARY KEY (`DataID`),
  INDEX `PatientID_idx` (`PatientID` ASC) VISIBLE,
  CONSTRAINT `PatientID`
    FOREIGN KEY (`PatientID`)
    REFERENCES `healthfasta`.`patient` (`PatientID`))
ENGINE = InnoDB
AUTO_INCREMENT = 421
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
