--
-- Dumping data
--

LOCK TABLES `usuario` WRITE;
INSERT INTO `usuario` (`idusuario`,`email`,`password`,`nombre`,`apellidos`,`dni`,`telefono`,`rol`,`categoria`,`licencia`) VALUES 
(1,'econde@fga.com','´Pk+¨úÕ~.¾××','Edgar','Conde Nóvoa','48468376H','663377221','JUEZ','NI','ECN160693'),
(2,'admin@fga.com','´Pk+¨úÕ~.¾××','Admin','Admin','43567565T','666666666','ADMIN','NIII','ADMIN'),
(3,'rperez@fga.com','´Pk+¨úÕ~.¾××','Raquel','Pérez García','444334223P','674665863','JUEZ','JAUT','RPP121193'),
(4,'jmartinez@fga.com','´Pk+¨úÕ~.¾××','Jose Manuel','Martínez Martínez','34985672J','622141353','JUEZ','NI','JMM100268'),
(5,'amartinez@fga.com','´Pk+¨úÕ~.¾××','Adrián','Martínez Pérez','444333681M','695823224','JUEZ','JAUT','AMP100268'),
(6,'pperez@fga.com','´Pk+¨úÕ~.¾××','Pilar','Pérez Conde','323434998B','622354887','JUEZ','JAUT','PPC100268'),
(7,'edominguez@fga.com','´Pk+¨úÕ~.¾××','Estela','Domínguez Ramos','36454876V','699854223','JUEZ','NIII','EDR100268'),
(8,'jcastro@fga.com','´Pk+¨úÕ~.¾××','Javier','Castro Novelle','39902313S','660023245','JUEZ','JAUT','JCV100268'),
(9,'ofortes@fga.com','´Pk+¨úÕ~.¾××','Óscar','Fortes Estévez','47782321Q','642001548','JUEZ','NI','OFE100268'),
(10,'llores@fga.com','´Pk+¨úÕ~.¾××','Leticia','Lores Docasar','37225335H','68450328','JUEZ','NI','LLD100268'),
(11,'mrodriguez@fga.com','´Pk+¨úÕ~.¾××','Manuel','Rodríguez Santos','36235634G','650226554','JUEZ','NI','MRS100268'),
(12,'ecovas@fga.com','´Pk+¨úÕ~.¾××','Elena','Covas Vázquez','43454568R','625440226','JUEZ','NII','ECV100268'),
(13,'slago@fga.com','´Pk+¨úÕ~.¾××','Sara Lago Piñeiro','Admin','43534435F','665441008','JUEZ','NII','SLP100268'),
(14,'alopez@fga.com','´Pk+¨úÕ~.¾××','Alberto','López Carvajal','43735815T','675485665','JUEZ','NII','ALC100268'),
(15,'niglesias@fga.com','´Pk+¨úÕ~.¾××','Natalia','Iglesias González','43546455W','687405475','JUEZ','NI','NIG100268');
UNLOCK TABLES;

