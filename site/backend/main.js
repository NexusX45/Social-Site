const express = require('express');
const cors = require('cors');
app = express();

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {

    console.log(req.body.email);
    res.send(req.body.email);

})

app.listen(4000, () => console.log("Listening on port 4000"));

