const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

const getContacts = async () => {
    try {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
      return contacts;
    } catch (error) {
      throw error;
    }
  };

  const listContacts = async () => {
    try {
      const contacts = await getContacts();
      console.table(contacts);
      return contacts;
    } catch (error) {
      throw error;
    }
  }; 
  
  const getContactById = async (contactId) => {
    try {
      const contacts = await getContacts();
      const selectedContact = contacts.find((item) => item.id === +contactId);
      if (!selectedContact) {
        throw new Error(`Contact with id=${contactId} not found`);
      }
      console.table(selectedContact);
      return selectedContact;
    } catch (error) {
      console.log("ERROR", error.message);
    }
  };
  
  const removeContact = async (contactId) => {
    try {
      const result = await getContacts()
      const idx = result.findIndex(item => item.id === contactId)
      if (idx === -1) {
          throw new Error(`Contact with id=${contactId} not found!`)
      }
      const contact = result[idx]
      const contacts = result.filter(item => item.id !== contactId)
      const newContacts = JSON.stringify(contacts)
      await fs.writeFile(contactsPath, newContacts)
      console.log('One contact removed:')
      console.log(contact)
  }
  catch (error) {
      console.log(error.message)
  }
  };
  
  const addContact = async (name, email, phone) => {
    try {
      const result = await getContacts()
      const idx = result[result.length - 1]['id'] + 1
      const newContact = {
          'id': idx,
          'name': name,
          'email': email,
          'phone': phone
      }
      result[result.length] = newContact
      const newContacts = JSON.stringify(result)
      await fs.writeFile(contactsPath, newContacts)
      console.log('New contact added:')
      console.log(newContact)
    } catch (error) {
      console.log(error.message)
    }
  };

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}