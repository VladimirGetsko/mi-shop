import { postData, getData, deleteData } from "../api";

export const addProduct = () => {
  const titleInput = document.getElementById('product-title');
  const nameInput = document.getElementById('product-name');
  const priceInput = document.getElementById('product-price');
  const previewInput = document.getElementById('product-image');
  const saveBtn = document.getElementById('product-add-btn');
  const select = document.getElementById('product-category');
  const container = document.getElementById('product-table');

  const productData = {
    title: '',
    name: '',
    price: 0,
    preview: '',
    category: 0
  }

  const render = (data) => {

    container.innerHTML = '';

    data.forEach((item, index) => {
      container.insertAdjacentHTML( 'beforeend', `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${item.title}</td>
          <td>${item.name}</td>
          <td>${item.price} ₽</td>
          <td class="text-end">
            <button type="button" class="btn btn-outline-danger btn-sm" data-product="${item.id}">
                удалить
            </button>
          </td>
        </tr>
      `)
    })
  }

  const checkValue = () => {
    if(
      nameInput.value === '' || 
      previewInput.value === '' ||
      titleInput.value === '' ||
      Number(priceInput.value) === 0 || 
      select.value === 'default') 
      {
      saveBtn.disabled = true;
    } else {
      saveBtn.disabled = false;
    }
  }

  const updateTable = () => {
    getData('/products').then(data => {
      render(data);
    })
  }

  select.addEventListener('change', () => {
    productData.category = select.value;
    const url = select.value !== 'default' ? `/products?category=${select.value}` : `/products`;

    getData(url).then(data => {
      render(data);
    })

    checkValue();
  })

  titleInput.addEventListener('input', () => {
    productData.title = titleInput.value;
    checkValue();
  })

  nameInput.addEventListener('input', () => {
    productData.name = nameInput.value;
    checkValue();
  })

  priceInput.addEventListener('input', () => {
    productData.price = Number(priceInput.value);
    checkValue();
  })

  previewInput.addEventListener('input', () => {
    const file = previewInput.files[0];
    
    if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      const reader = new FileReader()
      
      reader.addEventListener('load', () => {
        productData.preview = reader.result;
      })

      reader.onerror = () => {
        productData.preview = '';
        previewInput.value = '';
      }

      reader.readAsDataURL(file)
    } else {
      previewInput.value = '';
    }

    checkValue();
  })

  saveBtn.addEventListener('click', () => {
    
    postData('/products', productData).then(() => {
      titleInput.value = '';
      nameInput.value = '';
      priceInput.value = '';
      previewInput.value = '';
      updateTable();
    })
  })

  container.addEventListener('click', (e) => {
    const target = e.target;
    
    if(target.tagName === 'BUTTON') {
      const id = target.dataset.product;

      deleteData(`/products/${id}`).then(() => {
        updateTable();
      })
    }
  })

  // Xiaomi Redmi A1+ 2/32GB (голубой)
  // Red Line Ultimate для Xiaomi Redmi 9C (оранжевый)
  // Amazfit GTS 4 mini (черный)

  checkValue();
  updateTable();
}