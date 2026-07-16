"use client";

import React, { useState, useRef} from "react";
import { FaEnvelope, FaPhone, FaMap, FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaLinkedinIn, } from "react-icons/fa6";
import "@/styles/Contact.scss";
import { submitContactForm } from "@/app/actions/contact";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");
    const [isSending, setIsSending] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        const defaultHeight = 100;
        const maxHeight = defaultHeight * 2;
        textarea.style.height = "auto"
        if (textarea.scrollHeight <= maxHeight){
            textarea.style.height = `${textarea.scrollHeight}px`
            textarea.style.overflowY = "hidden"
        }else {
            textarea.style.height = `${maxHeight}px`
            textarea.style.overflowY ="auto"
        }
        handleChange(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSending) return
        setIsSending(true)
        setStatus("Sending...")

        try {
            const result = await submitContactForm(formData);
            if (result.success){
                setStatus("Message Sent")
                setTimeout(() => {
                    setFormData({ name: "", email: "", message: ""})
                    setStatus("")
                }, 2500)
            } else {
                throw new Error(result.error || "Failed to send")
            }
        } catch (error) {
            console.error(error);
            setStatus("Try again")
            setTimeout(() => setStatus(""), 3000)
        } finally {
            setIsSending(false)
        }
    };

    return (
        <section className="contact-section" >
            <video autoPlay muted loop playsInline className="background-video">
                <source src="/video/gvid2.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
            <h2 className="section-title" data-aos="fade-up">Get in Touch</h2>
            <div className="contact-container">
                <form className="contact-form" ref={formRef} onSubmit={handleSubmit} data-aos="fade-right" data-aos-duration="1000">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        ref={textareaRef}
                        name="message"
                        placeholder="Your Message"
                        rows={5}
                        value={formData.message}
                        onChange={handleTextareaResize}
                        required
                    ></textarea>
                    <button type="submit" disabled={isSending}>{isSending ? status || "Sending..." : "Send Message"}</button>
                    <p className="form-status">{status}</p>
                </form>

                <div className="contact-info" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                    <h3>Reach Us</h3>
                    <p>
                        <FaEnvelope />{" "}
                        <a href="mailto:nwohamicheal123@gmail.com">nwohamicheal123@gmail.com</a>
                    </p>
                    <p>
                        <FaPhone /> <a href="tel:+2347040168887">+234 704 016 8887</a>
                    </p>
                    <p>
                        <FaMap />{" "}
                        <a
                            href="https://maps.app.goo.gl/CMQSJyKU58McU3PR9"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            No 9 Adepele Str, Merciful Plaza, shop D, Ikeja, Computer Village, Lagos, Nigeria
                        </a>
                    </p>
                    <div className="social-icons">
                        <a
                            href="https://www.facebook.com/JA CY"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://www.instagram.com/jaa_cyy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.tiktok.com/@jaacyygadgets"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTiktok />
                        </a>
                        <a href="https://x.com/jaacyygadgets" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;


// "use client";

// import React, { useState, useRef } from "react";
// import emailjs from "@emailjs/browser";
// import { FaEnvelope, FaPhone, FaMap, FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

// const Contact = () => {
//     const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//     const [status, setStatus] = useState("");
//     const [isSending, setIsSending] = useState(false)
//     const textareaRef = useRef<HTMLTextAreaElement>(null)
//     const formRef = useRef<HTMLFormElement>(null)

//     const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const textarea = e.target;
//         const defaultHeight = 100;
//         const maxHeight = defaultHeight * 2;
//         textarea.style.height = "auto"
//         if (textarea.scrollHeight <= maxHeight) {
//             textarea.style.height = `${textarea.scrollHeight}px`
//             textarea.style.overflowY = "hidden"
//         } else {
//             textarea.style.height = `${maxHeight}px`
//             textarea.style.overflowY = "auto"
//         }
//         handleChange(e)
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (isSending) return
//         setIsSending(true)
//         setStatus("Sending...")

//         try {
//             const result = await emailjs.sendForm(
//                 "service_ot793np",
//                 "template_evrg1gu",
//                 formRef.current!,
//                 "W818QjzEI61Uw8ju7"
//             )
//             if (result.text === "OK") {
//                 setStatus("Message Sent")
//                 setTimeout(() => {
//                     setFormData({ name: "", email: "", message: "" })
//                     setStatus("")
//                 }, 2500)
//             } else {
//                 throw new Error("Failed to send")
//             }
//         } catch (error) {
//             console.error(error);
//             setStatus("Try again")
//             setTimeout(() => setStatus(""), 3000)
//         } finally {
//             setIsSending(false)
//         }
//     };

//     return (
//         <section className="relative px-[8vw] py-[4rem] text-deep-peach text-center overflow-hidden z-[1]">
//             <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-2]">
//                 <source src="/video/gvid2.mp4" type="video/mp4" />
//             </video>
//             <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-[linear-gradient(to_right,rgba(10,10,20,0.8),rgba(20,30,50,0.8)),linear-gradient(to_right,rgba(255,218,185,0.3),rgba(173,216,230,0.3))]"></div>

//             <h2 className="text-[2.5rem] mb-[2rem]" data-aos="fade-up">Get in Touch</h2>

//             <div className="flex flex-wrap gap-[2rem] justify-center">
//                 <form
//                     className="bg-[rgba(255,255,255,0.1)] p-[2rem] rounded-[1.5rem] backdrop-blur-[12px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex-[1_1_300px] max-w-[500px] border border-[rgba(255,255,255,0.25)] flex flex-col gap-[1rem]"
//                     ref={formRef}
//                     onSubmit={handleSubmit}
//                     data-aos="fade-right"
//                     data-aos-duration="1000"
//                 >
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Your Name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="p-[0.75rem_1rem] border-none rounded-[0.75rem] text-[1rem] bg-white text-dark-blue"
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Your Email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="p-[0.75rem_1rem] border-none rounded-[0.75rem] text-[1rem] bg-white text-dark-blue"
//                     />
//                     <textarea
//                         ref={textareaRef}
//                         name="message"
//                         placeholder="Your Message"
//                         rows={5}
//                         value={formData.message}
//                         onChange={handleTextareaResize}
//                         required
//                         className="p-[0.75rem_1rem] border-none rounded-[0.75rem] text-[1rem] bg-white text-dark-blue resize-none"
//                     ></textarea>

//                     <button
//                         type="submit"
//                         disabled={isSending}
//                         className="relative z-[1] text-deep-peach p-[0.7rem_1.5rem] rounded-[1rem] cursor-pointer bg-blue overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:right-1/2 before:z-[-1] before:bg-deep-peach before:transition-all before:duration-500 before:opacity-0 hover:bg-transparent hover:text-blue hover:before:left-0 hover:before:right-0 hover:before:opacity-100"
//                     >
//                         {isSending ? status || "Sending..." : "Send Message"}
//                     </button>
//                     <p className="mt-[0.5rem] text-[1rem] font-medium min-h-[1.5rem]">{status}</p>
//                 </form>

//                 <div
//                     className="bg-[rgba(255,255,255,0.1)] p-[2rem] rounded-[1.5rem] backdrop-blur-[12px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex-[1_1_300px] max-w-[500px] border border-[rgba(255,255,255,0.25)] text-left"
//                     data-aos="fade-left"
//                     data-aos-duration="1000"
//                     data-aos-delay="200"
//                 >
//                     <h3 className="text-[1.5rem] mb-[1rem]">Reach Us</h3>
//                     <p className="text-[1rem] my-[0.75rem] flex items-center gap-[0.5rem]">
//                         <FaEnvelope className="text-deep-peach min-w-[20px]" />{" "}
//                         <a href="mailto:support@jaacyygadgets.com" className="text-light-blue no-underline hover:text-deep-peach transition-colors">support@jaacyygadgets.com</a>
//                     </p>
//                     <p className="text-[1rem] my-[0.75rem] flex items-center gap-[0.5rem]">
//                         <FaPhone className="text-deep-peach min-w-[20px]" /> <a href="tel:+2347040168887" className="text-light-blue no-underline hover:text-deep-peach transition-colors">+234 704 016 8887</a>
//                     </p>
//                     <p className="text-[1rem] my-[0.75rem] flex items-start gap-[0.5rem]">
//                         <FaMap className="text-deep-peach min-w-[20px] mt-1" />{" "}
//                         <a
//                             href="https://maps.app.goo.gl/CMQSJyKU58McU3PR9"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-light-blue no-underline hover:text-deep-peach transition-colors"
//                         >
//                             No 9 Adepele Str, Merciful Plaza, shop D, Ikeja, Computer Village, Lagos, Nigeria
//                         </a>
//                     </p>
//                     <div className="flex gap-[1rem] mt-[1rem]">
//                         <a href="https://www.facebook.com/JA CY" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] text-deep-peach transition-colors duration-300 hover:text-light-blue">
//                             <FaFacebookF />
//                         </a>
//                         <a href="https://www.instagram.com/jaa_cyy" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] text-deep-peach transition-colors duration-300 hover:text-light-blue">
//                             <FaInstagram />
//                         </a>
//                         <a href="https://www.tiktok.com/@jaacyygadgets" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] text-deep-peach transition-colors duration-300 hover:text-light-blue">
//                             <FaTiktok />
//                         </a>
//                         <a href="https://x.com/jaacyygadgets" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] text-deep-peach transition-colors duration-300 hover:text-light-blue">
//                             <FaXTwitter />
//                         </a>
//                         <a href="#" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] text-deep-peach transition-colors duration-300 hover:text-light-blue">
//                             <FaLinkedinIn />
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Contact;
