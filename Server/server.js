const express =require('express');
const cors = require('cors');

const mongoose=require('mongoose')
const User = require('./models/User');

require('dotenv').config();
const app = express()


app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("mongoDB Connected"))
.catch(err=>console.log(err));

app.post('/signup', async (req, res) => {
    try {
      const { uid, name, email } = req.body;
      
      let user = await User.findOne({ uid });
      if (!user) {
        user = new User({ uid, name, email });
        await user.save();
      }
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


app.listen(5000,()=>('server running on port 5000'))