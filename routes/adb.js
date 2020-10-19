/*Create API endPoint*/
//importrequire express
const express = require('express');
//create new routern
const router = express.Router();
//create data static
let data = [{ id: 1, title: 'create a project', order: 1, complete: true, createdOn: new Date() },
    { id: 2, title: 'take a coffee', order: 2, complete: false, createOn: new Date() },
    { id: 3, title: 'write a rectangle', order: 1, complete: true, createOn: new Date() },
    { id: 4, title: 'walk to park', order: 3, complete: false, createOn: new Date() },
    { id: 5, title: 'have a dinner', order: 2, complete: true, createOn: new Date() },
];
router.get('/', function(req, res) {
    res.status(200).json(data);
});
router.get('/:id', function(req, res) {
    //find id
    let found = data.find(function(item) //tìm kiếm trong data
        {
            return item.id === parseInt(req.params.id); // trả về  một id có id trong data trùng với id ở path trên đường link
        });
    // check id with if
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});
module.exports = router;