import Alerta from '../../../models/Alerta';

const crear = (req, res) => {
    try {
        if (req.method === 'POST') {
            const { razon, paciente_id } = req.body;

            await new Alerta(razon, paciente_id).save();

            res.status(201).json({
                ok: true
            });
        } else {
            res.status(422).send("Page Not Found");
        }
    } catch (error) {
        console.log(error);
        res.status(412).json({
            message: error.message
        });
    }
}

export default crear;