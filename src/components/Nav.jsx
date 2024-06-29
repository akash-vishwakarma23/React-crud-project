import React, { useContext } from 'react'
import { productContext } from '../utils/Context'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [products] = useContext(productContext)

  let distinct_category = products && products.reduce((acc,cv)=>[...acc,cv.category],[])
  distinct_category = [...new Set(distinct_category)]
  

  const color = ()=>{
    return `rgba(${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()},0.4)`;
  };  


  return (
    <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-4">
    <a
      className=" text-blue-300 px-2 py-2 border border-blue-100 rounded"
      href="/create"
    >
      Add New Product
    </a>
    <hr className="mt-3 w-[80%]" />
    <h1 className="text-xl font-semibold w-[80%] mt-3">Category Filter</h1>
    <div className="w-[80%] mt-1">
      {distinct_category.map((c,i)=>(
           <Link key={i} to={`/?category=${c}`} className="flex items-center ">
           <span style={{backgroundColor: color()}} className="w-[15px] h-[15px] rounded-full  mr-2"></span>{" "}
           {c}
         </Link>
      ))}
     

      
    </div>
  </nav>
  )
}

export default Nav
