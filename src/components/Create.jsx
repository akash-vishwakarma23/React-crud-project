import React, { useContext, useState } from 'react'
import { productContext } from '../utils/Context'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Create = () => {
  const navigate = useNavigate()

  const [products,setproducts] =  useContext(productContext)
  const [title,settitle] =  useState()
  const [image,setimage] =  useState()
  const [category,setcategory] =  useState()
  const [price,setprice] =  useState()
  const [description,setdescription] =  useState()

  const AddProductHandler = (e) =>{
      e.preventDefault();

      if ( title.trim().length < 5 ||
       image.trim().length <5 ||
        category.trim().length <5 ||
         price.trim().length <1 ||
          description.trim().length <5 ){
        alert("each and every field must have atleast 4 characters");
        return;
      }

      const product = {id:nanoid(),title, image, category, price, description};
      //Add product to the database here
      setproducts([...products, product]);
      localStorage.setItem("products", JSON.stringify([...products, product]));
      toast.success("Product added successfully")



      //Reset form fields
      settitle('')
      setimage('')
      setcategory('')
      setprice('')
      setdescription('')

      navigate('/')

      
  
  }

  return (
    <form onSubmit={AddProductHandler} className='w-full h-screen flex flex-col items-center  p-[5%] gap-4 shadow'>
      <h1 className='text-3xl mb-8 w-1/2'>Add New Product</h1>
      <input type="url" placeholder='image link' className='w-1/2 bg-zinc-100 text-1xl px-2 py-1' onChange={(e)=> setimage(e.target.value)} value={image}/>

      <input type="text" placeholder='title' className='w-1/2 bg-zinc-100 text-1xl px-2 py-1' onChange={(e)=> settitle(e.target.value)} value={title}/>

        <div className='flex justify-between w-1/2'> 
      <input type="text" placeholder='category' className='w-[48%] bg-zinc-100 text-1xl px-2 py-1 ' onChange={(e)=> setcategory(e.target.value)} value={category}/>

      <input type="number" placeholder='price' className='w-[48%] bg-zinc-100 text-1xl px-2 py-1 ' onChange={(e)=> setprice(e.target.value)} value={price}/>
      </div>

      <textarea placeholder='enter product description here...' className='w-1/2 bg-zinc-100 text-1xl px-2 py-1' onChange={(e)=> setdescription(e.target.value)} value={description} rows="10"></textarea>

      <div className='w-1/2'>
      <button
      className=" text-blue-300 px-2 py-2 border border-blue-100 rounded"
      href="/create"
    >
      Add New Product
    </button>
      </div>

    </form>
  )
}

export default Create
