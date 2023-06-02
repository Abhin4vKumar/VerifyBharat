import React from "react"
import Heading from "../../common/Heading"
import { awards } from "../../data/Data"
import "./awards.css"

const Awards = () => {
  return (
    <>
      <section className='awards padding' id="awards">
        <div className='container'>
          <Heading title='Key Features' />

          <div className='content grid4 awardSection mtop'>
            {awards.map((val, index) => (
              <div className='box' key={index}>
                <div className='icon'>
                  <span>{val.icon}</span>
                </div>
                {/* <h1>{val.num}</h1> */}
                <h3>{val.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Awards
