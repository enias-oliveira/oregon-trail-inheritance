class Traveler {
  constructor (name) {
    this._name = name
    this._food = 1
    this._isHealthy = true
  }

  get name () {
    return this._name
  }

  set name (newName) {
    this._name = newName
  }

  set food (amount) {
    this._food = amount
  }

  get food () {
    return this._food
  }

  get isHealthy () {
    return this._isHealthy
  }

  set isHealthy (bool) {
    this._isHealthy = bool
  }

  changeHealth () {
    this._isHealthy = !this._isHealthy
  }

  hunt () {
    this.food += 2
  }

  eat () {
    if (this.food > 0) {
      this.food -= 1
    } else { this.changeHealth() }
  }
}

class Wagon {
  constructor (capacity) {
    this._capacity = capacity
    this._passengers = []
  }

  get capacity () {
    return this._capacity
  }

  get passengers () {
    return this._passengers
  }

  set capacity (amount) {
    this._capacity = amount
  }

  set passengers (amount) {
    this._passengers = amount
  }

  getAvailableSeatCount () {
    return this.capacity - this.passengers.length
  }

  join (traveler) {
    if (this.getAvailableSeatCount() > 0) {
      this._passengers.push(traveler)
    }
  }

  shouldQuarantine () {
    return this.passengers.some(passenger => !passenger.isHealthy)
  }

  totalFood () {
    return this.passengers.reduce((total, passenger) => total + passenger.food, 0)
  }
}

class Doctor extends Traveler {
  constructor (name) {
    super(name)
  }

  heal (traveler) {
    traveler.isHealthy = true
  }
}

class Hunter extends Traveler {
  constructor (name) {
    super(name)
    this._food = 2
  }

  hunt () {
    this.food += 5
  }

  eat () {
    if (this.food > 2) {
      this.food -= 2
    } else {
      this.food = 0
      this.changeHealth()
    }
  }

  giveFood (traveler, numOfFoodUnits) {
    if (numOfFoodUnits > this.food) return
    this.food -= numOfFoodUnits
    traveler.food += numOfFoodUnits
  }
}

// Cria uma carroça que comporta 4 pessoas
const wagon = new Wagon(4)
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta')
let juan = new Traveler('Juan')
let drsmith = new Doctor('Dr. Smith')
let sarahunter = new Hunter('Sara')
let maude = new Traveler('Maude')

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`)

wagon.join(henrietta)
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`)

wagon.join(juan)
wagon.join(drsmith)
wagon.join(sarahunter)

wagon.join(maude) // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`)

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`)

sarahunter.hunt() // pega mais 5 comidas
drsmith.hunt()

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`)

henrietta.eat()
sarahunter.eat()
drsmith.eat()
juan.eat()
juan.eat() // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`)
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`)

drsmith.heal(juan)
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`)

sarahunter.giveFood(juan, 4)
sarahunter.eat() // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`)
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`)
