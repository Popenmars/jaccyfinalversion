require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL || "onboarding@resend.dev";
const adminEmail = process.env.ADMIN_EMAIL || "onboarding@resend.dev";

async function run() {
  console.log("Using FROM:", fromEmail);
  console.log("Using TO:", adminEmail);
  console.log("Using API KEY length:", process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0);
  
  const { data, error } = await resend.emails.send({
    from: `Test <${fromEmail}>`,
    to: adminEmail,
    subject: "Test",
    html: "<p>test</p>"
  });
  
  console.log("Data:", data);
  console.log("Error:", error);
}
run();