LOCK TABLES `tipo_prueba` WRITE;
INSERT INTO `tipo_prueba` (`idtipoprueba`,`sexo`,`disciplina`,`categoria`) VALUES
(1,'MASCULINO','LANZAMIENTO_JABALINA','BENJAMIN'),
(2,'FEMENINO','LANZAMIENTO_JABALINA','BENJAMIN'),
(3,'MIXTO','LANZAMIENTO_JABALINA','BENJAMIN'),
(4,'MASCULINO','LANZAMIENTO_JABALINA','ALEVIN'),
(5,'FEMENINO','LANZAMIENTO_JABALINA','ALEVIN'),
(6,'MIXTO','LANZAMIENTO_JABALINA','ALEVIN'),
(7,'MASCULINO','LANZAMIENTO_JABALINA','INFANTIL'),
(8,'FEMENINO','LANZAMIENTO_JABALINA','INFANTIL'),
(9,'MIXTO','LANZAMIENTO_JABALINA','INFANTIL'),
(10,'MASCULINO','LANZAMIENTO_JABALINA','CADETE'),
(11,'FEMENINO','LANZAMIENTO_JABALINA','CADETE'),
(12,'MIXTO','LANZAMIENTO_JABALINA','CADETE'),
(13,'MASCULINO','LANZAMIENTO_JABALINA','JUVENIL'),
(14,'FEMENINO','LANZAMIENTO_JABALINA','JUVENIL'),
(15,'MIXTO','LANZAMIENTO_JABALINA','JUVENIL'),
(16,'MASCULINO','LANZAMIENTO_JABALINA','PROMESA'),
(17,'FEMENINO','LANZAMIENTO_JABALINA','PROMESA'),
(18,'MIXTO','LANZAMIENTO_JABALINA','PROMESA'),
(19,'MASCULINO','LANZAMIENTO_JABALINA','ABSOLUTA'),
(20,'FEMENINO','LANZAMIENTO_JABALINA','ABSOLUTA'),
(21,'MIXTO','LANZAMIENTO_JABALINA','ABSOLUTA'),
(22,'MASCULINO','LANZAMIENTO_JABALINA','MASTER'),
(23,'FEMENINO','LANZAMIENTO_JABALINA','MASTER'),
(24,'MIXTO','LANZAMIENTO_JABALINA','MASTER'),
(25,'MASCULINO','LANZAMIENTO_DISCO','BENJAMIN'),
(26,'FEMENINO','LANZAMIENTO_DISCO','BENJAMIN'),
(27,'MIXTO','LANZAMIENTO_DISCO','BENJAMIN'),
(28,'MASCULINO','LANZAMIENTO_DISCO','ALEVIN'),
(29,'FEMENINO','LANZAMIENTO_DISCO','ALEVIN'),
(30,'MIXTO','LANZAMIENTO_DISCO','ALEVIN'),
(31,'MASCULINO','LANZAMIENTO_DISCO','INFANTIL'),
(32,'FEMENINO','LANZAMIENTO_DISCO','INFANTIL'),
(33,'MIXTO','LANZAMIENTO_DISCO','INFANTIL'),
(34,'MASCULINO','LANZAMIENTO_DISCO','CADETE'),
(35,'FEMENINO','LANZAMIENTO_DISCO','CADETE'),
(36,'MIXTO','LANZAMIENTO_DISCO','CADETE'),
(37,'MASCULINO','LANZAMIENTO_DISCO','JUVENIL'),
(38,'FEMENINO','LANZAMIENTO_DISCO','JUVENIL'),
(39,'MIXTO','LANZAMIENTO_DISCO','JUVENIL'),
(40,'MASCULINO','LANZAMIENTO_DISCO','PROMESA'),
(41,'FEMENINO','LANZAMIENTO_DISCO','PROMESA'),
(42,'MIXTO','LANZAMIENTO_DISCO','PROMESA'),
(43,'MASCULINO','LANZAMIENTO_DISCO','ABSOLUTA'),
(44,'FEMENINO','LANZAMIENTO_DISCO','ABSOLUTA'),
(45,'MIXTO','LANZAMIENTO_DISCO','ABSOLUTA'),
(46,'MASCULINO','LANZAMIENTO_DISCO','MASTER'),
(47,'FEMENINO','LANZAMIENTO_DISCO','MASTER'),
(48,'MIXTO','LANZAMIENTO_DISCO','MASTER'),
(49,'MASCULINO','LANZAMIENTO_MARTILLO','BENJAMIN'),
(50,'FEMENINO','LANZAMIENTO_MARTILLO','BENJAMIN'),
(51,'MIXTO','LANZAMIENTO_MARTILLO','BENJAMIN'),
(52,'MASCULINO','LANZAMIENTO_MARTILLO','ALEVIN'),
(53,'FEMENINO','LANZAMIENTO_MARTILLO','ALEVIN'),
(54,'MIXTO','LANZAMIENTO_MARTILLO','ALEVIN'),
(55,'MASCULINO','LANZAMIENTO_MARTILLO','INFANTIL'),
(56,'FEMENINO','LANZAMIENTO_MARTILLO','INFANTIL'),
(57,'MIXTO','LANZAMIENTO_MARTILLO','INFANTIL'),
(58,'MASCULINO','LANZAMIENTO_MARTILLO','CADETE'),
(59,'FEMENINO','LANZAMIENTO_MARTILLO','CADETE'),
(60,'MIXTO','LANZAMIENTO_MARTILLO','CADETE'),
(61,'MASCULINO','LANZAMIENTO_MARTILLO','JUVENIL'),
(62,'FEMENINO','LANZAMIENTO_MARTILLO','JUVENIL'),
(63,'MIXTO','LANZAMIENTO_MARTILLO','JUVENIL'),
(64,'MASCULINO','LANZAMIENTO_MARTILLO','PROMESA'),
(65,'FEMENINO','LANZAMIENTO_MARTILLO','PROMESA'),
(66,'MIXTO','LANZAMIENTO_MARTILLO','PROMESA'),
(67,'MASCULINO','LANZAMIENTO_MARTILLO','ABSOLUTA'),
(68,'FEMENINO','LANZAMIENTO_MARTILLO','ABSOLUTA'),
(69,'MIXTO','LANZAMIENTO_MARTILLO','ABSOLUTA'),
(70,'MASCULINO','LANZAMIENTO_MARTILLO','MASTER'),
(71,'FEMENINO','LANZAMIENTO_MARTILLO','MASTER'),
(72,'MIXTO','LANZAMIENTO_MARTILLO','MASTER'),
(73,'MASCULINO','LANZAMIENTO_PESO','BENJAMIN'),
(74,'FEMENINO','LANZAMIENTO_PESO','BENJAMIN'),
(75,'MIXTO','LANZAMIENTO_PESO','BENJAMIN'),
(76,'MASCULINO','LANZAMIENTO_PESO','ALEVIN'),
(77,'FEMENINO','LANZAMIENTO_PESO','ALEVIN'),
(78,'MIXTO','LANZAMIENTO_PESO','ALEVIN'),
(79,'MASCULINO','LANZAMIENTO_PESO','INFANTIL'),
(80,'FEMENINO','LANZAMIENTO_PESO','INFANTIL'),
(81,'MIXTO','LANZAMIENTO_PESO','INFANTIL'),
(82,'MASCULINO','LANZAMIENTO_PESO','CADETE'),
(83,'FEMENINO','LANZAMIENTO_PESO','CADETE'),
(84,'MIXTO','LANZAMIENTO_PESO','CADETE'),
(85,'MASCULINO','LANZAMIENTO_PESO','JUVENIL'),
(86,'FEMENINO','LANZAMIENTO_PESO','JUVENIL'),
(87,'MIXTO','LANZAMIENTO_PESO','JUVENIL'),
(88,'MASCULINO','LANZAMIENTO_PESO','PROMESA'),
(89,'FEMENINO','LANZAMIENTO_PESO','PROMESA'),
(90,'MIXTO','LANZAMIENTO_PESO','PROMESA'),
(91,'MASCULINO','LANZAMIENTO_PESO','ABSOLUTA'),
(92,'FEMENINO','LANZAMIENTO_PESO','ABSOLUTA'),
(93,'MIXTO','LANZAMIENTO_PESO','ABSOLUTA'),
(94,'MASCULINO','LANZAMIENTO_PESO','MASTER'),
(95,'FEMENINO','LANZAMIENTO_PESO','MASTER'),
(96,'MIXTO','LANZAMIENTO_PESO','MASTER'),
(97,'MASCULINO','SALTO_PERTIGA','BENJAMIN'),
(98,'FEMENINO','SALTO_PERTIGA','BENJAMIN'),
(99,'MIXTO','SALTO_PERTIGA','BENJAMIN'),
(100,'MASCULINO','SALTO_PERTIGA','ALEVIN'),
(101,'FEMENINO','SALTO_PERTIGA','ALEVIN'),
(102,'MIXTO','SALTO_PERTIGA','ALEVIN'),
(103,'MASCULINO','SALTO_PERTIGA','INFANTIL'),
(104,'FEMENINO','SALTO_PERTIGA','INFANTIL'),
(105,'MIXTO','SALTO_PERTIGA','INFANTIL'),
(106,'MASCULINO','SALTO_PERTIGA','CADETE'),
(107,'FEMENINO','SALTO_PERTIGA','CADETE'),
(108,'MIXTO','SALTO_PERTIGA','CADETE'),
(109,'MASCULINO','SALTO_PERTIGA','JUVENIL'),
(110,'FEMENINO','SALTO_PERTIGA','JUVENIL'),
(111,'MIXTO','SALTO_PERTIGA','JUVENIL'),
(112,'MASCULINO','SALTO_PERTIGA','PROMESA'),
(113,'FEMENINO','SALTO_PERTIGA','PROMESA'),
(114,'MIXTO','SALTO_PERTIGA','PROMESA'),
(115,'MASCULINO','SALTO_PERTIGA','ABSOLUTA'),
(116,'FEMENINO','SALTO_PERTIGA','ABSOLUTA'),
(117,'MIXTO','SALTO_PERTIGA','ABSOLUTA'),
(118,'MASCULINO','SALTO_PERTIGA','MASTER'),
(119,'FEMENINO','SALTO_PERTIGA','MASTER'),
(120,'MIXTO','SALTO_PERTIGA','MASTER'),
(121,'MASCULINO','SALTO_ALTURA','BENJAMIN'),
(122,'FEMENINO','SALTO_ALTURA','BENJAMIN'),
(123,'MIXTO','SALTO_ALTURA','BENJAMIN'),
(124,'MASCULINO','SALTO_ALTURA','ALEVIN'),
(125,'FEMENINO','SALTO_ALTURA','ALEVIN'),
(126,'MIXTO','SALTO_ALTURA','ALEVIN'),
(127,'MASCULINO','SALTO_ALTURA','INFANTIL'),
(128,'FEMENINO','SALTO_ALTURA','INFANTIL'),
(129,'MIXTO','SALTO_ALTURA','INFANTIL'),
(130,'MASCULINO','SALTO_ALTURA','CADETE'),
(131,'FEMENINO','SALTO_ALTURA','CADETE'),
(132,'MIXTO','SALTO_ALTURA','CADETE'),
(133,'MASCULINO','SALTO_ALTURA','JUVENIL'),
(134,'FEMENINO','SALTO_ALTURA','JUVENIL'),
(135,'MIXTO','SALTO_ALTURA','JUVENIL'),
(136,'MASCULINO','SALTO_ALTURA','PROMESA'),
(137,'FEMENINO','SALTO_ALTURA','PROMESA'),
(138,'MIXTO','SALTO_ALTURA','PROMESA'),
(139,'MASCULINO','SALTO_ALTURA','ABSOLUTA'),
(140,'FEMENINO','SALTO_ALTURA','ABSOLUTA'),
(141,'MIXTO','SALTO_ALTURA','ABSOLUTA'),
(142,'MASCULINO','SALTO_ALTURA','MASTER'),
(143,'FEMENINO','SALTO_ALTURA','MASTER'),
(144,'MIXTO','SALTO_ALTURA','MASTER'),
(145,'MASCULINO','SALTO_LONGITUD','BENJAMIN'),
(146,'FEMENINO','SALTO_LONGITUD','BENJAMIN'),
(147,'MIXTO','SALTO_LONGITUD','BENJAMIN'),
(148,'MASCULINO','SALTO_LONGITUD','ALEVIN'),
(149,'FEMENINO','SALTO_LONGITUD','ALEVIN'),
(150,'MIXTO','SALTO_LONGITUD','ALEVIN'),
(151,'MASCULINO','SALTO_LONGITUD','INFANTIL'),
(152,'FEMENINO','SALTO_LONGITUD','INFANTIL'),
(153,'MIXTO','SALTO_LONGITUD','INFANTIL'),
(154,'MASCULINO','SALTO_LONGITUD','CADETE'),
(155,'FEMENINO','SALTO_LONGITUD','CADETE'),
(156,'MIXTO','SALTO_LONGITUD','CADETE'),
(157,'MASCULINO','SALTO_LONGITUD','JUVENIL'),
(158,'FEMENINO','SALTO_LONGITUD','JUVENIL'),
(159,'MIXTO','SALTO_LONGITUD','JUVENIL'),
(160,'MASCULINO','SALTO_LONGITUD','PROMESA'),
(161,'FEMENINO','SALTO_LONGITUD','PROMESA'),
(162,'MIXTO','SALTO_LONGITUD','PROMESA'),
(163,'MASCULINO','SALTO_LONGITUD','ABSOLUTA'),
(164,'FEMENINO','SALTO_LONGITUD','ABSOLUTA'),
(165,'MIXTO','SALTO_LONGITUD','ABSOLUTA'),
(166,'MASCULINO','SALTO_LONGITUD','MASTER'),
(167,'FEMENINO','SALTO_LONGITUD','MASTER'),
(168,'MIXTO','SALTO_LONGITUD','MASTER'),
(169,'MASCULINO','TRIPLE_SALTO','BENJAMIN'),
(170,'FEMENINO','TRIPLE_SALTO','BENJAMIN'),
(171,'MIXTO','TRIPLE_SALTO','BENJAMIN'),
(172,'MASCULINO','TRIPLE_SALTO','ALEVIN'),
(173,'FEMENINO','TRIPLE_SALTO','ALEVIN'),
(174,'MIXTO','TRIPLE_SALTO','ALEVIN'),
(175,'MASCULINO','TRIPLE_SALTO','INFANTIL'),
(176,'FEMENINO','TRIPLE_SALTO','INFANTIL'),
(177,'MIXTO','TRIPLE_SALTO','INFANTIL'),
(178,'MASCULINO','TRIPLE_SALTO','CADETE'),
(179,'FEMENINO','TRIPLE_SALTO','CADETE'),
(180,'MIXTO','TRIPLE_SALTO','CADETE'),
(181,'MASCULINO','TRIPLE_SALTO','JUVENIL'),
(182,'FEMENINO','TRIPLE_SALTO','JUVENIL'),
(183,'MIXTO','TRIPLE_SALTO','JUVENIL'),
(184,'MASCULINO','TRIPLE_SALTO','PROMESA'),
(185,'FEMENINO','TRIPLE_SALTO','PROMESA'),
(186,'MIXTO','TRIPLE_SALTO','PROMESA'),
(187,'MASCULINO','TRIPLE_SALTO','ABSOLUTA'),
(188,'FEMENINO','TRIPLE_SALTO','ABSOLUTA'),
(189,'MIXTO','TRIPLE_SALTO','ABSOLUTA'),
(190,'MASCULINO','TRIPLE_SALTO','MASTER'),
(191,'FEMENINO','TRIPLE_SALTO','MASTER'),
(192,'MIXTO','TRIPLE_SALTO','MASTER');
UNLOCK TABLES;

