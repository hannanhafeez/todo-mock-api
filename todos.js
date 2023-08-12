const fs = require("fs");
const path = require("path");

const todoFilePath = path.join(__dirname, "todos.json");

function saveTodos(todos) {
	const data = JSON.stringify(todos, null, 2);
	fs.writeFileSync(todoFilePath, data);
	console.log("Todo list saved.");
}

function readTodos() {
	if (fs.existsSync(todoFilePath)) {
		const data = fs.readFileSync(todoFilePath, "utf8");
		return JSON.parse(data);
	}
	return [];
}

module.exports.saveTodos = saveTodos;
module.exports.readTodos = readTodos;
