function fetchData(url, containerId, errorMessage, dataProcessor) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const detailsContainer = document.getElementById(containerId);
      detailsContainer.innerHTML = '';

      if (data.error) {
        detailsContainer.innerHTML = `<p>Error: ${data.error}</p>`;
      } else {
        dataProcessor(detailsContainer, data);
      }
    })
    .catch(error => {
      const detailsContainer = document.getElementById(containerId);
      detailsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function verTodosLosPedidos() {
  const url = 'http://localhost:4000/api/pedidos/';
  fetchData(url, 'todosLosPedidos', 'Error al obtener la lista de pedidos.', showAllPedidos);
}

function showAllPedidos(container, data) {
  container.innerHTML = '<h3>Listado de Pedidos:</h3>';

  if (data.length === 0) {
    container.innerHTML += '<p>No hay pedidos disponibles.</p>';
  } else {
    data.forEach(pedido => {
      const { id, pastel, nombre_cliente, precio_total, precio_adelanto } = pedido;
      const saldo_pendiente = precio_total - precio_adelanto;

      container.innerHTML += `
        <div>
          <p><strong>ID:</strong> ${id}</p>
          <p><strong>Nombre del pastel:</strong> ${pastel}</p>
          <p><strong>Nombre del Cliente:</strong> ${nombre_cliente}</p>
          <p><strong>Precio total:</strong> ${precio_total}</p>
          <p><strong>Precio adelanto:</strong> ${precio_adelanto}</p>
          <p><strong>Saldo pendiente:</strong> ${saldo_pendiente}</p>
          <hr>
        </div>
      `;
    });
  }
}

function agregarPedido() {
  const pastel = document.getElementById('pastel').value;
  const nombreCliente = document.getElementById('nombreCliente').value;
  const precioTotal = document.getElementById('precioTotal').value;
  const precioAdelanto = document.getElementById('precioAdelanto').value;

  const url = 'http://localhost:4000/api/pedidos/';
  const data = {
    pastel,
    nombre_cliente: nombreCliente,
    precio_total: precioTotal,
    precio_adelanto: precioAdelanto,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(newPedido => {
      alert('Pedido agregado exitosamente');
      console.log(newPedido);
    })
    .catch(error => {
      console.error('Error al agregar el pedido:', error);
    });
}


// function eliminarPedido() {
//   const eliminarPedidoId = document.getElementById('eliminarPedidoId').value;
//   const url = `http://localhost:4000/api/pedidos/${eliminarPedidoId}`;

//   fetch(url, {
//     method: 'DELETE',
//   })
//     .then(response => response.json())
//     .then(data => {
//       alert('Pedido eliminado exitosamente');
//       console.log(data);
//     })
//     .catch(error => {
//       console.error('Error al eliminar el pedido:', error);
//     });
// }

function eliminarPedido() {
  const eliminarPedidoId = document.getElementById('eliminarPedidoId').value;
  const url = `http://localhost:4000/api/pedidos/${eliminarPedidoId}`;

  fetch(url, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      alert('Pedido eliminado exitosamente');
      console.log(data);

      // Actualiza la lista de pedidos después de la eliminación
      verTodosLosPedidos();
    })
    .catch(error => {
      console.error('Error al eliminar el pedido:', error);
    });
}

// Resto del código sigue igual...


function getPedidoById() { 
  const pedidoId = document.getElementById('pedidoId').value;
  const url = `http://localhost:4000/api/pedidos/${pedidoId}`;
  fetchData(url, 'movieDetails', 'Error al obtener detalles de la película.', showPedidoDetails);
}


function showPedidoDetails(container, data) {
  const { pastel, nombre_cliente, precio_total, precio_adelanto } = data;
  const saldo_pendiente = precio_total - precio_adelanto;

  container.innerHTML = `
    <h3>Detalles del pedido:</h3>
    <p><strong>Nombre del pastel:</strong> ${pastel}</p>
    <p><strong>Nombre del Cliente:</strong> ${nombre_cliente}</p>
    <p><strong>Precio total:</strong> ${precio_total}</p>
    <p><strong>Precio adelanto:</strong> ${precio_adelanto}</p>
    <p><strong>Saldo pendiente:</strong> ${saldo_pendiente}</p>

  `;
}
