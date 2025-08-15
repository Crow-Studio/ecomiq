import { Body, Container, Head, Hr, Html, Tailwind, Text } from "@react-email/components";

interface EmailVerificationMailProps {
  otp: string;
  userName?: string;
  companyName?: string;
  expirationMinutes?: number;
  expiryTimestamp?: Date;
}

export default function EmailVerificationMail({
  otp,
  companyName = "Ecomiq",
  expirationMinutes = 10,
  expiryTimestamp,
}: EmailVerificationMailProps) {
  const getRemainingTime = () => {
    if (!expiryTimestamp) return `${expirationMinutes} minutes`;

    const now = new Date();
    const remaining = Math.max(
      0,
      Math.floor((expiryTimestamp.getTime() - now.getTime()) / 1000),
    );

    if (remaining > 60) {
      return `${Math.floor(remaining / 60)} minutes`;
    } else {
      return `${remaining} seconds`;
    }
  };

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-slate-50 font-sans">
          <Container className="mx-auto mb-16 max-w-sm rounded-lg border border-slate-200 bg-white py-5 pb-12">
            <Text className="mb-4 px-6 text-base leading-relaxed text-slate-600">
              Hi 👋,
            </Text>

            <Text className="mb-4 px-6 text-base leading-relaxed text-slate-600">
              Thank you for signing up with {companyName}! To complete your registration,
              please use the verification code below:
            </Text>

            {/* <Section className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg mx-3 my-6 py-4 text-center">
            </Section> */}
            <Text className="m-0 font-mono text-2xl font-bold tracking-wide text-slate-800">
              {otp}
            </Text>

            <Text className="mb-4 px-6 text-base leading-relaxed text-slate-600">
              This code will expire in {getRemainingTime()} for security purposes.
            </Text>

            <Text className="mb-4 px-6 text-base leading-relaxed text-slate-600">
              If you didn't request this verification code, please ignore this email or
              contact our support team if you have concerns.
            </Text>

            <Hr className="mx-3 my-8 border-slate-200" />

            <Text className="mb-4 px-6 text-sm leading-relaxed text-slate-600">
              Best regards,
              <br />
              The {companyName} Team
            </Text>

            <Text className="m-0 px-6 text-center text-xs leading-relaxed text-slate-400">
              This is an automated message. Please do not reply to this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
