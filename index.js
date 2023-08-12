const {readTodos, saveTodos} = require('./todos');
const { v4: uuidv4 } = require("uuid");

const express = require("express");
const app = express();
const port = 8080;

app.use(express.json()) // for parsing application/json



app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/posts", (req, res) => {
	const todoList = readTodos();
	res.json({ success: true, data: todoList });
});

app.get("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	console.log("ID:", id);
	if(!id){
		res.status(405).json({ success: false, message: "Invalid request." });
		return;
	}
	const currentList = readTodos();
	const filteredList = currentList.filter((item)=>item.id === id)[0];
	res.json({ success: true, data: filteredList });
});

app.put("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	const body = req.body;
	console.log("ID:", id);
	if(!id){
		res.status(405).json({ success: false, message: "Invalid request." });
		return
	}
	if (!body || !body.description || body.completed === undefined) {
		res.status(405).json({ success: false, message: "Invalid request." });
		return;
	}
	const currentList = readTodos();
	const newList = currentList.map((item)=>{
		if(item.id === id){
			return {
				...item,
				...req.body
			}
		}else{
			return item;
		}
	})
	saveTodos(newList);
	res.json({ success: true, message: "Data updated successfully!" });
});

app.post("/api/posts", (req, res) => {
	const body = req.body;
	console.log({body})
	if(!body || !body.description || body.completed === undefined){
		res.status(405).json({ success: false, message: "Invalid request." });
		return
	}
	const newTask = {
		id: uuidv4(),
		description: body.description,
		completed: body.completed,
	};
	console.log({ newTask });
	const currentList = readTodos();
	currentList.unshift(newTask);
	saveTodos(currentList);
	res.json({ success:true, message:"Task added succesfully!"});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});