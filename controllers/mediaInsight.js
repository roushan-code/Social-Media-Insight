import { db } from "../AstraDb.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { v4 as uuid } from 'uuid';
import { chatGPT } from "../langflow.js";



function listDB() {
    return new Promise((resolve, rejects) => {
        resolve(db.listCollections({ name: "mediaDetails" }));
    })
}
async function getData() {
    const data = await listDB();

    if (data[0].name !== "mediaDetails") {
        await db.createCollection('mediaDetails');
    }
}
getData();


export const addMediaDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        // Get collection name and data from request
        const { _id = uuid(), postType, likes, comments, shares } = req.body;

        if(!postType || !likes || !comments || !shares) {
            return res.status(400).json({ success: false, error: 'Please provide all the details!' });
        }

        const collection =  db.collection('mediaDetails');

        // Insert data (single or multiple documents)
        const data = collection.insertOne({
            _id,
            postType,
            likes,
            comments,
            shares,
        });

        res.status(200).json({ success: true, data, message: 'Data inserted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to insert data' });
    }
})

export const getMediaDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const collection = db.collection('mediaDetails');
        const documents = [];
        for await (const doc of collection.find({})) {
            documents.push(doc);
        }
        res.status(200).json({ success: true, data: documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to fetch data' });
    }
});


export const getSingleMediaDetail = catchAsyncErrors(async (req, res, next) => {
    try {
        const collection = db.collection('mediaDetails');
        const { id } = req.params;
        const document = await collection.findOne({ _id: id });
        res.status(200).json({ success: true, data: document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to fetch data' });
    }
})

export const getInsight = catchAsyncErrors(async (req, res, next) => {
    try {
        let {question} = req.body;
        const collection = db.collection('mediaDetails');
        const documents = await collection.find({}).toArray();
        const result = documents.reduce((acc, curr) => {
            if (!acc[curr.postType]) {
                acc[curr.postType] = { likes: 0, comments: 0, shares: 0 };
            }
            acc[curr.postType].likes += curr.likes;
            acc[curr.postType].comments += curr.comments;
            acc[curr.postType].shares += curr.shares;
            return acc;
        }, {});

        if(!question) {
            return res.status(400).json({ success: false, error: 'Please ask a question! so I can help you.' });
        }
        
         question += `Carousel posts have ${result.carousel.likes} likes, ${result.carousel.comments} comments, and ${result.carousel.shares} shares. 
            Reels have ${result.reel.likes} likes, ${result.reel.comments} comments, and ${result.reel.shares} shares. 
            Static posts have ${result.static.likes} likes, ${result.static.comments} comments, and ${result.static.shares} shares.
            `
            // Generate insights about the performance of these post types.
            // console.log(question);
        
        
        const Response = await chatGPT(question);

        res.status(200).json({ success: true, data: Response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to fetch data' });
    }
});




export const updateMediaDetail = catchAsyncErrors(async (req, res, next) => {
    try {
        const collection =  db.collection('mediaDetails');
        const { id } = req.params;
        const { postType, likes, comments, shares } = req.body;
        const data = await collection.updateOne({ _id: id }, { $set: { postType, likes, comments, shares } });
        res.status(200).json({ success: true, data, message: 'Data updated successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to update data' });
      }
})

export const deleteMediaDetail = catchAsyncErrors(async (req, res, next) => {
    try {
        const collection = db.collection('mediaDetails');
        const { id } = req.params;
        const data = await collection.deleteOne({ _id: id });
        res.status(200).json({ success: true, data, message: 'Data deleted successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to delete data' });
        }
});