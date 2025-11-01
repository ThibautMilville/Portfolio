import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function getEnvVar(key: string): string | undefined {
  if (typeof process === 'undefined' || typeof process.env === 'undefined') {
    throw new Error('Environment variables are not available');
  }
  const envKey = key;
  const envObj = process.env;
  if (!envObj || typeof envObj !== 'object') {
    return undefined;
  }
  const rawValue = envObj[envKey];
  if (rawValue === undefined || rawValue === null || rawValue === '') {
    return undefined;
  }
  const result = String(rawValue);
  return result.length > 0 ? result : undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const smtpUser = getEnvVar('SMTP_USER');
    const smtpPassword = getEnvVar('SMTP_PASSWORD');
    
    if (!smtpUser || !smtpPassword) {
      console.error('Configuration SMTP manquante');
      return NextResponse.json(
        { error: 'Erreur de configuration serveur' },
        { status: 500 }
      );
    }

    const contactEmail = getEnvVar('CONTACT_EMAIL') || smtpUser;

    const transporter = nodemailer.createTransport({
      host: getEnvVar('SMTP_HOST') || 'smtp.gmail.com',
      port: parseInt(getEnvVar('SMTP_PORT') || '587'),
      secure: getEnvVar('SMTP_SECURE') === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: smtpUser,
      to: contactEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">
            Nouveau message depuis votre portfolio
          </h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
      text: `
Nouveau message depuis votre portfolio

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('Erreur lors de l\'envoi de l\'email:', errorMessage);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
}