LOCK TABLES `competicion` WRITE;
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (1,'XIII Copa Diputación','2019-03-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (2,'XIII Copa Galicia','2019-04-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (3,'XIII Trofeo Aurum','2019-05-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (4,'Campionato Galego de Clubes','2019-11-20','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (5,'Control de Marcas','2019-11-22','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (6,'XIV Copa Diputación','2020-03-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (7,'XIV Copa Galicia','2020-04-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (8,'XIV Trofeo Aurum','2020-05-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (9,'XV Copa Diputación','2021-03-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (10,'XV Copa Galicia','2021-04-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (11,'XV Trofeo Aurum','2021-05-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (12,'XVI Copa Diputación','2022-03-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (13,'XVI Copa Galicia','2022-04-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (14,'XVI Trofeo Aurum','2022-05-29','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (15,'Control de Marcas','2019-11-22','Ourense');
INSERT INTO `competicion` (`idcompeticion`,`nombre`,`fecha`,`lugar`) VALUES (16,'Campionato Galego Clubes 2019','2019-11-20','Ourense');
UNLOCK TABLES;

LOCK TABLES `club` WRITE;
INSERT INTO `club` (`idclub`,`licencia`,`nombre`,`direccion`,`telefono`,`email`) VALUES
(1,'83274RPQ','Ourense Atletismo','Estadio El Couto','654654654','ourenseatletismo@gmail.com'),
(2,'NAOC','Atletismo Narón','Avenida de Narón nº 1','632632632','naoc@gmail.com'),
(3,'MILC','Club Atletismo Millaraio','Calle Los Rosales nº 34','632896632','milc@gmail.com'),
(4,'84451TRN','Club Atletismo Celta de Vigo','Avenida de Balaídos nº 13','632454632','rcdcdvatletismo@gmail.com'),
(5,'RZCC','Atletismo Riazor Coruña','Avenida de Fisterre nº 4','632454632','rzcc@gmail.com'),
(6,'NOYC','Club Atletismo Noia','Rúa do Porto nº 61','632454632','noyc@gmail.com'),
(7,'SILC','Atlética A Silva','Avenida de Fisterre nº 4','632454632','silc@gmail.com'),
(8,'74493GNB','Club Atletismo Carballiño','Rúa Manuel Murguía 7','632454632','catcarb@gmail.com'),
(9,'74231HYM','C.D. Limia Activa','Rúa 15 de Maio nº 8','632454632','limactiva@gmail.com'),
(10,'FONC','Atletismo Fontes do Sar','Avenida Fontes do Sar nº 24','632454632','fonc@gmail.com');
UNLOCK TABLES;

LOCK TABLES `atleta` WRITE;
INSERT INTO `atleta` (`idatleta`,`licencia`,`email`,`password`,`nombre`,`apellidos`,`fecha_nacimiento`,`sexo`,`dni`,`telefono`,`club_idclub`) VALUES
(1,'APF10031978','apf@fga.com','´Pk+¨úÕ~.¾××','Adolfo','Pérez Fernández','1978-03-19',0,'14567789A','663344981',2),
(2,'PLR24041983','plr@fga.com','´Pk+¨úÕ~.¾××','Pedro','Lorenzo Riveiros','1983-03-19',0,'24567789B','663344982',2),
(3,'FPM22021975','fpm@fga.com','´Pk+¨úÕ~.¾××','Fabián','Pérez Martínez','1975-03-19',0,'34567789C','663344983',2),
(4,'MCI12061977','mci@fga.com','´Pk+¨úÕ~.¾××','Manuel','Cruz Mahia','1977-03-19',0,'44567789D','663344984',2),
(5,'MRR23091991','mrr@fga.com','´Pk+¨úÕ~.¾××','Marco Antonio','Rodríguez Rodríguez','1991-03-19',0,'54567789E','663344985',2),
(6,'RPP03051991','rpp@fga.com','´Pk+¨úÕ~.¾××','Rubén','Pérez Pérez','1991-03-19',0,'64567789F','663344986',1),
(7,'DAD12011988','dad@fga.com','´Pk+¨úÕ~.¾××','David','Álvarez Del Pino','1988-03-19',0,'74567789G','663344987',1),
(8,'AYB12121983','ayb@fga.com','´Pk+¨úÕ~.¾××','Álvaro','Yanes Basanta','1983-03-19',0,'84567789H','663344988',1),
(9,'ECN16061993','ecn@fga.com','´Pk+¨úÕ~.¾××','Edgar','Conde Nóvoa','1993-06-16',0,'35267789I','663344989',1),
(10,'MAV16061996','mav@fga.com','´Pk+¨úÕ~.¾××','Martín','Álvarez Varela','1996-06-16',0,'45367789I','663344989',1),
(11,'CGD16061998','cgd@fga.com','´Pk+¨úÕ~.¾××','Cristian','García Domínguez','1998-06-16',0,'44467789I','663344989',3),
(12,'GMT16062000','gmt@fga.com','´Pk+¨úÕ~.¾××','Guillermo','Moure Terradillos','2000-06-16',0,'66567789I','663344989',4),
(13,'APP16062001','app@fga.com','´Pk+¨úÕ~.¾××','Alejandro','Pérez Pérez','2001-06-16',0,'14567789I','663344989',3),
(14,'DCS16062002','dcs@fga.com','´Pk+¨úÕ~.¾××','Diego','Cebreiros Sotillo','2002-06-16',0,'24567789I','663344989',4),
(15,'JGG16062003','jgg@fga.com','´Pk+¨úÕ~.¾××','Jacobo','González González','2003-06-16',0,'34567789I','663344989',4),
(16,'DFC16062004','dfc@fga.com','´Pk+¨úÕ~.¾××','Diego','Fernández Cortés','2004-06-16',0,'44567789I','663344989',4),
(17,'MSS16062006','mss@fga.com','´Pk+¨úÕ~.¾××','Martín','Suárez Suárez','2006-06-16',0,'54567789I','663344989',3),
(18,'CNB16062008','cnb@fga.com','´Pk+¨úÕ~.¾××','Carlos','Noguerol Barrenechea','2008-06-16',0,'64567789I','663344989',3),
(19,'IFL16062009','ifl@fga.com','´Pk+¨úÕ~.¾××','Ignacio','Fernández López','2009-06-16',0,'74567789I','663344989',3),
(20,'DNB16062010','dnb@fga.com','´Pk+¨úÕ~.¾××','Diego','Nóvoa Blanco','2010-06-16',0,'84567789I','663344989',4),
(21,'RSC16061993','rsc@fga.com','´Pk+¨úÕ~.¾××','Raquel','Seixas Corral','1993-06-16',1,'44558889I','663344989',4),
(22,'XCG16061998','xcg@fga.com','´Pk+¨úÕ~.¾××','Xiana','Cid González','1998-06-16',1,'54561189I','663344989',3),
(23,'MED16061999','med@fga.com','´Pk+¨úÕ~.¾××','María','Estévez Domarco','2008-06-16',1,'64564259I','663344989',3),
(24,'PGD16062000','pgd@fga.com','´Pk+¨úÕ~.¾××','Paula','González Diéguez','2009-06-16',1,'74112789I','663344989',3),
(25,'MSC16062004','msc@fga.com','´Pk+¨úÕ~.¾××','Marta','Seixas Corral','2010-06-16',1,'84667789I','663344989',4);
UNLOCK TABLES;

LOCK TABLES `prueba` WRITE;
INSERT INTO `prueba` (`idprueba`,`fecha`,`hora_prueba`,`apertura_camara`,`cierre_camara`,`competicion_idcompeticion`,`usuario_idusuario`,`tipo_prueba_idtipoprueba`,`num_intentos`,`num_intentos_mejora`,`num_atletas_mejora`,`finalizada`) VALUES
(1,'2019-03-29','2019-03-29 09:40:00','2019-03-29 09:50:00','2019-03-29 10:00:00',1,1,189,3,3,8,1),
(2,'2019-03-29','2019-03-29 09:40:00','2019-03-29 09:50:00','2019-03-29 10:00:00',1,5,117,0,0,0,1),
(3,'2019-03-29','2019-03-29 09:40:00','2019-03-29 09:50:00','2019-03-29 10:00:00',1,3,87,3,3,8,1),
(4,'2019-03-29','2019-03-29 09:40:00','2019-03-29 09:50:00','2019-03-29 10:00:00',1,2,124,0,0,0,1),
(5,'2019-03-29','2019-03-29 09:40:00','2019-03-29 09:50:00','2019-03-29 10:00:00',1,4,157,3,3,8,1),
(6,'2019-03-29','2019-03-29 09:40:00','2019-03-29 09:50:00','2019-03-29 10:00:00',1,6,131,0,0,0,1);
UNLOCK TABLES;

LOCK TABLES `inscripcion` WRITE;
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (1,1,1,1,1);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (2,2,1,1,2);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (3,3,1,1,3);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (4,4,1,1,4);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (5,5,1,1,5);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (6,6,1,1,6);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (7,7,1,1,7);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (8,8,1,1,8);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (9,21,1,1,9);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (10,22,1,1,10);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (11,23,1,1,11);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (12,24,1,1,12);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (13,25,1,1,13);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (14,1,2,1,1);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (15,3,2,1,2);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (16,4,2,1,3);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (17,2,2,1,4);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (18,21,2,1,5);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (19,22,2,1,6);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (21,24,2,1,8);
INSERT INTO `inscripcion` (`idinscripcion`,`atleta_idatleta`,`prueba_idprueba`,`presentado`,`dorsal`) VALUES (22,25,2,1,9);
UNLOCK TABLES;

LOCK TABLES `marca_prueba_ns` WRITE;
INSERT INTO `marca_prueba_ns` (`prueba_idprueba`,`atleta_idatleta`,`intento`,`resultado`,`marca`) VALUES
(1,1,1,'VALIDO','10.52'),
(1,1,2,'NULO',NULL),
(1,1,3,'VALIDO','12.55'),
(1,1,4,'VALIDO','12.62'),
(1,1,5,'NULO',NULL),
(1,1,6,'VALIDO','12.72'),
(1,2,1,'NULO',NULL),
(1,2,2,'NULO',NULL),
(1,2,3,'VALIDO','12.63'),
(1,2,4,'NULO',NULL),
(1,2,5,'NULO',NULL),
(1,2,6,'VALIDO','12.63'),
(1,3,1,'PASA',NULL),
(1,3,2,'VALIDO','12.53'),
(1,3,3,'NULO',NULL),
(1,3,4,'VALIDO','12.6'),
(1,3,5,'VALIDO','12.7'),
(1,3,6,'NULO',NULL),
(1,4,1,'VALIDO','10.54'),
(1,4,2,'PASA',NULL),
(1,4,3,'NULO',NULL),
(1,4,4,'NULO',NULL),
(1,4,5,'PASA',NULL),
(1,4,6,'VALIDO','11.52'),
(1,5,1,'PASA',NULL),
(1,5,2,'NULO',NULL),
(1,5,3,'NULO',NULL),
(1,6,1,'VALIDO','11'),
(1,6,2,'NULO',NULL),
(1,6,3,'VALIDO','11.54'),
(1,6,4,'NULO',NULL),
(1,6,5,'NULO',NULL),
(1,6,6,'VALIDO','11.54'),
(1,7,1,'NULO',NULL),
(1,7,2,'VALIDO','10.2'),
(1,7,3,'PASA',NULL),
(1,8,1,'NULO',NULL),
(1,8,2,'VALIDO','10.52'),
(1,8,3,'PASA',NULL),
(1,8,4,'VALIDO','12.02'),
(1,8,5,'VALIDO','11.52'),
(1,8,6,'VALIDO','11.48'),
(1,21,1,'VALIDO','12.42'),
(1,21,2,'NULO',NULL),
(1,21,3,'VALIDO','12.61'),
(1,21,4,'VALIDO','12.42'),
(1,21,5,'NULO',NULL),
(1,21,6,'VALIDO','12.84'),
(1,22,1,'NULO',NULL),
(1,22,2,'VALIDO','9.53'),
(1,22,3,'PASA',NULL),
(1,23,1,'PASA',NULL),
(1,23,2,'VALIDO','10'),
(1,23,3,'PASA',NULL),
(1,24,1,'VALIDO','9.98'),
(1,24,2,'VALIDO','10.24'),
(1,24,3,'VALIDO','10.35'),
(1,25,1,'VALIDO','10.41'),
(1,25,2,'PASA',NULL),
(1,25,3,'VALIDO','10.54'),
(1,25,4,'NULO',NULL),
(1,25,5,'VALIDO','12.45'),
(1,25,6,'NULO',NULL);
UNLOCK TABLES;

LOCK TABLES `prueba_altura` WRITE;
INSERT INTO `prueba_altura` (`prueba_idprueba`,`idaltura`,`altura`) VALUES
(2,1,1.5),
(2,2,1.55),
(2,3,1.6),
(2,4,1.65),
(2,5,1.7),
(2,6,1.73),
(2,7,1.76);
UNLOCK TABLES;

LOCK TABLES `marca_prueba_sv` WRITE;
INSERT INTO `marca_prueba_sv` (`intento`,`prueba_altura_prueba_idprueba`,`prueba_altura_idaltura`,`atleta_idatleta`,`resultado`) VALUES
(1,2,1,1,'NULO'),
(1,2,1,2,'NULO'),
(1,2,1,3,'VALIDO'),
(1,2,1,4,'PASA'),
(1,2,1,21,'NULO'),
(1,2,1,22,'PASA'),
(1,2,1,24,'NULO'),
(1,2,1,25,'PASA'),
(1,2,2,1,'VALIDO'),
(1,2,2,2,'NULO'),
(1,2,2,3,'NULO'),
(1,2,2,4,'NULO'),
(1,2,2,21,'VALIDO'),
(1,2,2,22,'NULO'),
(1,2,2,24,'VALIDO'),
(1,2,2,25,'PASA'),
(1,2,3,1,'VALIDO'),
(1,2,3,2,'NULO'),
(1,2,3,3,'VALIDO'),
(1,2,3,4,'NULO'),
(1,2,3,21,'NULO'),
(1,2,3,22,'NULO'),
(1,2,3,24,'NULO'),
(1,2,3,25,'VALIDO'),
(1,2,4,1,'NULO'),
(1,2,4,2,'NULO'),
(1,2,4,3,'NULO'),
(1,2,4,4,'NULO'),
(1,2,4,21,'NULO'),
(1,2,4,25,'NULO'),
(1,2,5,1,'NULO'),
(1,2,5,2,'NULO'),
(1,2,5,21,'VALIDO'),
(1,2,6,1,'NULO'),
(1,2,6,21,'NULO'),
(1,2,7,21,'NULO'),
(2,2,1,1,'VALIDO'),
(2,2,1,2,'VALIDO'),
(2,2,1,21,'VALIDO'),
(2,2,1,24,'PASA'),
(2,2,2,2,'VALIDO'),
(2,2,2,3,'PASA'),
(2,2,2,4,'VALIDO'),
(2,2,2,22,'VALIDO'),
(2,2,3,2,'VALIDO'),
(2,2,3,4,'NULO'),
(2,2,3,21,'VALIDO'),
(2,2,3,22,'NULO'),
(2,2,3,24,'NULO'),
(2,2,4,1,'VALIDO'),
(2,2,4,2,'NULO'),
(2,2,4,3,'NULO'),
(2,2,4,4,'NULO'),
(2,2,4,21,'VALIDO'),
(2,2,4,25,'NULO'),
(2,2,5,1,'VALIDO'),
(2,2,5,2,'NULO'),
(2,2,6,1,'NULO'),
(2,2,6,21,'NULO'),
(2,2,7,21,'NULO'),
(3,2,3,4,'VALIDO'),
(3,2,3,22,'NULO'),
(3,2,3,24,'NULO'),
(3,2,4,2,'VALIDO'),
(3,2,4,3,'NULO'),
(3,2,4,4,'NULO'),
(3,2,4,25,'NULO'),
(3,2,5,2,'NULO'),
(3,2,6,1,'NULO'),
(3,2,6,21,'VALIDO'),
(3,2,7,21,'NULO');
UNLOCK TABLES;

LOCK TABLES `clasificacion` WRITE;
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,1,2);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,2,4);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,3,3);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,4,8);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,5,NULL);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,6,7);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,7,10);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,8,6);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,21,1);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,22,12);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,23,11);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,24,9);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (1,25,5);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (2,1,2);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (2,3,5);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (2,4,6);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (2,2,3);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (2,21,1);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (2,22,8);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (2,24,7);
INSERT INTO `clasificacion` (`prueba_idprueba`,`atleta_idatleta`,`posicion`) VALUES (2,25,4);
UNLOCK TABLES;