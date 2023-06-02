import React from "react"
import Back from "./common/Back"
import Heading from "./common/Heading"
import img from "./images/about.jpg"
import "./Style/About.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            {/* <Heading title='Our Story' subtitle='Check out our company story and work process' /> */}
            <h1 className="headering" >Our Story </h1>

            <p>Our VerifyBharat was established in 2023 with the goal of transforming the way individuals and businesses store, manage, and share their essential documents. We identified the potential of blockchain technology to address the limitations of traditional database storage methods, such as security, transparency, and control.
              Our mission is to offer a cutting-edge, secure, and user-friendly platform that harnesses the power of blockchain to provide unparalleled document storage and sharing solutions. We are dedicated to delivering a seamless experience that caters to the evolving needs of our users while maintaining the highest standards of data protection and privacy.
            </p>
            
            {/* <button className='btn2'>More About Us</button> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
