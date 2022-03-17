const Image = require('../model/Image')
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const imageUpload = async (req, res) => {
    console.log(req.body)
    try {
        // const image = await Image.create({ image: req.body.imageURL })
        const metadata = new grpc.Metadata();
        metadata.set("authorization", `Key ${process.env.CLARFAI_KEY}`);
        const stub = ClarifaiStub.grpc();
        let data = {};
        stub.PostModelOutputs({
            model_id: "aaa03c23b3724a16a56b629203edc62c",
            inputs: [{ data: { image: { url: req.body.imageURL } } }]
        },
            metadata,
            (err, response) => {
                if (err) {
                    console.log("Error: " + err);
                    return;
                }

                if (response.status.code !== 10000) {
                    console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }

                console.log("Predicted concepts, with confidence values:")
                // for (const c of response.outputs[0].data.concepts) {
                //     console.log(c.name + ": " + c.value);
                // }
                data = response.outputs[0].data.concepts;
                res.status(201).json({ success: true, data })
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Image Upload Failed' })
    }
}

module.exports = {
    imageUpload
}