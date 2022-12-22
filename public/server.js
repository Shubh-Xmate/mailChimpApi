var exp = require("express");
var bodyParser = require("body-parser");
var https = require("https");
const { json } = require("body-parser");

var app = exp();
app.use(exp.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


var apikey = "e51e626a0b2714bb6e8c4a8ef8572444-us12";
var listId = "53718c3de1";

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res)
{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var ename = req.body.ename;

    var data = 
        {
            members :
                [
                    {email_address : ename, status: "subscribed", merge_fields : {FNAME : fname, LNAME : lname}}
                ]
        }
    
    var jsonData = JSON.stringify(data);

    console.log(jsonData);

    var url = "https://us12.api.mailchimp.com/3.0/lists/" + listId;

    var options = {
        method: "POST",
        auth: "b20168@students.iitmandi.ac.in:" + apikey
    }

    console.log(options);

    var request = https.request(url, options, function(response)
    {
        if(response.statusCode == 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data)
        {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/red", function(req, res)
{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){console.log("started server at 3000 port");})

// app.get("/", function(req, res)
// {
//     var url = "https://v2.jokeapi.dev/joke/Any";
//     https.get(url, function(response)
//     {
//         console.log(response);
//         response.on("data", function(data)
//         {
//             const jokeData = JSON.parse(data);
//             console.log("data is below : ");
//             console.log(jokeData.setup);
//             console.log(jokeData.delivery);
//         })
//     });
//     res.sendFile(__dirname + "/index.html");
// })

// app.post("/", function(req, res)
// {
//     console.log(req.body);

//     var num1 = Number(req.body.n1);
//     var num2 = Number(req.body.n2);

//     var result = num1 + num2;

//     res.send("The result is " + result);
// })

// app.get("/contact", function(req, res)
// {
//     res.send("contact me at shuklas@gmail.com");
// })

// app.get("/about", function(req, res)
// {
//     res.send("Shubham Shukla, B.tech, CSE, IIT Mandi");
// })

// app.listen(3000, fun);

// function fun()
// {
//     console.log("server listening at 3000 port");
// }

// var app2 = exp();

// app2.get("/", function(req, res)
// {
//     res.send("home page for app2");
// })

// app2.get("/contact", function(req, res)
// {
//     res.send("contact me at shuklas@gmail.com app2");
// })

// app2.get("/about", function(req, res)
// {
//     res.send("Shubham Shukla, B.tech, CSE, IIT Mandi app2");
// })

// app2.listen(4040, fun2);

// function fun2()
// {
//     console.log("server listening at 4040 port");
// }
