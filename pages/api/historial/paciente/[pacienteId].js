import Historial from "../../../../models/Historial";

const getAllHistorial = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const { pacienteId } = req.query;
            let historial = await Historial.findByPacienteId(pacienteId);

            res.json(historial.result);
        } else {
            res.status(404).send("Page Not Found");
        }
    } catch (error) {
        res.status(412).json({
            message: error.message
        });
    }
}

export default getAllHistorial;