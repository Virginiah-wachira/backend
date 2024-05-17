const express = require('express')
const Product = require ('./models/productModels')
const mongoose = require('mongoose')
const app = express()


app.use(express.urlencoded({extended:false}))
app.use(express.json())
//route

app.get('/', (req, res) => {
  res.send('Hello Server')
})

app.get('/blog', (req, res)=>{
  res.send('Hello Blog ')
})

app.get('/product',async(req,res)=>{
  try {
    const products = await Product.find({})
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.get('/products/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})
app.post('/product', async (req, res)=>{
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

//update a product
app.put('/products/:id', async(req, res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product){
        return res.status(404).json({message: 'User not found with ID${id}'})
      }
      const updateProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.delete('/products/:id', async(req,res)=>{
  try {
    const{id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message: 'User not found with ID${id}'})
    }
    res.status(200).json({message: 'User deleted successfully'})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

mongoose.connect('mongodb+srv://virginiah:virg2023@project.dpdto6z.mongodb.net/User-API?retryWrites=true&w=majority&appName=Project')
.then(()=>{
  console.log('Database is connected')
  app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
  });
  
}).catch((error)=>{
  console.log(error)
})