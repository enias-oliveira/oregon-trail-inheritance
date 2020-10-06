function Traveler (name) {
  this.name = name
  this.food = 1
  this.isHealthy = true
}

Traveler.prototype.setFood = function (amount) {
  this.food = amount
}

Traveler.prototype.getFood = function () {
  return this.food
}

Traveler.prototype.changeHealth = function () {
  this.isHealthy = !this.isHealthy
}

Traveler.prototype.hunt = function () {
  const newFood = this.getFood() + 2
  this.setFood(newFood)
}

Traveler.prototype.eat = function () {
  const newFood = this.getFood()
  if (newFood > 0) {
    this.setFood(newFood - 1)
  } else { this.changeHealth() }
}

function Wagon (capacity) {
  this.capacity = capacity
  this.passengers = []
}

Wagon.prototype.getCapacity = function () {
  return this.capacity
}

Wagon.prototype.getPassengersCount = function () {
  return this.passengers.length
}

Wagon.prototype.getAvailableSeatCount = function () {
  return this.getCapacity() - this.getPassengersCount()
}

Wagon.prototype.join = function (traveler) {
  if (this.getAvailableSeatCount() > 0) {
    this.passengers.push(traveler)
  }
}

Wagon.prototype.shouldQuarantine = function () {
  return this.passengers.some(passenger => passenger.isHealthy)
}

Wagon.prototype.totalFood = function () {
  return this.passengers.reduce((total, passenger) => total + passenger.getFood(), 0)
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