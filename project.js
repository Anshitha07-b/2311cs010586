let currentId = 1;

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const productBody = document.getElementById('product-body');

    // Set currentId to the next available ID
    data.forEach(product => {
      addRowToTable(product);
      if (product.id >= currentId) {
        currentId = product.id + 1;
      }
    });

    function addRowToTable(product) {
      const row = document.createElement('tr');
      row.setAttribute('data-id', product.id);

     row.innerHTML = `
  <td>${product.id}</td>
  <td class="name-cell">${product.name}</td>
  <td class="price-cell">${product.price}</td>
  <td class="qty-cell">${product.qty}</td>
  <td>
    <button class="update-btn">UPDATE</button>
    <button class="delete-btn">DELETE</button>
  </td>
`;

      productBody.appendChild(row);

      // DELETE button
      row.querySelector('.delete-btn').addEventListener('click', () => {
        row.remove();
      });

      // UPDATE button
      row.querySelector('.update-btn').addEventListener('click', () => {
        const newName = prompt('Product name:', product.name);
        const newPrice = prompt('Price:', product.price);
        const newQty = prompt('Quantity:', product.qty);

        if (newName && newPrice && newQty) {
          row.querySelector('.name-cell').textContent = newName;
          row.querySelector('.price-cell').textContent = newPrice;
          row.querySelector('.qty-cell').textContent = newQty;
        }
      });
    }

    // ADD form handler
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('productName').value;
      const price = document.getElementById('price').value;
      const qty = document.getElementById('qty').value;

      if (name && price && qty) {
        const newProduct = {
          id: currentId++, // auto-increment ID
          name,
          price,
          qty
        };

        addRowToTable(newProduct);
        form.reset();
      }
    });
  })
  .catch(error => console.error('Error:', error));
