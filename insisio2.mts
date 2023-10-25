//Enums
// en javascript como no existen los enum podriamos hacerlo asi
const ERROR_TYPES ={
    NOT_FOUND: 'notFound',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden'
}

function mostrarMensaje(tipoDeError){
    if(tipoDeError === ERROR_TYPES.NOT_FOUND){
        console.log('No se encuentra el recursp')
    }else if(tipoDeError === ERROR_TYPES.UNAUTHORIZED){
        console.log('No tienes permisos para acceder')
    }else if(tipoDeError === ERROR_TYPES.FORBIDDEN ){
        console.log('No tienes permisos para acceder')
    }
}

//En typescript lo mejor seria que usemos enums
//que hace los enums cuando transpila el codigo a javascript
// bueno lo que hace por detras es colocarle a las propedades un valor como indice donde la primera vale 0 de esta forma que esta declarada nos va a generar mas codigo
enum ERROR_TYPES2{
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDEN 
}
//otra forma de generar un enum que transpile codigo js de manera mas corta y con comentario es de la siguiente manera, este tambien va a tener unos indices donde el primero va a hacer 0 
const enum ERROR_TYPES3{
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDEN 
}
//otra forma es asignarle un valor a las propiedades para que no se te asigne un indice automaticamente
enum ERROR_TYPES4{
    NOT_FOUND = 'NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDEN = 'FORBIDEN'
}

//Aserciones de tipos 
const canvas = document.getElementById('canvas') as HTMLCanvasElement

// null si no lo encuentra
// HTMLElement si lo encuentra

//??? como sabe typescript que realmente estas recuperando un elemento <canvas/>?

// es inferencia -> Typescript se da cuenta que dentro del if
//ya solon el canvas a poder ser un HTMLCanvasElement
if (canvas !== null && canvas instanceof HTMLCanvasElement){
    /**prosigo a explicar el codigo de la condicional cuando nosotros
     * queremos obtener en este ejemplo un canvas element y queremos acceder a sus 
     * propiedades bueno ts no es tan inteligente para inferir en el typo del element 
     * entonces por defecto ts nos trae un null nosotros los podriamos arreglar con as
     * diciendole a ts que estamos seguros que es un elemento de canvas pero que pasa
     * si nos estamos equivocando y lo que trae en ese momento es vacio bueno tendremos
     * un problema es por eso que necesitamos hacer una verificacion para que ts pueda ´
     * llegar a una inferencia y como lo hacemos bueno es bastante facil lo que podemos 
     * hacer es preguntar si la constante canvas es distinto de null como primer paso 
     * asi cuando ts va a decir oye este elemento que estamos trayendo o obteniendo no es null por que hay un elemento pero no se de que typo es,ok ya le ayudamos a ts
     * a hacerlo saber que no hay un valor null pero todavia ts no puede inferir ya que
     * no sabe que tipo es, es por esto que dentro de la condicional preguntamos si el elemento obtenido es instancia de un elemento en particular para este caso canvas
     * bueno ts por fin va a poder inferir y va a decir aaaa si es una instancia de un 
     * tipo de elemento en particular por ende no vamos a romper el codigo
     */
    const ctx = canvas.getContext('2d')
}
// typeof --> para tipos
//instanceof --> para instancias
//fetching de datos en TypesScript

const API_URL = "https://aoodsjd/dasjdjah/kasjdk"
const response = await fetch(API_URL)// aca podemos o crear una funcion y poner async o mejor colocar al archivo .mts para indicarle que es un modulo

if(!response.ok){
    throw new Error('Request failed')
}

//jamas hagan el tipado manual por que es muchismimo trabajo
/** Lo que hay que hacer es ir a la api hacer la peticion copiamos la respuesta
 * y vamos a la herramienta como quicktype pegamos la respuesta le colocamos un nombre
 * elegimos el lenguage copiamos el typo que nos genero y directamente typamos la data
*/
const data = await response.json()
const repos = data.items.map(repo =>{
    console.log(repo)
})
//interface
//basicamente una interface es un contrato que tipamos que debe cumplir el contrato de un objecto
interface Heroe{
    id: string
    name: string
    age: number
    saludar: () => void
}

const hero:Heroe ={
    id: '02343',
    name:'Anderson',
    age: 26,
    saludar :() => {console.log("Hola mi nombre es Anderson")}
}

interface Producto {
    id:number
    nombre: string
    precio: number
    quantity: number
}
interface Zapatilla extends Producto{
    talla: number
}
interface CarritoDeCompras{
    totalPrice: number
    productos: Zapatilla[]
}
const carrito: CarritoDeCompras = {
    totalPrice: 100,
    productos: [
        {
            id: 1,
            nombre: 'Producto1',
            precio: 100,
            quantity: 1,
            talla: 42
        }
    ]
}
//maneras de declarar funciones en una interface
interface CarritoOps{
    add: (product: Producto) => void,
    remove: (id:number) => void,
    clear: () => void
}
interface CarritoOps2 {
    add(product: Producto): void
    remove(id: number): void
    clear(): void
}
// Narrowing
function mostrarLongitud (objecto: number | string) {
    if( typeof objecto === 'string'){
        return objecto.length
    }
    return objecto.toString().length
}
interface Mario{
    company: 'Nintendo',
    nombre: string,
    saltar: () => void
}
interface Sonic {
    company: 'Sega',
    nombre: string,
    correr: () => void
}
type Personaje = Mario | Sonic

function jugar(personaje: Personaje){
    if(personaje.company === 'Nintendo'){
       return personaje.saltar
    }
    return personaje.correr()
}

//type Guard
//dejame comprobar si personaje es sonic
//y esta funcion determina si es sonic o no
function checkIsSonic(personaje:Personaje): personaje is Sonic{
    return (personaje as Sonic).correr !== undefined
}
function fn(x:string | number){
    if (typeof x === 'string'){
        //x es un string
        x.toLocaleUpperCase()
    }else if (typeof x === 'number'){
        //do something
        x.toFixed(2)
    }else{
        x//never
    }
}
interface IAvenger{
    name:string
    powerScore: number
    wonBattles: number
    age: number
}
class Avenger implements IAvenger {
    public name: string
    public powerScore: number
    public wonBattles: number = 0
    public age: number
    constructor(name:string, powerScore: number){
        this.name = name
        this.powerScore = powerScore
    }
    get fullName(){
        return `${this.name}, de poder ${this.powerScore}`
    }

    set power(newPower: number){
        if(newPower <= 100){
            this.powerScore = newPower
        }else{
            throw new Error('Power score cannot be more than 100')
        }
    }
}

const avengers = new Avenger('Sipdey',80)
