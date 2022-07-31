const UN_SEGUNDO_INTERVAL = 100;

const UN_MIN = 60;
const SESION_MIN = 25 ;
const DESCANSO_MIN = 5 ;




//Valores por defecto para sesion
const SEGUNDO_INICIAL = 0;
const MINUTO_INICIAL = SESION_MIN-1;

const SESION_NO_TERMINADA = false;
const SESION_TERMINADA = true;
const ESTADO_SESION_INICIAL = SESION_NO_TERMINADA;


let idIntervalo = null;
let terminoSesion = SESION_NO_TERMINADA;

document.querySelector("#texto-barra").innerHTML = SESION_MIN+":0"+SEGUNDO_INICIAL;
/**
 * Inicia estudio
 */
function comenzarEstudio(){
    if(!idIntervalo){
        iniciarSesion();
    }else{
        console.log("imposible iniciar otra vez")
    }
}

/**
 * Inicia una sesion pomodoro
 */
function iniciarSesion(){
    let seg = SEGUNDO_INICIAL;
    let min = MINUTO_INICIAL;
    console.log("iniciando sesion");
        idIntervalo = setInterval(()=>{
            if(terminoSesion){
                clearInterval(idIntervalo);
            }else{
                seg = obtenerSegundos(seg);
                modificarBarraProgreso(seg,min); 
                min = obtenerMinutos(seg, min);
            }
        }, UN_SEGUNDO_INTERVAL);
}

function modificarBarraProgreso(seg, min){
    // 25*60 -> 100
    // x*x -> x*x*100/25*60
    let progresoPorcentaje = 100 - (((seg + min*60 ) * 100) / (25*60));
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
 * Modifica el valor de minutos dependiendo del valor de segundos y la cantidad de minutos por sesion
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