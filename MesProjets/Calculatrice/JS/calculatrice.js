
let display;
let currentNumber = '0';
let previousNumber = null;
let operation = null;
let waitingForNewNumber = false;

function initializeCalculator(){
    console.log('🚀 Initialisation de la calculatrice...');
    display = document.getElementById('display');

    if(!display){
        console.log('❌ Écran d\'affichage non trouvé !');
        return;
    }

    // Afficher le nombre initial
    updateDisplay();

    // Attacher les evenements aux buttons
    attachEventListeners();

    console.log('✅ Calculatrice initialisée !');
}

function updateDisplay(){
    console.log('📺 Mise à jour de l\'affichage:', currentNumber);
    
    const displayText = display.querySelector('.display-text');

    if(displayText){
        displayText.textContent = currentNumber;
    }
    else{
        console.error('❌ Élément d\'affichage non trouvé !');
    }
}

function addDigit(digit){
    console.log('Ajout du chiffre: ', digit);

    // Si on attend un nouveau nombre, on efface l'ecran
    if(waitingForNewNumber){
        currentNumber = '0';
        waitingForNewNumber = false;
    }

    // Si l'ecran affiche "0", on le remplace
    if(currentNumber === '0'){
        currentNumber = digit;
    }
    else{
        currentNumber += digit;
    }
    // Mettre a jour l'affichage
    updateDisplay();

    console.log('📺 Nouveau nombre affiché:', currentNumber);
}

function setOperation(op){
    console.log('➕ Opération choisie:', op);

    // Si on a deja une operation en cours, on calcule d'abord
    if(operation && !waitingForNewNumber){
        calculate();
    }

    // Memoriser l'operation et lenombre actuel
    operation = op;
    previousNumber = parseFloat(currentNumber);
    waitingForNewNumber = true;

    console.log('💾 Opération mémorisée:', operation);
    console.log('💾 Nombre precedent:', previousNumber);
}

function calculate(){
    console.log('🧮 Calcul en cours...');
    console.log('📊 Nombre précédent:', previousNumber);
    console.log('📊 Nombre acuelt:', currentNumber);
    console.log('📊 Operation:', operation);
    
    // Convertir le nombre actuel en nombre
    const current = parseFloat(currentNumber);

    if(previousNumber === null || operation === null){
        console.log('⚠️ Données insuffisantes pour le calcul');
        return;
    }

    let result;

    switch(operation){

        case '+':
            result = previousNumber + current;
            break;
        case '-':
            result = previousNumber - current;
            break;
        case '*':
            result = previousNumber * current;
            break;
        case '÷':
            if(current === 0){
                console.log('❌ Division par zéro !');
                currentNumber = 'Erreur';
                updateDisplay();
                return;
            }
            result = previousNumber / current;
            break;
        default:
            console.error('❌ Operation inconnue:', operation);
            return;
    }

    // Afficher le resultat
    currentNumber = result.toString();
    updateDisplay();

    // Reinitialiser pour le prochain calcul
    operation = null;
    previousNumber = null;
    waitingForNewNumber = true;

    console.log('Resultat calcule:', result);
}

function clear(){
    console.log('🧹 Effacement complet');
    currentNumber = '0';
    previousNumber = null;
    operation = null;
    waitingForNewNumber = false;
    updateDisplay();
}

function clearEntry(){
    console.log('🧹 Effacement du nombre actuel');
    currentNumber = '0';
    updateDisplay();
}

function backspace(){
    console.log('⌫ Suppression du dernier chiffre');

    if(currentNumber.length > 1){
        currentNumber = currentNumber.slice(0, -1);
    }
    else{
        currentNumber = '0';
    }

    updateDisplay();
}

function plusMinus(){
    console.log('± Changement de signe');

    if(currentNumber !== '0'){
        if(currentNumber.startsWith('-')){
            currentNumber = currentNumber.slice(1);
        }
        else{
            currentNumber = '-' + currentNumber;
        }
        updateDisplay();
    }
}

function attachEventListeners(){
    console.log('Attachement des evenements...');

    // Recuperer tous les buttons
    const buttons = document.querySelectorAll('.btn');

    // Attacher un evenement a chaque bouton
    buttons.forEach(button =>{
        button.addEventListener('click', function(){
            console.log('Bouton cliqué:', this.textContent);

            // Determiner le type de bouton et agir en consequence
            if(this.classList.contains('number')){

                const digit = this.dataset.value;
                addDigit(digit);
            }
            else if(this.classList.contains('operation')){
                
                const op = this.dataset.operation;
                setOperation(op);
            }
            else if(this.classList.contains('function')){

                const action = this.dataset.action;
                handleFunction(action);
            }
        });
    });

    console.log('✅ Événements attachés !');
}

function handleFunction(action){
    console.log('🔧 Fonction appelée:', action);

    switch(action){
        case 'clear':
            clear();
            break;
        case 'clear-entry':
            clearEntry();
            break;
        case 'backspace':
            backspace();
            break;
        case 'plus-minus':
            plusMinus();
            break;
        case 'equals':
            calculate();
            break;
        default:
            console.log('⚠️ Fonction inconnue:', action);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM chargé, demarage de la calculatrice...');
    initializeCalculator();
});

document.addEventListener('keydown', function(event){
    console.log('Touche pressee:', event.key);

    // Empecher le comportement par defaut pour certaines touches
    if(['0', '1', '2', '3', '4', '5','6','7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Escape'].includes(event.key)){
        event.preventDfault();
    }

    // Gerer les touches
    if(event.key >= '0' && event.key <= '9'){
        addDigit(event.key);
    }
    else if(event.key === '.'){
        addDigit('.');
    }
    else if(event.key === '+'){
        setOperation('+');
    }
    else if(event.key === '-'){
        setOperation('-');
    }
    else if(event.key === '*'){
        setOperation('*');
    }
    else if(event.key === '/'){
        setOperation('÷');
    }
    else if(event.key === 'Enter' || event.key === '='){
        calculate();
    }
    else if(event.key === 'Escape'){
        clear();
    }
    else if(event.key === 'Backspace'){
        backspace();
    }
});