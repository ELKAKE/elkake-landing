const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCZbYxi86Fk4t4KUqRAec5oA&part=snippet%2Cid&order=date&maxResults=10";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "35425e63f6mshb46243b4003bf31p1980aajsn6bac5ec46f8a",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

// fetch(API, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

const fetchData = async (url) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

//funcion que despues vamos a llamar a nuestro cod
//cuando este agregando cada uno de los elementos
//vasmoa a leer el codigo como lo hace nuestra maquina
//asignando en memoria api y options

//funcion anonima recursiva

(async () => {
  try {
    const videos = await fetchData(API);
    //template, html que vamos a adaptar para que itere estos elmentos
    //estos elementos seran mostrados en nuestro html
    let view =
      //metodo map para regresar un nuevo arreglo pero con la tranformacion
      //que le esta aplicando, en este caso el template por cada video
      `
    ${videos.items
      .map(
        (video) => `
    <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
            >
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
            </div>
          </div>
    `
      )
      .slice(0, 6)
      .join("")}
    `;
    //slice:empieza del 0 y termina en 4, muestra 4 de los 10 elementos
    //join:para unir estos elementos, separador ("")
    content.innerHTML = view;
  } catch (e) {
    console.log(e);
  }
})();
