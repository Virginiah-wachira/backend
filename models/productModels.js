
const mongoose = require ('mongoose')

const productSchema = mongoose.Schema(
  {
    name: { 
      type: String, 
    
    },
   
    email: {
      type: String,
      
   },
   
    password: {
      type: Number,
   },
   
    image:{
      type: String,

   }
},
{
  timestamps:true
}
)

const  Product = mongoose.model('Product', productSchema);
module.exports = Product;
