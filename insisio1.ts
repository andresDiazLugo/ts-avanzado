
//desconocido
const saludar: unknown = "Hello world" // aca le dicimos a javascript le decimos que no sabemos el tipo

//inferencia
//como a y b infiere que son number sin decirle nada
const a = 1
const b = 2
const c = a + b// c tambien es un numero por lo que esta infiriendo

//functions
function presentacion(name:string){
    console.log(`Hola ${name}`)
}
presentacion("Juan")
function presentacion2({name, age}:{name:string, age: number}):number{
    console.log(`Hola ${name} y tengo ${age} `)
    return age
}

const sayHiFromFunction = (fn:(name:string) => undefined | void) =>{
    return fn('andres')
}
sayHiFromFunction((name:string)=>{
    console.log(`Hola ${name}`)
})

//never esto casi siempre se usa en funciones que no devuelven nada
function throwError(message:string):never{
    throw new Error(message);
    //basicamente el never nunca va a llegar al return
}
//inferencia en funciones anonimas segun el contexto
const avengers = ['Spidey','Hulk','avengers']
avengers.forEach((elements)=>{
    console.log(elements)
})

//objectos
let hero = {
    name: 'thor',
    age: 1500
}
function createHero(name: string, age: number){
    return {name, age}
}

const thor = createHero('Thor', 1500)


//Type Alias
//union types
type PowerScale = 'local' | 'planetary' | 'galactic' | 'universal'
type Gadiator ={
    readonly id?: number
    name: string
    age:number
    isActive?: boolean
    powerScale?:PowerScale
} 
function createGladiator(name:string,age:number):Gadiator{
    return {name,age, isActive: true}
}
const spider = createGladiator("spider",26)
spider.powerScale = "universal"
spider.id?.toString//este mecanismo se llama encadenamiento opcional y se lo explicare como funciona en el siguiente comentario
//El ENCADENAMIENTO FUNCIONAL PERMITE PODER ACCEDER A PROPIEDADES ANIDADAS DE MANERA SEGURA , ESPECIALMENTE CUANDO SE TRABAJA CON DATOS QUE PUEDEN NO ESTAR COPLETAMENTE DEFINIDOS O SER OPCIONALES, CASI SIEMMPRE SE LAS USA CUANDO EN AL´GUN PUNTO DE LA CADENA ALGUNA PROPIEDAD ES 'NULL' O 'UNDEFINED' OTRO EJEMPLO ES SUPONGAMOS QUE EN REACT TIENES UN ESTADO QUE SE RESETEA CUANDO EJECUTAS UNA FUNCION QUE TRAE UN ARREGLO CON X INFORMACION CUANDO VOS QUIERAS RENDERIZAR ESA INFORMMACION COLOCAS UN RETURN EN LA FUNCION DE REACT PARA RENDERIZAR LA INFORMACION ESO LO HACES CON UN MAP PERO QUE PASA SI EN EL MOMENTO QUE HACES MAP NO EXISTE INFORMACION Y VOS ESTAS ACCEDIENDO A PROPIEDADES DEL ELEMENTO SIN SABER QUE TODAVIA ESTAN AHI, AL ACCEDER A ESAS PROPIEDADES SIN ANTES VERIFICAR O TRATAR DE PROTEGER EL ACCEDER LA APP QUE ESTAS DESARROLLANDO SE VA A ROMPER ES POR ESO QUE COMBIENE USAR EL ENCADENAMIENTO OPCIONAL PARA TRATAR DE EVITAR ESTOS TIPOS DE ERRORES NOS ASEGURAMOS PROTECCION AL ACCEDER A UNA PROPIEDAD
// El readonly sirve para los siguiente supongamos que alguien torpe quiere cambiar el valor de la propiedad 
// spider.id = "asdsadas"// esto nos va a tirar error por que en la propiedad de typo gladiador colocamos que la propiedad id es de solo lectura

//template union types
// esto es uno de los ejemplos que se puede usar
type HexadecialColor = `#${string}`
const color :HexadecialColor = "0044fff"
const color2 :HexadecialColor = "#0044fff"

//union de types
type BasicInformatyPersona = {
    name: string
    age: number

}
type PropertyPersona = {
    direction: string
    state_civil: 'soltero' | 'casado'
}

type Persona = BasicInformatyPersona & PropertyPersona


const andres:Persona = {
    name:"andres",
    age:37,
    direction:'sur',
    state_civil: 'soltero',
}
//type indexing

type HeroProperties = {
    isActive: boolean,
    address: {
        planet: string,
        city: string
    }
}

const addressHero: HeroProperties['address'] = {
    planet:'Earth',
    city: 'madrid'
}
//type from value

const address = {
    planet : 'Earth',
    city: 'madrid'
}
//lo que podemos hacer con el typeof es extraer los tipos de un objectos de funciones
type Address = typeof address

//type from function return
function createAddress(){
    return {
        planet: 'Tierra',
        city: 'Barcelona'
    }
}
type direccion = ReturnType<typeof createAddress>//quiero que me recuperes el typo que devuelve la funcion createAddress

//Arrays
const languages:(string | number)[] = []
const language2:Array<string | number> = []

languages.push("andres")
languages.push(1)
languages.push(true)
language2.push("andres")
language2.push(2)

/*
[
['x','o','x'],//<-- string[]
['x','o','x'],//<-- string[]
['x','o','x'],//<-- string[]
]
*/
type CellValue = 'x' | 'o' | ''
type GameBoard = [
    [CellValue,CellValue,CellValue],
    [CellValue,CellValue,CellValue],
    [CellValue,CellValue,CellValue]
]

const gameBoard: GameBoard  =[
    ['x','o','o'],//las tuplas es un array que tiene un limite fijado de elementos
    ['x','o','x'],
    ['x','o','o']
]