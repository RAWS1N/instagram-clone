import { faker } from "@faker-js/faker";
import React from "react";
import SuggestedUser from "./SuggestedUser";

function Suggestions() {
  function createFakeUser() {
    return {
      id:faker.datatype.uuid(),
      firstname : faker.name.firstName(),
      lastname : faker.name.lastName(),
      username : faker.internet.userName(),
      avatar : faker.image.avatar(),
    }
  }
  const suggestedUserArray = new Array(6).fill(0).map(createFakeUser)
  return (
    <div className="ml-10 mt-4">
      <div className="flex items-center justify-between  capitalize">
        <h2 className="text-gray-400 text-sm font-semibold">
          Suggestions for you
        </h2>
        <h4 className="text-xs font-medium ">see all</h4>
      </div>
      {suggestedUserArray.map(user => <SuggestedUser key={user.id} {...user}/>)}
    </div>
  );
}

export default Suggestions;
