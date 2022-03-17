import React, { useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const Home = () => {

    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [imageData, setImageData] = useState(null)

    const handleSubmit = async () => {
        // console.log(image)
        if (!image) {
            alert("Please upload image")
            return;
        }
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        const resData = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
            }/upload`, data)
        // console.log(resData)

        const imageURL = resData.data.url
        setImageUrl(resData.data.url)
        try {
            const res = await axios.post('http://localhost:5000/api/v1/image-upload', { imageURL })
            console.table(res.data.data)
            setImageData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-lg font-bold'>Upload The Image</h1>
            <div className='flex flex-col items-center'>
                <input
                    type="file"
                    name="image"
                    id="image"
                    className='my-4 '
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button className='btn' onClick={handleSubmit}>Submit</button>
            </div>
            {imageUrl && <img src={imageUrl} alt="uploaded" className='h-32 my-6' />}
            {imageData && <h1 className='text-lg font-semiBold my-6'>Results</h1>}
            {imageData &&
                <div className='table-cont'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Number</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Property</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Confindece</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {imageData.map((data, index) => (
                                    <TableRow
                                        key={data._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{Math.round(data.value * 100, 2)}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    )
}

export default Home