import Alerta from "../../../models/Alerta";

const changeStatus = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            const { alertaId } = req.body;

            await Alerta.changeStatus(alertaId);

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

export default changeStatus;