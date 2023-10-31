document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("upload-form");
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-button");
    const responseMessage = document.getElementById("response-message");

    uploadForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!fileInput.files.length) {
            responseMessage.textContent = "Por favor, selecione um arquivo.";
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        fetch("URL_DO_SEU_SERVIDOR_AWS", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                responseMessage.textContent = "Arquivo enviado com sucesso!";
                // Você pode processar a resposta do servidor aqui, se necessário.
            })
            .catch((error) => {
                responseMessage.textContent = "Erro ao enviar o arquivo: " + error;
            });
    });
    
    // Aponte para a URL do seu servidor no Heroku
    const serverURL = "https://seu-servidor-no-heroku.com"; // Substitua pelo URL correto

    // Função para adicionar receita/despesa à lista
    function addFinanceItem() {
        const type = document.getElementById("type").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const period = document.getElementById("period").value;

        if (!isNaN(amount) && period.trim() !== "") {
            const financeItem = {
                type,
                amount,
                period,
            };

            // Faça uma solicitação POST para o servidor no Heroku
            fetch(`${serverURL}/api/financas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(financeItem),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Atualize a lista de receitas/despesas
                    updateFinanceList(data);
                })
                .catch((error) => console.error("Erro ao adicionar item:", error));
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    }

    // Função para atualizar a lista de receitas/despesas
    function updateFinanceList(data) {
        const financeList = document.getElementById("finance-list");
        financeList.innerHTML = "";

        data.forEach((item) => {
            const financeItem = document.createElement("li");
            financeItem.textContent = `Tipo: ${item.type}, Valor: ${item.amount}, Período: ${item.period}`;
            financeList.appendChild(financeItem);
        });
    }

    // Adicione um ouvinte de evento ao botão "Adicionar"
    document.getElementById("submit-button").addEventListener("click", addFinanceItem);

    // Inicialize a lista de receitas/despesas a partir do servidor
    fetch(`${serverURL}/api/financas`)
        .then((response) => response.json())
        .then((data) => {
            updateFinanceList(data);
        })
        .catch((error) => console.error("Erro ao buscar itens:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    
});