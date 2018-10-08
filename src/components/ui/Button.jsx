import React from 'react';

const STYLE = {
  button: {
    width: 250,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
};

const buttonBlue = "#2196F3";

export default function Button({ style, textStyle, classname, children, variant, onClick }) {

  const getClass = variant => {
    switch (variant) {
      case "ios": return "button-ios";
      case "square": return "button-square";
      default: return "button";
    }
  };

  return (
    <div style={{ ...STYLE.button, ...style }} className={getClass(variant)} onClick={onClick}>
      <p style={{ color: variant === "ios" ? buttonBlue : "white", ...textStyle }}>{children}</p>
    </div>
  );
}