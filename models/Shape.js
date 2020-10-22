import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Shape = new Schema({
    text: { type: String},
    color: { type: String},
    borderColor: { type: String},
    position: { type:{
      xBegin:  {type: Number},
      yBegin: {type: Number},
      rectWidth: {type: Number},
      rectHeight: {type: Number},
      radius: {type: Number, required: false}} 
    }  
})

export default mongoose.model('Shape', Shape);