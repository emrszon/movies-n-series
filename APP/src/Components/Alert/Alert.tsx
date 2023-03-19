import React from "react";
import "./Alert.scss"

const Alert = ({messages, type}:{messages:any, type:string}) => {
  let classname= "";
  switch (type) {
    case "success":
      classname = "alert-success";
      break;
      case "error":
        classname = "alert-error";
        break;
    
    default:
      break;
  }
  return (
    <div className="alert-container">
        {messages.length > 0 && (<span className={`${classname}`}>{messages.map((msg:string, i:number) => (
        <li key={i}>{msg}</li>
        ))}
      </span>
      )}
    </div>
  );
}
export default Alert;