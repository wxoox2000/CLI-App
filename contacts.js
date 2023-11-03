const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
    const list = await listContacts();
    const index = list.findIndex((item) => item.id === contactId);
    if(index === -1) {
        return null;
    }
    const [result] = list.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return result;


}

async function addContact({name, phone, email}) {
    const list = await listContacts();
    const alreadyInList = list.find((item) => item.phone === phone);
    if(alreadyInList) {
        return null;
    }
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
}

const handlers = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = handlers;
