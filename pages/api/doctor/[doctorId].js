import Doctor from '../../../models/Doctor';
import Cita from '../../../models/Cita';
import Historial from '../../../models/Historial';

const deleteById = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            const { doctorId } = req.query;
            const { nombre, apellido } = req.body;
            await Doctor.updateById(doctorId, {
                nombre,
                apellido
            });

            res.status(202).json({
                ok: true
            });
        } else if (req.method === 'DELETE') {
            const { doctorId } = req.query;

            let citas = await Doctor.citasById(doctorId);

            await Promise.all(citas.result.map(async data => {
                let historial = await Cita.historialById(data.cita_id);

                await Promise.all(historial.result.map(data => Historial.deleteById(data.historial_id)));

                return Cita.deleteById(data.cita_id);
            }));

            await Doctor.deleteById(doctorId);

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

export default deleteById;