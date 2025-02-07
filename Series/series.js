async function fetchData() {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTk5ZmY3NDQ3MWI0Yjg3ZTgxNzhlNzhhNzQzNDU1ZCIsIm5iZiI6MTcxODg5NzQzNC43ODMsInN1YiI6IjY2NzQ0YjFhYTU3YWFjZTM4YzkzZDZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LSetfOLMKfwDLCxJfe3ZQB03CSg60Fhc8FzDBz5ezXY'
            }
        };

        const response = await fetch('https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1', options)

        if (!response.ok) {
            throw new Error("Falha ao consultar a API");
        }

        // console.log(response);


        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}

async function createCard() {
    fetchData()
        .then(x => {
            let moviesAPi = ""

            x.results.forEach(element => {

                console.log(element)


                moviesAPi = `
                        <div  class="movie flex-column card shadow m-5 rounded" style="width: 18rem; color: white !important; background-color: #232323 !important">
                            <img class="card-img-top p-4" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${element.name}</h5>
                                <p class="card-text">${element.overview}</p>
                                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                            </div>
                        </div>
                    `
                document.getElementById("movieCards").innerHTML += moviesAPi
            }
            );

            $("#search").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $(".movie").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    console.log(value)
                });
            });

        })
};


createCard()


