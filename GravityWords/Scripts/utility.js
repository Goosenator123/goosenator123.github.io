// Ball Object
function Ball(x, y, dx, dy, radius, color, text = '', preventOutOfBounds = false, autoDelete = false, deleteInterval = 0) {
    // Ball properties
    this.x = x;  // x-coordinate of the ball
    this.y = y;  // y-coordinate of the ball
    this.radius = radius;  // radius of the ball
    this.color = color;  // color of the ball
    this.velocity = {  // velocity of the ball
        x: dx,  // velocity along x-axis
        y: dy   // velocity along y-axis
    }
    this.text = text;  // text associated with the ball (optional)
    this.bounce = 0;   // number of bounces
    this.mass = (this.radius ** 2) * Math.PI;  // mass of the ball (based on its radius)
    this.preventOutOfBounds = preventOutOfBounds;  // flag to determine if the ball goes out of bounds
    this.lifespan = deleteInterval;  // lifespan of the ball before auto-deletion
    this.autoDelete = autoDelete;  // flag to enable auto-deletion

    // Method to draw the ball on the canvas
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.stroke();
        ctx.fill();
        ctx.font = '48px Arial';
        ctx.closePath();
        if (this.text !== '') {
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(this.text, this.x, this.y + 12, this.radius * 2 - 20);
        }
    }

    // Method to update the ball's position and handle collisions
    this.update = (objectArray) => {
        // Simulate bounces when ball touches bottom of the canvas
        if ((this.y + this.radius + this.velocity.y) > canvas.height) {
            this.velocity.y = -this.velocity.y * friction;
            // this.bounce++;
        } else {
            this.velocity.y += gravity;
        }

        // Keep the ball inside the canvas to prevent overflow from side to side if wanted
        if (this.preventOutOfBounds) {
            if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
                this.velocity.x = -this.velocity.x;
            }
        }

        // Cycle through every object inside array
        for (let i = 0; i < objectArray.length; i++) {
            // Ignore self
            if (objectArray[i] === this) continue;

            // Check collision
            if (getDistance(this.x, this.y, objectArray[i].x, objectArray[i].y) < (this.radius + objectArray[i].radius)) {
                // Resolve collision
                resolveCollision(this, objectArray[i]);
            }
        }

        // Start the timer to remove the ball if autoDelete is enabled
        if (this.autoDelete) {
            setTimeout(() => {
                const index = objectArray.indexOf(this);
                if (index > -1) {
                    objectArray.splice(index, 1); // Remove the ball from the array
                }
            }, this.lifespan);
        }

        // Update position and draw the ball
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
}

// Get random integer from a range (min and max)
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Clear canvas
function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

// Get the distance between 2 objects
function getDistance(x1, y1, x2, y2) {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Rotate function to rotate velocity 
function rotate(vector, angle) {
    const rotatedVelocity = {
        x: (vector.x * Math.cos(angle)) - (vector.y * Math.sin(angle)),
        y: (vector.x * Math.sin(angle)) + (vector.y * Math.cos(angle))
    }
    return rotatedVelocity;
}

// Resolve collision function
function resolveCollision(object, otherObject) {
    // Calculate the vector between the objects
    const relativePosition = {
        x: otherObject.x - object.x,
        y: otherObject.y - object.y
    }

    // Calculate relative velocity vector
    const relativeVelocity = {
        x: object.velocity.x - otherObject.velocity.x,
        y: object.velocity.y - otherObject.velocity.y
    }

    // Check if dot-product is not negative (negative = moving away)
    if ((relativePosition.x * relativeVelocity.x) + (relativePosition.y * relativeVelocity.y) >= 0) {
        // Get angle (in radians) of the right triangle formed by the center of both objects
        const angle = -Math.atan2((otherObject.y - object.y), (otherObject.x - object.x));

        // Get masses of objects
        const m1 = object.mass;
        const m2 = otherObject.mass;

        // Get velocities before collision
        const u1 = rotate(object.velocity, angle);
        const u2 = rotate(otherObject.velocity, angle);

        // Get velocities after the 1D collision (Using One-dimensional Newtonian equation)
        const v1 = {
            x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2),
            y: u1.y
        }
        const v2 = {
            x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2),
            y: u2.y
        }

        // Re-rotate the velocities to their initial state
        const finalV1 = rotate(v1, -angle);
        const finalV2 = rotate(v2, -angle);

        // Reassigning velocities to the objects
        object.velocity = finalV1;
        otherObject.velocity = finalV2;
    }
}
