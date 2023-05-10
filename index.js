// Refrencing Canvas from HTML file
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Setting Canvas width and height
canvas.width = 1024
canvas.height = 576

// Setting Canvas bacground color
c.fillRect(0, 0, canvas.width, canvas.height)

// Constant variable for defining gravity for the objects
const gravity = 0.7

// Sprite Class
class Sprite {
    // Constructor defining basic arrtibutes of the sprite
    constructor({ position, velocity, color = 'yellow' }) {
        
        // Initial position of the sprite
        this.position = position
        // Velocity of the sprite
        this.velocity = velocity
        // Height of the sprite
        this.height = 150
        // Last pressed key on the sprite
        this.lastkey
        // Attack area of the sprite
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        // Body color of the sprite
        this.color = color
    }

    // Draw method to draw the sprite on the canvas
    draw() {
        // Setting color of the sprite and its position on the canvas
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, this.height)

        // Setting color of the attack box and its position on the canvas
        c.fillStyle = 'white'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    // Update method which updates the attributes of the sprite according to the event listners
    update() {
        // Draw function called inside update function
        this.draw()

        // Movement logic of the sprite
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

}

// Player instance of Sprite class
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color : 'green'
})


// Enemy instance of Sprite class
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

// Keys object
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

// Animate function
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player Movements
    if (keys.a.pressed && player.lastkey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastkey === 'd') {
        player.velocity.x = 5
    }

    // enemy Movements
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
}

// Calling Animate Function
animate()

// Event listner method for keydown(Pressing keys)
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastkey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
    }
    console.log(event.key)

})

// Event listner method for keyup()
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
    console.log(event.key)

})