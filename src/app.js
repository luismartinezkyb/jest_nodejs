import express from 'express'
import crypto from 'crypto'
const app = express();

app.use(express.json())
app.get('/ping', (req, res) => {
    res.send('pong')
});

app.get('/tasks', (req, res) => {
    res.send([])
});

app.post('/tasks', (req, res) => {
    
    const {title, description} = req.body
    if(!title || !description){
        
        return res.sendStatus(400)
        
    }
    const task = {
        id: crypto.randomUUID(),
        title,
        description
    }

    res.json(task)
});
export default app;