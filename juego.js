/*DECLARACIÓN DE VARIABLES
=======================================*/

	
/*VARIABLE CONSTANTE CON ELEMENTOS OBTENIDOS POR ID
=====================================================*/ 

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULLTIMO_NIVEL = 5

/*DECLARACIÓN DE CLASES PROTOTIPALES
==================================*/
class Juego {
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }
    //Metodo que se ejecuta cuando empieza el juego
    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        //.blid ahora el this esta atado al this de la clase prototipo juego
        this.toggleBtnEmpezar()
        //toggle es una forma de hacer un boton
        
        this.nivel = 1
        this.colores = {
            celeste, violeta, naranja, verde
        }
    }
    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else {
            btnEmpezar.classList.add('hide')
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(ULLTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
        //Array Creamos un nuevo objeto Array con 10 casillas
		//fill rellenamos cada casilla con 0
        //Math random * 4 entrega un valor entre 0 y 3
        
        //map() solo funciona si el elemento del array tiene un valor asi sea 0
    }
    siguienteNivel(){
        //inicializando el subnivel
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarNumeroAColor(numero){
        switch (numero){
            //Pedimos como parametro un numero aleatorio entre 0 y 4 que viene de this.secuencia()
            case 0:
                return 'celeste'
            case 1:
                return 'violeta' 
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }       
    }
    transformarColorANumero(numero){
        switch (numero){
            case 'celeste':
                return 0
            case 'violeta':
                return 1 
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }       
    }
    iluminarSecuencia(){
        /*aplicamos i < this.nivel porque el numero del nivel 
		corresponde al numero de elementos que le usuario 
        modificara y tendra que seguir */
        for (let i = 0; i < this.nivel; i++) {
           const color = this.transformarNumeroAColor(this.secuencia[i]) 
           // Ej: const color = "verde"
           setTimeout(() => this.iluminarColor(color), 1000 * i)   
           //colocar x * i nos permite acumular tiempo en función del for               
        }
    }
    iluminarColor(color){
        //Colocando la clase que ilumina el color
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color){
        //Quitando la clase que ilumina el color
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
        //para obtener el input agregando un manejador de eventos (click)
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick(){
        //para remover el input agregado al manejador de eventos (click)
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }
    ///////////////////////////////////////////////////////////////////////////////
     //los metodos que se llaman en el event listener suelen tener en la funcion un parametro ev
    elegirColor(ev){
        //le asignamos su target dataset // un evento (ev)
        const nombreColor = ev.target.dataset.color
        // daset almacena valores 
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
          // algoritmo d la funcion del juego
        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()

                if (this.nivel === ULLTIMO_NIVEL + 1){
                    this.ganoElJuego()
                }else {
                    setTimeout(this.siguienteNivel(), 1500)
                }
            }
        }else {
            this.perdioElJuego()
        }
    }
    ganoElJuego(){
        swal('Dieghoatc', 'Felicitaciones, ganaste el juego', 'success')
        .then(this.inicializar)
        // .then(() => {
        //     this.inicializar()
        // })
    }
    perdioElJuego(){
        swal('Dieghoatc', 'Perdiste :(', 'error')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
    ///////////////////////////////////////////////////////////////////////////////////////
}
function empezarJuego(){
    var juego = new Juego() //debug
}