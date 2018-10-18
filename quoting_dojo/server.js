const express=require ('express');
const mongoose=require ('mongoose');
const bodyParser=require ('body-parser');
const path=require ('path');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));//middleware used to understand the requests

mongoose.connect('mongodb://localhost/quoting_dojo'); //quoting_dojo is the db

var QuoteSchema=new mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 100 },
    quote: { type: String, required: true, minlength: 1 }
}, { timestamps: true });


var Quote=mongoose.model('Quote', QuoteSchema);

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/quotes', (req, res)=>{
    var newquote= new Quote(req.body);
    newquote.save(function (err){
        if (err){
            console.log('errors in newquote');
        }else{
            console.log('quote added');
            res.redirect('/quotes');
            }
        })
    })

app.get('/quotes', (req, res)=>{
    Quote.find({}, (err, quotes)=>{ //data is an inbuilt function
        if (err){
            console.log('something went wrong')
        }
        else{
            console.log(quotes)
            res.render('quotes', {allquotes:quotes});
            }
        });
    });


app.listen(8000, function () {
    console.log("listening on port 8000");
})