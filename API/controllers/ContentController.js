const Content = require("../models/Content");
const Rating = require("../models/Rating");
const jwt = require('jsonwebtoken');
const { serverErrorResponse, successResponse, errorResponse } = require("../Utils/HttpAPI");
const { parseType, SORT_FIELDS, FILTER_FIELDS, TYPES } = require("../Utils/variables");
const { ObjectId } = require('mongodb')

let controller = {};
let clients = [];
controller.GetRandomContent = async (req, res) => {
  try {
    const type = req.query.type ? parseType(req.query.type) : undefined;
    const pipelines = [];
    if (type) {
      pipelines.push({ "$match": { "type": type } })
    }
    pipelines.push({ "$sample": { size: 1 } })
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

    return successResponse(res, { result });
  } catch (error) {
    console.log("Error getting Random Content: ", error);
    return serverErrorResponse(res, { error: error.toString() });
  }
};

controller.GetContent = async (req, res) => {
  try {
    const type = req.params.type ? parseType(req.params.type) : undefined;
    const { orderBy = "name", order, filterBy = "name", filter } = req.query;
    const $search = {
      index: "default",
      text: {
        query: filter,
        path: filterBy
      }
    }
    const sortOrder = order === "asc" ? 1 : -1;
    const $sort = {};
    $sort[orderBy] = sortOrder;
    const pipelines = [];
    if (filter && filterBy && FILTER_FIELDS.includes(filterBy)) {
      pipelines.push({ $search })
    }
    if (type) {
      pipelines.push({ "$match": { "type": type } })
    }
    pipelines.push({
      $addFields: {
        numberOfViews: {
          $size: {
            $ifNull: ["$views", []]
          }
        }
      }
    })
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
    if (order && orderBy && SORT_FIELDS.includes(orderBy)) {
      pipelines.push({ $sort })
    }



    let result = undefined;

    result = await Content.aggregate(pipelines);

    return successResponse(res, { result: result });
  } catch (error) {
    console.log("Error getting Random Content: ", error);
    return serverErrorResponse(res, { error: error.toString() });
  }
};

controller.rateContent = async (req, res) => {
  try {
    const { contentId, rate } = req.body;
    const userId = req.user._id;
    if (!contentId || !rate) {
      return errorResponse(res, 400, { message: `El parametro 'contentId' es requerido` })
    }
    if (!rate) {
      return errorResponse(res, 400, { message: `El parametro 'rate' es requerido` })
    }
    if (rate < 1 || rate > 5) {
      return errorResponse(res, 400, { message: `El parametro 'rate' es tener un valor entre 1 y 5.` })
    }
    const content = await Content.findOne({ "id": contentId });
    if (!content) {
      return errorResponse(res, 400, { message: "Película/Serie no encontrada." })
    }
    const isRated = await Rating.findOne({ userId, contentId });

    if (isRated) {
      return errorResponse(res, 400, { message: `Ya esta ${content.type} fue valorada por el usuario.` })
    }
    const data = await Rating.create({ userId, contentId, rate })
    return successResponse(res, { result: data });
  } catch (error) {
    console.log("Error rating  Content: ", error);
    return serverErrorResponse(res, { error: error.toString() });
  }
};

controller.viewContent = async (req, res) => {
  try {
    const { contentId } = req.body;
    const userId = req.user._id;
    if (!contentId) {
      return errorResponse(res, 400, { message: `El parametro 'contentId' es requerido` })
    }

    const content = await Content.findOne({ id: contentId })
    console.log("🚀 ~ file: ContentController.js:113 ~ controller.viewContent= ~ content:", content.views.includes(new ObjectId(userId)))
    if (content.views.includes(userId)) {
      return errorResponse(res, 400, { message: `Ya esta ${content.type} fue vista por el usuario.` })
    }
    content.views.push(new ObjectId(userId))
    await content.save()

    return successResponse(res, { content });
  } catch (error) {
    console.log("Error getting Random Content: ", error);
    return serverErrorResponse(res, { error: error.toString() });
  }
};


controller.getMovieOfTheDay =  (ws, req) => {
  ws.on('message', async function (msg) {
    const token = JSON.parse(msg).userData.token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
        const { iat } = jwt.decode(token)
        const isExpired = (Date.now()) > ((iat + 20200) * 1000)

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

        if (!isExpired&& verified) {
          ws.send(JSON.stringify({ movie: result[0] }))
        }
  });
}


controller.setMovieOfTheDay = async (req, res) => {
  try {
    const type = TYPES.movie;
    const pipelines = [];
    pipelines.push({ "$match": { "type": type } })
    pipelines.push({ "$sample": { size: 1 } })

    const result = await Content.aggregate(pipelines);
    await Content.updateMany({}, { dayPick: false })
    const movie = await Content.findById(result[0]._id)
    movie.$set("dayPick", true).save();
    return successResponse(res, { result });
  } catch (error) {
    console.log("Error getting Random Content: ", error);
    return serverErrorResponse(res, { error: error.toString() });
  }
};

module.exports = { ContentController: controller };