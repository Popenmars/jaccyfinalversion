"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import "@/styles/Hero.scss"

export const Hero = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <section className='hero-section'>
            <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                src="/video/gvid4.mp4"
            />

            <div data-aos="fade-right" className='hero-content glass'>
                <div>
                    <h3>Welcome to</h3>
                    <h2>Jaacyy&lsquo;s Gadgets</h2>
                    <p>
                        Your one stop store for, high-impact and world-class phones, gadgets, and smart devices.
                    </p>
                    <p>Buy once <span>=</span> Buy right.</p>
                </div>
                <div className='button-container'>
                    <button onClick={() => (window.location.href = "/shop")}>Shop now</button>
                    {/* <button onClick={() => (window.location.href = "/about")}>Learn more</button> */}
                </div>
            </div>
        </section>
    )
}
