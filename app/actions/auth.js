export async function createUser({ name, email, password }) {
  await dbConnect();

  const existing = User.find({ $or: [{ email }, { username }] });
  if (existing) throw new Error("User already Existed");

  const hashedPassword = password.hash(password, 10);

  const newUser = User.create({ name, email, password: hashedPassword });
  return NewUser;
}
