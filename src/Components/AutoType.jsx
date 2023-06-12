import { TypeAnimation } from "react-type-animation";

const AutoType = () => {
  return (
    <div className='my-2'>
      <TypeAnimation
        className=' font-extrabold bg-gray-100 p-2 rounded-xl shadow-xl shadow-blue-400/20 text-indigo-500 mt-5 '
        sequence={[
          // Same String at the start will only be typed once, initially
          "Expand Empower Succeed ",
          3000,
          "Speak Connect Shine.",
          2000,
          "Master Inspire Engage.",
          2000,
          "Fluency Confidence Success.",
          2000,
        ]}
        speed={50}
        style={{ fontSize: "1.4em" }}
        repeat={Infinity}
      />
    </div>
  );
};

export default AutoType;
