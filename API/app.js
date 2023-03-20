const express = require('express');
const app = express()
const expressWs = require('express-ws')(app);
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv/config');

const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth');
const Content = require('./models/Content');
let clients = [];
expressWs.getWss().on('connection', function (ws) {
    console.log(`Recieved a new connection.`);
    clients.push(ws);

});

const changeStream = Content.watch()
changeStream.on('change', async (data) => {
    const pipelines = [];
    pipelines.push({ "$match": { "dayPick": true } })
    pipelines.push({ $addFields: { numberOfViews: { $size: { $ifNull: ["$views", []] } } } })
    pipelines.push({
        $lookup:
        {
            from: "ratings",
            localField: "id",
            foreignField: "contentId",
            as: "reviews"
        }
    })
    pipelines.push({
        $addFields: {
            rating: {
                $cond: {
                    if: { $gt: [{ $size: "$reviews" }, 0] }, then: {
                        $divide: [{
                            $sum: "$reviews.rate"
                        },
                        {
                            $size:
                                "$reviews"
                        }]
                    }, else: 0
                }
            }
        }
    })
    let result = undefined;

    result = await Content.aggregate(pipelines);
    clients.forEach((ws) => {
        ws.send(JSON.stringify({ movieOfTheDay: result[0] }))
    })
});

app.use(cors());
app.use(express.json());

app.use('/api', homeRoutes);
app.use('/', authRoutes);

mongoose.connect(process.env.DB_URL, () => {
    console.log('Connected to Database')
})


app.listen(process.env.PORT, () => {
    console.log(`Application listening at http://localhost:${process.env.PORT}/`)
})