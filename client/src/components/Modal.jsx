import { useContext, useState } from 'react';
import { Mycontext } from './Mycontext';

//Rem to implement Fs to save image in public folder

const Modal = ({ setOpenmodal, mode, post, user }) => {
    const { categories } = useContext(Mycontext);
    const [image, setImage] = useState('');

    const [data, setData] = useState({
        category: mode === 'create' ? "" : post.category,
        title: mode === 'create' ? "" : post.title,
        body: mode === 'create' ? "" : post.body,
        author: mode === 'create' ? user : post.author,
        post_date: mode == 'create' ? JSON.stringify(new Date()) : post.post_date,
        edit_date: mode == 'create' ? JSON.stringify(new Date()) : JSON.stringify(new Date())
    });

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Set the selected file to the state
    };

    const ImagetoBase64 = (e) => {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload =() => {
        console.log('base64 Image', reader.result)
        setImage(reader.result)
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category', data.category);
        formData.append('title', data.title);
        formData.append('body', data.body);
        formData.append('author', data.author);
        formData.append('post_date', data.post_date);
        formData.append('edit_date', data.edit_date);
        formData.append('image', image); // Add the image file to FormData

        try {
            const response = await fetch(`http://localhost:9949/${mode === 'create' ? 'post' : `posts/edit/${post.id}`}`, {
                method: mode === 'create' ? "POST" : "PUT",
                body: formData // Send FormData
            });

            const result = await response.json();
            console.log(result);
            setOpenmodal(false)
            window.location.reload()
          

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='overlay'>
                <div className='modal'>
                    <div className='modal-title'>
                        {mode === 'create' ? <h3>Create Post now</h3> : <h3>Edit Post now</h3>}
                        <button onClick={() => setOpenmodal(false)}>X</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='title'>Post Title</label>
                        <input type='text' onChange={HandleChange} name='title' value={data.title} placeholder="Your Title Goes Here" /><br /><br />

                        <label htmlFor='image'>Attach Image</label>
                        <input type='file' onChange={ImagetoBase64} name='image' /> 
                        <img src={image} width={50} height={50}/>
                        <br /><br />
                                            <div>
                            <label htmlFor='category'>Post Category</label>
                            <select name='category' onChange={HandleChange} value={data.category}>
                                {categories.map((catlist) => (
                                    <option key={catlist.id} value={catlist.id}>{catlist.category}</option>
                                ))}
                            </select>
                        </div><br />

                        <label htmlFor='body'>Post body</label>
                        <input type='text' onChange={HandleChange} name='body' value={data.body} placeholder="Your Body Goes Here" /><br /><br />

                        <label htmlFor='author'>Post Author</label>
                        <input type='text' onChange={HandleChange} name='author' value={data.author} placeholder="Your Author Goes Here" /><br /><br />

                        <label htmlFor='post_date'>Post Date</label>
                        <input type='text' onChange={HandleChange} name='post_date' value={data.post_date} placeholder="Your Date Goes Here" /><br /><br />

                        {mode === 'edit' ? (
                            <>
                                <label htmlFor='edit_date'>Edit Date</label>
                                <input type='text' onChange={HandleChange} name='edit_date' value={data.edit_date} placeholder="Your Date Goes Here" />
                            </>
                        ) : ""}
                        <br /><br />
                        <input type='submit' value='Submit' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;
