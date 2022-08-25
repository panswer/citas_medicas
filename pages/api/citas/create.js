import Cita from "../../../models/Cita";

const create = (req, res) => {
    try {
        if (req.method === 'POST') {
            const {
                admisionId,
                doctorId,
                cuando,
                consultorio,
                direccionPaciente,
                telefono,
                telefonoAllegado
            } = req.body;

            await new Cita({
                admision_id: admisionId,
                doctor_id: doctorId,
                cuando: cuando,
                consultorio, consultorio,
                direccion_paciente: direccionPaciente,
                telefono: telefono,
                telefono_allegado: telefonoAllegado
            }).save();

            res.status(201).json({
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

export default create;