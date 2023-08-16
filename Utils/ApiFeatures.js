class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        const queryCopy = {...this.queryStr};

        // Removing fields from the query
        const removeFields =['sort', 'fields', 'q', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter using: lt, lte, gt, gte
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort(){
        //Will sort if the sort tag is used, and will organise by what's being asked to sort by first, then second if applicable, otherwise will sort by createdAt times.
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort('createdAt');
        }

        return this;
    }

    limitFields(){
        if(this.queryStr.fields){
            //query.select('name duration price ratings')
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query.select(fields);
        }
        else{
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate(){
        const page = +this.queryStr.page || 1;
        const limit = +this.queryStr.limit || 10;
        //PAGE 1: 1-10, PAGE 2: 11-20
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

/*         if(this.queryStr.page){
            const moviesCount = await Movie.countDocuments();

            if(skip >= moviesCount){
                throw new Error("This page cannot be found.");
            }
        } */

        return this;
    }
}

module.exports = ApiFeatures