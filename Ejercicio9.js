class MeteoJSON{

    constructor(ciudad){

        this.apiKey =  "0419435f3a38309de9ce2dbb51426449";
        this.ciudad = ciudad;
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.tipo = "&mode=xml";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad  + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apiKey;
        this.datos;
        this.error = "<h2>¡Problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
        this.executed = false;

    }

    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    
                this.datos = datos;
 

                var totalNodos            = $('*',datos).length; 
                var ciudad                = $('city',datos).attr("name");
                var longitud              = $('coord',datos).attr("lon");
                var latitud               = $('coord',datos).attr("lat");
                var pais                  = $('country',datos).text();
                var amanecer              = $('sun',datos).attr("rise");
                var minutosZonaHoraria    = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970   = Date.parse(amanecer);
                    amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var oscurecer             = $('sun',datos).attr("set");          
                var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                    oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var temperatura           = $('temperature',datos).attr("value");
                var temperaturaMin        = $('temperature',datos).attr("min");
                var temperaturaMax        = $('temperature',datos).attr("max");
                var humedad               = $('humidity',datos).attr("value");
                var humedadUnit           = $('humidity',datos).attr("unit");
                var presion               = $('pressure',datos).attr("value");
                var presionUnit           = $('pressure',datos).attr("unit");
                var velocidadViento       = $('speed',datos).attr("value");
                var nombreViento          = $('speed',datos).attr("name");
                var direccionViento       = $('direction',datos).attr("value");
                var nubosidad             = $('clouds',datos).attr("value");
                var visibilidad           = $('visibility',datos).attr("value");
                var descripcion           = $('weather',datos).attr("value");
                var horaMedida            = $('lastupdate',datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                    horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                var icono                 = $('weather',datos).attr("icon");  

            
                var listaDatos = "<li><ul><li>Numero de nodos: " + totalNodos + "</li>";
                listaDatos += "<li>Ciudad: " + ciudad + "</li>";
                listaDatos += "<li>País: " + pais + "</li>";
                listaDatos += "<li>Latitud: " + latitud + " grados</li>";
                listaDatos += "<li>Longitud: " + longitud + " grados</li>";
                listaDatos += "<li>Temperatura: " + temperatura + " grados Celsius</li>";
                listaDatos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
                listaDatos += "<li>Temperatura mínima: " + temperaturaMin + " grados Celsius</li>";
                listaDatos += "<li>Presión: " + presion +" " + presionUnit +  " </li>";
                listaDatos += "<li>Humedad: " + humedad + " "+ humedadUnit + "</li>";
                listaDatos += "<li>Amanece a las: " + amanecerLocal + "</li>";
                listaDatos += "<li>Oscurece a las: " + oscurecerLocal + "</li>";
                listaDatos += "<li>Dirección del viento: " +direccionViento+ " grados</li>";
                listaDatos += "<li>Velocidad del viento: " +velocidadViento + " metros/segundo</li>";
                listaDatos += "<li>Nombre del viento: " +nombreViento + "</li>";
                listaDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                listaDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                listaDatos += "<li>Descripción: " + descripcion + "</li>";
                listaDatos += "<li>Visibilidad: " + visibilidad + " metros</li>";
                listaDatos += "<li>Nubosidad: " + nubosidad + " %</li>";
                listaDatos += "<li><img src=\"https://openweathermap.org/img/w/" + icono + ".png\" alt=\"Icono del tiempo\"></li></ul></li>";
            $("h2:last").after(listaDatos);
            },
            error: function(){
                $("h2").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
            }
          
        });
    }

}


class ArrayCiudades{

    constructor(array){
        this.ciudades = array;
    }


    mostrarTodas(){

        if(!this.executed){

            let i = 0;

            for(i = 0; i<this.ciudades.length ; i++){
                this.ciudades[i].cargarDatos();
            }
        }

        
        this.executed = true;
        

    }
}

		


var oviedo = new MeteoJSON("Oviedo");
var leon = new MeteoJSON("León");
var madrid = new MeteoJSON("Madrid");
var barcelona = new MeteoJSON("Barcelona");
var gijon = new MeteoJSON("Gijón")

var clusterCiudades = new ArrayCiudades([oviedo,leon,madrid,barcelona,gijon]);