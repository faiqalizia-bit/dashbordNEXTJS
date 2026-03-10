import { FiCheck } from "react-icons/fi";

export default function MessageTicks({ status}: { status?: string },) {

  if (status === "sent") {
    return (
      <span className="text-gray-400">
        <FiCheck size={14} />
      </span>
    );
  }

  if (status === "delivered") {
    return (
      <span className="flex text-gray-800">
        <FiCheck className="-mr-2" size={14}/>
        <FiCheck size={14}/>
      </span>
    );
  }

  if (status === "read") {
    return (
      <span className="flex text-blue-500">
        <FiCheck className="-mr-2" size={14}/>
        <FiCheck size={14}/>
      </span>
    );
  }

  return null;
}