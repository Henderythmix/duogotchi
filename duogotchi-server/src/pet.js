// File: src/pet.js
// Description:
// - Pet class to be implemented in server/main.js
// - Each pet is linked to a user object

const DECLINE_PERIOD = 100000;

const Pet = class {
  #lastCheckin //# is private
  #wakeupTime
  #age;

  constructor() {
    this.hunger = 100;
    this.sleep = 100;
    this.attention = 100;
    this.#age = 0;

    this.#lastCheckin = Date.now();
  }
  Update() {
    let newCheckin =  Date.now();
    let dt = newCheckin - this.#lastCheckin; //checkin counts as when a user logs in

    this.#age += dt/DECLINE_PERIOD;
    this.hunger -= (dt/DECLINE_PERIOD);
    this.attention -= (dt/DECLINE_PERIOD);
    
    if (this.#wakeupTime == null)
      this.sleep -= (dt/DECLINE_PERIOD);
    
    this.#lastCheckin = newCheckin;
  }

  getAge() {
    return this.#age;
  }

  Attend () {
    if (this.#wakeupTime == null)
      this.attention = 100;
  }

  Feed(food) {
    if (this.#wakeupTime == null)
      this.hunger += food;

    if (this.hunger > 100)
      this.hunger = 100;
  }

  Rest() {
    if (this.#wakeupTime == null)
      return;

    this.sleep = 100;
    this.#wakeupTime = Date.now() + 10000;
  }
}

module.exports = Pet;