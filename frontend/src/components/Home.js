import React, { useState } from 'react'
import axios from 'axios'

const Home = () => {

    const [image, setImage] = useState(null)
    const [imageData, setImageData] = useState(null)

    const handleSubmit = async () => {
        console.log(image)
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
            const resData = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
                }/upload`, data)
            // console.log(resData)

            const imageURL = resData.data.url
            try {
                const res = await axios.post('http://localhost:5000/api/v1/image-upload', { imageURL })
                console.table(res.data.data)
                setImageData(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <h1>Upload The Image</h1>
            <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Home