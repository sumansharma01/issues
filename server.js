const http=require('http');
const app=require("./app");

const PORT=process.env.PORT || 3600;

const server=http.createServer(app);

server.listen(PORT,()=>{
    console.log("listening to port ",PORT);
})