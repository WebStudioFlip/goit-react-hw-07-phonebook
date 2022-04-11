export const initialContacts = async () => {
   const contactsJSON = localStorage.getItem('contacts');   
    if (contactsJSON && JSON.parse(contactsJSON).length) {
        const contacts = await JSON.parse(contactsJSON);

        return  contacts;            
    } 
    return []
}  