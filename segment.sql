/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.243
Source Server Version : 50718
Source Host           : 192.168.0.243:3306
Source Database       : segment

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-05-11 11:10:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articleList
-- ----------------------------
DROP TABLE IF EXISTS `articleList`;
CREATE TABLE `articleList` (
  `aid` int(11) NOT NULL,
  `typeid` int(11) NOT NULL,
  `title` varchar(240) NOT NULL,
  `content` varchar(600) NOT NULL,
  `uid` bigint(20) NOT NULL,
  `looknum` bigint(20) NOT NULL DEFAULT '0',
  `renum` int(11) NOT NULL DEFAULT '0',
  `finished` tinyint(4) NOT NULL DEFAULT '0',
  `updatetime` timestamp NULL DEFAULT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `subTitle` varchar(500) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `titleLabel` varchar(45) DEFAULT NULL,
  `sort` int(11) DEFAULT '0',
  PRIMARY KEY (`aid`),
  KEY `articleType_Id_idx` (`typeid`),
  CONSTRAINT `articleType_Id` FOREIGN KEY (`typeid`) REFERENCES `articleType` (`articleTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articleList
-- ----------------------------
INSERT INTO `articleList` VALUES ('1', '1', 'tttt', 'ccc', '7', '0', '0', '0', '2018-04-11 11:10:04', '2018-04-11 11:10:04', 'sss', '0', 'null', null);
INSERT INTO `articleList` VALUES ('2', '1', 'gbbb', 'bbdfadafaf', '7', '0', '0', '0', '2018-04-11 11:10:04', '2018-04-11 11:10:04', null, '1', 'putcontent....', null);
INSERT INTO `articleList` VALUES ('3', '1', 'bbb', 'bghgh', '7', '0', '0', '0', '2018-04-11 11:10:04', '2018-04-11 11:10:04', null, '0', null, null);
INSERT INTO `articleList` VALUES ('4', '2', '李沛谊', 'vvv', '7', '0', '0', '0', '2018-04-11 11:10:04', '2018-04-11 11:10:04', null, '0', null, null);
INSERT INTO `articleList` VALUES ('5', '2', 'ddfdas', 'fasfa', '7', '0', '0', '0', '2018-04-11 11:10:04', '2018-04-11 11:10:04', null, '0', null, null);
INSERT INTO `articleList` VALUES ('6', '3', 'ggg', 'gg', '7', '0', '0', '0', '2018-04-11 11:10:04', '2018-04-11 11:10:04', null, '0', null, null);
INSERT INTO `articleList` VALUES ('7', '3', 'fff', 'fafd', '7', '0', '0', '0', '2018-03-24 22:56:56', '2018-03-24 22:56:56', null, null, null, null);
INSERT INTO `articleList` VALUES ('8', '3', 'vvv', 'bbb', '7', '0', '0', '0', '2018-03-24 22:56:56', '2018-03-24 22:56:56', null, null, null, null);
INSERT INTO `articleList` VALUES ('9', '4', 'bbb', 'bbbb', '7', '0', '0', '0', '2018-03-24 22:56:56', '2018-03-24 22:56:56', null, null, null, null);
INSERT INTO `articleList` VALUES ('10', '4', 'vvvb', 'bb', '7', '0', '0', '0', '2018-03-24 22:56:56', '2018-03-24 22:56:56', null, null, null, null);
INSERT INTO `articleList` VALUES ('11', '4', 'd', 'd', '7', '0', '0', '0', '2018-03-24 22:56:56', '2018-03-24 22:56:56', null, null, null, null);
INSERT INTO `articleList` VALUES ('12', '4', 'w', 'w', '7', '0', '0', '0', '2018-03-24 22:20:07', '2018-03-24 22:20:07', null, null, null, null);
INSERT INTO `articleList` VALUES ('13', '4', 'vvv', 'vv', '7', '0', '0', '0', '2018-03-24 22:20:07', '2018-03-24 22:20:07', null, null, null, null);
INSERT INTO `articleList` VALUES ('14', '4', 'ccccvbv', 'bb', '7', '13', '0', '0', '2018-03-25 02:02:02', '2018-03-25 02:02:02', null, null, null, null);
INSERT INTO `articleList` VALUES ('15', '1', '认缴制下公司如何注销？', '                                fafasf\r\n                            fadfasf', '7', '0', '0', '0', '2018-03-25 01:25:46', '2018-03-25 01:25:46', '', null, null, null);
INSERT INTO `articleList` VALUES ('16', '1', '认缴制下公司如何注销？', '认缴制是好的！！！！@#¥%', '7', '0', '0', '0', '2018-03-25 01:26:47', '2018-03-25 01:26:47', '', null, null, null);
INSERT INTO `articleList` VALUES ('17', '1', '认缴制下公司如何注销？', '                                认缴制是好的！！！！@#¥%\r\n                            ', '7', '1', '0', '0', '2018-03-25 01:59:43', '2018-03-25 01:59:43', '二级标题内容在这里', null, null, null);
INSERT INTO `articleList` VALUES ('18', '1', 'dddd', 'FDA', '7', '0', '0', '0', '2018-03-25 02:13:42', '2018-03-25 02:13:42', null, null, null, null);
INSERT INTO `articleList` VALUES ('19', '1', 'TWT', 'DDD', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', '外资如何注册', '6');
INSERT INTO `articleList` VALUES ('20', '1', 'tttt', '                                ccc\r\n                            ', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', '外资如何注册', '6');
INSERT INTO `articleList` VALUES ('21', '1', 'aaaaatttt', '                                ccc\r\n                            ', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', '外资如何注册', '7');
INSERT INTO `articleList` VALUES ('22', '1', 'sisissiysissysisysy', 'csisissiysissysisysy', '7', '0', '0', '0', '2018-03-25 10:06:27', '2018-05-07 09:26:47', null, null, null, '6');
INSERT INTO `articleList` VALUES ('23', '2', 'llpy李沛谊', '                                vvv\r\n                            ', '7', '0', '0', '0', '2018-03-25 10:06:59', '2018-05-07 09:26:47', null, null, null, '5');
INSERT INTO `articleList` VALUES ('24', '1', 'tttt', '                                ccc\r\n                            ', '7', '0', '0', '0', '2018-03-25 16:04:52', '2018-05-07 09:26:47', null, null, null, '3');
INSERT INTO `articleList` VALUES ('25', '1', '如果公司怎么办理？', '如果没有\r\n如果有\r\n如果', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', '外资如何注册', '456');
INSERT INTO `articleList` VALUES ('26', '1', '如果公司怎么办理？', '                                如果没有\r\n如果有\r\n如果\r\n                            ', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', '外资如何注册', '4');
INSERT INTO `articleList` VALUES ('27', '1', '如果公司怎么办理？', '                                                                如果没有\r\n如果有\r\n如果\r\n                            \r\n                            ', '7', '0', '0', '0', '2018-03-25 21:28:37', '2018-05-07 09:26:47', null, null, null, '67');
INSERT INTO `articleList` VALUES ('28', '3', 'AAAggg', '             \r\n阿法律；啊发福利款阿可减肥', '7', '0', '0', '0', '2018-03-25 21:32:11', '2018-05-07 09:26:47', null, null, null, '6');
INSERT INTO `articleList` VALUES ('29', '3', 'AAAggg', '                                             \r\n阿法律；啊发福利款\r\n阿可减肥', '7', '0', '0', '0', '2018-03-25 21:32:32', '2018-05-07 09:26:47', null, null, null, '7');
INSERT INTO `articleList` VALUES ('30', '3', 'AAAggg', '                                                                             \r\n***阿法律；啊发福利款\r\n阿可减肥', '7', '0', '0', '0', '2018-03-25 21:32:56', '2018-05-07 09:26:47', null, null, null, '9');
INSERT INTO `articleList` VALUES ('31', '1', '4444tttt', '<ol><li><em>dfafafa</em><br /></li><li><em>dafafafalfjal</em><br /></li><li><em>fdka;lfas;falsfjal;sfa;lsfja;lsfads;lflasf;lasfjas</em></li><li><em>fdas;lfjas;lfjas</em></li></ol>', '7', '0', '0', '0', '2018-03-25 23:03:08', '2018-05-07 09:26:47', null, null, null, '0');
INSERT INTO `articleList` VALUES ('32', '1', '4444tttt', '                                <ol><li>dfafafa<br /></li><li>dafafafalfjal<br /></li><li>fdka;lfas;falsfjal;sfa;lsfja;lsfads;lflasf;lasfjas</li><li>fdas;lfjas;lfjas</li></ol>', '7', '1', '0', '0', '2018-03-25 23:09:58', '2018-05-07 09:26:47', null, null, null, '0');
INSERT INTO `articleList` VALUES ('33', '1', 'tttt', '                                cccfafaf', '7', '0', '0', '0', '2018-04-01 18:57:08', '2018-05-07 09:26:47', null, null, null, '0');
INSERT INTO `articleList` VALUES ('34', '1', 'aaa', 'fdff', '7', '0', '0', '0', '2018-04-13 02:14:11', '2018-05-07 09:26:47', null, '0', null, '0');
INSERT INTO `articleList` VALUES ('35', '1', 'dfff', 'ff', '7', '0', '0', '0', '2018-04-13 02:15:00', '2018-05-07 09:26:47', null, '0', null, '23');
INSERT INTO `articleList` VALUES ('36', '1', 'fff', 'ff', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', '外资如何注册', '34');
INSERT INTO `articleList` VALUES ('37', '1', 'ffff', 'ff', '7', '0', '0', '0', '2018-04-13 02:16:17', '2018-05-07 09:26:47', null, '0', null, '4');
INSERT INTO `articleList` VALUES ('38', '3', '资质审批', '二级资质申请屏二级资质申请屏二级资质申请屏二级资质申请屏二级资质申请屏二级资质申请屏二级资质申请屏二级资质申请屏二级资质申请屏\r\n1，都发生二级资质申请屏二级资质申请屏二级资质申请屏二级资质申请屏\r\n\r\n3，二级资质申请屏二级资质申请屏二级资质申请屏。', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', null, '6');
INSERT INTO `articleList` VALUES ('39', '2', '李沛谊', '                                vvvff', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', null, '55');
INSERT INTO `articleList` VALUES ('40', '2', '李', '                                vvv', '7', '0', '0', '0', '2018-04-13 02:43:48', '2018-05-07 09:26:47', null, '0', null, '3');
INSERT INTO `articleList` VALUES ('41', '2', '李沛', '                                vvv', '7', '0', '0', '0', '2018-04-13 02:44:07', '2018-05-07 09:26:47', null, '0', null, '2');
INSERT INTO `articleList` VALUES ('42', '1', 'ffff', 'ff', '7', '0', '0', '0', '2018-04-26 14:05:20', '2018-05-07 09:26:47', null, '3', '公司注销', '1');

-- ----------------------------
-- Table structure for articleType
-- ----------------------------
DROP TABLE IF EXISTS `articleType`;
CREATE TABLE `articleType` (
  `articleTypeId` int(11) NOT NULL,
  `articleTypeName` varchar(45) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`articleTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articleType
-- ----------------------------
INSERT INTO `articleType` VALUES ('1', '公司注销', '1');
INSERT INTO `articleType` VALUES ('2', '外资注册', '2');
INSERT INTO `articleType` VALUES ('3', '外资设立办事处', '3');
INSERT INTO `articleType` VALUES ('4', '资质审批1', '4');
INSERT INTO `articleType` VALUES ('5', '资质审批2', '5');

-- ----------------------------
-- Table structure for consult
-- ----------------------------
DROP TABLE IF EXISTS `consult`;
CREATE TABLE `consult` (
  `consultId` int(11) NOT NULL,
  `personNo` varchar(45) DEFAULT NULL,
  `consultTime` varchar(45) DEFAULT NULL,
  `consultContent` varchar(45) DEFAULT NULL,
  `consultType` int(11) DEFAULT NULL,
  `userId` varchar(45) DEFAULT NULL,
  `consultUserId` int(11) NOT NULL,
  PRIMARY KEY (`consultId`,`consultUserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of consult
-- ----------------------------
INSERT INTO `consult` VALUES ('1', '1', '12:30', '你好！', '1', '7', '38');
INSERT INTO `consult` VALUES ('2', '1', '14:09', '什么事情', '0', '7', '38');
INSERT INTO `consult` VALUES ('3', '2', '00:00', 'i want to ask...?', '1', '7', '38');

-- ----------------------------
-- Table structure for consultUser
-- ----------------------------
DROP TABLE IF EXISTS `consultUser`;
CREATE TABLE `consultUser` (
  `consultUserId` int(11) NOT NULL AUTO_INCREMENT,
  `socketId` varchar(45) DEFAULT NULL,
  `consultTime` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `lastChat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`consultUserId`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of consultUser
-- ----------------------------
INSERT INTO `consultUser` VALUES ('38', 'k_j3Oy_T4H9NQ2lSAAAA', '2018-04-11 23:59:02', null, null);
INSERT INTO `consultUser` VALUES ('39', '6nM_HwwQ531Be8hoAAAB', '2018-04-12 00:01:03', null, null);
INSERT INTO `consultUser` VALUES ('40', 'UiAufhuAyMtiIoDHAAAA', '2018-04-12 00:04:00', null, null);
INSERT INTO `consultUser` VALUES ('41', 'RGSFWqoJyD65kdxTAAAA', '2018-04-12 00:04:45', null, null);
INSERT INTO `consultUser` VALUES ('42', 'reTvHZiVO908wiGhAAAA', '2018-04-12 00:05:42', null, null);
INSERT INTO `consultUser` VALUES ('43', 'DSNuPj0BpVRahOIEAAAA', '2018-04-12 00:10:58', null, null);
INSERT INTO `consultUser` VALUES ('44', '7CwEX3gP2IIOhoz_AAAA', '2018-04-12 00:23:30', '1', '好的。');
INSERT INTO `consultUser` VALUES ('45', '/consult#3lEXVLSAuRG-t4d_AAAA', '2018-04-12 00:32:42', '1', '谢谢！');
INSERT INTO `consultUser` VALUES ('46', '-7qPZDqCKJFLzjiLAAAC', '2018-04-12 00:51:42', '1', '再见！');
INSERT INTO `consultUser` VALUES ('47', 'JMOas3R_IGEKi1GPAAAD', '2018-04-12 00:52:06', '1', '多谢！');
INSERT INTO `consultUser` VALUES ('48', 'qTS1W2yFSHRWU0nVAAAC', '2018-04-12 00:52:40', '1', '我看看');
INSERT INTO `consultUser` VALUES ('49', 'zmiHiesL2dufJtwhAAAB', '2018-04-12 00:55:15', '0', null);
INSERT INTO `consultUser` VALUES ('50', 'i8n29S_Tgo1mGFWWAAAE', '2018-04-12 00:56:32', '0', null);
INSERT INTO `consultUser` VALUES ('51', 'kuCU775E4DPKooxOAAAC', '2018-04-12 11:34:46', '0', null);
INSERT INTO `consultUser` VALUES ('52', 'gEF175OX73dc46zPAAAd', '2018-04-12 20:31:21', '0', null);
INSERT INTO `consultUser` VALUES ('53', 'BYNfC15ZtV3fsxzDAAAe', '2018-04-12 20:31:25', '0', null);
INSERT INTO `consultUser` VALUES ('54', 'tOwtIbmeOGXa9d-hAAAF', '2018-04-13 16:30:39', '0', null);
INSERT INTO `consultUser` VALUES ('55', '4MYDzDiJFZyk73U1AAAA', '2018-04-17 08:39:25', '1', null);
INSERT INTO `consultUser` VALUES ('56', 'mCRzZnSXIM-E4hWZAAAA', '2018-04-22 14:39:37', '1', null);
INSERT INTO `consultUser` VALUES ('57', 'WOtvCg0jZfj8UaIaAAAB', '2018-04-22 14:58:08', '0', null);
INSERT INTO `consultUser` VALUES ('58', '4VlN29Cvj1J3OOH1AAAC', '2018-04-22 14:58:10', '0', null);
INSERT INTO `consultUser` VALUES ('59', '1', '2018-04-24 09:32:29', null, null);

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `client_ip` varchar(100) NOT NULL COMMENT '客户ip',
  `chattime` datetime NOT NULL COMMENT '聊天时间',
  `message` varchar(1000) NOT NULL COMMENT '聊天消息',
  `client_id` varchar(100) DEFAULT NULL COMMENT '客户端id',
  `whosaid` char(1) NOT NULL COMMENT '该条信息是谁发送的  S 客服      C 用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('1', '7', '192.168.1.23', '2018-03-27 13:10:10', 'hello', '2rcy9h8brdf', 'C');
INSERT INTO `message` VALUES ('2', '7', '192.168.1.23', '2018-03-27 13:10:11', 'hell1', '2rcy9h8brdc', 'C');
INSERT INTO `message` VALUES ('3', '8', '192.168.1.23', '2018-03-27 13:10:11', 'hell1', '2rcy9h8brdd', 'C');
INSERT INTO `message` VALUES ('4', '8', '192.168.1.23', '2018-03-27 13:10:12', 'hell0', '2rcy9h8brde', 'C');
INSERT INTO `message` VALUES ('5', '7', '::ffff:192.168.0.202', '2018-05-09 13:47:54', '123456', '2rcy9h8brdb', 'S');
INSERT INTO `message` VALUES ('6', '7', '::ffff:192.168.0.202', '2018-05-09 13:49:02', '123456', '2o9vjqmg2r1', 'C');
INSERT INTO `message` VALUES ('7', '7', '::ffff:192.168.0.202', '2018-05-09 13:49:38', 'qwert', 'ct32iqurggn', 'S');
INSERT INTO `message` VALUES ('8', '8', '::ffff:192.168.0.202', '2018-05-09 13:51:06', 'qwertyu', '0oj36s5dwdab', 'C');
INSERT INTO `message` VALUES ('9', '7', '::ffff:192.168.0.202', '2018-05-09 14:10:45', '1234', 'imm2i8mpseh', 'C');
INSERT INTO `message` VALUES ('10', '7', '::ffff:192.168.0.202', '2018-05-09 14:10:54', '3456', 'vi3w16aj7ie', 'C');
INSERT INTO `message` VALUES ('11', '8', '::ffff:192.168.0.202', '2018-05-09 14:14:43', '12345', '8skbh3nywtt', 'C');
INSERT INTO `message` VALUES ('12', '8', '::ffff:192.168.0.202', '2018-05-09 14:15:17', 'qwert', 'g173excyfgt', 'C');
INSERT INTO `message` VALUES ('13', '8', '::ffff:192.168.0.202', '2018-05-09 14:15:32', 'nihao', 'g173excyfgt', 'C');
INSERT INTO `message` VALUES ('14', '8', '::ffff:192.168.0.202', '2018-05-09 14:16:48', '12345', 'g173excyfgt', 'S');
INSERT INTO `message` VALUES ('15', '7', '::ffff:192.168.0.202', '2018-05-09 14:18:03', '12345', 'w7b3f6sgedp', 'C');
INSERT INTO `message` VALUES ('16', '7', '::ffff:192.168.0.202', '2018-05-09 14:18:13', 'ertyu', 'bvo1fg9n8ls', 'C');
INSERT INTO `message` VALUES ('17', '7', '::ffff:192.168.0.202', '2018-05-09 14:18:19', 'vt', 'bvo1fg9n8ls', 'C');
INSERT INTO `message` VALUES ('18', '7', '::ffff:192.168.0.202', '2018-05-09 14:18:33', '12345', 'w7b3f6sgedp', 'C');
INSERT INTO `message` VALUES ('19', '7', '::ffff:192.168.0.202', '2018-05-09 14:18:39', 'er', 'w7b3f6sgedp', 'C');
INSERT INTO `message` VALUES ('20', '7', '::ffff:192.168.0.202', '2018-05-09 17:09:03', 'asd', 'w7b3f6sgedp', 'S');
INSERT INTO `message` VALUES ('21', '8', '::ffff:192.168.0.202', '2018-05-09 17:09:19', '123', '84cnc7lotq', 'S');
INSERT INTO `message` VALUES ('22', '8', '::ffff:192.168.0.202', '2018-05-09 17:09:46', '123', '84cnc7lotq', 'S');
INSERT INTO `message` VALUES ('23', '7', '::ffff:192.168.0.202', '2018-05-09 17:15:37', '12345', 'w7b3f6sgedp', 'S');
INSERT INTO `message` VALUES ('24', '8', '::ffff:192.168.0.202', '2018-05-09 17:15:47', '12345', '84cnc7lotq', 'S');
INSERT INTO `message` VALUES ('25', '7', '::ffff:192.168.0.202', '2018-05-09 17:16:14', '21345', 'lbn1h99gq5g', 'S');
INSERT INTO `message` VALUES ('26', '8', '::ffff:192.168.0.202', '2018-05-09 18:29:39', '123', 'lgn25wns41f', 'S');
INSERT INTO `message` VALUES ('27', '7', '::ffff:192.168.0.202', '2018-05-09 18:30:45', '345', 'hobgd3kz1f5', 'S');
INSERT INTO `message` VALUES ('28', '8', '::ffff:192.168.0.202', '2018-05-09 18:44:28', 'nihao\n', '0oj36s5dwdab', 'C');
INSERT INTO `message` VALUES ('29', '7', '::ffff:192.168.0.202', '2018-05-09 19:05:34', '123', 'q36ox79rvp', 'S');
INSERT INTO `message` VALUES ('30', '7', '::ffff:192.168.0.202', '2018-05-09 19:06:42', '456', 'q36ox79rvp', 'C');
INSERT INTO `message` VALUES ('31', '7', '::ffff:192.168.0.202', '2018-05-09 19:07:40', '789', 'q36ox79rvp', 'C');
INSERT INTO `message` VALUES ('32', '7', '::ffff:192.168.0.202', '2018-05-09 19:08:52', '1234567890', 'q36ox79rvp', 'C');
INSERT INTO `message` VALUES ('33', '7', '::ffff:192.168.0.202', '2018-05-09 19:09:26', '5678', 'q36ox79rvp', 'C');
INSERT INTO `message` VALUES ('34', '7', '::ffff:192.168.0.202', '2018-05-09 19:09:31', '12434', 'q36ox79rvp', 'S');
INSERT INTO `message` VALUES ('35', '8', '::ffff:192.168.0.202', '2018-05-09 19:10:56', '123', '0zpxhet0p9uk', 'C');
INSERT INTO `message` VALUES ('36', '8', '::ffff:192.168.0.202', '2018-05-09 19:11:15', '1234', '0zpxhet0p9uk', 'S');
INSERT INTO `message` VALUES ('37', '7', '::ffff:192.168.0.202', '2018-05-09 19:12:13', '12345', 'skum7munhkd', 'C');
INSERT INTO `message` VALUES ('38', '7', '::ffff:192.168.0.202', '2018-05-09 19:12:29', 'nishuo', 'w7b3f6sgedp', 'S');
INSERT INTO `message` VALUES ('39', '8', '::ffff:192.168.0.251', '2018-05-10 17:13:56', '132434', '4lOQNy85k2KUzVS8HTz8USiDRN3EID1525943623689', 'C');
INSERT INTO `message` VALUES ('40', '7', '::ffff:192.168.0.251', '2018-05-10 17:15:42', '1333', 'sP2gmdLBZ8vKl33vzWEgM0CixrUxnQ1525943731968', 'C');
INSERT INTO `message` VALUES ('41', '7', '::ffff:192.168.0.251', '2018-05-10 17:15:53', '456', 'sP2gmdLBZ8vKl33vzWEgM0CixrUxnQ1525943731968', 'S');
INSERT INTO `message` VALUES ('42', '7', '::ffff:192.168.0.251', '2018-05-10 17:16:09', '特务', 'sP2gmdLBZ8vKl33vzWEgM0CixrUxnQ1525943731968', 'C');
INSERT INTO `message` VALUES ('43', '7', '::ffff:192.168.0.251', '2018-05-10 17:16:18', 'ncs', 'sP2gmdLBZ8vKl33vzWEgM0CixrUxnQ1525943731968', 'S');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `pwd` varchar(60) DEFAULT NULL,
  `nicheng` varchar(120) DEFAULT NULL,
  `updtime` timestamp(6) NULL DEFAULT NULL,
  `createtime` timestamp(6) NULL DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `socketId` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `user_type` tinyint(1) DEFAULT NULL COMMENT '用户类型',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `emailuniq` (`email`),
  UNIQUE KEY `nichenguiq` (`nicheng`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('7', 'aa', 'aa', '李沛谊yi', null, '2018-03-15 03:01:23.000000', '1', '0veuA3uJn3P3V4NrAAA4', '13910825707', null);
INSERT INTO `user` VALUES ('8', 'b', 'bb', 'bb', null, '2018-03-15 03:01:40.000000', '1', '0veuA3uJn3P3V4NrAAA5', null, null);
INSERT INTO `user` VALUES ('9', 'aaa', 'ddd', 'ff', null, '2018-03-15 09:07:42.000000', '0', null, null, null);
INSERT INTO `user` VALUES ('10', 'dd', 'd', 'd', null, '2018-03-15 10:53:28.000000', '0', null, null, null);
INSERT INTO `user` VALUES ('11', 'vv', 'vv', '', null, '2018-03-15 11:02:55.000000', '0', null, null, null);
INSERT INTO `user` VALUES ('12', 'vvv', 'vvv', 'vvv', null, '2018-03-15 11:38:38.000000', '0', null, null, null);
INSERT INTO `user` VALUES ('13', 'vvvv', 'vv', 'vvvv', null, '2018-03-15 11:39:14.000000', '0', null, null, null);
INSERT INTO `user` VALUES ('14', 'qq', 'qq', 'qq', null, '2018-03-15 11:39:59.000000', '0', null, null, null);
INSERT INTO `user` VALUES ('15', 'ccc', 'ccc', 'ccc', null, '2018-03-15 11:45:06.000000', '0', null, null, null);
INSERT INTO `user` VALUES ('16', 'vbbnn', 'nnn', 'nn', null, '2018-03-23 16:30:24.000000', '0', null, null, null);
