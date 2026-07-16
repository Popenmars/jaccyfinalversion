import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key");
// We can use a verified sender email for "from", and the admin's email for "to".
// In resend, you typically have to send *from* a domain you verify, e.g. onboarding@resend.dev for testing.
const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL || "onboarding@resend.dev";
const adminEmail = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_FROM_EMAIL || "onboarding@resend.dev";

export async function sendContactEmail(name: string, email: string, message: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: `Jaacy Gadgets Contact Form <${fromEmail}>`,
            to: adminEmail,
            subject: `New Contact Form Submission from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2 style="color: #021e40;">New Message via Contact Form</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `
        });

        if (error) {
            console.error("Resend API Error:", error);
            return { success: false, error: error.message };
        }

        console.log("Email sent successfully:", data);
        return { success: true };
    } catch (err) {
        console.error("Failed to send contact email:", err);
        return { success: false, error: "Failed to send email" };
    }
}
