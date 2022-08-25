import Cita from '../../../models/Cita';
import Historial from '../../../models/Historial';

const manageCita = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            const { citaId } = req.query;
            const {
                status,
                doctorId,
                cuando,
                consultorio,
                direccionPaciente,
                telefono,
                telefonoAllegado
            } = req.body;

            await Cita.updateById(citaId, {
                status,
                doctor_id: doctorId,
                cuando,
                consultorio,
                direccion_paciente: direccionPaciente,
                telefono,
                telefono_allegado: telefonoAllegado
            });

            res.status(202).json({
                ok: true
            });
        } else if (req.method === 'DELETE') {
            const { citaId } = req.query;

            let historial = await Cita.historialById(citaId);

            await Promise.all(historial.result.map(async data => {
                return Historial.deleteById(data.historial_id);
            }));

            await Cita.deleteById(citaId);

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

export default manageCita;