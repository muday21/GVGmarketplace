import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "@prisma/client"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

// Email transporter configuration - only create if SMTP is configured
let transporter: any = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SECURE === "true", // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Ignore SSL certificate validation for development
    tls: {
      rejectUnauthorized: false
    }
  });
} else {
  console.warn("SMTP configuration missing. Email verification will be disabled.");
}

// Email sending function - Updated according to Better Auth documentation
async function sendVerificationEmail({ user, url }: { user: any; url: string; token: string }) {
  try {
    if (!transporter) {
      console.error("Email transporter not configured. Cannot send verification email.");
      throw new Error("Email service not configured");
    }

    console.log(`Attempting to send verification email to ${user.email}`);
    console.log(`SMTP Config - Host: ${process.env.SMTP_HOST}, Port: ${process.env.SMTP_PORT}, User: ${process.env.SMTP_USER}`);
    console.log(`From: ${process.env.EMAIL_FROM || process.env.SMTP_USER}`);
    console.log(`Verification URL: ${url}`);

    const mailOptions = {
      from: `"Green Value Groups" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Verify Your Email - Green Value Groups",
      text: `Click the link to verify your email: ${url}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Green Value Groups!</h1>
              <p>Please verify your email address to complete your registration</p>
            </div>
            <div class="content">
              <h2>Hello ${user.name},</h2>
              <p>Thank you for registering with Green Value Groups! To complete your registration and start exploring our marketplace, please verify your email address.</p>

              <div style="text-align: center;">
                <a href="${url}" class="button">Verify Email Address</a>
              </div>

              <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 5px;"><a href="${url}">${url}</a></p>

              <p><strong>This verification link will expire in 24 hours.</strong></p>

              <p>If you didn't create an account with Green Value Groups, please ignore this email.</p>

              <p>Best regards,<br>The Green Value Groups Team</p>
            </div>
            <div class="footer">
              <p>© 2024 Green Value Groups. All rights reserved.</p>
              <p>This email was sent to ${user.email}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email successfully sent to ${user.email}`);
    console.log(`Email result:`, result);
  } catch (error: any) {
    console.error("❌ Error sending verification email:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      response: error.response,
      command: error.command
    });
    throw error
  }
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql"
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // Always require email verification
  },
  emailVerification: {
    sendOnSignUp: true, // Always send verification email on signup
    autoSignInAfterVerification: true,
    sendVerificationEmail,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key-for-development",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  trustedOrigins: ["http://localhost:3001", "http://localhost:3000"],
})

// Export auth instance for use in API routes
// The handler is exported from [...all]/route.ts
