const express = require('express')
require('dotenv').config()
const cors = require('cors')
const pool = require('./db')
const { v4:uuidv4 } = require('uuid')
const PORT = process.env.PORT || 7000
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const multer = require('multer');


// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const app = express()
app.use(express.json())
app.use(cors())


//categories display

app.get('/categories', async(req, res) => {
    try {
        const categories = await pool.query("SELECT category.* FROM category")
        res.json(categories.rows)

    }catch (err){
        console.error(err)
     }
})
//post display per user

//post display
app.get('/', async(req, res) => {
    
    try{
         const allposts = await pool.query(`SELECT posts.*, category.category AS postcategory, users.fullname AS postauthor FROM posts JOIN category ON (posts.category=category.id) JOIN users ON (posts.author=users.id)`)
     //   const allposts = await pool.query('SELECT posts.*, category.category AS postcategory, author.fullname as postauthor  FROM posts JOIN category ON (posts.category=category.id) AND JOIN users ON (posts.author =users.id)')
        res.json(allposts.rows)

    } catch(err){
        console.error(err)
    }
})

// Post a new post
app.post('/post', upload.single('image'), async (req, res) => {
    const id = uuidv4();
    const {image, category, title, body, author, post_date, edit_date } = req.body;

    try {
        const newPost = await pool.query(
            `INSERT INTO posts(id, category, title, body, author, post_date, edit_date, image) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [id, category, title, body, author, post_date, edit_date, image]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create post' });
    }
});
//post a category
app.post('/category', async(req, res)=> {
    const id = uuidv4()
    const {category, description} = req.body

    try{
        const response =  await pool.query('INSERT INTO category(id,category,description) VALUES($1, $2, $3)', [id, category, description] )
        res.json(response)

    }catch (err){
        console.error(err)
    }
})

app.put('/posts/edit/:id', upload.single('image'), async (req, res)=> {
    const {id} =  req.params
    const {image, category, title, body, author, post_date, edit_date } = req.body;


    try{
        const response = await pool.query('UPDATE posts SET  category=$1, title=$2, body=$3, author=$4, post_date=$5, edit_date=$6, image=$7 WHERE id = $8' , [category, title, body, author, post_date, edit_date, image, id] )
        res.json(response)

    }catch (err){
        console.error(err)
    }
})
 
app.delete('/posts/:id', async(req, res) => {
    const {id} = req.params

    try {
        const response = await pool.query("DELETE FROM posts WHERE id=$1", [id] )
        res.json(response)

    }catch (err){
        console.error(err)
    }
})

//for liking a post
app.put('/posts/react/:postId', async (req, res) => {
    const { postId } = req.params;
    const { user, reaction } = req.body;
  
    try {
      const post = await pool.query('SELECT likes, dislikes FROM posts WHERE id = $1', [postId]);
      const { likes, dislikes } = post.rows[0];
  
      let updatedLikes = likes || [];
      let updatedDislikes = dislikes || [];
  
     // Remove user from likes and dislikes if they exist
    updatedLikes = updatedLikes.filter(id => id !== user);
    updatedDislikes = updatedDislikes.filter(id => id !== user);
  
      // Add the reaction based on user's input
      if (reaction === 'like' && updatedLikes.includes(user, 0)  ) {
        return updatedLikes
      }else if (reaction === 'dislike' && updatedDislikes.includes(user, 0)){
        return updatedDislikes
      } else if(reaction === 'like' && !updatedLikes.includes(user, 0)  ){
        updatedLikes.push(user);
      }else if(reaction === 'dislike' && !updatedDislikes.includes(user, 0)){
        updatedDislikes.push(user);

      }

    
      // Update the post in the database
      const updatedPost = await pool.query(
        'UPDATE posts SET likes = $1, dislikes = $2 WHERE id = $3 RETURNING likes, dislikes',
        [updatedLikes, updatedDislikes, postId]
      );
  
      res.json(updatedPost.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
//for adding users
app.post('/users/signup', (req, res)=> {
    const { fullname, email, hashed_password, class_name } = req.body
    const id = uuidv4()

    // encrypting of password
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(hashed_password, salt)
    

    try{
        const response =  pool.query('INSERT INTO users(id, fullname, email, hashed_password, class_name) VALUES($1, $2, $3,$4,$5)', [id, fullname, email, password, class_name] )
       //creating of tokens using jwt
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        res.json({email, token})

    }catch (err){
        console.error(err)
        if(err){
            res.json({detail: err.detail })
        }
    }
})

//for logging users
app.post('/users/login', async(req, res)=> {
    
    const { email, hashed_password } = req.body

    try{
        const response =  await pool.query('SELECT *  FROM users WHERE email = $1', [email] )
        if(!response.rows.length){
            res.json({detail: 'User does not exist'})
        }else{
            const success = await bcrypt.compare(hashed_password, response.rows[0].hashed_password)
            const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
    
    
            if(success){
                return res.json({ 'email': response.rows[0].email, token, 'data': response.rows[0].class_name, 'user': response.rows[0].id })
    
            }else {
               return  res.json({detail: 'Login failed'})
            }
        } 

           
    }catch (err){
        console.error(err)
        if(err){
            res.json({detail: err.detail })
        }
    }
})


// getting users
app.get('/users', async(req, res) => {
    
    try{
        const response = await pool.query('SELECT * FROM users')
        res.json(response.rows)

    } catch(err){
        console.error(err)
    }
})


// Add a post to favorites
app.post('/favorites', async (req, res) => {
    const { user, post_id } = req.body;

        
    try {

        const mapper = await pool.query(
            `SELECT post_id FROM favorites WHERE user_id = $1`, [user]
        )
        const {data} = mapper.rows[0] || []

        let updatedfav = data || []
        updatedfav = updatedfav.filter(id => id !== post_id)
    
        const result = await pool.query(
            'INSERT INTO favorites (user_id, post_id) VALUES ($1, $2) ON CONFLICT(user_id,  post_id) DO NOTHING',
            [user, post_id]
        );
        res.status(201).json({ message: 'Favorite added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove a post from favorites
app.delete('/favorites', async (req, res) => {
    const { user, post_id } = req.body;

    try {
        await pool.query('DELETE FROM favorites WHERE user_id = $1 AND post_id = $2', [user, post_id]);
        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all favorites for a user
app.get('/favorites/:user', async (req, res) => {
    const { user } = req.params;
    console.log(user)

    try {
        const result = await pool.query('SELECT post_id FROM favorites WHERE user_id = $1', [user]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});



app.listen(PORT, () =>{
    console.log(`Server running ON PORT ${PORT}`)
})