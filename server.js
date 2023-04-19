const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();  
app.set("view engine","ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
const Item = mongoose.model('Item', { 
    name: String 
});


var itemsArr = [];
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ToDoDB');

 
const testAr= await Item.find({})

if(testAr.length == 0){
    const item1 = new Item(
        {
            name: "Buy Food"
        }
        )
    const item2 = new Item({name: "Cook Food"})
    const item3 = new Item({name: "Eat Food"})
    
    Item.insertMany([item1, item2, item3])

}
  
}

app.post("/", async function (req,res) {
     var item= req.body.newItem;
     const userItem = new Item({
        name: item
     })
     await userItem.save()

     res.redirect("/")
})

app.get('/', async function(req,res) {
    const itemsArr= await Item.find({})
    res.render("app", {listTitle: "Today", newListItem: itemsArr})
})



app.post("/delete", async function (req, res) {
    const id = req.body.cb;
    await Item.deleteOne({_id: id})
    res.redirect("/")

})







app.listen("3000",function () 
{
console.log('server is listening') ;   
})