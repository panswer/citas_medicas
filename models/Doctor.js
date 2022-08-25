import DB from '../condig/db';

/**
 * @typedef {object} DoctorSchema
 * @property {number} [doctor_id]
 * @property {string} nombre
 * @property {string} apellido
 */

/**
 * @typedef {object} ResponseSchema
 * @property {Array<DoctorSchema>} result
 * @property {Array<object} fields
 */

class Doctor extends DB {

    /**
     * Data of doctor
     * @param {DoctorSchema} param0 
     */
    constructor({
        nombre,
        apellido
    }) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    /**
     * Guardar un nuevo doctor
     * @returns {Promise<boolean}
     */
    save() {
        if (!this.nombre) {
            throw new Error("El nombre es requerido");
        }
        if (!this.apellido) {
            throw new Error("El apellido es requerido");
        }

        return new Promise((resolve, reject) => {
            this.session.query(`INSERT INTO test.Doctores
            (nombre, apellido)
            VALUES('${this.nombre}', '${this.apellido}');
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
     * Actualizar datos de un doctor por su id
     * @param {number} doctorId
     * @param {{nombre: string, apellido: string}} update 
     * @returns {Promise<boolean>}
     */
    static updateById(doctorId, update) {
        let db = new DB();
        this.session = db.session;

        if (!update.nombre) {
            throw new Error("El nombre del doctor es requerido");
        }
        if (!update.apellido) {
            throw new Error("El apellido del doctor es requerido");
        }

        return new Promise((resolve, reject) => {
            this.session(`UPDATE test.Doctores
            SET nombre='${update.nombre}', apellido='${update.apellido}'
            WHERE doctor_id=${doctorId};
            `, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * @returns {Promise<ResponseSchema>}
     */
    static find() {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`SELECT * FROM Doctores d ;`, (error, result, fields) => {
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
     * eliminar a un doctor por su identificador
     * @param {number} doctorId 
     * @returns {Promise<boolean>}
     */
    static deleteById(doctorId) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`DELETE FROM test.Doctores
            WHERE doctor_id=${doctorId};
            `, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

export default Doctor;