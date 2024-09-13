// Wrapper dei contatti
let contactsWrapper = document.querySelector('#contactsWrapper');

// Bottoni
let showContactsBtn = document.querySelector('#showContactsBtn');
let addContactBtn = document.querySelector('#addContactBtn');
let removeContactBtn = document.querySelector('#removeContactBtn')

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
                <i class="fa-solid fa-trash-can icon"></i>
            `;

            contactsWrapper.appendChild(div);

            
        });
        // Icone
        let icons = document.querySelectorAll('.icon');

        icons.forEach( (icona, i)=> {
            icona.addEventListener('click', ()=>{
                this.contact_list.splice(i, 1);
                this.showContacts();
            });
        });

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
    }

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
