import DB from '../condig/db';

/**
 * @typedef {object} CitaSchema
 * @property {number} [cita_id]
 * @property {number} admision_id
 * @property {"pendiente"|"atendiendo"|"atendido"} [status]
 * @property {number} doctor_id
 * @property {string} cuando
 * @property {number} consultorio
 * @property {string} direccion_paciente
 * @property {string} telefono
 * @property {string} telefono_allegado
 * @property {string} [created_at]
 * @property {string} [updated_at]
 */

class Cita extends DB {
    /**
     * datos en cita
     * @param {CitaSchema} data 
     */
    constructor(data) {
        this.admision_id = data.admision_id;
        this.status = data.status;
        this.doctor_id = data.doctor_id;
        this.cuando = data.cuando;
        this.consultorio = data.consultorio;
        this.direccion_paciente = data.direccion_paciente;
        this.telefono = data.telefono;
        this.telefono_allegado = data.telefono_allegado;
    }

    /**
     * @returns {Promise<boolean}
     */
    save() {
        return new Promise((resolve, reject) => {
            this.session.query(`INSERT INTO test.Citas
            (admision_id, doctor_id, cuando, consultorio, direccion_paciente, telefono, telefono_allegado, updated_at)
            VALUES(${this.admision_id}, ${this.doctor_id}, ${this.cuando}, ${this.consultorio}, ${this.direccion_paciente}, ${this.telefono}, ${this.telefono_allegado}, CURRENT_TIMESTAMP);`, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

export default Cita;