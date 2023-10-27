import { useState } from "react";
import axios from 'axios';
import Config from "../config";

function UploadFile() {
    const [file, setFile] = useState();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();

    const submit = async event => {
        event.preventDefault();

        // Send the file and description to the server
        const formData = new FormData();
        formData.append("image", file);
        formData.append("description", description);
        
        console.log('formData===', formData);

        const result = await axios.post(Config.API.AddDish, 
                                formData, 
                                { headers: 
                                    { 'Content-Type': 'multipart/form-data' } 
                                });
        console.log(result.data);
    }

    return (
        <div className="App">
            <form onSubmit={submit}>
                <input
                    filename={file}
                    onChange={e => {
                        setFile(e.target.files[0]);
                        setImage(URL.createObjectURL(e.target.files[0]));
                    }}
                    type="file"
                    accept="image/*"
                ></input>
                <input
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                ></input>
                <img src={image} alt="Test" width={100}></img>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UploadFile;