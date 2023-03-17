class ApiFeatures {
  constructor(query, queryStr) {
    // pass the product model for search and put it into the this.query
    this.query = query;
    this.queryStr = queryStr;
  }

  //   with the help of this we can able to search
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
            // here options is use for the also search for the inline keyword
          },
        }
      : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  // filter
  // this is case sensitive

  filter() {
    // this help to make copy of original one not pass reference
    const queryCopy = { ...this.queryStr };
    // removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    // this is help to the remove words like keyword,page,limit from the queryCopy
    removeFields.forEach((key) => delete queryCopy[key]);

    // filter for price and rating
    // stringify is help to the add $ sign to the lt,gt,lte,gte
    let queryStr = JSON.stringify(queryCopy);

    // console.log(queryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    // this.query = this.query.find(queryCopy);
    // console.log(queryStr);

    return this;
  }

  //pagenation
pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
