const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize();

const img = new Image();
img.src = 'abandoned-desolate-destroyed-science-laboratory-600nw-2370768691.webp';
let x = 0;

img.onload = function() {
    // Calculate the scaling factors to fit the image onto the canvas
    var scaleX = canvas.width / img.width;
    var scaleY = canvas.height / img.height;
    var scale = Math.max(scaleX, scaleY);

    // Calculate the new dimensions of the image
    var newWidth = img.width * scale;
    var newHeight = img.height * scale;

    // Calculate the position to center the image on the canvas
    var offsetX = (canvas.width - newWidth) / 2;
    var offsetY = (canvas.height - newHeight) / 2;

    // Draw the image on the canvas with the new dimensions and position
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
};
function animate() {
    requestAnimationFrame(animate);

    x++;
}