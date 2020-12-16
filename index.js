const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScore = document.querySelector('[data-computer-score]')
const yourScore = document.querySelector('[data-your-score]')


const SELECTIONS = [
    {
        name:'rock',
        emoji: '✊',
        beats: 'scissor'
    },
    {
        name:'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name:'scissor',
        emoji: '✌',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton=>{
    selectionButton.addEventListener('click', ()=>{
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection){
    const computerSelection = randomSelection()
    const youWin = isWinner(selection, computerSelection)
    const compWin = isWinner(computerSelection, selection)
    
    addSelectionResult(computerSelection, compWin)
    addSelectionResult(selection, youWin)

    if(youWin)incrementScore(yourScore)
    if(compWin)incrementScore(computerScore)
}


function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add("result-selection")
    if(winner){
        div.classList.add("winner")
    }
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name
}

function incrementScore(score){
    score.innerText = parseInt(score.innerText) + 1
}

function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}