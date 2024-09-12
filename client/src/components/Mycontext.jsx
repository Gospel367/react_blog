import React, {createContext, useEffect, useState} from "react";
import { useCookies } from "react-cookie";

export const Mycontext = createContext();




const MyProvider = ({children})=> {

    const [allposts, setAllposts] = useState([]);
    const [allauthors, setAllauthors] = useState([]);
    const [categories, setCategories] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies()
    const [favorites, setFavorites] = useState([]);
    const [postmodal, setPostmodal] = useState(false)




    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const data = cookies.Data
    const user = cookies.User

    //Learn more about prevstate
    const addFavorite = async ( post_id) => {
        //setFavorites((prevFavorites) => [...prevFavorites, post]);
        try {
            const response = await fetch('http://localhost:9949/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, post_id }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // 'Favorite added successfully'
            } else {
                console.error('Failed to add favorite:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
        

    };

    //Learn more about filter
    const removeFavorite = async (post_id) => {
        try {
            const response = await fetch('http://localhost:9949/favorites', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, post_id }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // 'Favorite removed successfully'
            } else {
                console.error('Failed to remove favorite:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
        }

       // setFavorites((prevFavorites) => prevFavorites.filter(post => post.id !== postId));
    };

    // getFavorites.js
const getFavorites = async (user) => {
    try {
        const response = await fetch(`http://localhost:9949/favorites/${user}`);

        if (response.ok) {
            const result = await response.json();
            setFavorites(result)
            console.log('User favorites:', result); // Array of post_ids
        } else {
            console.error('Failed to fetch favorites:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
};

useEffect(() => {
    
    getFavorites(user);        
  }
    , [user])


  
    const fetchData = async() => {
         {
            await fetch(`http://localhost:9949`)
            .then(response => response.json()) 
            .then(data => setAllposts(data))
            .catch (error => console.error('Error fetching data:' , error)) 
          };
    }

    const contextvalue ={
        allposts,
        setAllposts,
        allauthors,
        setAllauthors,
        categories,
        setCategories,
        fetchData,
        authToken,
        user,
        userEmail,
        data,
        favorites,
        getFavorites,
        addFavorite,
        removeFavorite,
        setFavorites,
        setPostmodal,
        postmodal
    }


    const Posts = async () => {

        try {
          const response = await fetch(`http://localhost:9949`)
          const json = await response.json()
          setAllposts(json)
    
        } catch (err) {
          console.error(err)
        }
    
      }
    
    
      useEffect(() => {
    
        Posts();        
      }
        , [])

    
        const allAuthors = async () => {

            try {
                const response = await fetch(`http://localhost:9949/users`)
                const json = await response.json()
                setAllauthors(json)
    
    
            } catch (err) {
                console.error(err)
            }
        }
    
    
    
        useEffect(() => {
            allAuthors()
        }
            , [])
    

            const Categories = async () => {

                try {
                  const response = await fetch(`http://localhost:9949/categories`)
                  const json = await response.json()
                  setCategories(json)
            
                } catch (err) {
                  console.error(err)
                }
            
              }
            
              useEffect(() => {
            
                Categories()
              }
                , [])

        console.log(`context: ${allposts}`)


return (
    <Mycontext.Provider value={contextvalue}>
        {children}
    </Mycontext.Provider>
);
}


export default MyProvider;