package com.uvigo.aspa.utils;

import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class EmailUtils {

	public static void sendNewPasswordByMail(String destinatary, String password, boolean reset)
			throws AddressException, MessagingException, IOException {
		final String resetSubject = "Reinicio de contraseña ASPA - FGA";
		final String newSubject = "Cuenta creada en ASPA - FGA";
		final String resetContent = "Tu nueva contraseña: ";
		final String newContent = "Has sido dado de alta en ASPA - Aplicación para el Seguimiento de Pruebas de Atletismo de la FGA.\nTu contraseña de inicio de sesión es: ";
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("username", "password");
			}
		});
		Message msg = new MimeMessage(session);
		msg.setFrom(new InternetAddress("username@gmail.com", false));

		msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinatary));
		msg.setSubject(reset ? resetSubject : newSubject);
		msg.setSentDate(new Date());

		MimeBodyPart messageBodyPart = new MimeBodyPart();
		messageBodyPart.setContent((reset ? resetContent : newContent) + password,
				"text/html");

		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart);

		msg.setContent(multipart);
		Transport.send(msg);
	}

}
