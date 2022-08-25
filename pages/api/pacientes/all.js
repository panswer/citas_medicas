import Paciente from '../../../models/Paciente';

const getAll = async (req, res) => {
    try {
        if (req.method === 'GET') {
            let pacientes = await Paciente.findAll();

            res.json(pacientes.result);
        } else {
            res.status(404).send("Page Not Found.");
        }
    } catch (error) {
        res.status(412).json({
            message: error.message
        });
    }
}

export default getAll;