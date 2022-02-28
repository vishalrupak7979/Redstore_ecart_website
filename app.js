let express=require('express');
let mongoose=require('mongoose');
let app=express();
let port=process.env.PORT || 5000;







app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

let email="";
let password="";

const url="mongodb+srv://vishal:1234@cluster0.mf6q5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(url || 'mongodb://localhost:27017/mydb');

mongoose.connection.on('connected',()=>{
    console.log("mongodb connected");
})

let dataSchema={
    email:String,
    password:Number,
}

let model=mongoose.model('datas',dataSchema);



app.get('/',function(req,res){
res.render('account');
});

app.get('/login',function(req,res){
    res.render('account');
});


app.get('/index',function(req,res){
    res.render('index');
});

app.get('/products',function(req,res){

    res.render('product');
   
});

app.get('/cart',function(req,res){

    res.render('cart');
});

app.get('/productdetails',function(req,res){

    res.render('product-details');
});

app.post('/login',(req,res)=>{
    let email1=req.body.email1;
    let password1=req.body.Password1;
    console.log(email1);
    console.log(password1);
model.findOne({"email":email1},(err,users)=>{
    if(!err){
        if(users){
            if((users.email==email1)&&(users.password==password1)){
                res.redirect('/index');
            }
        }else{
            res.redirect('/login');
        }
    }else{
        console.log(err);
    }
})

})


app.post('/',(req,res)=>{
     email=req.body.email;
    password=req.body.ps;

    let datadocs=new model({
        email:email,
        password:password,

    });

    datadocs.save();
    res.redirect('/login');
})


app.listen(port,(res)=>{
    console.log(`server runs on 5000`);
});



