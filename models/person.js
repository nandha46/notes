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
    id:{
        type:Number,
        unique:true
    },
    imdb_id:{
        type:String 
    },
    known_for_department:String,
    name:String,
    place_of_birth:String,
    popularity:Number,
    profile_path:String,
    external_ids:Schema.Types.Mixed,
    movie_credits:Schema.Types.Mixed,
    tv_credits:Schema.Types.Mixed
}, {
    timestamps:true,
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

schema.virtual('options').get(function () {

    let content = `<ul class="nk-tb-actions gx-1">
    <li class="nk-tb-action-hidden">
        <a class="btn btn-trigger btn-icon text-primary" onclick="return markKnownPerson('${this._id}');" data-bs-toggle="tooltip" data-bs-placement="top" title="Mark as Known">
            <em class="icon ni ni-star"></em>
        </a>
    </li>
    <li class="nk-tb-action-hidden">
        <a class="btn btn-trigger btn-icon rating text-danger" onclick="return markFavouritePerson('${this._id}');" data-bs-toggle="tooltip" data-bs-placement="top" title="Mark as Favourite">
            <em class="icon ni ni-heart"></em>
        </a>
    </li>
    <li>
        <div class="drodown">
            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
            <div class="dropdown-menu dropdown-menu-end">
                <ul class="link-list-opt no-bdr">
                    <li><a href="#"><em class="icon ni ni-edit"></em><span>Edit Person</span></a></li>
                    <li><a href="#"><em class="icon ni ni-eye"></em><span>View Person</span></a></li>
                </ul>
            </div>
        </div>
    </li>
</ul>`;

    return content;

});

const Person = mongoose.model('persons', schema);

export default Person;