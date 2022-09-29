const characterBar = document.getElementById('character-bar');
const detailedInfo = document.getElementById('detailed-info');
const charName = document.getElementById('name');
const img = document.getElementById('image');
const votes = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');
const newCharForm = document.getElementById('character-form');
const resetBtn = document.getElementById('reset-btn');

fetch('http://localhost:3000/characters')
.then(resp => resp.json())
.then(charArray => {
    let charObj;

    charArray.forEach((obj) => {
        const names = document.createElement('span');
        names.textContent = obj.name;
        characterBar.append(names);

        names.addEventListener('click', (e) => {
            img.src = obj.image;
            charName.textContent = obj.name;
            votes.textContent = obj.votes;
            charObj = obj;
        });
    });

    votesForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const newNum = parseInt(e.target.votes.value);
        const oldNum = charObj.votes;
        const newVotes = oldNum + newNum;
        charObj.votes = newVotes;
        votes.textContent = newVotes;
    });

    resetBtn.addEventListener('click', (e) => {
        votes.textContent = '0';
    })
});

function postRequest(url, body){
    const configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    };

    fetch(url, configObj)
};

newCharForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newChar = {
        name: e.target.name.value,
        image: e.target['image-url'].value,
        votes: 0
    };

    postRequest('http://localhost:3000/characters', newChar)
});