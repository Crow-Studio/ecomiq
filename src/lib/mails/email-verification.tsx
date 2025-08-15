import EmailVerificationMail from "../../../emails/email-verification-mail";
import { resend } from "./resend";

interface Props {
  email: string;
  subject: string;
  otp: string;
  expiryTimestamp: Date;
}

export const sendEmailVerificationMail = async ({
  email,
  subject,
  otp,
  expiryTimestamp,
}: Props) => {
  try {
    const result = await resend.emails.send({
      from: "Team Ecomiq <noreply@thecodingmontana.com>",
      to: [email],
      subject: subject,
      react: <EmailVerificationMail otp={otp} expiryTimestamp={expiryTimestamp} />,
    });
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
