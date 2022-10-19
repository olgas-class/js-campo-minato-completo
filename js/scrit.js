// **Consegna**
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// ****
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

/**
 * [*]Quando l'utente clicca sul bottone:
 * PREPARAZIONE DEL GIOCO
 * [*] Prelevare la scelta del livello e impostare squaresNumber, squaresInRow e safeCells in base a questa scelta
 * [*] Creare l'array delle bombe
 * [*] Creare l'array per le celle non bombe cliccate dall'utente
 * [*] Nascondere il titolo
 * [*] Ripulire la griglia
 * [*] Creare (il numero di quadrati da generare) square
 *      [*]Creare l'elemento
 *      [*]Aggiungere la classe
 *      [*]Inserire il numero nello span interno
 *      []Aggiungo il click listener allo square
 *      [*]Appendo lo square alla griglia
 * [*] Mostrare la griglia
 * 
 * SVOLGIMENTO DEL GIOCO
 * []al click su una cella
 *    [] leggo il numero della cella cliccata
 *    [] SE il numero è contenuto nell'array delle bombe 
 *          la cella diventa rossa
 *          gioco finisce -> utente perde
 *    [] ALTRIMENTI
 *          coloro di blu la cella
 *          SE non è già presente (se non è stato già cliccato) salvo il numero nell'array del punteggio
 *          SE lunghezza dell'array di celle cliccate è uguale al safeCells 
 *                il gioco finisce -> utente vince
 * 
 * FINE GIOCO
 * [] Rendere le celle non cliccabili
 * [] SE l'utente ha vinto
 *      mostrare il mesaggio: "Hai vinto";
 * [] ALTRIMENTI
 *      mostrare tutte le bombe
 *      mostrare il messaggio: "Hai perso." e il numero di tentativi
 * 
 */

const mainTitle = document.getElementById("main-title");
const mainGrid = document.getElementById("grid");
const levelSelect = document.getElementById("level");
document.getElementById("play-button").addEventListener("click", startGame);

// Funzione principale del gioco
function startGame() {
  // game options
  const bombsNumber = 16;

  // Controllo il livello scelto
  const level = parseInt(levelSelect.value);
  let squaresNumber;
  let squaresInRow;
  switch (level) {
    case 1: 
        squaresNumber = 100;
        squaresInRow = 10;
        break;
    case 2: 
        squaresNumber = 81;
        squaresInRow = 9;
        break;
    case 3:
        squaresNumber = 49;
        squaresInRow = 7; 
  } 

  // Clacolare il numero delle celle non bombe
  let safeCells = squaresNumber - bombsNumber;
  console.log(safeCells);

  // Creare l'array di 16 bombe (numeri casuali non ripetuti) in range da 1 a squaresNumber
  const bombsArray = generateRandomNumbersArray(bombsNumber, 1, squaresNumber);
  console.log(bombsArray);

  // Creare l'array delle celle non bombe cliccate, inizialmente vuoto
  const clickedCells = [];

  mainTitle.classList.add("hidden");
  mainGrid.innerHTML = "";
  for (let i = 1; i <= squaresNumber; i++) {
    const newSquare = createSquare(i, squaresInRow);
    newSquare.addEventListener("click", handleSquareClick);
    mainGrid.append(newSquare);
  }

  mainGrid.classList.remove("hidden");

  // FUNZIONI SPECIFICHE PER IL GIOCO
  /**
   * Description: Funzione che gestisce il click sullo square
   */
  function handleSquareClick() {
    // [] leggo il numero della cella cliccata
    const clickedNumber = parseInt(this.textContent);
    //[] SE il numero è contenuto nell'array delle bombe 
    if (bombsArray.includes(clickedNumber)){
    // la cella diventa rossa
      this.classList.add("bomb");
    // gioco finisce -> utente perde
      endGame("lose");
    } else {
      // coloro di blu la cella
      this.classList.add("clicked");
      // SE non è già presente (se non è stato già cliccato) salvo il numero nell'array del punteggio
      if (!clickedCells.includes(clickedNumber)) {
        clickedCells.push(clickedNumber);
      }
      // SE lunghezza dell'array di celle cliccate è uguale al safeCells 
      if (clickedCells.length === safeCells) {
        //       il gioco finisce -> utente vince
        endGame("win");
      }
    }
  }

/**
 * Description: la funzione che gestisce fine del gioco
 * @param {stringa} winLose -> "win" se l'utente ha vinto, "lose" altrimenti
 */
function endGame(winLose) {
    // * [] Rendere le celle non cliccabili
    const allcells = document.getElementsByClassName("square");
    for (let i = 0; i < allcells.length; i++) {
      const thisCell = allcells[i];
      thisCell.removeEventListener("click", handleSquareClick);
      // thisCell.style.pointerEvents = "none";
    }
    // * [] SE l'utente ha vinto
    if (winLose === "win") {
      // *      mostrare il mesaggio: "Hai vinto";
      alert("Hai vinto");
    } else {
      // *      mostrare tutte le bombe
      // Per ogni cella
      for (let i = 0; i < allcells.length; i++) {
        const thisCell = allcells[i];
        // prendo il numero della cella
        const thisCellNumber = parseInt(thisCell.textContent);
        // se il numero è contenuto nell'array delle bombe
        if (bombsArray.includes(thisCellNumber)) {
          // coloro la cella di rosso
          thisCell.classList.add("bomb");
        }
      }
      // *      mostrare il messaggio: "Hai perso." e il numero di tentativi
      alert(`hai perso con il punteggio ${clickedCells.length}`);
    }
  }

}

// utente clicca -> bomba ---> fine gioco
//               -> non bomba       -> tutte le celle sono state cliccate ----> fine gioco
//                                  -> ci sono altre celle da cliccare


// UI FUNCTIONS
/**
 * Description: Funzione che crea un elemento html che rappresenta un quadrato della griglia
 * @param {number} innerNumber - numero da mostrare nel quadrato
 * @param {number} numberOfSquaresInRow - numero delle celle in una riga, che definisce le dimensioni di una cella
 * @returns {object} Elemento Html del quadrato
 */
function createSquare(innerNumber, numberOfSquaresInRow) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.width = `calc(100% / ${numberOfSquaresInRow})`;
  square.style.height = `calc(100% / ${numberOfSquaresInRow})`;
  square.innerHTML = `<span>${innerNumber}</span>`;
  return square;
}

// FUNCTIONS
/**
 * Description: La funzione che genera un array di data lunghezza con numeri rando non dupplicati compresi nel rage dato
 * @param {number} totalNumbers -> la lunghezza dell'array
 * @param {number} min -> limite minimo per i numeri da generare
 * @param {number} max -> limite massimo per i numero da generare
 * @returns {Array} -> array di numeri random non dupplicati
 */
function generateRandomNumbersArray(totalNumbers, min, max) {
  // Finché l'array non ha la lnghezza uguale al totalNumbers
  const resultArray = [];
  while (resultArray.length < totalNumbers) {
    // Generare un numero random
    const rndNumber = getRndInteger(min, max);
    // SE non è presente nell'array
    if (!resultArray.includes(rndNumber)) {
      // pushare il numero nell'array
      resultArray.push(rndNumber);
    }
  }
  return resultArray;
}

/**
 * Description Genera un numero random in range tra min e max (inclusi)
 * @param {number} min
 * @param {number} max
 * @returns {number} un numero intero generato in modo random
 */
 function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}