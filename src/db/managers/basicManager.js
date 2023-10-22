export default class BasicManager {
    constructor(model) {
        this.model = model;
    }

    async findAll(){
      return this.model.find();
    }
    async findById(id){
      return this.model.findById(id);
    }
    async createOne(obj){
      return this.model.create(obj);
    }
    async createOne(obj){
      return this.model.create(obj);
    }
    async updateOne(id, obj){
      return this.model.updateOne({_id: id}, obj);
    }
    async delateOne(id){
      return this.model.delateOne({_id: id});
    }
  }