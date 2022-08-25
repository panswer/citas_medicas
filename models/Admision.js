import DB from '../condig/db';

/**
 * @typedef {object} AdmisionSchema
 * @property {number} admision_id
 * @property {number} paciente_id
 * @property {string} fecha_ingreso
 */

/**
 * @typedef {object} ResultSchema
 * @property {Array<AdmisionSchema>} result
 * @property {Array<object>} fields
 */

class Admision extends DB {
    /**
     * Molde de admision
     * @param {number} pacienteId - identificador de paciente
     */
    constructor(pacienteId) {
        this.pacienteId = pacienteId;
    }

    /**
     * Guardar tiempo de ingreso
     * @returns {Promise<boolean>}
     */
    save() {
        return new Promise((resolve, reject) => {
            this.session.query(`INSERT INTO test.Admision
            (paciente_id)
            VALUES(${this.pacienteId});`, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * Buscar todas las fechas de ingreso
     * @param {number} pacienteId 
     * @returns {Promise<ResultSchema>}
     */
    static findAllByPacienteId(pacienteId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`SELECT * FROM Admision a WHERE a.paciente_id = ${pacienteId};`, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        result,
                        fields
                    })
                }
            });
        });
    }
}

export default Admision;