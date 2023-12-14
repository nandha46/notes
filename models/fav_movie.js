import mongoose from "mongoose";

const schema = new mongoose.Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'movies',
        unique:true,
    },
    isFavourite:Boolean,
    isKnown:Boolean,
    rating:{
        type:Number, 
        default:0
    },
    tags:[{ 
        type:mongoose.ObjectId, 
        ref:'tags',
    }],
    comment:String
},{
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

schema.virtual('options').get(function () {

    let content = `<ul class="nk-tb-actions gx-1">
    <li class="nk-tb-action-hidden">
        <a data-target="addFavPerson" class="toggle btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
            <em class="icon ni ni-edit"></em>
        </a>
    </li>
    <li>
        <div class="drodown">
            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
            <div class="dropdown-menu dropdown-menu-end">
                <ul class="link-list-opt no-bdr">
                    <li><a href="#"><em class="icon ni ni-eye"></em><span>View Person Details</span></a></li>
                </ul>
            </div>
        </div>
    </li>
</ul>`;

    return content;

});

const colorArray = ['bg-primary','bg-secondary','bg-success','bg-info','bg-warning','bg-danger','bg-light', 'bg-dark','bg-gray'];

// code to get a random color from array
// colorArray[Math.floor(Math.random() * colorArray.length)]

schema.virtual('tag_formatted').get(function (){
    let tag_data = this.tags.map( tag => `<li><span class="badge ${colorArray[Math.floor(Math.random() * colorArray.length)]}">${tag.name}</span></li>`)
    return '<ul class="kanban-item-tags">'+tag_data+'</ul>';
});

const FavMovie = mongoose.model('fav_movies', schema);

export default FavMovie;