export default class AlienShip {
    constructor(hull, firepower, accuracy) {
        this.hull = Math.floor(Math.random() * 4) + 3;
        this.firepower = Math.floor(Math.random() * 3) + 2;
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
        this.id = undefined;
    }
    attack(target) {
        if (Math.random() < this.accuracy) {
            target.hull -= this.firepower;
            alert('Alien have been hit!');
        }
    }
}