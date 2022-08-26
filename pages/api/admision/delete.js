import Admision from "../../../models/Admision";
import Cita from "../../../models/Cita";
import Historial from "../../../models/Historial";

const deleteAdmision = async (req, res) => {
    try {
        if (req.method === 'DELETE') {
            const { admisionId } = req.body;

            let citas = await Admision.citasById(admisionId);

            await Promise.all(citas.result.map(async data => {
                let historial = await Cita.historialById(data.cita_id);

                await Promise.all(historial.result.map(data => Historial.deleteById(data.historial_id)));

                return Cita.deleteById(data.cita_id);
            }));

            await Admision.deleteById(admisionId);

            res.status(202).json({
                ok: true
            });
        } else {
            res.status(404).send("Page Not Found.");
        }
    } catch (error) {
        res.status(412).json({
            message: error.message
        });
    }
}

export default deleteAdmision