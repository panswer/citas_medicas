import Paciente from "../../../models/Paciente";
import Admision from '../../../models/Admision';
import Cita from "../../../models/Cita";
import Historial from "../../../models/Historial";
import Alertas from '../../../models/Alerta';

const update = async (req, res) => {
    const { dni } = req.query;
    try {
        if (req.method === 'PUT') {
            let pacientedb = await Paciente.findByDNI(dni);

            if (pacientedb.result.length === 0) {
                res.status(422).json({
                    message: `No hay usuario registrado con el DNI ${dni}`
                });
            } else {
                const { nombre, apellido, DNI, fechaNacimiento } = req.body;

                await Paciente.updateByDNI(
                    pacientedb.result[0].DNI,
                    {
                        nombre,
                        apellido,
                        DNI,
                        fechaNacimiento
                    }
                );

                res.status(202).json({
                    ok: true
                });
            }
        } else if (req.method === 'DELETE') {
            let pacientedb = await Paciente.findByDNI(dni);

            if (pacientedb.result.length > 0) {
                let paciente = pacientedb.result[0];

                await Alertas.deleteAlertasByPacienteId(paciente.paciente_id);
                let admisions = await Paciente.admisionById(paciente.paciente_id);

                await Promise.all(admisions.result.map(async data => {
                    let citas = await Admision.citasById(data.admision_id);

                    await Promise.all(citas.result.map(async data => {
                        let historial = await Cita.historialById(data.cita_id);

                        await Promise.all(historial.result.map(data => Historial.deleteById(data.historial_id)));

                        return Cita.deleteById(data.cita_id);
                    }));

                    return Admision.deleteById(data.admision_id);
                }));

                await Paciente.deleteById(paciente.paciente_id);

                res.status(202).json({
                    ok: true
                });
            } else {
                res.status(422).json({
                    message: "No existe paciente registrado con la DNI"
                });
            }
        } else {
            res.status(404).send("Page Not Found.");
        }
    } catch (error) {
        res.status(412).json({
            message: error.message
        });
    }
}

export default update;