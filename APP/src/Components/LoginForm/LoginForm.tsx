import React, { useEffect, useState } from "react";
import { isEmailValid, isPresent } from "../../Utils/FormUtils";
import Alert from "../Alert/Alert";
import "./LoginForm.scss";
const LoginForm = ({ signin }: any) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState<String[]>([]);

  const validate = async () => {
    let errors = {
      password: isPresent("password", formData) ? "" : "Contraseña es requerida",
      email: isPresent("email", formData) ? "" : "Email es requerido"
    }

    let errorsToShow = []
    errorsToShow = await Object.values(errors).filter(err => err !== "");
    if (Object.values(errors).every(err => err !== "") || !isEmailValid(formData["email"])) {
      errorsToShow.push("Datos inválidos");
    }
    return errorsToShow;
  }



  const handleSubmit = async (event: any) => {
    event.preventDefault();
    validate().then((errors) => {
      setFormErrors(errors);
      if (errors.length === 0) {
        signin(formData);
      }
    });
  }

  return (<>
    <form className="form-container">
      <Alert messages={formErrors} type="error"/>
      <br />
      <div className="form-group">
        <div className="form-label">
          Email:
        </div>
        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      </div>
      <div className="form-group">
        <div className="form-label">
          Password:
        </div>
        <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      </div>

      <br />
        <button className="btn btn-primary action" onClick={handleSubmit} >Login</button>

    </form>
  </>);
}

export default LoginForm;