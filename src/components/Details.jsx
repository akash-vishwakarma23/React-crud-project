import axios from '../utils/Axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../utils/Loading'
import { productContext } from '../utils/Context'
import { toast } from 'react-toastify'

const Details = () => {
  const navigate =  useNavigate()
  const [products,setproducts] =  useContext(productContext)
  const [product,setProduct] = useState(null)
   const {id} =  useParams()

  //  const getsingleProduct = async ()=> {
  //   try {
  //     const {data} = await axios.get(`/products/${id}`)
  //     setProduct(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //  }

  const productDeleteHandler = (id)=>{
      const FilterdProducts = products.filter((p) => p.id !== id)
      setproducts(FilterdProducts)
      localStorage.setItem("products",JSON.stringify(FilterdProducts))
      navigate("/")
      toast.success("products deleted successfully")
  }
  

   useEffect(()=> {
    if(!product){
        setProduct(products.filter((p)=>p.id == id)[0])
    
      // getsingleProduct()
   }},[])
   
  return product ? (
    <div className=' w-[80%] h-full flex items-center justify-between m-auto p-[10%] gap-8'>

        <img className='object-contain h-[90%] w-[40%]' src={product.image} alt="" />
        <div className='content w-[70%]'>
            <h1 className='text-4xl font-medium'>{product.title}</h1>
            <h3 className='text-zinc-400 my-3'>{product.category}</h3>
            <h2 className='text-red-300 mb-3'>$ {product.price}</h2>
            <p className='mb-5'>{product.description}</p>
            <Link to={`/edit/${product.id}`} className=" text-blue-300 px-2 py-2 border border-blue-100 rounded mr-4">Edit</Link>
            <button onClick={()=>productDeleteHandler(product.id)} className=" text-red-300 px-2 py-2 border border-red-100 rounded">Delete</button>
        </div>

    </div>
  ) : (<Loading />)
}

export default Details
