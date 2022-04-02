class ApiFilters{
    constructor(query, rawQuery){
        this.query = query 
        this.rawQuery = rawQuery 
    }


    filter() {
        let queryCopy = { ...this.rawQuery }

         //remove fields from the queryStr
         const removeFields = ["sort", "select"]
         removeFields.forEach(el => delete queryCopy[el])

        let rawQuery = JSON.stringify(queryCopy)
        rawQuery = rawQuery.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`)
        this.query = this.query.find(JSON.parse(rawQuery))

        return this
    }

    /** This will arrange or order the data as specified */
    sort() {
        if(this.rawQuery.sort){
            const sortBy = this.rawQuery.sort.split(',').join(" ")
            this.query = this.query.sort(sortBy)
        }else {
            this.query = this.query.sort("updatedAt")
        }

        return this
    }

    /** This will pick out the selected parameters from the details */
    select(){
        if(this.rawQuery.select){
            const selectBy = this.rawQuery.select.split(',').join(' ')
            this.query = this.query.select(selectBy)
        }

        return this
    }

    pagination(){
        const page = parseInt(this.rawQuery.page, 10) || 1
        const limit = parseInt(this.rawQuery.limit, 10) || 10
        const skip = (page -1) * limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }

}


module.exports = ApiFilters