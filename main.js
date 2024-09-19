// Wrapper dei contatti
let contactsWrapper = document.querySelector('#contactsWrapper');

// Bottoni
let showContactsBtn = document.querySelector('#showContactsBtn');
let addContactBtn = document.querySelector('#addContactBtn');
let removeContactBtn = document.querySelector('#removeContactBtn');
let editContactBtn = document.querySelector('#editContactBtn');

// Inputs
let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');

// Variabile d'appoggio
let check = false;




let rubrica = {

    contact_list : [
        {contact_name : 'Clapton', phone_number : 3334445556},
        {contact_name : 'King', phone_number : 3336667778},
        {contact_name : 'Satriani', phone_number : 3338889990},
    ],

    showContacts : function() {
        contactsWrapper.innerHTML = '';

        this.contact_list.forEach( (contatto)=> {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `
                <p class="lead">${contatto.contact_name}</p>
                <p>${contatto.phone_number}</p>
                <i class="fa-solid fa-wrench editIcon"></i>
                <i class="fa-solid fa-trash-can icon"></i>
            `;

            contactsWrapper.appendChild(div);

            
        });
        // Icone
        
        // CESTINO/CANCELLA
        let icons = document.querySelectorAll('.icon');

        icons.forEach( (icona, i)=> {
            icona.addEventListener('click', ()=>{
                this.contact_list.splice(i, 1);
                this.showContacts();
            });
        });


        // CHIAVE INGLESE/EDIT
        let editIcon = document.querySelectorAll('.editIcon');

        editIcon.forEach( (icona, i)=> {            
            icona.addEventListener('click', ()=>{
                let editedName = prompt(`Cambia il nome`);
                let editedNumber = prompt(`Cambia il numero`);
                console.log(editedName);
                console.log(i);
                
                this.contact_list.splice(i, 1, {contact_name : editedName, phone_number : editedNumber});
                this.showContacts();
            });
        });
        nameInput.value = '';
        numberInput.value = '';


    },

    addContact : function (newName, newNumber) {
        if (newName && newNumber) {
            this.contact_list.push({contact_name : newName, phone_number : newNumber});
            this.showContacts();
            if (check == false) {
                check = true;
                showContactsBtn.innerHTML = 'Nascondi Contatti';
            }
        }else{
            alert('nome e numero sono campi obbligatori!');
        }
    },

    removeContact : function (removedName) {
        let names = this.contact_list.map( (contatto)=> contatto.contact_name );
        let index = names.indexOf(removedName);
        if (index >= 0) {
            this.contact_list.splice(index, 1);
            this.showContacts();
            if (check == false) {
                check = true;
                showContactsBtn.innerHTML = 'Nascondi Contatti';
            }
        }
    },

    editContacts : function (nameToEdit, numberToEdit) {
        // controllo che sia inserito un nome per far partire 
        if (nameInput.value != '') {
            alert('Inserisci la modifica');
        
            nameToEdit = prompt('Modifica il nome');
            numberToEdit = prompt('Modifica il numero');
            let names = this.contact_list.map( (contatto)=> contatto.contact_name );
            let index = names.indexOf(nameInput.value);
            
            if (index >= 0) {
                this.contact_list[index].contact_name = nameToEdit;
                this.contact_list[index].phone_number = numberToEdit;
            } 
        }
        console.log(this.contact_list);
        this.showContacts();
        
    },

};

showContactsBtn.addEventListener('click', ()=>{
    if (check == false) {
        rubrica.showContacts();
        check = true;
        showContactsBtn.innerHTML = 'Nascondi Contatti';
    }else{
        contactsWrapper.innerHTML = '';
        check = false;
        showContactsBtn.innerHTML = 'Mostra Contatti';
    }
});

addContactBtn.addEventListener('click', ()=>{
    rubrica.addContact(nameInput.value, numberInput.value);
    nameInput.value = '';
    numberInput.value = '';
    
});

removeContactBtn.addEventListener('click', ()=>{
    rubrica.removeContact(nameInput.value);
});


editContactBtn.addEventListener('click', ()=>{
    rubrica.editContacts(nameInput.value, numberInput.value);
});