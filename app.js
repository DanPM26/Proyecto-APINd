const getGhibli = async() =>{
    try {
        const respuesta = await fetch(" https://ghibliapi.herokuapp.com/films ");
        console.log(respuesta);
    if(respuesta.status === 200 ){
        const datos = await respuesta.json();

        let peliculas = "";
        datos.forEach((pelicula) => {
          peliculas += `
        <div class="pelicula">
        <img class="poster" width="150px" heigth="300px" src="https://image.tmdb.org/t/p/w200_and_h400_bestv2/${pelicula.image}">
        <button type="button" class="collapsible">${pelicula.title}</button>
        <div class="content">
        <p>${pelicula.description}</p>
        </div>
        </div>
        `;
        });

        document.getElementById('contenedor').innerHTML = peliculas;

        var coll = document.getElementsByClassName("collapsible");
        var i;

       for (i = 0; i < coll.length; i++) {
     coll[i].addEventListener("click", function() {
     this.classList.toggle("active");
     var content = this.nextElementSibling;
     if (content.style.display === "block") {
      content.style.display = "none";
     } else {
      content.style.display = "block";
     }
     });
}

    } else if(respuesta.status === 401) {
     console.log('Pusiste algo mal');
    } else if( respuesta.status === 404) {
        console.log('Algo salió mal');
    } else {
        console.log('hubo un error y no sabemos que pasó');
    }
        
    }catch (error){
        console.log('error');
    }
}
getGhibli();


//inicio de gráfica
let realizadLabel = [],realizadData = [],realizadDuracion = [] 

async function Graph(){
 await getGraph()

const ctx = document.getElementById('myChart').getContext('2d');
ctx.height = 10;
ctx.width = 10;

const chart = new Chart(ctx, {

    type: 'bar',

    data: {
        labels: realizadLabel,
        datasets: [{
            label: 'Año de la pelicula',
            backgroundColor:'grey',                
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: realizadData 
    },
    {
        label: 'Duración de la pelicula',
        backgroundColor: 'pink',
        borderColor: 'rgb(255, 99, 132)',
        data: realizadDuracion
    }
]
    },

    options: {
        tooltips: {
            mode:'index'
        },
        responsive: true,
            maintainAspectRatio: false,  
    }
})}

Graph()

async function getGraph() {
    const apiUrl = "https://ghibliapi.herokuapp.com/films"

    const response = await fetch(apiUrl)
    const datosT = await response.json()

    const realizada = datosT.map((x) => x.release_date)
    console.log(realizada)
    const duracion = datosT.map((x) => x.running_time)
    const name = datosT.map((x) => x.title)

    realizadData = realizada
    realizadDuracion = duracion
    realizadLabel = name
}