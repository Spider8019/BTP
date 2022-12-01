import React, { useState } from 'react'
import AbcIcon from '@mui/icons-material/Abc';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { createUser } from '../global/api';


const CreateUser = () => {
    const [passwordShow, setPasswordShow] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const handleTogglePasswordVisibility = (e) => {
        e.preventDefault()
        setPasswordShow(!passwordShow)
    }

    const handleSubmit = async (e) => {
        const response = await createUser(formData);
        console.log(response)
    }
    return (
        <div className='p-12'>
            <h1 className='text-5xl font-semibold mb-4'>create User</h1>
            <div>
                <div className='flex'>
                    <input type="text"
                        className='standardInput'
                        placeholder='Username'
                        value={formData.username}
                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                    />
                    <input type="email"
                        className='standardInput'
                        placeholder='Email'
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <div className='flex-1 bg-sky-500/40 m-2 rounded'>
                    </div>
                </div>
                <div className='relative'>
                    <input
                        className='standardInput bg-gray-50'
                        style={{ width: "calc(100% - 1rem)" }}
                        type={passwordShow ? "text" : "password"}
                        placeholder='Password'
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        style={{ height: "calc(100% - 1rem)" }}
                        className='absolute top-0 right-0 px-2 mt-2 mb-2 mr-2'
                        onClick={handleTogglePasswordVisibility}>
                        {passwordShow ? <MoreHorizIcon /> : <AbcIcon />}
                    </button>
                </div>
                <div className='flex m-2 gap-4'>
                    <button className="basicDarkButton"
                        onClick={handleSubmit}
                    >Create user</button>
                    <div className='flex-1 bg-sky-500/40 rounded'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUser