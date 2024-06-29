import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productContext } from '../utils/Context'
import { nanoid } from 'nanoid'

const Edit = () => {
    const [products,setproducts] =  useContext(productContext)
    const navigate = useNavigate()
    const {id} =  useParams()
    const [product,setproduct] = useState({
      title: "",
      image: "",
      category: "",
      price: "",
      description: ""
    })

    const changeHandler = (e)=>{
        // console.log(e.target.name,e.target.value);
        setproduct({...product,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
      setproduct(products.filter((p)=> p.id == id)[0])
    },[id])
  
    const AddProductHandler = (e) =>{
        e.preventDefault();
  
        if ( 
          product.title.trim().length < 5 ||
          product.image.trim().length <5 ||
          product.category.trim().length <5 ||
          product.price.trim().length <1 ||
          product.description.trim().length <5 ){
          alert("each and every field must have atleast 4 characters");
          return;
        }

          const pi = products.findIndex((p)=> p.id == id)
          const copyData = [...products]
          copyData[pi] = {...products[pi],...product}

          // console.log(copyData)
          setproducts(copyData)
          localStorage.setItem("products", JSON.stringify([...products, copyData]));
          navigate(-1)
      }
         
        // const product = {id:nanoid(),title, image, category, price, description};
        // //Add product to the database here
        // setproducts([...products, product]);
        // localStorage.setItem("products", JSON.stringify([...products, product]));
             

       
  return (
    <form onSubmit={AddProductHandler} className='w-full h-screen flex flex-col items-center  p-[5%] gap-4 shadow'>
      <h1 className='text-3xl mb-8 w-1/2'>Edit Product</h1>
      <input type="url" placeholder='image link' className='w-1/2 bg-zinc-100 text-1xl px-2 py-1' name="image" onChange={changeHandler} value={product && product.image}/>

      <input type="text" placeholder='title' className='w-1/2 bg-zinc-100 text-1xl px-2 py-1' name="title" onChange={changeHandler} value={product && product.title}/>

        <div className='flex justify-between w-1/2'> 
      <input type="text" placeholder='category' className='w-[48%] bg-zinc-100 text-1xl px-2 py-1 ' name="category" onChange={changeHandler} value={product && product.category}/>

      <input type="number" placeholder='price' className='w-[48%] bg-zinc-100 text-1xl px-2 py-1 ' name="price" onChange={changeHandler} value={product && product.price}/>
      </div>

      <textarea placeholder='enter product description here...' className='w-1/2 bg-zinc-100 text-1xl px-2 py-1' name="description" onChange={changeHandler} value={product && product.description} rows="10"></textarea>

      <div className='w-1/2'>
      <button 
      className=" text-blue-300 px-2 py-2 border border-blue-100 rounded"
      href="/create"
    >
      Edit Product
    </button>
      </div>

    </form>
  )
  
}

export default Edit
