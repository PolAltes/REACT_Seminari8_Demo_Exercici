import React, { useEffect } from "react";
import { User } from '../../types';
import styles from './UsersList.module.css'; // Import CSS module
import UserInfo from "../UserInfo/UserInfo"; // Import UserInfo component
import { updateUser } from "../../services/usersService";

interface Props {
    users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const [userList, setUsers] = React.useState<User[]>(users);

    useEffect(() => {
        setUsers(users);
    }, [users]);
    
    const handleFormClose = () => { 
        setSelectedUser(null);
    };
    
    const handleUserUpdate = (updatedUser: User) => {
        setUsers(prevUsers => prevUsers.map(user => user.name === updatedUser.name ? updatedUser : user));
        handleFormClose();
    };
    
    const renderList = (): React.ReactNode[] => {

        return userList.map((user) => (
            <li 
            key={user.name} 
            className={styles.listItem}
            onClick={()=> setSelectedUser(user)}
            style={{ cursor: 'pointer' }}
            >   
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                    <p className={styles.updated}>Updated: {user.updated} times</p>
                </div>
            </li>
        ));
    };

    return (
        <div>
            <ul className={styles.list}>
                {
                    renderList()
                }
            </ul>
            {selectedUser && (
                <div className={styles.formPopup}>
                    <UserInfo 
                        onNewUser={handleUserUpdate}
                        user={selectedUser}
                        updateUser={updateUser}
                    />
                    <button onClick={handleFormClose} className={styles.closeButton}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default UsersList;