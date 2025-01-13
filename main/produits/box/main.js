let config = {};

// Charger la configuration depuis le fichier JSON
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        config = data;
        initializePage();
    })
    .catch(error => console.error('Erreur lors du chargement de la configuration:', error));

// Initialiser la page
function initializePage() {
    const boxTypeSelect = document.getElementById('box-type');
    const optionsContainer = document.getElementById('options-container');

    // Remplir les types de box
    config.boxTypes.forEach(box => {
        const option = document.createElement('option');
        option.value = box.id;
        option.textContent = `${box.name} (${box.price} €)`;
        option.dataset.price = box.price;
        boxTypeSelect.appendChild(option);
    });

    // Mettre à jour les options en fonction du type de box sélectionné
    boxTypeSelect.addEventListener('change', function () {
        const selectedBox = config.boxTypes.find(box => box.id === this.value);
        optionsContainer.innerHTML = '';

        if (selectedBox && selectedBox.options) {
            selectedBox.options.forEach(option => {
                const optionDiv = document.createElement('div');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = option.id;
                checkbox.value = option.name;
                checkbox.dataset.price = option.price;

                const label = document.createElement('label');
                label.htmlFor = option.id;
                label.textContent = `${option.name} (+${option.price} €)`;

                optionDiv.appendChild(checkbox);
                optionDiv.appendChild(label);
                optionsContainer.appendChild(optionDiv);

                checkbox.addEventListener('change', updatePrice);
            });
        }

        updatePrice();
    });

    // Initialiser avec le premier type de box
    boxTypeSelect.dispatchEvent(new Event('change'));
}

// Mettre à jour le prix
function updatePrice() {
    const boxTypeSelect = document.getElementById('box-type');
    const basePrice = parseFloat(boxTypeSelect.options[boxTypeSelect.selectedIndex].dataset.price || 0);

    const selectedOptions = document.querySelectorAll('#options-container input[type="checkbox"]:checked');
    const optionsPrice = Array.from(selectedOptions).reduce((total, option) => {
        return total + parseFloat(option.dataset.price || 0);
    }, 0);

    const totalPrice = basePrice + optionsPrice;
    document.getElementById('product-price').textContent = `Prix : ${totalPrice.toFixed(2)} €`;
}

// Télécharger les choix
document.getElementById('download-button').addEventListener('click', function () {
    const boxType = document.getElementById('box-type').value;
    const selectedBox = config.boxTypes.find(box => box.id === boxType);
    const selectedOptions = document.querySelectorAll('#options-container input[type="checkbox"]:checked');

    const optionsList = Array.from(selectedOptions).map(option => option.value).join('\n- ');

    const fileContent = `Type de Box : ${selectedBox.name}\nOptions sélectionnées :\n- ${optionsList}`;
    const blob = new Blob([fileContent], { type: "text/plain" });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'box_options.txt';
    link.click();
    URL.revokeObjectURL(link.href);
});

// Importer un fichier
document.getElementById('file-import').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        const lines = content.split('\n');
        const boxName = lines[0].split(':')[1].trim();
        const options = lines.slice(1).map(line => line.split('-')[1]?.trim()).filter(Boolean);

        const boxTypeSelect = document.getElementById('box-type');
        const selectedBox = config.boxTypes.find(box => box.name === boxName);
        if (selectedBox) {
            boxTypeSelect.value = selectedBox.id;
            boxTypeSelect.dispatchEvent(new Event('change'));
        }

        const checkboxes = document.querySelectorAll('#options-container input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = options.includes(checkbox.value);
        });

        updatePrice();
    };

    reader.readAsText(file);
});
