"use client"

import { products as initialProducts, Product } from "@/lib/data"
import { useState } from "react"

export default function AdminDashboard() {

const [products, setProducts] = useState<Product[]>(initialProducts)

const emptyProduct: Product = {

id: "",
name: "",
slug: "",
category: "",
subcategory: "",
brand: "",
description: "",
price: 0,
salePrice: null,
discount: 0,
inStock: true,
stockQuantity: 0,
sku: "",
image: "",
rating: 0,
reviewCount: 0,
tags: [],
featured: false,
trending: false,
newArrival: false,

}

const [form, setForm] = useState<Product>(emptyProduct)

const [editingId, setEditingId] = useState<string | null>(null)


// HANDLE INPUT

function handleChange(field: keyof Product, value: any) {

setForm({

...form,

[field]: value

})

}


// ADD OR UPDATE

function saveProduct() {

if(editingId){

setProducts(

products.map(p =>

p.id === editingId ? form : p

)

)

setEditingId(null)

}

else{

setProducts([

...products,

{

...form,

id: "ID" + Date.now(),

}

])

}

setForm(emptyProduct)

}


// EDIT

function editProduct(product: Product){

setForm(product)

setEditingId(product.id)

}


// DELETE

function deleteProduct(id: string){

setProducts(

products.filter(p => p.id !== id)

)

}


// STOCK UPDATE QUICK

function updateStock(id:string, qty:number){

setProducts(

products.map(p =>

p.id === id

? {...p, stockQuantity: qty}

: p

)

)

}



return (

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">

JSEdumart Admin Dashboard

</h1>



{/* FORM */}


<div className="grid grid-cols-3 gap-3 mb-6">

<input placeholder="Name"

value={form.name}

onChange={e=>handleChange("name", e.target.value)}

className="border p-2"/>



<input placeholder="Slug"

value={form.slug}

onChange={e=>handleChange("slug", e.target.value)}

className="border p-2"/>



<input placeholder="Brand"

value={form.brand}

onChange={e=>handleChange("brand", e.target.value)}

className="border p-2"/>



<input placeholder="Price"

type="number"

value={form.price}

onChange={e=>handleChange("price", Number(e.target.value))}

className="border p-2"/>



<input placeholder="Stock"

type="number"

value={form.stockQuantity}

onChange={e=>handleChange("stockQuantity", Number(e.target.value))}

className="border p-2"/>



<input placeholder="Image URL"

value={form.image}

onChange={e=>handleChange("image", e.target.value)}

className="border p-2"/>



<button

onClick={saveProduct}

className="bg-blue-600 text-white p-2 col-span-3"

>

{editingId ? "UPDATE PRODUCT" : "ADD PRODUCT"}

</button>

</div>



{/* TABLE */}



<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th>Name</th>

<th>Price</th>

<th>Stock</th>

<th>Update Stock</th>

<th>Edit</th>

<th>Delete</th>

</tr>

</thead>



<tbody>

{products.map(product=>(

<tr key={product.id} className="border">

<td>{product.name}</td>

<td>{product.price}</td>

<td>{product.stockQuantity}</td>



<td>

<input

type="number"

defaultValue={product.stockQuantity}

onBlur={e=>

updateStock(

product.id,

Number(e.target.value)

)

}

className="border w-20"

/>

</td>



<td>

<button

onClick={()=>editProduct(product)}

className="bg-yellow-500 text-white p-1"

>

EDIT

</button>

</td>



<td>

<button

onClick={()=>deleteProduct(product.id)}

className="bg-red-600 text-white p-1"

>

DELETE

</button>

</td>



</tr>

))}

</tbody>

</table>


</div>

)

}