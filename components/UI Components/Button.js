const Button = ({ text, func}) => {
  return (
    <button
      className="bg-primary rounded-lg p-2 m-1 text-tertiary"
      onClick={func}
    >
      {text}
    </button>
  );
};

export default Button;