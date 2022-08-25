import Paciente from "../../../models/Paciente";
import Admision from '../../../models/Admision';

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

                await Paciente.updateById(
                    pacientedb.result[0].id,
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