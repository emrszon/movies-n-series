import React from "react";
import { createUser } from "../API/UsersAPI";
import CreateUserForm from "../Components/CreateUserForm/CreateUserForm";

const CreateUserPage = ({ }) => {
  const handleCreateUser = async (data: any) => {
    try {
      const response = await createUser(data);
      console.log("Created: ", response)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="page-title">
        <h1>Registro</h1>
      </div>
      <CreateUserForm handleCreate={handleCreateUser} />
    </>);
}

export default CreateUserPage;