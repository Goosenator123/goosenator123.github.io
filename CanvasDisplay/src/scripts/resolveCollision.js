// Rotate function to rotate velocities so its 1D
function rotate(velocity, angle) {
    const rotatedVelocity = {
        x: (Math.cos(angle) * velocity.x) - (Math.sin(angle) * velocity.y),
        y: (Math.sin(angle) * velocity.x) + (Math.cos(angle) * velocity.y)
    }

    // Return rotated velocity
    return rotatedVelocity;
}

// Redirect direction upon collision
function resolveCollision(particle, otherParticle) {
    // Get the difference in velocities of both particles
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    // Get distance of x and y of both particles
    const xDistance = otherParticle.x - particle.x;
    const yDistance = otherParticle.y - particle.y;
    
    // Check if clipping / overlap
    if (xVelocityDiff * xDistance + yVelocityDiff * yDistance >= 0) {
        // Get angle of the triangle formed by the two colliding particles
        const angle = -Math.atan2((otherParticle.y - particle.y), (otherParticle.x - particle.x))
    
        // Set mass of both first and second particle
        const m1 = particle.mass;
        const m2 = otherParticle.mass;
    
        // Velocity before collision
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);
    
        // Velocity after the 1D collision (Using One-dimensional Newtonian equasion)
        const v1 = {
            x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2),
            y: u1.y
        }
        const v2 = {
            x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2),
            y: u2.y
        }
    
        // Velocity after rotation axis back to original location
        const finalV1 = rotate(v1, -angle);
        const finalV2 = rotate(v2, -angle);
    
        // Reassigning particle volacity to simulate bounce effect
        particle.velocity = finalV1;
        otherParticle.velocity = finalV2;
    }
}

export {
    resolveCollision
}