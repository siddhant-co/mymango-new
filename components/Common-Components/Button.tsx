type ButtonProps = {
  text: string;
  className?: string;
};

const Button = ({ text, className = "" }: ButtonProps) => {
  return (
    <button
      className={`px-6 py-2 text-base font-semibold transition-all duration-300 rounded ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
