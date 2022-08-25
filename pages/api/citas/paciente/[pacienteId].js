import Cita from "../../../../models/Cita";

const getAllCitas = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const { pacienteId } = req.query;
            let citas = await Cita.findByPacienteId(pacienteId);

            res.json(citas.result);
        } else {
            res.status(404).send("Page Not Found.");
        }
    } catch (error) {
        res.status(412).json({
            message: error.message
        });
    }
}

export default getAllCitas;