const UN_SEGUNDO_INTERVAL = 200;

const UN_MIN = 60;
const SESION_MIN = 25 * UN_MIN;
const DESCANSO_MIN = 5 * UN_MIN;

let tiempoRegistrado = 0;
let idIntervalo = null;
/**
 * Inicia una sesion pomodoro 
 */
function comenzarEstudio(){
    if(!idIntervalo){
        iniciarSesion();
    }else{
        console.log("imposible iniciar otra vez")
    }
}

function iniciarSesion(){
    let seg = 0;
    let min = 0;
    console.log("iniciando sesion");
        idIntervalo = setInterval(()=>{
            if(tiempoRegistrado==SESION_MIN){
                console.log("pasaron 5 seg",idIntervalo);
                clearInterval(idIntervalo);
            }else{
                tiempoRegistrado++;
                console.log("paso 1 seg");
                seg = obtenerSegundos(seg);
                document.querySelector("#texto-barra").innerHTML = `00:${darFormatoTxtSegundo(seg)}`;
            }
        }, UN_SEGUNDO_INTERVAL);
}

function obtenerSegundos(seg){
    if( seg == 60 ){
        seg = 0;
        console.log("paso un min");
    }else{
        seg++;
        console.log("paso un seg");
    }
    return seg;
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