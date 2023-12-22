// Extrae el año, mes y día de la fecha actual y lo transforma en string
const ANIOHOY =new Date().getFullYear().toString();
// Suma 1 al mes para tener el número de mes de 1 a 12
const MESHOY = new Date().getMonth()+1;
const MESSHOY = MESHOY.toString();
const DIAHOY = new Date().getDate().toString();

// Fecha actual para cálculo
const FECHAHOY1 = new Date(ANIOHOY+"-"+MESSHOY+"-"+DIAHOY).getTime();

// Valor de la tasa diaria para cada tipo de plazo fijo
const TIPOSPF = [
    {id: 1, nombre:"REGULADO POR EL BCRA", valortasa: 133},
    {id: 2, nombre:"TRADICIONAL CLIENTES EN $", valortasa: 126},
    {id: 3, nombre:"TRADICIONAL CLIENTES EN u$$", valortasa: 0.10}
]

// Función que calcula los días de plazo desde la Fecha actual Hasta la Fecha de   vencimiento ingresda por el usuario 

const diasPlazo = (fV,fH) => parseInt((fV - fH)/(1000*60*60*24));
 
//Función que calcula los intereses con los días de plazo y la tasa
const intereses = (dias,tasa) => dias * (tasa/100)/365;

//Clase con constructor para los datos solicitados en pantalla
class datosSimuladorPF {
    constructor (tipoPF,importe,dia,mes,anio){
        this.tipoPf = tipoPF;
        this.importe = importe;
        this.dia = dia;
        this.mes = mes;
        this.anio = anio
    }
    //Función para mostrar la fecha de Vencimiento
    fechaVencimientoPantalla() {
        return (this.dia+"/"+this.mes+"/"+this.anio);
    }
    //Función para determinar la fecha para cálculo 
    fechaVencimientoCalculo () { 
        return new Date(this.anio+"-"+this.mes+"-"+this.dia).getTime();
    };
}

let descripcionTipoPf,interesPorTipoPF;
let opcionCorrecta = true;

// Ingreso de datos necesarios para el cálculo de plazo fijo.
while ( opcionCorrecta == true ) {   
    // Tipo de plazo fijo:
    let opcionPlazoFijo = parseInt(prompt("Ingrese el N° de opción correspondiente al tipo de plazo fijo que quiere realizar: 1- $ PF Regulado BCRA (133%) 2- $ PF Tradicional Clientes (126%) 3- U$$ PF Tradicional Clientes (0.10%) "));

    // Importe
    let importePlazoFijo = parseFloat(prompt("Ingrese el Importe: "));

    // Fecha de vencimiento.
    alert ("A continuación deberá ingresar la Fecha de Vencimiento");
    let diaV = prompt("Ingresa dos dígitos para día: ");
    let mesV = prompt("Ingrese dos dígitos para mes: ");
    let anioV = prompt("Ingrese cuatro dígitos para año: ");

    // Control de datos ingresados
    if (isNaN(opcionPlazoFijo) || isNaN(importePlazoFijo) || isNaN(parseInt(diaV)) || isNaN(parseInt(mesV)) || isNaN(parseInt(anioV)) || parseInt(diaV) == 0  || parseInt(opcionPlazoFijo)<= 0 || parseInt(opcionPlazoFijo)> 3 || parseInt(diaV)>31 || parseInt(mesV) == 0 || parseInt(mesV) > 12 || parseInt(anioV) < ANIOHOY ) {
        alert("Algún dato ingresado NO SE AJUSTA A LO SOLICITADO");
        let continuar = prompt("Para ingresar nuevamente los datos presione S o cualquier otra tecla para salir").toUpperCase();
        if (continuar == "S"){
            continue;
        } 
        opcionCorrecta = false;
    } else {
        const datosSimuladorPF1 = new datosSimuladorPF(opcionPlazoFijo,importePlazoFijo,diaV,mesV,anioV);

        //Recorre el array de Tipos de Plazo fijo
            for ( const TIPOPF of TIPOSPF ){
            if (TIPOPF.id == opcionPlazoFijo){
                interesPorTipoPF = ((intereses(diasPlazo(datosSimuladorPF1.fechaVencimientoCalculo(),FECHAHOY1),TIPOPF.valortasa) * datosSimuladorPF1.importe)).toFixed(2);
                descripcionTipoPf = TIPOPF.nombre;
                break;
            }
        }

        // Muestra datos ingresados y obtenidos
        alert(`La fecha de vencimiento ingresada es: ${datosSimuladorPF1.fechaVencimientoPantalla()}. Los días hasta la fecha de vencimiento son: ${diasPlazo(datosSimuladorPF1.fechaVencimientoCalculo(),FECHAHOY1)}, la opcion de Plazo Fijo que ha elegido es: ${descripcionTipoPf}, y el monto ingresado: ${datosSimuladorPF1.importe}. Los intereses a la Fecha de vencimiento son $ ${interesPorTipoPF} que sumados al capital dan un total de: $ ${parseFloat(datosSimuladorPF1.importe) + parseFloat(interesPorTipoPF)}`);        
    
        //Verifica si se va a realizar otra simulación
        let continuar = prompt("Para simular otro Plazo fijo ingrese: S  de lo contrario presione cualquier tecla.").toUpperCase();
        if (continuar !== "S") {
            opcionCorrecta = false;
        }
    }
} 
