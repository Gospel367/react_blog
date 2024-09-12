// FavoritesList.jsx
import React from 'react';
import Post from './Post';
import { Mycontext } from './Mycontext'
import { useContext } from 'react';
import Header from './Header'
import { Buffer } from 'buffer';


const FavoritesList = () => {
    const { setPostmodal, allposts } = useContext(Mycontext);
    const { data, user, authToken, userEmail, favorites } = useContext(Mycontext)
    console.log('fave:', favorites)
    let filtered;

    favorites.map((post) => {
        console.log('mapped:' + post.post_id)
        filtered = allposts.filter(posti => posti.id === post.post_id)

    })

    const filteredPosts = allposts.filter(post =>
        favorites.some(fav => fav.post_id === post.id)
    );

    return (
        <div>
            <Header
                data={data}
                user={user}
                userEmail={userEmail}
                authToken={authToken}
            />


            <h1>Favorite Posts</h1>
            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                filteredPosts.map(post => (
                    <div key={post.id}>
                        <img src={`${Buffer.from(post.image, 'base64')}`}
              alt={post.title}
              style={{ width: '80%', height: '150px' }}
            /><br></br>
                        <p>Title: {post.title}</p>
                        <p>Category: {post.postcategory}</p>
                        <p>Body: {post.body}</p>
                        <p>Author: {post.postauthor}</p>
                        <p>Date: {post.post_date}</p>
                    </div>
    ))
                
            )}
        </div >
    );
};

export default FavoritesList;
