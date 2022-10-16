import React from "react"
import Header from "../../components/Header"

const Users = () => {
    const handleAddUser = () => {}
    return (
        <div>
            <Header
                title="Пользователи"
                titleBtn="Добавить пользователя"
                onClick={handleAddUser}
            />
        </div>
    )
}

export default Users
