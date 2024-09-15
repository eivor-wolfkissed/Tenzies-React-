import React, { useState } from "react"

export default function UserForm({onsubmit}){
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        onsubmit({name, username, email, password})
    }

    return(
        <div className="user-form-container">
            <h1>Help us know you better</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input 
                type="text" 
                placeholder="What should we call you"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                type="text" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type="text" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Let's Begin</button>
                
            </form>
        </div>
    )

}