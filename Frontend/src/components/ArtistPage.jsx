import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ArtistPage({data}) {
  const navigate=useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    portfolio: '',
    Type:'',
    Price: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const addNewProduct =(dataToUpdate)=>{

    // updateProduct(dataToUpdate);
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newProfile = { ...profile, image };
    const formdata = new FormData();
    formdata.append("file",image);
    try{
      await axios.post("/api/upload",formdata);
      const arrayLen = parseInt(data?data.length:'1');
      console.log(profile);
      const multerObj={
        "head": "Product "+(arrayLen+1),
        "id": arrayLen+1,
        "image": "http://localhost:3457/images/"+image.name,
        "Type":profile.type,
        "price": profile.price,        
      }
      // addNewProduct(multerObj);
      try{
        axios.post("/api/writejsfile",multerObj);
        navigate('/');     
       }catch(error){
        console.log(error);
      }
      
    }catch(error){
      console.log(error,"error res after multer upload");
    }

    if (isEditing) {
      setProfiles(profiles.map(p => (p.id === currentProfileId ? { ...newProfile, id: currentProfileId } : p)));
      setIsEditing(false);
    } else {
      setProfiles([...profiles, { ...newProfile, id: Date.now() }]);
    }
    setProfile({ name: '', bio: '', portfolio: '',Type: '',Price:'' });
    setImage(null);
  };

  const handleEdit = (id) => {
    const profileToEdit = profiles.find(p => p.id === id);
    setProfile(profileToEdit);
    setIsEditing(true);
    setCurrentProfileId(id);
  };

  const handleDelete = (id) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className='m-5'>ArtistPage</h1>
          <Card className="p-4 shadow p-3 mb-5 bg-body-tertiary rounded">
            <Card.Body>
              <Card.Title className="text-center mb-4">{isEditing ? 'Edit Profile' : 'Create Profile'}</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBio" className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPortfolio" className="mb-3">
                  <Form.Label>Portfolio</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="portfolio"
                    value={profile.portfolio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formType" className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="type"
                    value={profile.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="price"
                    value={profile.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Select Image:</Form.Label>
                  <Form.Control type="file" onChange={handleFileUpload} />
                  <Form.Text className="text-muted">
                    Only .jpg, .jpeg, .png formats allowed.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  {isEditing ? 'Update Profile' : 'Save Profile'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
      
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <Card className="p-4 shadow p-3 mb-5 bg-body-tertiary rounded">
            <Card.Body>
              <Card.Title className="text-center mb-4">Profiles</Card.Title>
              <ul className="list-group">
                {profiles.map(p => (                  
                  <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">                    
                    <div>
                      <h5>{p.name}</h5>
                      <p>{p.bio}</p>
                      <p>{p.portfolio}</p>
                      <p>{p.Type}</p>
                      <p>{p.price}</p>
                      {p.image && (
                        <img
                          src={URL.createObjectURL(p.image)}
                          alt="Profile"
                          width="100"
                          className="img-thumbnail"
                        />
                      ) }
                    </div>
                    <div>
                      <button className="btn btn-secondary me-2" onClick={() => handleEdit(p.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;
