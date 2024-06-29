import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { productContext } from '../utils/Context'
import Loading from '../utils/Loading'
import axios from '../utils/Axios'

const Home = () => {
  const [products] = useContext(productContext)
  const {search} = useLocation()
  const category = decodeURIComponent(search.split("=")[1])

  const [filteredProducts,setfilteredProducts] =  useState(products)

  const getProductcategory = async ()=>{
    try {
      const {data} = await axios.get(`/products/category/${category}`)
      setfilteredProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    if(!filteredProducts || category == "undefined") setfilteredProducts(products)
      if (category != "undefined"){ 
        // getProductcategory()
        setfilteredProducts(products.filter((p) => p.category == category))
      }
  },[category,products])



  return products ?  (
    <>
    <Nav />
    <div className=" w-[85%] p-[4%] flex flex-wrap overflow-x-hidden overflow-y-auto gap-4 ">
      {filteredProducts && filteredProducts.map((p,i) => (<Link key={p.id} to={`/details/${p.id}`} className="w-[18%] h-[40vh]  p-3 pt-4 shadow">
          <div
            className="hover:scale-110 w-full h-[50%] bg-contain bg-no-repeat bg-center mb-3"
            style={{
              backgroundImage:
                `url(${p.image})`,
            }}
          ></div>
          <h1 className=" hover:text-blue-300 text-center w-full text-sm ">{p.title}</h1>
        </Link>))}
        

        
      </div>
      </>
  ) : (
    <Loading />
  )
}

export default Home
