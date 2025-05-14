const API_KEY = 'ADD_ACCESS_KEY'; // alterar para chave de API do Unsplash
const endpoint = `https://api.unsplash.com/photos?client_id=${API_KEY}&per_page=10`;

function carregarImagens() {
    fetch(endpoint)
        .then(response => {
            console.log('Status da resposta das imagens:', response.status);
            if (!response.ok) {
                throw new Error('Erro ao carregar imagens da API');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados da API de imagens:', data);
            const linha1 = document.getElementById('linha1');
            const linha2 = document.getElementById('linha2');
            
            data.forEach((imagem, index) => {
                const card = criarCard(imagem.urls.small); 

                if (index < 5) {
                    linha1.appendChild(card); 
                } else {
                    linha2.appendChild(card); 
                }
            });
        })
        .catch(error => {
            console.log('Erro ao carregar imagens:', error);
        });
}

window.onload = carregarImagens;

const botaoPesquisar = document.querySelector("#botaoPesquisar");
const resultado = document.querySelector("#resultado");

botaoPesquisar.addEventListener("click", () => {
    const pesquisa = document.querySelector("#pesquisa").value.trim();

    if (pesquisa) {
        const searchEndpoint = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${encodeURIComponent(pesquisa)}&per_page=5`;

        fetch(searchEndpoint)
            .then(response => {
                console.log('Status da pesquisa:', response.status);
                if (!response.ok) {
                    throw new Error(`Erro ao carregar a pesquisa, status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Resultado da pesquisa:", data);
                if (data.results && data.results.length > 0) {
                    const imagem = data.results[0];
                    resultado.innerHTML = `<img src="${imagem.urls.regular}" alt="Resultado da pesquisa">`;
                } else {
                    resultado.innerHTML = "Nenhuma imagem encontrada.";
                }
            })
            .catch(error => {
                console.log('Erro ao carregar a pesquisa:', error);
                resultado.innerHTML = `Erro ao carregar a pesquisa: ${error.message}`;
            });
    } else {
        resultado.innerHTML = "Digite um termo para pesquisa.";
    }
});
