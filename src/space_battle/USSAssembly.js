export default class USSAssembly {
    constructor(hull, firepower, accuracy) {
        this.hull = 20;
        this.firepower = 5;
        this.accuracy = 0.7;
    }
    attack(target) {
        if (Math.random() < this.accuracy) {
            target.hull -= this.firepower;
            alert('You have been hit!');
        } else {
            alert('You hit the alien!!!');
        }
    }
}