import { LandingFooter } from "@/components/LandingFooter"
import { LandingNav } from "@/components/LandingNav"
import { Hero } from "@/sections/hero"
import Contact from "@/sections/Contact"
import { ValueProp } from "@/sections/ValueProp"

const Home = () =>{
  return(
    <>
      <LandingNav/>
      <main className="mt-[90px] max-[900px]:mt-[100px]">
        <Hero/>        
        <ValueProp/>
        <Contact />
      </main>
      <LandingFooter/>
    </>
  )
}

export default Home
