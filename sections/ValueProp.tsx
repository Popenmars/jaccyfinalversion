import ValueCard from "@/components/ValueCard";
import { ShieldCheck, Truck, Headphones, Smartphone } from "lucide-react";

import "@/styles/ValueProp.scss"

const valueProps = [
  {
    icon: Smartphone,
    title: "Top-Quality Devices",
    text: "We bring you only verified, high-performance gadgets built to last.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    text: "Enjoy quick nationwide delivery with real-time tracking updates.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    text: "Shop confidently with our end-to-end encrypted payment system.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Our support team is always ready to assist you — day or night.",
  },
];

export const ValueProp = () =>{
    return(
        <section className="value-props">
            <h2>Why choose Jaacyy&apos;s Gadgets</h2>
            <div>{valueProps.map((item, index)=>(
                <ValueCard
                    icon={item.icon}
                    text={item.text}
                    title={item.title}
                    key={index}
                />
            ))}</div>
        </section>
    )
}


// "use client";

// import ValueCard from "@/components/ValueCard";
// import { ShieldCheck, Truck, Headphones, Smartphone } from "lucide-react";

// const valueProps = [
//   {
//     icon: Smartphone,
//     title: "Top-Quality Devices",
//     text: "We bring you only verified, high-performance gadgets built to last.",
//   },
//   {
//     icon: Truck,
//     title: "Fast & Reliable Delivery",
//     text: "Enjoy quick nationwide delivery with real-time tracking updates.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Secure Payments",
//     text: "Shop confidently with our end-to-end encrypted payment system.",
//   },
//   {
//     icon: Headphones,
//     title: "24/7 Support",
//     text: "Our support team is always ready to assist you day or night.",
//   },
// ];

// export const ValueProp = () =>{
//     return(
//         <section className="p-[80px] bg-light-blue text-center">
//             <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] mb-[30] text-dark-blue font-bold">
//               Why choose Jaacyy&apos;s Gadgets
//             </h2>
//             <div className="flex md:flex-row flex-col  justify-between gap-[2rem] ">
//                 {valueProps.map((item, index)=>(
//                     <ValueCard
//                         icon={item.icon}
//                         text={item.text}
//                         title={item.title}
//                         key={index}
//                     />
//                 ))}
//             </div>
//         </section>
//     )
// }
