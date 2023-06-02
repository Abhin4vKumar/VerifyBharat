import React from 'react'
import "./Style/Contact.css"
import { useRef } from 'react'
import contactBg from "./stock/contactBg.png"

const Contact = () => {
    const form = useRef()

    // const sendEmail = (e) => {
    //     e.preventDefault()

    //     emailjs
    //         .sendForm('service_tq1sxom', 'template_lh3v68x', form.current, 'rYfioaqahG253YRC1')
    //         .then(
    //             () => {
    //                 alert('Message successfully sent!')
    //                 window.location.reload(false)
    //             },
    //             () => {
    //                 alert('Failed to send the message, please try again')
    //             }
    //         )
    // }

    return (
        <div>
            <div className="upperContactPart">
                <h1>Get In Touch</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem atque voluptas quia animi veniam error odit impedit doloribus facilis necessitatibus!</p>

            </div>
            {/* contact card */}
            <form className="contactCard" ref={form} onSubmit={sendEmail} >
                <div className="contactCardLeft">
                    <img id='contactBg' src={contactBg} alt="" />
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </div>
                <div className="contactCardRight ">
                    <div className="nameSideContact contactDivRight nameClassContact">
                        <label htmlFor="Name">Name</label>
                        <input className='inpText ' type="text" name='name' />

                    </div>
                    <div className="emailSideContact contactDivRight">
                        <label htmlFor="Name">Email</label>
                        <input className='inpText' type="text" name='email' />

                    </div>
                    <div className="EmailSideContact contactDivRight">
                        <label htmlFor="Name">Contact</label>
                        <input className='inpText' type="text" name='contact' />

                    </div>
                    <div className="nameSideContact contactDivRight msgClassContact">
                        <label htmlFor="Name">Your Message</label>
                        <input className='inpText '
                            name="message" type='text' />

                    </div>
                    <div className="submitContact">
                        <button className="submitRightContact" value="SEND">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contact