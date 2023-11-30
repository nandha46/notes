import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    adult:Boolean,
    also_known_as:[],
    biography:String,
    birthday:{
        type:Date, 
        get: date => date == null?'-':date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })},
    gender:{
        type:Number,
        get: gender => {if (gender == 0){
                    return "Non-binary";
                } else if(gender == 1){
                    return "Female";
                } else {
                    return "Male";
                }
    }},
    homepage:String,
    id:Number,
    imdb_id:String,
    known_for_department:String,
    name:String,
    place_of_birth:String,
    popularity:Number,
    profile_path:String,
    external_ids:Schema.Types.Mixed,
    movie_credits:Schema.Types.Mixed,
    tv_credits:Schema.Types.Mixed
}, {
    toJSON:{
        virtuals:true,
        getters:true
    },
    toObject:{
        virtuals:true,
        getters:true
    }
});

schema.virtual("age").get(function () {
  const currentDate = new Date();
  if (this.birthDate === "-") return "-";

  const birthDate = new Date(this.birthday);
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() * 100 + currentDate.getDate() <
    birthDate.getMonth() * 100 + birthDate.getDate()
  ) {
    return age - 1;
  }

  return age;
});

const Person = mongoose.model('persons', schema);

export default Person;