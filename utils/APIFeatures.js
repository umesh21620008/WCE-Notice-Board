class APIFeatures {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }

  // filter() {
  //   const filterQueries = ["page", "sort", "limit", "fields"];
  //   let reqQueryObj = { ...this.reqQuery };
  //   const { startDate, endDate, type, year, branch } = { ...this.reqQuery };
  //   if (!startDate) {
  //     filterQueries.push("startDate");
  //   }
  //   if (!endDate) {
  //     filterQueries.push("endDate");
  //   }
  //   if (!type || type == "everyone") {
  //     filterQueries.push("type");
  //   }
  //   if (!year || year == "everyYear") {
  //     filterQueries.push("year");
  //   }
  //   if (!branch || year == "everyBranch") {
  //     filterQueries.push("branch");
  //   }
  //   filterQueries.forEach((ele) => delete reqQueryObj[ele]);
  //   let reqQueryStr = JSON.stringify(reqQueryObj);
  //   reqQueryStr = reqQueryStr.replace(
  //     /\b(gte|lte|gt|lt)\b/g,
  //     (match) => `$${match}`
  //   );
  //   reqQueryObj = JSON.parse(reqQueryStr);
  //   this.query.find(reqQueryObj);
  //   return this;
  // }

  filter() {
    let finalQuery = {};

    const { startDate, endDate, type, year, branch } = this.reqQuery;

    if (startDate) {
      this.query.find({
        startDate: {
          $gte: this.reqQuery.startDate,
        },
      });
    }
    if (endDate) {
      this.query.find({
        startDate: {
          $lte: this.reqQuery.endDate,
        },
      });
    }
    if (!(!type || type == "Everyone")) {
      this.query.find({
        $or: [{ type: { $eq: type } }, { type: { $eq: "Everyone" } }],
      });
    }
    if (!(!year || year == "Everyone")) {
      this.query.find({
        $or: [{ year: { $eq: year } }, { year: { $eq: "Everyone" } }],
      });
    }
    if (!(!branch || branch == "Everyone")) {
      this.query.find({
        $or: [{ branch: { $eq: branch } }, { branch: { $eq: "Everyone" } }],
      });
    }

    this.query.find(finalQuery);

    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      let sortString = this.reqQuery.sort;
      sortString = sortString.split(",").join(" ");
      this.query.sort(sortString);
    } else {
      let sortString = "startDate";
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
