const container = document.getElementById('container');
const image = document.getElementById('image');

let scale = 1
let posX = 0
let posY = 0
let isDragging = false
let startX, startY

updateImageScale()

container.addEventListener('mousedown', (e) => {
    console.log(e)
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - posX
    startY = e.clientY - posY
    container.style.cursor = 'grabbing'
});

container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab'
});

container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.style.cursor = 'grab'
});

container.addEventListener('mousemove', (e) => {
    if (isDragging) {
        posX = e.clientX - startX
        posY = e.clientY - startY
        updateImagePosition()
    }
});

container.addEventListener('wheel', (e) => {
    e.preventDefault()
    const scaleAmount = 0.1 
    if (e.deltaY < 0) {
        scale += scaleAmount
    } else {
        scale -= scaleAmount
        if (scale < 1) scale = 1
        if (scale > 5) scale = 5
    }
    updateImageScale()
});

function updateImagePosition() {
    const containerRect = container.getBoundingClientRect()
    const imageRect = image.getBoundingClientRect()

    
    const minX = containerRect.width - imageRect.width * scale
    const minY = containerRect.height - imageRect.height * scale

    
    posX = Math.min(0, Math.max(posX, minX))
    posY = Math.min(0, Math.max(posY, minY))

    image.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`
}

function updateImageScale() {
    image.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`

    console.log(scale)
    console.log(posX)
    console.log(posY)
}