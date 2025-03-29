import Products from "../models/products.mjs";
import path from 'node:path'
import fs from 'node:fs'
import express, { Router } from 'express'
import multer from "multer";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { productValidator } from "../validators/productValidator.mjs";

// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/')

// Initializing multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})
const upload = multer({ storage })

const router = Router()

// create a product endpoint
router.post("/", upload.array('images', 4), checkSchema(productValidator),async (req, res) => {
    // check the required fields
    const result = validationResult(req)
    if (!result.isEmpty()) return res.send({ error: result.array()[0].msg })

    // Retrieve the validated data
    const data = { ...req.body, ...matchedData(req) }
    // setting images array
    console.log(req.files)
    data.images = req.files.map((item) => {
        console.log(item.filename);
        return item.filename;
    }) 
    
    try {
        const newProduct = new Products(data)
        await newProduct.save()
        return res.send(newProduct)
    } catch (error) {
        return res.send({error: error.message})
    }
})

// update with images
router.put("/:id", upload.array("images", 4), checkSchema(productValidator), async (req, res) => {
  const { id } = req.params
  // check if it exists
  const oldProducts = await Products.findById(id)
  if (!oldProducts) return res.send({ error: 'Product not found!' })

  // check the required fields
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send({ error: result.array()[0].msg })

  // Retrieve the validated data
  const data = { ...req.body, ...matchedData(req) }

  // remove old images
  if (oldProducts.images.length > 0) {
    try {
      oldProducts.images.forEach((item) => fs.unlinkSync(item))
    } catch (error) {}
  }
  // setting images array
  console.log(req.files)
  data.images = req.files.map((item) => {
    console.log(item.filename)
    return item.filename
  })
  try {
    await Products.findByIdAndUpdate(id, data)
    return res.send(oldProducts)
  } catch (error) {
    return res.send({ error: error.message })
  }
})


router.use(express.json())

// update without the images
router.patch("/:id", checkSchema(productValidator), async (req, res) => {
    const {id} = req.params
    // check if it exists
    const oldProducts = await Products.findById(id)
    if (!oldProducts) return res.send({ error: 'Product not found!' })
    
    // check the required fields
    const result = validationResult(req)
    if (!result.isEmpty()) return res.send({ error: result.array()[0].msg })

    // Retrieve the validated data
    const data = { ...req.body, ...matchedData(req) }

   
    // setting images array
    data.images = oldProducts.images
    try {
        await Products.findByIdAndUpdate(id, data)
        return res.send(oldProducts)
    } catch (error) {
        return res.send({error: error.message})
    }
})
// get products
router.get("/", async (req, res) => {
    const { cursor, q, limit, category } = req.query
    const query = {}
    // for infinity scroll implementation
    if (cursor) {
        query._id = { $gt:cursor}
    }
    // for search queries
    if (q) {
        query.name = {$regex: q}
    }
    // for selecting according to category
    if (category) {
        query.category = category
    }

    try {
        const results = await Products.find(query, null, {limit: limit ? Number(limit):0})
        return res.send(results)
    } catch (error) {
        return res.send({error: error.message})
    }
})

// get one product
router.get("/:id", async (req, res) => {
    const { id } = req.params 
    
    // get the product
    try {
        const result = await Products.findById(id)
        if(!result) return res.send({error: `Product with ID: ${id} do not exist`})
        return res.send(result)
        
    } catch (error) {
        return {error: error.message}
    }
})
// delete products
router.delete("/:id", async (req, res) => {
    const { id } = req.params 
    // check if it exists
    const oldProducts = await Products.findById(id)
    if (!oldProducts) return res.send({ error: 'Product not found!' })
    
    // delete product
    try {
        await Products.findByIdAndDelete(id)
        return res.send(oldProducts)
    } catch (error) {
        return res.send({error: error.message})
    }
    
}) 

export default router