import Doctor from '../../../models/Doctor';

const deleteById = async (req, res) => {
    try {
        if (res.method === 'PUT') {
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