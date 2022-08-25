import Historial from "../../../models/Historial";

const crearHistorial = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { cita_id, descripcion, resumen } = req.body;

            await new Historial(descripcion, resumen, cita_id).save();

            res.status(201).json({
                ok: true
            });
        } else {
            res.status(404).send('Page Not Found.');
        }
    } catch (error) {
        res.status(412).json({
            message: error.message
        });
    }
}

export default crearHistorial