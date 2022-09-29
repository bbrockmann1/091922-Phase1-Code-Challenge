const characterBar = document.getElementById('character-bar');
const detailedInfo = document.getElementById('detailed-info');
const charName = document.getElementById('name');
const img = document.getElementById('image');
const votes = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');

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
});
