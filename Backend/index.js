import express from "express";

const app= express();

app.get('/', (req, res) => {
    res.send('Server is ready')
    }
);

app.get('/api/jokes', (req, res) => {
    const jokes =
    [
        {
            id:1,
            title:'english'
        },
        {
            id: 2,
            title: 'hindi'
        },
        {
            id:3,
            title: 'marathi'
        } 
    ]
    
    res.send(jokes, name)
})

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
    }
)