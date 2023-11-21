

let submitBtn = document.getElementById("search-btn");

let generateGif = () => {
    //loada spinner.
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";


    let q = document.getElementById("search-box").value;
    //Muestra 10 gifs en los resultados.
    let gifCount = 10;
    //API URL =
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";

    //Llamo a la API.
    fetch(finalURL)
        .then((resp) => resp.json())
        .then((info) => {
            console.log(info.data);
            //
            let gifsData = info.data;
            gifsData.forEach((gif) => {
                //Genero las tarjetas para los gifs.
                let container = document.createElement("div");
                container.classList.add("container");
                container.classList.add('col-3')
                let iframe = document.createElement("img");
                console.log(gif);
                iframe.setAttribute("src", gif.images.downsized_medium.url);
                iframe.onload = () => {
                    //Realizo un seguimiento de los gifs que se van cargando.
                    gifCount--;
                    if (gifCount == 0) {
                        //Si llega a 0 quiere decir que ya se cargaron todos los gifs.
                        loader.style.display = "none";
                        document.querySelector(".wrapper");
                    }
                };
                container.append(iframe);

                //Boton para copiar enlace.
                let copyBtn = document.createElement("button");
                copyBtn.classList.add('copy-btn')
                copyBtn.innerHTML = `<i class='bx bx-link-alt'></i>Copiar link`;
                copyBtn.onclick = () => {
                    //Creo el enlace.
                    let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                    //API portapapeles.
                    navigator.clipboard
                        .writeText(copyLink)
                        .then(() => {
                            alert("Link copiado!");
                        })
                        .catch(() => {
                            alert("No se pudo copiar el enlace");
                            //Creo un input oculto...
                            let hiddenInput = document.createElement("input");
                            hiddenInput.setAttribute("type", "text");
                            document.body.appendChild(hiddenInput);
                            // ...para establecer el valor del input
                            //como link del gif.
                            hiddenInput.value = copyLink;
                            //Copio el contenido del input.
                            hiddenInput.select();
                            document.execCommand("copy");
                            //Elimino el input.
                            document.body.removeChild(hiddenInput);
                        });
                };

                let copyBtn2 = document.createElement('button');
                copyBtn2.classList.add('copy-btn2');
                copyBtn2.innerHTML = `<i class='bx bx-link-alt'></i>`;

                //Le agrego el boton a cada tarjeta.
                container.append(copyBtn);
                document.querySelector(".wrapper").append(container);
            });
        });
};


submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);