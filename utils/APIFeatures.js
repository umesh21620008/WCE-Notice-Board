class APIFeatures {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }

  filter() {
    const filterQueries = ["page", "sort", "limit", "fields"];
    let reqQueryObj = { ...this.reqQuery };
    filterQueries.forEach((ele) => delete reqQueryObj[ele]);
    let reqQueryStr = JSON.stringify(reqQueryObj);
    reqQueryStr = reqQueryStr.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`
    );
    reqQueryObj = JSON.parse(reqQueryStr);
    this.query.find(reqQueryObj);
    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      let sortString = this.reqQuery.sort;
      sortString = sortString.split(",").join(" ");
      this.query.sort(sortString);
    } else {
      let sortString = "title";
      sortString = sortString.split(",").join(" ");
      this.query.sort(sortString);
    }
    return this;
  }

  paginate() {
    if (this.reqQuery.page) {
      let page = this.reqQuery.page;
      let limit = 10;
      if (this.reqQuery.limit) {
        limit = this.reqQuery.limit;
      }
      let skip = (page - 1) * limit;
      this.query.skip(skip);
      this.query.limit(limit);
    }

    return this;
  }

  filterFields() {
    if (this.reqQuery.fields) {
      let fields = this.reqQuery.fields.split(",").join(" ");
      this.query.select(fields);
    }

    return this;
  }
}

module.exports = APIFeatures;
