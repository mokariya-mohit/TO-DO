let express = require('express');
let path = require('path');
let port = 3000;
let app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());

let tasks = [];

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/viewTasks', (req, res) => {
    res.json(tasks);
});

app.post('/addTasks', (req, res) => {
    const { title, date, type } = req.body;

    if (!title || !date || !type) {
        return res.status(400).json({ error: 'Task title, date, and type are required' });
    }
    else {
        const task = { id: tasks.length + 1, title, date, type };
        tasks.push(task);
        res.status(201).json(task);
    }

});

app.delete('/deleteTasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const deletedTask = tasks.find(task => task.id === taskId);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(200).json(deletedTask);
});


app.listen(port, (err) => {
    err ? console.log("listen error") : console.log(`Server listening on ${port}`);
});