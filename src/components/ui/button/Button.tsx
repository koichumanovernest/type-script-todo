import React, { ReactNode, MouseEventHandler } from "react";
import scss from "./Button.module.scss";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className={scss.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

