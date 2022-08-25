import DB from '../condig/db';
import Paciente from './Paciente';

/**
 * @typedef {object} PacienteSchema
 * @property {number} [id]
 * @property {"pendiente"|"visto"} status
 * @property {number} paciente_id
 * @property {string} razon
 * @property {string} [created_at]
 */

/**
 * @typedef {object} PacienteResponse
 * @property {Array<PacienteSchema>} result
 * @property {Array<object>} fields
 */

class Alerta extends DB {
    /**
     * nueva alerta
     * @param {string} razon - razon
     * @param {number} paciente_id - identificador de paciente
     */
    constructor(razon, paciente_id) {
        super();
        this.razon = razon;
        this.pacienteId = paciente_id;
    }

    /**
     * Guardar una alerta en base de datos
     * @returns {Promise<boolean}
     */
    async save() {
        let pacienteDb = await Paciente.findById(this.pacienteId);

        if (pacienteDb.result.length === 0) {
            throw new Error(`No hay paciente registrado con el id ${this.pacienteId}`);
        } else {

            return new Promise((resolve, reject) => {
                this.session.query(`INSERT INTO test.Alertas
                (paciente_id, razon)
                VALUES(${this.pacienteId}, '${this.razon}');
                `, (error, result, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(true);
                    }
                });
            });
        }
    }

    /**
     * Cambiar estatus en alerta
     * @param {number} alertaId - identificador de alerta
     * @returns {Promise<boolean>}
     */
    static changeStatus(alertaId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`UPDATE test.Alertas
            SET status='visto'
            WHERE alerta_id=${alertaId};
            `, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * buscar todas las alertas del usuario por id
     * @param {number} pacienteId - identificador id
     * @returns {Promise<PacienteResponse>}
     */
    static findAllByPacienteId(pacienteId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`SELECT * FROM Alertas a WHERE a.paciente_id = ${pacienteId};`, (error, result, fields) => {
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

    /**
     * eliminar una alerta por id
     * @param {number} alertaId - identificador de alerta
     * @returns {Promise<boolean>}
     */
    static deleteAlerta(alertaId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`DELETE FROM test.Alertas
            WHERE alerta_id=${alertaId};
            `, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * Eliminar todas las alertas del paciente
     * @param {number} pacienteId - paciente id
     * @returns {Promise<boolean}
     */
    static deleteAlertasByPacienteId(pacienteId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`DELETE FROM test.Alertas
            WHERE paciente_id=${pacienteId};
            `, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        });
    }
}

export default Alerta;