import React, { useReducer, useEffect } from 'react';
import { User } from '../../types';
import styles from './UserInfo.module.css';
import { updateUser} from '../../services/usersService';

interface FormProps {
    user: User;
    onNewUser: (updatedUser:User) => void;
    updateUser: (userId: string, updatedUser: User) => void;
}

const INITIAL_STATE = (user: User): User => ({
    name: user.name,
    age: user.age,
    email: user.email,
    updated: user.updated,
    password: user.password,
    phone: user.phone
});

type FormReducerAction =
     | { 
        type: "change_value"; 
        payload: { 
            inputName: keyof User; 
            inputValue: string | number 
        } 
     }
     | { type: "clear"; payload: User };

const formReducer = (state: User, action: FormReducerAction): User => {
    switch (action.type) {
        case "change_value":
            return {
                ...state,
                [action.payload.inputName]: action.payload.inputValue
            };
        case "clear":
            return action.payload;
        default:
            return state;
    }
};

const UserInfo = ({ user, onNewUser }: FormProps) => {
    const [formState, dispatch] = useReducer(formReducer, INITIAL_STATE(user));

    useEffect(()=>{
        dispatch({type: "clear", payload: INITIAL_STATE(user)});
    },[user])

    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target;

        dispatch({
            type: "change_value",
            payload: {
                inputName: name as keyof User,
                inputValue: type === "number" ? Number(value) : value
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const updatedU = formState;
        updatedU.updated +=1;

        console.log(updatedU);

        updateUser(user.name, updatedU);

        onNewUser(updatedU);
    }

    return (
    <form 
    onSubmit={handleSubmit} className={styles.formContainer}>
        <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="Name"
            className={styles.input}
        />
        <input
            type="number"
            name="age"
            value={formState.age}
            onChange={handleInputChange}
            placeholder="Age"
            className={styles.input}
        />
        <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="Email"
            className={styles.input}
        />
        <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            placeholder="Password"
            className={styles.input}
        />
        <input
            type="tel"
            name="phone"
            value={formState.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className={styles.input}
        />
        <button type="submit" className={styles.submitButton}>
            Save
        </button>
    </form>)
};


export default UserInfo;