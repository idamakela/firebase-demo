import { useState, useEffect } from 'react';
import firebaseConfig from './firebaseConfig';
import { getDatabase, ref, push, get, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import './App.css';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState(false); //not working correctly

    const post = async (e) => {
        e.preventDefault();
        const dataRef = ref(database, 'users');
        const snapshot = await get(dataRef);
        const users = snapshot.val() || [];
        const user = {
            name: name,
            company: company,
            email: email,
            contact: contact,
        };
        users.push(user);
        set(dataRef, users)
            .then(() => {
                console.log('Data written successfully!');
            })
            .catch((error) => {
                console.error('Error writing data: ', error);
            });

        setName('');
        setCompany('');
        setEmail('');
        setContact(false);
    };

    return (
        <div className='input'>
            <form onSubmit={post}>
                <label>name</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>company</label>
                <input
                    type='text'
                    id='company'
                    name='company'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <label>email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type='checkbox'
                    id='contact'
                    value={contact}
                    onChange={(e) => setContact(true)}
                />
                <label>can we contact you?</label>

                <input type='submit' value='send' />
            </form>
        </div>
    );
}

export default App;
