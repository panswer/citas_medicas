import Doctor from "../../../models/Doctor";

const create = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { nombre, apellido } = req.body;
            await new Doctor({
                nombre,
                apellido
            }).save();

            res.status(201).json({
                ok: true
            });
        } else {
            res.status(404).send('Page Not Found.');
        }
    } catch (error) {
        res.status(412).json({
            message: error.message
        });
    }
}

export default create;