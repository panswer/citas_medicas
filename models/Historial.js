import DB from '../condig/db';

/**
 * @typedef {object} HistorialSchema
 * @property {number} [historial_id]
 * @property {number} cita_id
 * @property {string} descripcion
 * @property {string} resumen
 * @property {string} [created_at]
 * @property {string} [updated_at]
 */

/**
 * @typedef {object} ResultSchema
 * @property {Array<HistorialSchema>} result
 * @property {Array<object>} fields
 */

class Historial extends DB {
    /**
     * datos de historial
     * @param {string} descripcion 
     * @param {string} resumen 
     */
    constructor(descripcion, resumen, citaId) {
        super();

        this.descripcion = descripcion;
        this.resumen = resumen;
        this.cita_id = citaId;
    }

    save() {
        if (!this.descripcion) {
            throw new Error("La descripcion es requerido");
        }
        if (!this.resumen) {
            throw new Error("El resumen es requerido");
        }

        return new Promise((resolve, reject) => {
            this.session.query(`INSERT INTO test.Historial
            (cita_id, descripcion, resumen, created_at, updated_at)
            VALUES(${this.cita_id}, '${this.descripcion}', '${this.resumen}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * Actualizar historial por su id
     * @param {number} historialId 
     * @param {{descripcion: string, resumen: string}} update
     * @returns {Promise<boolean>}
     */
    static updateById(historialId, update) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`UPDATE test.Historial
            SET descripcion='${update.descripcion}', resumen='${update.resumen}', updated_at=CURRENT_TIMESTAMP
            WHERE historial_id=${historialId};`, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * buscar todos los historiales por identificador de paciente
     * @param {number} pacienteId 
     * @returns {Promise<ResultSchema>}
     */
    static findByPacienteId(pacienteId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`SELECT h.historial_id , h.cita_id , h.descripcion , h.resumen , h.created_at , h.updated_at 
            FROM Historial h
            left join Citas c on h.cita_id = c.cita_id 
            LEFT JOIN Admision a on c.admision_id = a.admision_id 
            WHERE a.paciente_id = ${pacienteId};`, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        result,
                        fields
                    });
                }
            })
        });
    }

    /**
     * Eliminar historial utilizando el id
     * @param {number} historialId 
     * @returns {Promise<boolean>}
     */
    static deleteById(historialId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`DELETE FROM test.Historial
            WHERE historial_id=${historialId};
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

export default Historial;