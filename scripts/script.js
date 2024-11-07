const flavorImages = document.querySelectorAll('.flavor-icon');
const cans = document.querySelectorAll('section:nth-of-type(2) article:first-of-type ul:first-of-type li img');
const title = document.querySelector('section:nth-of-type(2) article:first-of-type h2');
const purchaseTypeRadios = document.querySelectorAll('input[name="purchaseType"]');
const purchaseTypeLabels = document.querySelectorAll('section:nth-of-type(2) fieldset label');
const packSizeRadios = document.querySelectorAll('input[name="packSize"]');
const subscriptionFrequencyRadios = document.querySelectorAll('input[name="subscriptionFrequency"]');
const subscriptionFrequencyLabels = document.querySelectorAll('fieldset:nth-of-type(3) label');
const subscriptionOptions = document.querySelector('fieldset:nth-of-type(3)');
const priceDisplay = document.querySelector('p > span');
const basePrice = 22.25;
const packPrice = {
    "12-pack": basePrice,
    "24-pack": basePrice * 2
};
const subscriptionFrequencyPrices = {
    "2-weeks": 0,
    "4-weeks": 5
};
const flavorCanImages = {
    mix: ["raspberry.webp", "mango.webp", "lime.webp", "grapefruit.webp"],
    peach: ["peach.webp", "peach.webp", "peach.webp", "peach.webp"],
    raspberry: ["raspberry.webp", "raspberry.webp", "raspberry.webp", "raspberry.webp"],
    lime: ["lime.webp", "lime.webp", "lime.webp", "lime.webp"],
    mango: ["mango.webp", "mango.webp", "mango.webp", "mango.webp"],
    passionfruit: ["passionfruit.webp", "passionfruit.webp", "passionfruit.webp", "passionfruit.webp"],
    grapefruit: ["grapefruit.webp", "grapefruit.webp", "grapefruit.webp", "grapefruit.webp"],
    moscowmule: ["moscowmule.webp", "moscowmule.webp", "moscowmule.webp", "moscowmule.webp"],
    gintonic: ["gintonic.webp", "gintonic.webp", "gintonic.webp", "gintonic.webp"],
    spritz: ["spritz.webp", "spritz.webp", "spritz.webp", "spritz.webp"],
    mixpack: ["moscowmule.webp", "gintonic.webp", "moscowmule.webp", "gintonic.webp"]
};
const button = document.querySelector('nav ul li:nth-of-type(4) button');
const menuButton = document.querySelector('nav ul:first-of-type li:first-of-type svg');


// 3. Functies

// Functie prijs updaten
function updatePrice() {
    const purchaseType = document.querySelector('input[name="purchaseType"]:checked').value;
    const packSize = document.querySelector('input[name="packSize"]:checked').value;
    const subscriptionFrequency = document.querySelector('input[name="subscriptionFrequency"]:checked')?.value || '2-weeks'; // Zorg ervoor dat de waarde bestaat, anders '2-weeks'

    let price = packPrice[packSize];
    if (purchaseType === 'subscription') {
        price += subscriptionFrequencyPrices[subscriptionFrequency];
    }

    priceDisplay.textContent = `€${price.toFixed(2)}`;
}
// Labels bij het kopen
function updateSelectedStyle() {
    purchaseTypeLabels.forEach(label => label.classList.remove('selected'));
    const selectedRadio = document.querySelector('input[name="purchaseType"]:checked');
    if (selectedRadio) {
        const selectedIndex = Array.from(purchaseTypeRadios).indexOf(selectedRadio);
        purchaseTypeLabels[selectedIndex].classList.add('selected');
    }
}

// Hamburgermenu
function toggleMenu() {
    const menu = document.querySelector('nav ul:nth-of-type(2)');
    const isMenuHidden = menu.getAttribute('aria-hidden') === 'true';

    menu.setAttribute('aria-hidden', !isMenuHidden);
    menu.style.left = isMenuHidden ? '0' : '-100%';
}

// Pop up openen
function showPopup() {
    let popup = document.querySelector("section:nth-of-type(3) article:first-of-type");
    popup.classList.add('show');
    let audio = new Audio('audio/winkelmand_audio.mp3');
    audio.play();
}

// Pop up sluiten
function closePopup() {
    let popup = document.querySelector("section:nth-of-type(3) article:first-of-type");
    popup.classList.remove('show');
}


// 4. Event Listeners

// Schakelen tussen licht en donker
button.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Als het huidige thema 'dark' is, zet het naar 'light', anders naar 'dark'
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        this.textContent = 'Dag modus';  // Zet de knoptekst op 'Dag modus'
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.textContent = 'Nacht modus';  // Zet de knoptekst op 'Nacht modus'
    }
});

// Controleer het systeemthema en pas de mode aan
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    button.textContent = 'Nacht modus';  // Zet de knoptekst op 'Nacht modus'
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    button.textContent = 'Dag modus';  // Zet de knoptekst op 'Dag modus'
}

// Luister naar veranderingen in het systeemthema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        button.textContent = 'Nacht modus';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        button.textContent = 'Dag modus';
    }
});


// Openen sluiten hamburgermenu
menuButton.addEventListener('click', toggleMenu);

// Flavor selectie
flavorImages.forEach((flavorImage) => {
    flavorImage.addEventListener('click', function() {
        flavorImages.forEach(image => {
            image.style.border = 'none';
            image.style.borderRadius = '0';
        });

        this.style.border = '0.125 solid #031a36';
        this.style.borderRadius = '50%';

        const flavor = this.getAttribute('data-flavor');

        cans.forEach((can, canIndex) => {
            can.src = `images/Cans/${flavorCanImages[flavor][canIndex]}`;
        });

        title.textContent = flavor.charAt(0).toUpperCase() + flavor.slice(1);
    });
});

// Wijzigen van eenmalig, pack, en abonnement
purchaseTypeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        updateSelectedStyle();
        subscriptionOptions.style.display = this.value === 'subscription' ? 'block' : 'none';
        updatePrice();
    });
});

packSizeRadios.forEach(radio => {
    radio.addEventListener('change', updatePrice);
});

subscriptionFrequencyRadios.forEach((radio, index) => {
    radio.addEventListener('change', function() {
        subscriptionFrequencyLabels.forEach(label => label.classList.remove('selected-pack'));
        subscriptionFrequencyLabels[index].classList.add('selected-pack');
        updatePrice();
    });
});

// Fast questions and awnsers
document.querySelectorAll('.vraag_antwoord h3').forEach(function(vraag) {
    vraag.addEventListener('click', function() {
        const parent = vraag.parentElement;
        parent.classList.toggle('active');
    });
});

updateSelectedStyle();
updatePrice();