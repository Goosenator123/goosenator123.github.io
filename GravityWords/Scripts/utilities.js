// Ball Object Constructor
function Ball(x, y, dx, dy, radius, color, text = '', preventOutOfBounds = false) {
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
        // Handle gravity and collision with bottom of the canvas
        if ((this.y + this.radius + this.velocity.y) > canvas.height) {
            this.velocity.y = -this.velocity.y * friction;
        } else {
            this.velocity.y += gravity;
        }

        // Keep the ball inside the canvas to prevent overflow from side to side if wanted
        if (this.preventOutOfBounds) {
            if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
                this.velocity.x = -this.velocity.x;
            }
        }

        // Check collision with other objects
        for (let i = 0; i < objectArray.length; i++) {
            if (objectArray[i] === this) continue; // Ignore self

            // Check collision
            if (getDistance(this.x, this.y, objectArray[i].x, objectArray[i].y) < (this.radius + objectArray[i].radius)) {
                // Resolve collision
                resolveCollision(this, objectArray[i]);
            }
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
    // Calculate relative position and velocity vectors
    const relativePosition = { 
        x: otherObject.x - object.x, 
        y: otherObject.y - object.y 
    };
    const relativeVelocity = { 
        x: object.velocity.x - otherObject.velocity.x, 
        y: object.velocity.y - otherObject.velocity.y 
    };

    // Check if objects are moving towards each other
    if ((relativePosition.x * relativeVelocity.x) + (relativePosition.y * relativeVelocity.y) >= 0) {
        // Get angle of collision
        const angle = -Math.atan2(relativePosition.y, relativePosition.x);

        // Get masses of objects
        const m1 = object.mass;
        const m2 = otherObject.mass;

        // Get velocities before collision
        const u1 = rotate(object.velocity, angle);
        const u2 = rotate(otherObject.velocity, angle);

        // Calculate velocities after collision using one-dimensional Newtonian equations
        const v1 = { 
            x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2), 
            y: u1.y 
        };
        const v2 = { 
            x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2), 
            y: u2.y 
        };

        // Re-rotate the velocities
        const finalV1 = rotate(v1, -angle);
        const finalV2 = rotate(v2, -angle);

        // Update velocities
        object.velocity = finalV1;
        otherObject.velocity = finalV2;
    }
}
