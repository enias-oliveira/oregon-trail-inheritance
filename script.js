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
    return this.passengers.some(passenger => passenger.isHealthy)
  }

  totalFood () {
    return this.passengers.reduce((total, passenger) => total + passenger.food, 0)
  }
}

// Criar uma carroça que comporta 2 pessoas
const wagon = new Wagon(2)
// Criar três viajantes
const henrietta = new Traveler('Henrietta')
const juan = new Traveler('Juan')
const maude = new Traveler('Maude')

console.log(`${wagon.getAvailableSeatCount()} should be 2`)

wagon.join(henrietta)
console.log(`${wagon.getAvailableSeatCount()} should be 1`)

wagon.join(juan)
wagon.join(maude) // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`)

henrietta.hunt() // pega mais comida
juan.eat()
juan.eat() // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`)
console.log(`${wagon.totalFood()} should be 3`)
