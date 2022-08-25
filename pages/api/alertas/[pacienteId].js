import Alerta from '../../../models/Alerta';

const update = (req, res) => {
    try {
        if (req.method === 'GET') {
            const { pacienteId } = req.query;

            let alertas = await Alerta.findAllByPacienteId(pacienteId);

            res.status(200).json({
                alertas: alertas.result
            });
        } else if (req.method === 'PUT') {
            const { pacienteId } = req.query;
            await Alerta.changeStatus(pacienteId);

            res.status(202).json({
                ok: true
            });
        } else if (req.method === 'DELETE') {
            const { pacienteId } = req.query;

            await Alerta.deleteAlertasByPacienteId(pacienteId);

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

export default update;