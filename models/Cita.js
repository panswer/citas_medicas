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

/**
 * @typedef {object} ResultSchema
 * @property {Array<CitaSchema>} result
 * @property {Array<object} fields
 */

class Cita extends DB {
    /**
     * datos en cita
     * @param {CitaSchema} data 
     */
    constructor(data) {
        super();

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
     * @returns {Promise<boolean>}
     */
    save() {
        return new Promise((resolve, reject) => {
            this.session.query(`INSERT INTO test.Citas
            (admision_id, doctor_id, cuando, consultorio, direccion_paciente, telefono, telefono_allegado, updated_at)
            VALUES(${this.admision_id}, ${this.doctor_id}, '${this.cuando}', ${this.consultorio}, '${this.direccion_paciente}', '${this.telefono}', '${this.telefono_allegado}', CURRENT_TIMESTAMP);`, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * actualizar una cita por su identificador
     * @param {number} citaId 
     * @param {CitaSchema} update 
     * @returns {Promise<boolean>}
     */
    static updateById(citaId, update) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`UPDATE test.Citas
            SET status='${update.status}', doctor_id=${update.doctor_id}, cuando='${update.cuando}', consultorio=${update.consultorio}, direccion_paciente='${update.direccion_paciente}', telefono='${update.telefono}', telefono_allegado='${update.telefono_allegado}', updated_at=CURRENT_TIMESTAMP
            WHERE cita_id=${citaId};`, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * eliminar cita por su identificador
     * @param {number} citaId 
     * @returns {Promise<boolean>}
     */
    static deleteById(citaId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`DELETE FROM test.Citas
            WHERE cita_id=${citaId};
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
     * obtener lista de citas por identificador de paciente
     * @param {number} pacienteId 
     * @returns {Promise<ResultSchema>}
     */
    static findByPacienteId(pacienteId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`SELECT * from Citas c
            left join Admision a on c.admision_id = a.admision_id 
            LEFT JOIN Doctores d on c.doctor_id = d.doctor_id 
            WHERE a.paciente_id = ${pacienteId};`, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        result,
                        fields
                    });
                }
            });
        });
    }

    /**
     * 
     * @param {number} citaId 
     * @returns {Promise<import('./Historial').ResultSchema>}
     */
    static historialById(citaId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`SELECT * FROM Historial h WHERE h.cita_id = ${citaId};`, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        result,
                        fields
                    });
                }
            });
        });
    }
}

export default Cita;