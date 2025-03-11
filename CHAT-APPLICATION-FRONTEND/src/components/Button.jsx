import React from "react";

const Button = ({ text, onPress, customClassname = "" }) => {
  return (
    <div onClick={onPress} className={`button-wrapper ${customClassname}`}>
      {text}
    </div>
  );
};

export default Button;
