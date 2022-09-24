DROP SCHEMA IF EXISTS `aspa_db`;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema aspa_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aspa_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aspa_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci ;
USE `aspa_db` ;

-- -----------------------------------------------------
-- Table `aspa_db`.`club`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`club` (
  `idclub` INT(11) NOT NULL AUTO_INCREMENT,
  `licencia` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(120) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC),
  PRIMARY KEY (`idclub`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `aspa_db`.`atleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`atleta` (
  `idatleta` INT(11) NOT NULL AUTO_INCREMENT,
  `licencia` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `sexo` TINYINT NOT NULL DEFAULT 0,
  `dni` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NULL DEFAULT NULL,
  `club_idclub` INT(11) NOT NULL,
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC),
  PRIMARY KEY (`idatleta`),
  INDEX `fk_atleta_club1_idx` (`club_idclub` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `licencia_UNIQUE` (`licencia` ASC),
  CONSTRAINT `fk_atleta_club1`
    FOREIGN KEY (`club_idclub`)
    REFERENCES `aspa_db`.`club` (`idclub`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`competicion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`competicion` (
  `idcompeticion` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `fecha` DATE NOT NULL,
  `lugar` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcompeticion`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`tipo_prueba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`tipo_prueba` (
  `idtipoprueba` INT(11) NOT NULL AUTO_INCREMENT,
  `sexo` ENUM('MASCULINO', 'FEMENINO', 'MIXTO') NOT NULL,
  `disciplina` ENUM('SALTO_PERTIGA', 'SALTO_ALTURA', 'SALTO_LONGITUD', 'TRIPLE_SALTO', 'LANZAMIENTO_PESO', 'LANZAMIENTO_MARTILLO', 'LANZAMIENTO_JABALINA', 'LANZAMIENTO_DISCO') NOT NULL,
  `categoria` ENUM('BENJAMIN', 'ALEVIN', 'INFANTIL', 'CADETE', 'JUVENIL', 'PROMESA', 'ABSOLUTA', 'MASTER') NOT NULL,
  PRIMARY KEY (`idtipoprueba`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`usuario` (
  `idusuario` INT(11) NOT NULL AUTO_INCREMENT,
  `licencia` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `dni` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NULL DEFAULT NULL,
  `rol` ENUM('ADMIN', 'JUEZ') NOT NULL DEFAULT 'JUEZ',
  `categoria` ENUM('NI', 'NII', 'NIII', 'JAUT', 'ASP') NOT NULL DEFAULT 'JAUT',
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `licencia_UNIQUE` (`licencia` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`prueba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`prueba` (
  `idprueba` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `hora_prueba` TIMESTAMP NOT NULL,
  `apertura_camara` TIMESTAMP NULL DEFAULT NULL,
  `cierre_camara` TIMESTAMP NULL DEFAULT NULL,
  `competicion_idcompeticion` INT(11) NOT NULL,
  `usuario_idusuario` INT(11) NOT NULL,
  `tipo_prueba_idtipoprueba` INT(11) NOT NULL,
  `num_intentos` INT(11) NOT NULL DEFAULT 0,
  `num_intentos_mejora` INT(11) NOT NULL DEFAULT 0,
  `num_atletas_mejora` INT(11) NOT NULL DEFAULT 0,
  `finalizada` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idprueba`),
  INDEX `fk_prueba_competicion_idx` (`competicion_idcompeticion` ASC) ,
  INDEX `fk_prueba_tipoprueba_idx` (`tipo_prueba_idtipoprueba` ASC) ,
  INDEX `fk_prueba_usuario_idx` (`usuario_idusuario` ASC) ,
  CONSTRAINT `fk_prueba_competicion`
    FOREIGN KEY (`competicion_idcompeticion`)
    REFERENCES `aspa_db`.`competicion` (`idcompeticion`),
  CONSTRAINT `fk_prueba_tipoprueba`
    FOREIGN KEY (`tipo_prueba_idtipoprueba`)
    REFERENCES `aspa_db`.`tipo_prueba` (`idtipoprueba`),
  CONSTRAINT `fk_prueba_usuario`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `aspa_db`.`usuario` (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`inscripcion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`inscripcion` (
  `idinscripcion` INT(11) NOT NULL AUTO_INCREMENT,
  `atleta_idatleta` INT(11) NOT NULL,
  `prueba_idprueba` INT(11) NOT NULL,
  `presentado` TINYINT(4) NOT NULL DEFAULT 0,
  `dorsal` INT(11) NOT NULL,
  INDEX `fk_actuacion_prueba_idx` (`prueba_idprueba` ASC),
  PRIMARY KEY (`idinscripcion`),
  INDEX `fk_inscripcion_atleta1_idx` (`atleta_idatleta` ASC),
  CONSTRAINT `fk_actuacion_prueba`
    FOREIGN KEY (`prueba_idprueba`)
    REFERENCES `aspa_db`.`prueba` (`idprueba`)
	ON DELETE CASCADE,
  CONSTRAINT `fk_inscripcion_atleta1`
    FOREIGN KEY (`atleta_idatleta`)
    REFERENCES `aspa_db`.`atleta` (`idatleta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`marca_prueba_ns`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`marca_prueba_ns` (
  `prueba_idprueba` INT(11) NOT NULL,
  `atleta_idatleta` INT(11) NOT NULL,
  `intento` INT(11) NOT NULL,
  `resultado` ENUM('VALIDO', 'NULO', 'PASA') NOT NULL DEFAULT 'PASA',
  `marca` VARCHAR(45) NULL,
  INDEX `fk_marca_prueba_rc_prueba1_idx` (`prueba_idprueba` ASC),
  PRIMARY KEY (`prueba_idprueba`, `atleta_idatleta`, `intento`),
  INDEX `fk_marca_prueba_ns_atleta1_idx` (`atleta_idatleta` ASC),
  CONSTRAINT `fk_marca_prueba_rc_prueba1`
    FOREIGN KEY (`prueba_idprueba`)
    REFERENCES `aspa_db`.`prueba` (`idprueba`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_marca_prueba_ns_atleta1`
    FOREIGN KEY (`atleta_idatleta`)
    REFERENCES `aspa_db`.`atleta` (`idatleta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`prueba_altura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`prueba_altura` (
  `prueba_idprueba` INT(11) NOT NULL,
  `idaltura` INT(11) NOT NULL,
  `altura` DOUBLE NOT NULL,
  INDEX `fk_prueba_altura_prueba1_idx` (`prueba_idprueba` ASC),
  PRIMARY KEY (`prueba_idprueba`, `idaltura`),
  CONSTRAINT `fk_prueba_altura_prueba1`
    FOREIGN KEY (`prueba_idprueba`)
    REFERENCES `aspa_db`.`prueba` (`idprueba`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`marca_prueba_sv`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`marca_prueba_sv` (
  `intento` INT(11) NOT NULL,
  `prueba_altura_prueba_idprueba` INT(11) NOT NULL,
  `prueba_altura_idaltura` INT(11) NOT NULL,
  `atleta_idatleta` INT(11) NOT NULL,
  `resultado` ENUM('VALIDO', 'NULO', 'PASA') NOT NULL DEFAULT 'PASA',
  PRIMARY KEY (`intento`, `prueba_altura_prueba_idprueba`, `prueba_altura_idaltura`, `atleta_idatleta`),
  INDEX `fk_marca_prueba_sv_prueba_altura1_idx` (`prueba_altura_prueba_idprueba` ASC, `prueba_altura_idaltura` ASC),
  INDEX `fk_marca_prueba_sv_atleta1_idx` (`atleta_idatleta` ASC),
  CONSTRAINT `fk_marca_prueba_sv_prueba_altura1`
    FOREIGN KEY (`prueba_altura_prueba_idprueba` , `prueba_altura_idaltura`)
    REFERENCES `aspa_db`.`prueba_altura` (`prueba_idprueba` , `idaltura`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_marca_prueba_sv_atleta1`
    FOREIGN KEY (`atleta_idatleta`)
    REFERENCES `aspa_db`.`atleta` (`idatleta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `aspa_db`.`clasificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aspa_db`.`clasificacion` (
  `prueba_idprueba` INT(11) NOT NULL,
  `atleta_idatleta` INT(11) NOT NULL,
  `posicion` INT NULL,
  INDEX `fk_clasificacion_prueba1_idx` (`prueba_idprueba` ASC),
  INDEX `fk_clasificacion_atleta1_idx` (`atleta_idatleta` ASC),
  CONSTRAINT `fk_clasificacion_prueba1`
    FOREIGN KEY (`prueba_idprueba`)
    REFERENCES `aspa_db`.`prueba` (`idprueba`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_clasificacion_atleta1`
    FOREIGN KEY (`atleta_idatleta`)
    REFERENCES `aspa_db`.`atleta` (`idatleta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
