# Notes App

### JS libraries used
 - Datatable 1.12.1
  - 


### Mongo Shell
 - Delete duplicates via mongo shell
```
// Assume 'yourCollection' is the name of your collection
var collection = db.persons;

// Create an aggregation pipeline to find and keep one instance of each unique document based on 'imdb_id'
var pipeline = [
    {
        $group: {
            _id: { imdb_id: "$imdb_id" },
            uniqueIds: { $addToSet: "$_id" },
            count: { $sum: 1 }
        }
    },
    {
        $match: {
            count: { $gt: 1 } // find only the duplicate documents
        }
    }
];

// Execute the aggregation pipeline
var duplicates = collection.aggregate(pipeline);

// Iterate over the duplicates and keep one instance of each unique document based on 'imdb_id'
duplicates.forEach(function (doc) {
    var uniqueIds = doc.uniqueIds.slice(1); // remove the first _id
    collection.deleteMany({ _id: { $in: uniqueIds } });
});

print("Duplicates removed successfully.");