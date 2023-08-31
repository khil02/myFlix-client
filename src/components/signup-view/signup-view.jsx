import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
            event.preventDefault();

        const data = { 
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://my-flix882023-9b8843449882.herokuapp.com/users/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
        if (response.ok) {
            alert("Signup Successful");
            window.location.reload();
        } else {
            alert("Signup failed");
        }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <hr />
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                    maxLength="40"
                />
            </label>
            <label>
            <br />
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="5"
                />
            </label>
            <label>
            <br />
                Email:
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <label>
            <br />
                Birthday:
                <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};