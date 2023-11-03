const handlers = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const getAllContacts = await handlers.listContacts();
      return console.table(getAllContacts);

    case "get":
      const getContact = await handlers.getContactById(id);
      return console.log(getContact);

    case "add":
        const addContact = await handlers.addContact({name, phone, email});
        return console.log(addContact);

    case "remove":
      const removeContact = await handlers.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

