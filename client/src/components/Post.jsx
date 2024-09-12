import React, { useState } from 'react';
import { Mycontext } from './Mycontext'
import { useContext } from 'react';
import { Buffer } from 'buffer';

const Post = ({ post, setPostmodal, }) => {
  const { data, user, authToken, userEmail, fetchData } = useContext(Mycontext)
  const { favorites, addFavorite, removeFavorite } = useContext(Mycontext);
  const [likes, setLikes] = useState(post.likes || []);
  const [dislikes, setDislikes] = useState(post.dislikes || []);

  //Learn more about this
  const isFavorite = favorites.some(favPost => favPost.id === user.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(post_id);
    } else {
      addFavorite(post_id);
    }
  };



  const handleReaction = async (reaction) => {
    try {
      const response = await fetch(`http://localhost:9949/posts/react/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, reaction }),
      });

      const data = await response.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
  };


  return (
    <div>
      <div className='overlay'>
        <div className='modal'>
          <div className='modal-title'>
             <img src={`${Buffer.from(post.image, 'base64')}`}
              alt={post.title}
              style={{ width: '80%', height: '150px' }}
            /><br></br>
            <p>Title: {post.title}</p>
          </div>
          <p>{post.postcategory}</p>
          <p>Body: {post.body}</p>
          <p>Author: {post.postauthor}</p>
          <p>Date: {post.post_date}</p>

          <div className="reactions">
            <button onClick={() => handleReaction('like')}>
              Like {likes.length}
            </button>
            <button onClick={() => handleReaction('dislike')}>
              Dislike {dislikes.length}
            </button>
            <button onClick={handleFavoriteToggle}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>

          <button onClick={() => {
            setPostmodal(false)
            fetchData()
          }}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
