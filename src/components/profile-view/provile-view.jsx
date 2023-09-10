import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";


export const ProfileView = ({movies}) => {

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [ token, setToken ] = useState(storedToken? storedToken : null);
    const [ user, setUser ] = useState(storedUser? storedUser : null);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(null);

    let favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m._id));

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const data = { 
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    const deleteAccount = () => {
    //    alert("this would delete your account");
        fetch(`https://my-flix882023-9b8843449882.herokuapp.com/users/${encodeURIComponent(user._id)}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                return response.json
            }
        })
        .then(() => {
            alert("Your account has been deleted successfully!");
            setUser(null);
            setToken(null);
            localStorage.clear();
            window.location.reload();
        });

    };

    const updateUser = () => {



    fetch(`https://my-flix882023-9b8843449882.herokuapp.com/users/${encodeURIComponent(username)}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    })
    .then((response) => {
    if (response.ok) {
        alert("Account Updated");
        window.location.reload();
    } else {
        alert("Update failed");
    }
    });
};


return (
    <>
    <Row>
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
        <Form.Label>
            Username: 
        </Form.Label>
            <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
                maxLength="40"
            />
        </Form.Group>

        <Form.Group controlId="formPassword">
            <Form.Label>
            Password: 
            </Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="5"
            />
        </Form.Group>

        <Form.Group controlId="formEmail">
            <Form.Label>
            Email: 
            </Form.Label>
            <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </Form.Group>

        <Form.Group controlId="formBirthday">
            <Form.Label> 
            Birthday:
            </Form.Label>
            <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" onClick={updateUser}>Update</Button>
    </Form>
    Favorite Movies:
    <br/>
    {favoriteMovies.map((movie) => (
        <Col className="mb-5" key={movie._id} md={3}>
            
              <MovieCard movie={movie} />
        </Col>
    ))}

    <footer>
        <br /><br /> <br /><hr/>
    <Col> Delete account:    </Col>
    <Button variant="danger" size="sm" onClick={deleteAccount}>
     Confirm
    </Button>
    
    </footer>
    </Row>
    </>
);
};