//const fetch = require("node-fetch");

const UN_SEGUNDO_INTERVAL = 10;

const MIN_A_SEG = 60;
const SESION_MIN = 25 ;
const DESCANSO_MIN = 5 ;
const CANT_SESIONES = 4;




//Valores por defecto para sesion
const SEGUNDO_INICIAL_SESION = 0;
const MINUTO_INICIAL_SESION = SESION_MIN;

const SEGUNDO_INICIAL_DESCANSO = 0;
const MINUTO_INICIAL_DESCANSO = DESCANSO_MIN;

const SESION_NO_TERMINADA = false;
const SESION_TERMINADA = true;
const ESTADO_SESION_INICIAL = SESION_NO_TERMINADA;

const SIN_INTERVALO = null;

const ESTUDIO_ACTIVO = true;
const ESTUDIO_TERMINO = false;

const DESCANSO_ACTIVO = true;
const DESCANSO_TERMINO = false;

let idIntervalo = SIN_INTERVALO;
let terminoSesion = SESION_NO_TERMINADA;
let contadorSesiones = CANT_SESIONES ;

document.querySelector("#texto-barra").innerHTML = SESION_MIN+":0"+SEGUNDO_INICIAL_SESION;
/**
 * Inicia estudio
 */
function comenzarEstudio(){
    if(!idIntervalo ){
        iniciarSesion(SEGUNDO_INICIAL_SESION, MINUTO_INICIAL_SESION);
        /* iniciarSesion(SEGUNDO_INICIAL_DESCANSO, MINUTO_INICIAL_DESCANSO); */
    }else{
        console.log("no es posible iniciar otra sesion");
    }
}

/**
 * Comienza la sesion segun los valores recibidos
 * @param {Number} segInicial del tipo de sesion
 * @param {Number} minInicial del tipo de sesion
 */
function iniciarSesion(segInicial, minInicial){
    let seg = segInicial;
    let min = minInicial-1;
    let estadoEstudio = ESTUDIO_ACTIVO;
    let estadoDescanso = DESCANSO_TERMINO;
    console.log("iniciando sesion");
        idIntervalo = setInterval(()=>{
            if(!contadorSesiones){
                console.log("Termino estudio"); 
                clearInterval(idIntervalo);
                idIntervalo = SIN_INTERVALO;
            }else{
                if(terminoSesion && !estadoDescanso){
                    console.log("estudio terminado");
                    seg = SEGUNDO_INICIAL_DESCANSO;
                    min = MINUTO_INICIAL_DESCANSO-1;
                    terminoSesion = SESION_NO_TERMINADA;
                    estadoDescanso = DESCANSO_ACTIVO;
                    estadoEstudio = ESTUDIO_TERMINO;
                }else if(terminoSesion && !estadoEstudio){
                    console.log("descanso terminado");
                    seg = SEGUNDO_INICIAL_SESION;
                    min = MINUTO_INICIAL_SESION-1;
                    terminoSesion = SESION_NO_TERMINADA;
                    estadoDescanso = DESCANSO_TERMINO;
                    estadoEstudio = ESTUDIO_ACTIVO;
                }else{
                    seg = obtenerSegundos(seg);
                    modificarBarraProgreso(seg, min, minInicial); 
                    min = obtenerMinutos(seg, min);
                    if(terminoSesion && estadoEstudio){
                        contadorSesiones--;
                    }
                }
            }
        }, UN_SEGUNDO_INTERVAL);
}

function modificarBarraProgreso(seg, min, minInicial){
    // 25*60 -> 100
    // x*x -> x*x*100/25*60
    let progresoPorcentaje = 100 - (((seg + min*MIN_A_SEG ) * 100) / (minInicial*MIN_A_SEG));
    console.log(progresoPorcentaje.toString()+"%", seg ,min);
    (document.querySelector(".barra-interna")).style.width = progresoPorcentaje.toString()+"%";
    document.querySelector("#texto-barra").innerHTML = `${darFormatoTxtMin(min)}:${darFormatoTxtSegundo(seg)}`;

}

/**
 * Modifica los segundos dependiendo si paso o no un minuto
 * @param {Number} seg actuales de sesion
 * @returns segundos correspondientes
 */
function obtenerSegundos(seg){
    if( seg == 0 ){
        seg = 59;
    }else{
        seg--;
    }
    return seg;
}

/**
 * Modifica el valor de minutos dependiendo del valor de segundos
 * @param {Number} seg actuales
 * @param {Number} min actuales
 * @return  minutos correspondientes de sesion
 */
function obtenerMinutos(seg, min){
    if((min==0) && (seg==0)){
        //termino sesion
        console.log(terminoSesion);
        terminoSesion = SESION_TERMINADA;
        console.log(terminoSesion);
        /* seg = 0; */
    }else if(seg == 0){
        min--;
    }
    return min;
}


/**
 * Devuelve los segundos en formato de texto 00 segun corresponda
 * @param {Number} seg actualmente
 * @returns segundos en formato de texto 00
 */
function darFormatoTxtSegundo(seg){
    segTxt = "00";
    if(seg>=10){
        segTxt = seg.toString();
    }else{
        segTxt = "0"+seg;
    }
    return segTxt;
}

function darFormatoTxtMin(min){
    let minTxt = "00";
    if(min < 10){
        minTxt = "0"+min;
    }else{
        minTxt = min.toString();
    }
    return minTxt
}