import Admision from "../../../models/Admision";

const create = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { pacienteId } = req.query;
            await new Admision(pacienteId).save();

            res.status(201).json({
                ok: true
            });
        } else if (req.method === 'GET') {
            const { pacienteId } = req.query;
            let admisions = await Admision.getEmptyByPacienteId(pacienteId);

            res.json(admisions.result);
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