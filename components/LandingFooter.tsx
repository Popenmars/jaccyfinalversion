import React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter } from "react-icons/fa6";

export const LandingFooter = () => {
    return (
        <footer className="bg-light-blue text-dark-blue flex flex-col p-[2rem_4rem] gap-[2rem] relative bottom-0">
            <div className="flex justify-between items-start p-[2rem] h-auto flex-wrap gap-[2rem] max-[1200px]:justify-around max-[900px]:flex-col max-[900px]:items-center max-[900px]:text-center max-[900px]:p-[1.5rem]">
                <div className="w-[310px] flex flex-col items-center max-[900px]:w-full">
                    <Image
                        src={"/logo/jaacys-logo.png"}
                        width={400}
                        height={240}
                        alt="logo"
                        className="w-[60%] h-auto max-h-[170px] object-contain max-[900px]:w-[50%]"
                    />
                    <p>Your one stop store for, high-impact and world-class phones, gadgets, and smart devices.</p>
                </div>
                <div className="flex flex-col gap-[10px] max-[900px]:items-center">
                    <h2 className="text-[1.5rem] font-bold">Quick links</h2>
                    <div className="flex flex-col gap-[6px]">
                        <Link href={"#"} className="text-dark-blue no-underline text-[1rem] transition-colors duration-300 hover:text-deep-peach">Home</Link>
                        <Link href={"#about"} className="text-dark-blue no-underline text-[1rem] transition-colors duration-300 hover:text-deep-peach">About</Link>
                        <Link href={"#contact"} className="text-dark-blue no-underline text-[1rem] transition-colors duration-300 hover:text-deep-peach">Contact</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-[10px] max-[900px]:items-center">
                    <h3 className="text-[1.2rem] font-bold">Reach out to us on:</h3>
                    <div className="flex flex-wrap justify-center gap-[10px]">
                        <a href="/fb" className="text-dark-blue no-underline text-[1.2rem] transition-colors duration-300 hover:text-deep-peach"><FaFacebook size={24} /></a>
                        <a href="/ig" className="text-dark-blue no-underline text-[1.2rem] transition-colors duration-300 hover:text-deep-peach"><FaInstagram size={24} /></a>
                        <a href="/linkedin" className="text-dark-blue no-underline text-[1.2rem] transition-colors duration-300 hover:text-deep-peach"><FaLinkedin size={24} /></a>
                        <a href="/tiktok" className="text-dark-blue no-underline text-[1.2rem] transition-colors duration-300 hover:text-deep-peach"><FaTiktok size={24} /></a>
                        <a href="/x" className="text-dark-blue no-underline text-[1.2rem] transition-colors duration-300 hover:text-deep-peach"><FaXTwitter size={24} /></a>
                    </div>
                </div>
            </div>
            <hr className="w-[90%] mx-auto border-0 h-[1px] bg-dark-blue opacity-20" />
            <div className="mx-auto text-center pb-[1rem]">
                <p className="text-[0.9rem] max-[600px]:text-[0.8rem] max-[600px]:px-[1rem]">&copy; {new Date().getFullYear()} Jaacyy&apos;s Gadgets. All rights reserved</p>
                <p className="text-[0.9rem] max-[600px]:text-[0.8rem] max-[600px]:px-[1rem]">Built by <a href="marsynergy.com" className="text-dark-blue no-underline transition-colors duration-300 hover:text-deep-peach">marsynergy</a></p>
            </div>
        </footer>
    )
}
