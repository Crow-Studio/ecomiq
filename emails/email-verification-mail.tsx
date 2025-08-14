import { Button, Html } from "@react-email/components";

interface EmailVerificationMailProps {
  otp: string;
}

export default function EmailVerificationMail({ otp }: EmailVerificationMailProps) {
  return (
    <Html>
      <Button style={{ background: "#000", color: "#fff", padding: "12px 20px" }}>
        Click me {otp}
      </Button>
    </Html>
  );
}
