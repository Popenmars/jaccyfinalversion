import React from "react";
import { LucideIcon } from "lucide-react";
import "@/styles/ValueCard.scss";

interface ValueCardProps {
    icon: LucideIcon;
    title: string;
    text: string;
}

function ValueCard({ icon: Icon, title, text }: ValueCardProps) {
    return (
        <div className="value-card" data-aos="fade-up">
            <div className="icon">
                <Icon size={36} />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}

export default ValueCard;
