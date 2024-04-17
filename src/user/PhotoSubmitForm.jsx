import { useState } from 'react';
import './PhotoSubmitForm.css';


/** PhotoSubmitForm component for Friender */
function PhotoSubmitForm() {
    const [image, setImage] = useState(null);

    async function handleSubmit(evt) {
        evt.preventDefault();

        const formData = new FormData();
        formData.append('image', evt.target.elements.image.files[0]);
        // await updatePhoto(formData);

        setImage(data.imageUrl);
    }

    return (
        <div className="PhotoSubmitForm">
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" />
                <button type="submit">Upload</button>
            </form>
            {image !== null &&
                <img src={`${image}`} alt="ProfileImage" />}
        </div>
    );
}

export default PhotoSubmitForm;