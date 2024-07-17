import React from "react";

interface HouseData {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string;
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: string[];
  swornMembers: string[];
}

interface HouseCardProps {
  data: HouseData;
}

const fontLabel = "block text-sm md:text-lg font-bold text-gray-700";
const fontText = "ml-2 text-sm md:text-lg text-gray-600";

const House: React.FC<HouseCardProps> = ({ data }) => {
  return (
    <div className="max-w-full mx-auto my-8 overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg md:max-w-2xl hover:scale-105 hover:shadow-2xl">
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center mb-4">
          <span className={fontLabel}>Region:</span>
          <span className={fontText}>{data.region}</span>
        </div>

        <div className="flex flex-wrap items-center mb-4">
          <span className={fontLabel}>Name:</span>
          <span className={fontText}>{data.name}</span>
        </div>

        <div className="flex flex-wrap items-center mb-4">
          <span className={fontLabel}>Coat of Arms:</span>
          <span className={fontText}>{data.coatOfArms}</span>
        </div>

        {data.titles.length > 0 && (
          <div className="mb-6">
            <h4 className={fontLabel}>Titles:</h4>
            <ul className="ml-4 text-sm text-gray-600 list-disc list-inside md:text-lg">
              {data.titles.map((title) => (
                <li key={title} className="mt-1">
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.seats.length > 0 && (
          <div className="mb-6">
            <h4 className={fontLabel}>Seats:</h4>
            <ul className="ml-4 text-sm text-gray-600 list-disc list-inside md:text-lg">
              {data.seats.map((seat) => (
                <li key={seat} className="mt-1">
                  {seat}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.swornMembers.length > 0 ? (
          <div className="mb-6">
            <h4 className={fontLabel}>Sworn Members:</h4>
            <ul className="ml-4 text-sm text-gray-600 list-disc list-inside md:text-lg">
              {data.swornMembers.map((member: any) => {
                return (
                  <li key={member.url} className="mt-1">
                    <span className="text-indigo-600">{member.name}</span>
                    <span className="text-indigo-600"> -- </span>
                    <span className="text-indigo-600">{member.lifeStatus}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="flex flex-wrap items-center mb-4">
            <span className={fontLabel}>This house has no sworn members</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default House;
