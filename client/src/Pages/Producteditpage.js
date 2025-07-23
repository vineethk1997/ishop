import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct,} from '../redux/Actions/productActions'; 
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstant'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import './pagecss/producteditpage.css';



function Producteditpage() {
  
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { error, loading, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, product, productId, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('product_id', productId)
    setUploading(true)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      const { data } = await axios.post('/api/products/upload/', formData, config)
      setImage(data)
    } catch (error) {
      console.error(error)
    }
    setUploading(false)
  }

  return (
    <div className="product-edit-container">
      <Link to="/admin/productlist" className="back-link">← Go Back</Link>

      <div className="form-box">
        <h2>Edit Product</h2>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
              <input id="image-file" type="file" onChange={uploadFileHandler} />
              {uploading && <Loader />}
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input id="brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="countInStock">Stock</label>
              <input id="countInStock" type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <button type="submit" className="btn-submit">Update</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Producteditpage
