import React, { useState } from "react";
import { isPresent } from "../../Utils/FormUtils";
import Alert from "../Alert/Alert";
import "./CreateUserForm.scss"
const CreateUserForm = ({ handleCreate }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [formErrors, setFormErrors] = useState<String[]>([]);

  const validate = async () => {
    let errors = {
      name: isPresent("name", formData) ? "" : "Nombre requerido",
      email: isPresent("email", formData) ? "" : "Email requerido",
      password: isPresent("job", formData) ? "" : "Contraseña requerida",
    }
    let errorsToShow = []
    if (Object.values(errors).every(err => err !== "")) {
      errorsToShow = ["Datos inválidos"];
    } else {
      errorsToShow = await Object.values(errors).filter(err => err !== "");
    }
    return errorsToShow;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    validate().then((errors) => {
      setFormErrors(errors);
      if (errors.length === 0) {
        handleCreate(formData);
      }
    });
  }

  return (<>
    <form className="form-container">
      <Alert messages={formErrors} type="error"/>
      <br />
      <div className="form-group">
        <div className="form-label">
          Nombre:
        </div>
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      </div>
      <div className="form-group">
        <div className="form-label">
          Email:
        </div>
        <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      </div>
      <div className="form-group">
        <div className="form-label">
          Contraseña:
        </div>
        <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      </div>
      <br />
      <div className="form-actions">
        <button className="btn btn-primary action" onClick={handleSubmit}>Registrarse</button>
      </div>
    </form>
  </>);
}

export default CreateUserForm;