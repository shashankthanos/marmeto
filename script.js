fetch(`https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448`)
    .then(resp => resp.json())
    .then(data => {
        var title = document.getElementById('title')
        title.innerText = data.product.title
        var price = document.getElementById('price')
        price.innerText = data.product.price
        var discount = document.getElementById('discount')
        discount.innerText = data.product.compare_at_price

        const colorValues = data.product.options.find(option => option.name === "Color").values;
        const colorNames = colorValues.map(color => Object.values(color)[0]);
        const colorName = colorValues.map(color => Object.keys(color)[0]);


        const colorCon = document.getElementById("color_con");
        colorCon.style.display = "flex"
        colorCon.style.width = "292px"
        colorCon.style.justifyContent = "space-evenly"

        colorNames.forEach((color, index) => {
            const colorButton = document.createElement("button");
            colorButton.className = "color-button";
            colorButton.style.backgroundColor = color;

            colorButton.addEventListener('click', function () {
                const colorButtons = document.querySelectorAll('.color-button');
                colorButtons.forEach(btn => {
                    btn.classList.remove('selected');
                    btn.style.border = '';
                    btn.innerHTML = '';
                });

                this.classList.add('selected');

                const img = document.createElement('img');
                img.src = './Assets/tick.png';
                img.alt = 'Selected';
                this.appendChild(img);
            });

            colorCon.appendChild(colorButton);
        });

        const sizeValues = data.product.options.find(option => option.name === "Size").values;
        const sizesContainer = document.getElementById("sizes");
        sizeValues.forEach(size => {
            const button = document.createElement("button");
            button.className = "size-button";

            const radioBtn = document.createElement("input");
            radioBtn.type = "radio";
            radioBtn.name = "size";
            radioBtn.value = size;
            button.appendChild(radioBtn);

            const label = document.createElement("label");
            label.textContent = size;
            label.setAttribute("for", size.toLowerCase());
            button.appendChild(label);

            sizesContainer.appendChild(button);
        });

        const description = document.getElementById('description');
        description.innerHTML = data.product.description;

        document.getElementById('cart').addEventListener('click', function () {
            const selectedColorIndex = Array.from(document.querySelectorAll('.color-button')).findIndex(btn => btn.classList.contains('selected'));
            const selectedSize = document.querySelector('.size-button input:checked');

            if (selectedColorIndex !== -1 && selectedSize) {
                const colorText = colorName[selectedColorIndex];
                const sizeText = selectedSize.value;

                var spanmsg = document.querySelector('.msg')
                spanmsg.style.backgroundColor = " rgba(231, 248, 183, 1)";
                var msg = document.getElementById('message')
                msg.innerText = `Embrace Sideboard of ${colorText} size: ${sizeText} is added to cart.`
                msg.style.textAlign = "center"
                spanmsg.appendChild(msg)
            } else {
                alert("Please select a color and size before adding to cart.");
            }
        });
});
