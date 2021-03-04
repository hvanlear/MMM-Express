const express = require("express");
const ExpressError = require("./errors");
const app = express();

const {
  convertAndValidateNumsAr,
  findMean,
  findMedian,
  findMode,
} = require("./helpers");

app.get("/mean", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma seperated list of numbers",
      400
    );
  }
  let numsAsStrings = req.query.nums.split(",");
  let nums = convertAndValidateNumsAr(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }
  let result = {
    operation: "mean",
    result: findMean(nums),
  };
  return res.send(result);
});

app.get("/median", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let numsAsStrings = req.query.nums.split(",");
  // check if anything bad was put in
  let nums = convertAndValidateNumsAr(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "median",
    result: findMedian(nums),
  };

  return res.send(result);
});

app.get("/mode", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let numsAsStrings = req.query.nums.split(",");
  // check if anything bad was put in
  let nums = convertAndValidateNumsAr(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mode",
    result: findMode(nums),
  };

  return res.send(result);
});

//general error handler
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  return next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
