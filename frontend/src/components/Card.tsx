import React from "react";

interface CardProps {
  title: string;
  value: string | number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow p-4 rounded-md min-w-[150px]">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
