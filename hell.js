// === WORD BANK ARRAYS ===
const subjects = ["The monkey", "My grandma", "A robot", "The cat", "A pirate", "The teacher", "A banana", "A dog"];
const verbs = ["ate", "danced with", "hugged", "kicked", "saw", "sang to", "painted", "jumped","ran"];
const adjectives = ["a weird", "a funny", "a slimy", "a giant", "a sleepy", "a glowing", "a scary"];
const nouns = ["turtle", "sandwich", "alien", "sock", "carrot", "balloon", "penguin", "fish"];
const places = ["on the moon", "in the fridge", "at school", "in my shoes", "on TV", "at the zoo", "in space", "in the ocean", "on the beach"];

// === CURRENT INDEX TRACKERS ===
let currentIndices = [0, 0, 0, 0, 0]; // Tracks current index for each column.

// === LIST ELEMENTS ===
const listElements = [
  document.getElementById("list1"),
  document.getElementById("list2"),
  document.getElementById("list3"),
  document.getElementById("list4"),
  document.getElementById("list5")
];

// === STORY TEXT OUTPUT ===
const storyText = document.getElementById("story-text"); // Outputs the story text.

// === FUNCTION TO DISPLAY WORDS IN EACH COLUMN ===
function updateDisplay() {
  const wordArrays = [subjects, verbs, adjectives, nouns, places];

  for (let i = 0; i < listElements.length; i++) {
    listElements[i].innerHTML = ""; // Clear list

    for (let j = 0; j < wordArrays[i].length; j++) {
      const li = document.createElement("li");
      li.textContent = wordArrays[i][j];

      // Add 'selected' class if it's the current one
      if (j === currentIndices[i]) {
        li.classList.add("selected");

        // Smooth scroll into view
        setTimeout(() => {
          li.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      }

      listElements[i].appendChild(li);
    }
  }
}

// === CYCLE BUTTON EVENT LISTENERS ===
const cycleButtons = document.querySelectorAll(".cycle-btn"); // Cycles through the words in each column.

for (let i = 0; i < cycleButtons.length; i++) {
  cycleButtons[i].addEventListener("click", function () {
    const col = parseInt(this.getAttribute("data-col")) - 1; // Get the column number.
    const wordArrays = [subjects, verbs, adjectives, nouns, places]; // Get the word arrays.
    currentIndices[col] = (currentIndices[col] + 1) % wordArrays[col].length; // Loop through all arrays.
    updateDisplay();
  });
}

// === PLAYBACK BUTTON FUNCTIONALITY ===
document.getElementById("playback").addEventListener("click", function () {
  const wordArrays = [subjects, verbs, adjectives, nouns, places]; // Get the word arrays.
  let sentence = ""; // Initialize an empty sentence.

  for (let i = 0; i < wordArrays.length; i++) {
    sentence += wordArrays[i][currentIndices[i]] + " "; // Add the current word to the sentence.
  }

  storyText.textContent = sentence.trim() + "!"; // Trim the sentence and add an exclamation mark.
});

// === SURPRISE BUTTON FUNCTIONALITY ===
document.getElementById("surprise").addEventListener("click", function () {
  const wordArrays = [subjects, verbs, adjectives, nouns, places];
  let sentence = "";

  for (let i = 0; i < wordArrays.length; i++) {
    currentIndices[i] = Math.floor(Math.random() * wordArrays[i].length); // Randomly select a word from the array.
    sentence += wordArrays[i][currentIndices[i]] + " ";
  }

  updateDisplay();
  storyText.textContent = sentence.trim() + "!";
});

// === INITIAL DISPLAY ON LOAD ===
updateDisplay();