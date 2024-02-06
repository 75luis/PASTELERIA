
// export default router;
import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import _ from 'underscore';
import fs from 'fs/promises';

const router = new Router();

// Utiliza import.meta.url para obtener la URL del módulo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta al archivo sample.json
const sampleJsonPath = join(__dirname, '../datos/sample.json');

// Función para leer el contenido de sample.json
const readSampleJson = async () => {
  try {
    const rawData = await fs.readFile(sampleJsonPath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error al leer sample.json', error);
    throw error;
  }
};

// Función para escribir en sample.json
const writeSampleJson = async (data) => {
  try {
    await fs.writeFile(sampleJsonPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error al escribir en sample.json', error);
    throw error;
  }
};

router.get('/', async (req, res) => {
  try {
    const pedido = await readSampleJson();
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los datos.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await readSampleJson();
    const Pedido = pedido.find((Pedido) => Pedido.id === id);

    if (Pedido) {
      res.json(Pedido);
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los datos.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const pedido = await readSampleJson();
    const id = (pedido.length + 1).toString();
    const { pastel, nombre_cliente, precio_total, precio_adelanto } = req.body;

    if (pastel && nombre_cliente && precio_total && precio_adelanto) {
      const newPedido = {
        id,
        pastel,
        nombre_cliente,
        precio_total,
        precio_adelanto,
      };

      pedido.push(newPedido);
      await writeSampleJson(pedido);

      res.json(newPedido);
    } else {
      res.status(500).json({ error: 'Hubo un error.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await readSampleJson();
    const { pastel, nombre_cliente, precio_total, precio_adelanto } = req.body;

    if (id && pastel && nombre_cliente && precio_total && precio_adelanto) {
      const index = pedido.findIndex((Pedido) => Pedido.id === id);

      if (index !== -1) {
        pedido[index] = {
          id,
          pastel,
          nombre_cliente,
          precio_total,
          precio_adelanto,
        };

        await writeSampleJson(pedido);
        res.json(pedido[index]);
      } else {
        res.status(404).json({ error: 'Pedido no encontrado' });
      }
    } else {
      res.status(500).json({ error: 'Hubo un error.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await readSampleJson();
    const index = pedido.findIndex((movie) => movie.id === id);

    if (index !== -1) {
      pedido.splice(index, 1);

      // Reorganizar los identificadores después de eliminar
      for (let i = index; i < pedido.length; i++) {
        pedido[i].id = (i + 1).toString();
      }

      await writeSampleJson(pedido);
      res.json(pedido);
    } else {
      res.status(404).json({ error: "Película no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
  }
});

export default router;
