import {restaurants} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import { checkIsProperString, checkIsProperNumber } from '../helpers.js';

// Fix website : currently only takes in websites with https://www. and .com with a specific length in between

const create = async (
  name,
  address,
  price,
  tags,
  website
) => {
  if (!name || !address || !price || !tags || !website) {
    throw `Error: All fields need to have valid values`;
  }
  checkIsProperString(name, " in name");
  name = name.trim();
  checkIsProperString(address, " in address");
  address = address.trim();
  checkIsProperString(price, " in price");
  price = price.trim();
  website = website.trim();
  if ((website.toLowerCase().slice(0, 12) !== "https://www.") || 
  website.toLowerCase().slice(website.length - 4, website.length) !== ".com" ||
  website.indexOf(".com") - (website.indexOf("https://www.") + 12) < 5) {
    throw `Error: Invalid website given`;
  }
  if (!Array.isArray(tags.flat(Infinity)) || tags.length < 1) {
    throw `Error: Invalid tags given`;
  }

  for (let c = 0; c < tags.length; c++) {
    checkIsProperString(tags[c], " in tags")
    tags[c] = tags[c].trim();
  }

  let newRestaurant = {
    "name": name,
    "tags": tags,
    "address": address,
    "website": website,
    "price": price
  };
  const restaurantCollection = await restaurants();
  const insertInfo = await restaurantCollection.insertOne(newRestaurant);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw `Error: Could not create restaurant`;
  }

  const newId = insertInfo.insertedId.toString();
  const restaurant = await get(newId);
  return restaurant;
};

const getAll = async () => {
  const restaurantCollection = await restaurants();
  let restaurantList = await restaurantCollection.find({}).project({_id: 1, name: 1}).toArray();
  if (!restaurantList) {
    throw `Error: Could not get all the restaurants`;
  }
  for (let i = 0; i < restaurantList.length; i++) {
    restaurantList[i]._id = restaurantList[i]._id.toString();
  }
  return restaurantList;
};

const get = async (id) => {
  if (!id) {
    throw `Error: No id given`;
  }
  checkIsProperString(id, " in id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Error: id provided is not a valid ObjectId`;
  }
  const restaurantCollection = await restaurants();
  const restaurant = await restaurantCollection.findOne({_id: new ObjectId(id)});
  if (restaurant === null) {
    throw `Error: No restaurant with that id found`;
  }
  restaurant._id = restaurant._id.toString();
  return restaurant;
};

const remove = async (id) => {
  if (!id) {
    throw `Error: No id given`;
  }
  checkIsProperString(id, " in id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Error: id provided is not a valid ObjectId`;
  }
  const restaurantCollection = await restaurants();
  const deleted = await restaurantCollection.findOneAndDelete({_id: new ObjectId(id)});
  if (deleted.lastErrorObject.n === 0) {
    throw `Error: restaurant could not be deleted`;
  } else {
    let result = {"restaurantId" : deleted.value._id, "deleted": true};
    return result;
  }

};

const update = async (
  id,
  name,
  address,
  price,
  tags,
  website
) => {
  if (!id || !name || !address || !price || !tags || !website) {
    throw `Error: All fields need to have valid values`;
  }
  checkIsProperString(id, " in id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Error: id provided is not a valid ObjectId`;
  }
  checkIsProperString(name, " in name");
  name = name.trim();
  checkIsProperString(address, " in address");
  address = address.trim();
  checkIsProperString(price, " in price");
  price = price.trim();
  website = website.trim();
  if ((website.toLowerCase().slice(0, 12) !== "https://www.") || 
  website.toLowerCase().slice(website.length - 4, website.length) !== ".com" ||
  website.indexOf(".com") - (website.indexOf("https://www.") + 12) < 5) {
    throw `Error: Invalid website given`;
  }
  if (!Array.isArray(tags.flat(Infinity)) || tags.length < 1) {
    throw `Error: Invalid tags given`;
  }

  for (let c = 0; c < tags.length; c++) {
    checkIsProperString(tags[c], " in tags")
    tags[c] = tags[c].trim();
  }
  let oldRestaurant = await get(id);
  let updatedBand = {
    "name": name,
    "tags": tags,
    "address": address,
    "website": website,
    "price": price
  };
  const restaurantCollection = await restaurants();
  const updateInfo = await restaurantCollection.updateOne(
    {_id: new ObjectId(id)},
    {$set: updatedBand},
    {returnDocument: 'after'}
  );
  if (updateInfo.modifiedCount === 0) {
    throw [404, `Error: Update failed! Could not update post with id ${id}`];
  }
  return await get(id);
};

export {create, getAll, get, remove, update};