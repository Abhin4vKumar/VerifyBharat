import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <>
      <section className='hero'>
    <div className="darkerPage"></div>
        <div className='container'>
          <Heading title='Secure Your Documents with the Power of Blockchain' subtitle='Experience unparalleled security, transparency, and efficiency with us, a revolutionary document storage and sharing platform built on blockchain technology.' />
          <Link className="getStartLink" to="/login"><button class="button-17 btn typeBtn getStart" role="button">Get Started</button></Link>
        </div>
      </section>
    </>
  )
}

export default Hero
