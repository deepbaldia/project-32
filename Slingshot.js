class SlingShot {
    constructor(bodyA, pointB) {
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.pointB = pointB;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    fly() {
        this.sling.bodyA = null;
        gameState = "launched";
    }

    attach(body, position) {
        Body.setPosition(body, position);
        this.sling.bodyA = body;
        gameState = "onSling";
    }

    display() {
        if (this.sling.bodyA) {
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            strokeWeight(4);
            stroke(39, 48, 140);
            line(pointA.x, pointA.y, pointB.x, pointB.y);
        }
    }

}