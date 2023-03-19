const Content = require("../models/Content");
const { serverErrorResponse, successResponse } = require("../Utils/HttpAPI");
const { parseType } = require("../Utils/variables");

let controller = {};

controller.GetRandomContent = async (req, res) => {
  try {
    const user = req.user;

    const type = req.query.type ? parseType(req.query.type) : undefined;
    let result = undefined;
    if (type){
      result = await Content.aggregate([{"$match": {"type": type}}, {"$sample": { size: 1 }}])
    }else{
      result = await Content.aggregate().sample(1)
    }

    return successResponse(res, { result });
  } catch (error) {
    console.log("Error getting Random Content: ", error);
    return serverErrorResponse(res, { error: error.toString() });
  }
};

controller.GetContent = async (req, res) => {
  try {
    const user = req.user;
    const type = req.params.type ? parseType(req.params.type) : undefined;
    const {orderBy="name", order, filterBy="name", filter} = req.query;
    const $search= {
      index: "default",
      text: {
        query: filter,
        path: "name"
      }
    }
    const sortOrder = order === "asc" ? 1 : -1;
    const $sort={};
    $sort[orderBy]=sortOrder;
    const pipelines=[];
    if (filter && filterBy){
      pipelines.push({$search})
    }
    if (type){
      pipelines.push({"$match": {"type": type}})
    }
    if (order && orderBy){
      pipelines.push({$sort})
    }
    let result = undefined;
    
    result = await Content.aggregate(pipelines);

    return successResponse(res, { result });
  } catch (error) {
    console.log("Error getting Random Content: ", error);
    return serverErrorResponse(res, { error: error.toString() });
  }
};

module.exports = { ContentController: controller };