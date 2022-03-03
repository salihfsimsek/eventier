class BaseService{
    async list(where){
        return this.model.find(where || {})
    }

    async create(data){
        return this.model.create(data)
    }

    async findOne(where){
        return this.model.findOne(where)
    }

    async update(item, data){
        return this.model.findOneAndUpdate(item, data, {new: true})
    }

    async deleteOne(where){
        return this.model.deleteOne(where)
    }
}

module.exports = BaseService