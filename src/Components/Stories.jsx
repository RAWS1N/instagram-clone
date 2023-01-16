import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";

function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  function createFakeUser() {
    return {
      userId: faker.datatype.uuid(),
      firstname: faker.name.firstName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registereAt: faker.date.past(),
    };
  }
  useEffect(() => {
    const suggestionArray = new Array(20).fill(0).map(createFakeUser);
    setSuggestions(suggestionArray);
  }, []);
  return (
    <div className=" ">
      <div className="flex items-center h-32 space-x-4 px-4 py-2  mt-0
      bg-white  rounded-lg overflow-x-scroll max-w-6xl scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded-lg scrollbar-track-gray-200 ">
        {suggestions.map((item) => (
          <Story key={item.userId} image={item.avatar} firstname={item.firstname} />
        ))}
      </div>
    </div>
  );
}

export default Stories;
