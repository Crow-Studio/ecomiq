import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute(
  "/api/payments/webhook/paystack/",
).methods({
  POST: async ({ request }) => {
    // Get the raw body as text for signature verification
    const rawBody = await request.text();
    console.log("raw_body", rawBody);

    // Get the Paystack signature from headers
    const paystackSignature = request.headers.get("x-paystack-signature");

    if (!paystackSignature) {
      console.error("Missing Paystack signature");
      return Response.json({ error: "Missing signature" }, { status: 400 });
    }
    console.log(request);
  },
});
