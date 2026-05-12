import {  User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const SECRET = process.env.MY_SECRET;

export const registerUser = async ({
  name,
  email,
  password,
  phone,
  address,
}) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    const err = new Error("User already exists");
    err.statusCode = 409;

    throw err;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    phone,
    address,
  });

  // const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
  //   expiresIn: "1d",
  // });

  const token = generateToken({ id: user.id, role: user.role });

  const { password: _, ...userData } = user.toJSON();

  return { user: userData, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 400;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const err = new Error("Wrong password");
    err.statusCode = 400;
    throw err;
  }

  // const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
  //   expiresIn: "1d",
  // });
  const token = generateToken({ id: user.id, role: user.role });

  const { password: _, ...userData } = user.toJSON();

  return { user: userData, token };
};

export const getUser = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
  });
  return user;
};

export const updateProfile = async (id, data) => {
  const [updated] = await User.update(data, { where: { id } });
  if (!updated) return null;
  return await User.findByPk(id);
};
