import React from "react"
import { featured } from "../../data/Data"

const FeaturedCard = () => {
  return (
    <>
      <div className='content docWithUs mtop'>
        {featured.map((items, index) => (
          <div className='box featureBox' key={index}>
            {/* <img src={items.cover} alt='' /> */}
            <i class={items.cover}></i>
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard
