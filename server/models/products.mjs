import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        name: String,
        required: true
    },
    description: {
        type: String
    }
})

export default mongoose.model('Products', productSchema)