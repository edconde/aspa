DROP SCHEMA IF EXISTS `aspa_db`;
-- Si queremos restringir el acceso sólo desde una máquina en concreto:
-- CREATE USER IF NOT EXISTS 'aspa'@'XXX.XXX.XXX.XXX' IDENTIFIED BY 'aspassword';
CREATE USER IF NOT EXISTS 'aspa' IDENTIFIED BY 'aspassword';
CREATE SCHEMA IF NOT EXISTS `aspa_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
GRANT ALL PRIVILEGES ON aspa_db.* TO 'aspa';
FLUSH PRIVILEGES;