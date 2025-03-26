import express, { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import Category from '../models/category.mjs'
import { validationResult,checkSchema, matchedData } from 'express-validator'
import {categoryValidator} from '../validators/categoryValidator.mjs'
import fs from 'node:fs'

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


// create category route

router.post("/", upload.single('image'), checkSchema(categoryValidator), async(req, res) => {
  // Get the validation results and check whether or not there is an error
  const results = validationResult(req)

  if (!results.isEmpty()) return res.send({ error: results.array()[0].msg })

    // Retrieve the validated data
    const data = { ...req.body, ...matchedData(req) }
    
    // setting image field
    data.image = req.file.filename

    try {
        const newCategory = new Category(data)
        await newCategory.save()
        return res.send(newCategory)

    } catch (error) {
        return res.send({error: error.message})
    }
})



// update category with image
router.put("/:id", upload.single("image"), checkSchema(categoryValidator), async (req, res) => {
    const {id} = req.params
  // check if category exists
  const oldCategory = await Category.findById(id)
  if (!oldCategory) return res.send({ error: 'Category does not exist!' })

  // Get the validation results and check whether or not there is an error
  const results = validationResult(req)

  if (!results.isEmpty()) return res.send({ error: results.array()[0].msg })

  // Retrieve the validated data
  const data = { ...req.body, ...matchedData(req) }
  // delete old image
  if(oldCategory.image !== "") fs.unlinkSync(destination + oldCategory.image)
  // setting image field
  data.image = req.file.filename

  // update category
  try {
    await Category.findByIdAndUpdate(id, data)
    return res.send(oldCategory)
  } catch (error) {
    return res.send({ error: error.message })
  }
})
router.use(express.json())
// upload without image
router.patch("/:id", checkSchema(categoryValidator), async (req, res) => {
    const {id} = req.params 
  // check if category exists
  const oldCategory = await Category.findById(id)
  if (!oldCategory) return res.send({ error: 'Category does not exist!' })

  // Get the validation results and check whether or not there is an error
  const results = validationResult(req)

  if (!results.isEmpty()) return res.send({ error: results.array()[0].msg })

  // Retrieve the validated data
  const data = matchedData(req) 
  if (req.body.description === "") data.description = req.body.description 
  // set image to previous image
  data.image = oldCategory.image
    
  // update category
    try {
        await Category.findByIdAndUpdate(id, data)
        return res.send(oldCategory)
  } catch (error) {
    return res.send({error: error.message})
  }
})

// get category
router.get("/", async (req, res) => {
    const { cursor, q,limit } = req.query 
    const query = {}
    // for infinity scroll implementations
    if (cursor) {
        query._id = {$gt: cursor}
    }
    // for search queries
    if (q) {
        query.name = {$regex: q}
    }

    try {
        const result = await Category.find(query, null, { limit: limit ? Number(limit) : 0 })
        return res.send(result)
    } catch (error) {
        return res.send({error: error.message})
    }
})


// Delete category
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    
    // check if category exisits
    const oldCategory = await Category.findById(id)
    if (!oldCategory) return res.send({ error: 'Category does not exist!' })
    
    // delete
    try {
        await Category.findByIdAndDelete(id)
        return res.send(oldCategory)
    } catch (error) {
        return res.send({error: error.message})
    }
    
})


export default router