import React from 'react';

const STYLE = {
  button: {
    width: 250,
    height: 45,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
  },
  text: {
    color: "white",
    fontSize: "1em",
  },
};

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
      <p style={{ color: variant === "ios" ? "#2196F3" : "white", ...STYLE.text, ...textStyle }}>{children}</p>
    </div>
  );
}