import Doctor from "../../../models/Doctor";

const getAll = async (req, res) => {
    try {
        if (req.method === 'GET') {
            let doctors = await Doctor.find();

            res.json(doctors.result);
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