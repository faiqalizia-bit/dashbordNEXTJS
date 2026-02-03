import { ReactNode } from "react";
interface CardProps {
  icon?: ReactNode;
  title: string;
  value?: string | number;
  children?: ReactNode;
  recentCard?: boolean;
  idx?: number;
  activeCount?: number;
  inActiveCount?: number;
}

function Card({
  icon,
  title,
  value,
  children,
  recentCard = false,
  idx,
  activeCount,
  inActiveCount,
}: CardProps) {
  return (
    <div className="w-full bg-white p-5 rounded shadow" key={idx}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1.25">
          {!recentCard && (
            <span
              style={{ fontSize: "12px" }}
              className="text-lg  bg-primary rounded-full p-2 text-white"
            >
              {icon}{" "}
            </span>
          )}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        {!recentCard && (
          <p className="flex justify-center items-center text-3xl font-bold   ">
            {value}
          </p>
        )}
      </div>
      {!recentCard && (
        <div className="flex gap-2.5 items-center">
          <p className="text-[12px]">
            <span className="inline-block rounded-full bg-green-500 size-2.5 mr-1"></span>
            Active: <span className="font-bold">{activeCount}</span>{" "}
          </p>
          <p className="text-[12px]">
            <span className="inline-block rounded-full bg-red-500 size-2.5 mr-1"></span>
            Inactive: <span className="font-bold">{inActiveCount} </span>{" "}
          </p>
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;