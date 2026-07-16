"use server";

import { sendContactEmail } from "@/lib/email";

export async function submitContactForm(data: { name: string; email: string; message: string }) {
    if (!data.name || !data.email || !data.message) {
        return { success: false, error: "All fields are required" };
    }

    try {
        const result = await sendContactEmail(data.name, data.email, data.message);
        if (!result.success) {
            return { success: false, error: "Failed to send message" };
        }
        return { success: true };
    } catch (error) {
        console.error("Error in submitContactForm:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}
