import Historial from '../../../models/Historial';

const manageHistorial = async (req, res) => {
    try {
        if (req.method === 'DELETE') {
            const { historialId } = req.query;

            await Historial.deleteById(historialId);

            res.status(202).json({
                ok: true
            });
        } else if (req.method === 'PUT') {
            const { historialId } = req.query;
            const {
                descripcion,
                resumen
            } = req.body;

            await Historial.updateById(historialId, { descripcion, resumen });

            res.status(202).json({
                ok: true
            });
        } else {
            res.status(404).send("Page Not Found");
        }
    } catch (error) {
        res.status(412).json({
            message: error.message
        });
    }
}

export default manageHistorial;