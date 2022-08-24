import Paciente from "../../../models/Paciente";

const crear = async (req, res) => {
    try {
        if (req.method === 'POST') {
            console.log(req.body);

            await new Paciente(
                req.body.nombre,
                req.body.apellido,
                req.body.DNI,
                req.body.fechaNacimiento
            ).save();
            res.status(201).json({
                ok: true
            })
        } else {
            console.log('Error in method');
            res.status(404).send("Page Not Found");
        }
    } catch (error) {
        console.log(error);
        res.status(412).json({
            message: error.message
        });
    }
}

export default crear;