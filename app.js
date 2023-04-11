const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs")
const app = express();


app.set('view engine', 'ejs');


const { Configuration, OpenAIApi } = require("openai");
const ans = [];
const OPENAI_API_KEY = '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';
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index", { answerrr : ans });
})

app.post("/chat", (req, res) => {
  const question = req.body.queryy;
  openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 4000,
    temperature: 0,
  })
    .then(response => {
      return (response?.data?.choices?.[0]?.text);
    })
    .then((answer = "") => {
      const array = answer?.split("\n").filter((value) => value).map((value) => value.trim());
      return (array)
    })
    .then((answers) => {
      answers.forEach((item)=>ans.push(item));
      res.redirect("/");
    })
    
})

app.post("/clear" ,(req,res)=>{
  ans.forEach((items)=>ans.pop(items));
  res.redirect("/");
})

app.get("/style.css",(req,res)=>{
  res.sendFile(__dirname+"/style.css");
})
app.listen(3000, () => {
  console.log("server is started at 3000 port");
})