import bcrypt from "bcrypt";

const saltRounds = 10;

async function Encrypt(password) {
    return await bcrypt.hash(password, saltRounds); 
};

async function Compare(password, hash) {
    return await bcrypt.compare(password, hash)
};

export { Compare, Encrypt };