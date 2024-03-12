// Retrieving references from HTML
const canvas = document.getElementById('canvas');  // Reference to the canvas element

// Setting canvas size
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = (innerHeight * 0.8);
}
setCanvasSize(); // Set canvas size initially

// Color Arrays
const themes = {
    'red': ['#6a040f', '#9d0208', '#e85d04', '#f48c06', '#faa307'],
    'blue': ['#03045e', '#0077b6', '#0096c7', '#00b4d8', '#ade8f4'],
    'green': ['#004b23', '#006400', '#008000', '#38b000', '#70e000']
};