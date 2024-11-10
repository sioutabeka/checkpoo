// Classe Product : Représente un produit avec des informations de base telles que l'id, le nom et le prix
class Product {
    constructor(id, nom, prix) {
        this.id = id;   // Identifiant unique pour chaque produit
        this.nom = nom; // Nom du produit (par exemple, "T-shirt Rouge")
        this.prix = prix; // Prix du produit
    }
}

// Classe ShoppingCartItem : Représente un élément dans le panier, comprenant un produit et une quantité
class ShoppingCartItem {
    constructor(produit, quantite) {
        this.produit = produit;  // L'objet 'produit' est de type Product
        this.quantite = quantite; // Quantité de ce produit dans le panier
    }

    // Méthode pour calculer le prix total de cet élément (produit * quantité)
    getTotalPrice() {
        return this.produit.prix * this.quantite;  // Prix total = prix du produit * quantité
    }
}

// Classe ShoppingCart : Représente un panier d'achats contenant des éléments (ShoppingCartItem)
class ShoppingCart {
    constructor() {
        this.items = [];  // Tableau pour stocker les éléments du panier
    }

    // Méthode pour obtenir le total des éléments dans le panier
    getTotal() {
        let total = 0;  // Initialisation du total à 0
        this.items.forEach(item => {
            total += item.getTotalPrice();  // Ajoute le total de chaque élément
        });
        return total;  // Retourne le total final
    }

    // Méthode pour ajouter un produit au panier. Si le produit existe déjà, on augmente sa quantité.
    addItem(produit, quantite) {
        let item = this.items.find(i => i.produit.id === produit.id); // Chercher si le produit existe déjà dans le panier

        if (item) {
            item.quantite += quantite;  // Si l'élément existe déjà, on augmente la quantité
        } else {
            this.items.push(new ShoppingCartItem(produit, quantite));  // Sinon, on ajoute un nouvel élément au panier
        }
    }

    // Méthode pour supprimer un élément du panier en filtrant par l'id du produit
    removeItem(id) {
        // Filtre le tableau pour garder tous les éléments sauf celui dont l'id correspond à celui qu'on veut supprimer
        this.items = this.items.filter(item => item.produit.id !== id);
    }

    // Méthode pour afficher les éléments du panier sur la page web
    displayCart() {
        const cartList = document.getElementById("listePanier");
        const totalElement = document.getElementById("total");

        cartList.innerHTML = "";  // Réinitialiser la liste du panier

        this.items.forEach(item => {
            let li = document.createElement("li");
            li.innerHTML = `${item.produit.nom} - ${item.quantite} x ${item.produit.prix}€ = ${item.getTotalPrice()}€`;

            // Création d'un bouton de suppression
            let removeButton = document.createElement("button");
            removeButton.textContent = "Supprimer";
            removeButton.classList.add("remove-item");

            // Lors du clic, supprimer l'élément du panier par son id
            removeButton.addEventListener('click', () => {
                this.removeItem(item.produit.id); // Supprimer l'élément du panier
                this.displayCart();  // Afficher à nouveau le panier mis à jour
            });

            // Ajouter le bouton "Supprimer" dans l'élément <li>
            li.appendChild(removeButton);

            // Ajouter l'élément <li> dans la liste du panier
            cartList.appendChild(li);
        });

        // Mettre à jour le total du panier
        totalElement.textContent = `Total : ${this.getTotal()}€`;  // Afficher le total du panier
    }
}

// Création de quelques produits (instances de la classe Product)
const tShirtRouge = new Product(1, "T-shirt Rouge", 15);
const jeansBleu = new Product(2, "Jeans Bleu", 25);
const basketNoir = new Product(3, "Basket Noir", 45);
const sweatCapuche = new Product(4, "Sweat à Capuche", 35);
const montreCuir = new Product(5, "Montre en Cuir", 60);
const sacADos = new Product(6, "Sac à Dos", 50);
const chapeauPaille = new Product(7, "Chapeau de Paille", 20);

// Création du panier (instance de la classe ShoppingCart)
const panier = new ShoppingCart();

// Fonction qui ajoute un produit au panier lorsque l'utilisateur clique sur un bouton
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const produitId = parseInt(this.parentElement.getAttribute('data-id'));
        let produit;

        // Associer l'ID du produit à l'objet Product correspondant
        if (produitId === 1) produit = tShirtRouge;
        else if (produitId === 2) produit = jeansBleu;
        else if (produitId === 3) produit = basketNoir;
        else if (produitId === 4) produit = sweatCapuche;
        else if (produitId === 5) produit = montreCuir;
        else if (produitId === 6) produit = sacADos;
        else if (produitId === 7) produit = chapeauPaille;

        // Ajouter le produit au panier avec une quantité de 1
        panier.addItem(produit, 1);

        // Afficher le panier mis à jour
        panier.displayCart();
    });
});

// Fonction pour supprimer un produit du panier
function removeItemFromCart(id) {
    panier.removeItem(id);  // Supprime l'élément du panier par son ID
    panier.displayCart();  // Affiche à nouveau le panier mis à jour
}

// Fonction pour vider le panier (en cas de clic sur le bouton "Vider le panier")
document.getElementById("clearCart").addEventListener("click", function () {
    panier.items = [];  // Réinitialise le panier en le vidant
    panier.displayCart();  // Affiche le panier vide
});

// Initialisation de l'affichage du panier (afficher dès le début si des éléments sont dans le panier)
panier.displayCart();
