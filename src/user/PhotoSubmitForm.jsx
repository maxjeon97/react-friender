import './PhotoSubmitForm.css';
import userContext from './userContext';
import { useContext, useState } from 'react';


/** PhotoSubmitForm component for Friender
 *
 * Props:
 * - updatePhoto(): function to call in parent
 *
 * State:
 * - image
 *
 * ProfilePage -> PhotoSubmitForm
*/
function PhotoSubmitForm({ updatePhoto }) {
    const [image, setImage] = useState(null);
    const { user } = useContext(userContext);

    /**handles input change */
    function handleChange(evt) {
        const formData = new FormData();
        formData.append('image', evt.target.files[0]);
        setImage(formData);
    }

    /** handles form submit; calls parent function */
    async function handleSubmit(evt) {
        evt.preventDefault();
        await updatePhoto(image);
    }

    return (
        <div className="PhotoSubmitForm">
            <img
                alt={`${user.username} Image`}
                src={user.imageUrl}
                className='PhotoSubmitForm-Image' />
            <form onSubmit={handleSubmit} className='mt-5'>
                <input type="file" name="image" onChange={handleChange} />
                <button
                    className='btn btn-primary'
                    type="submit"
                    disabled={!image}>
                    Upload
                </button>
            </form>
        </div>
    );
}

export default PhotoSubmitForm;