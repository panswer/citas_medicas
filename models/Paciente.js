import DB from '../condig/db';
/**
 * @typedef {object} PacienteSchema
 * @property {number} [paciente_id]
 * @property {string} nombre
 * @property {string} apellido
 * @property {string} DNI
 * @property {string} fechaNacimient
 */
class Paciente extends DB {
    /**
     * Nuevo paciente
     * @param {string} nombre - nombre de paciente
     * @param {string} apellido - apellido de paciente
     * @param {string} DNI - numero de identificacion
     * @param {string} fechaNacimiento - fecha de nacimiento
     */
    constructor(nombre, apellido, DNI, fechaNacimiento) {
        super();
        this.nombre = nombre;
        this.apellido = apellido;
        this.DNI = DNI;
        this.fechaNacimiento = fechaNacimiento;
    }

    async save() {
        if (!this.nombre) {
            throw new Error("El nombre es requerido");
        } else if (!this.apellido) {
            throw new Error("El apellido es requerido");
        } else if (!this.DNI) {
            throw new Error("El DNI es requerido");
        } else if (!this.fechaNacimiento) {
            throw new Error("La fecha de nacimiento es requerida");
        } else {
            let paciente = await this.findByDNI(this.DNI);
            if (paciente.result.length === 0) {
                await this.session.query(`INSERT INTO test.Paciente
                (nombre, apellido, DNI, fecha_nacimiento)
                VALUES('${this.nombre}', '${this.apellido}', '${this.DNI}', '${this.fechaNacimiento}');`);
                return true;
            } else {
                throw new Error("Ya existe un paciente con la DNI en base de datos");
            }
        }
    }

    /**
     * Buscar paciente por DNI en base de datos
     * @param {string} DNI - numero de identificacion de usuario
     * @returns {Promise<{result: Array<PacienteSchema>, fields: Array<object>}>}
     */
    findByDNI(DNI) {
        return new Promise((resolve, reject) => {
            this.session.query(`SELECT * FROM test.Paciente p WHERE p.DNI = ${DNI};`, (error, result, fields) => {
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
     * Buscar paciente por DNI en base de datos
     * @param {string} DNI - numero de identificacion de usuario
     * @returns {Promise<{result: Array<PacienteSchema>, fields: Array<object>}>}
     */
    static findByDNI(DNI) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`SELECT * FROM test.Paciente p WHERE p.DNI = ${DNI};`, (error, result, fields) => {
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
     * get all pacientes
     * @returns {Promise<{result: Array{PacienteSchema}, fields: Array<object>}>}
     */
    static findAll() {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query('SELECT * FROM Paciente p ;', (error, result, fields) => {
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
     * Buscar un paciente por id
     * @param {number} id - paciente id
     * @returns {Promise<{result: Array<PacienteSchema, fields: Array<object>}>}
     */
    static async findById(id) {
        let db = new DB();
        this.session = db.session;

        return new Promise((resolve, reject) => {
            this.session.query(`SELECT * FROM Paciente p WHERE p.paciente_id = ${id};`, (error, result, fields) => {
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
     * Actualizar paciente por id
     * @param {string} dni - paciente id
     * @param {{nombre: string, apellido: string, DNI: string, fechaNacimiento: string}} update - data
     * @returns {Promise<boolean>}
     */
    static async updateByDNI(dni, update) {
        if (!update.nombre) {
            throw new Error("El nombre es requerido");
        } else if (!update.apellido) {
            throw new Error("El apellido es requerido");
        } else if (!update.DNI) {
            throw new Error("El DNI es requerido");
        } else if (!update.fechaNacimiento) {
            throw new Error("La fecha de nacimiento es requerida");
        } else {
            let db = new DB();
            this.session = db.session;

            let resultdb = await this.findByDNI(update.DNI);

            if (resultdb.result.length === 0 || dni === update.DNI) {
                return new Promise((resolve, reject) => {
                    this.session.query(`UPDATE test.Paciente
                    SET nombre='${update.nombre}', apellido='${update.apellido}', DNI='${update.DNI}', fecha_nacimiento='${update.fechaNacimiento}'
                    WHERE paciente_id=${dni};`, (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(true);
                        }
                    });
                });

            } else {
                throw new Error("Ya existe un paciente con la DNI en base de datos");
            }
        }
    }

    /**
     * Eliminar un usuario por su id
     * @param {number} id - paciente id
     * @returns {Promise<boolean}
     */
    static deleteById(id) {
        return new Promise((resolve, reject) => {
            this.session.query(`DELETE FROM test.Paciente
            WHERE paciente_id=${id};`, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * listar las fechas de ingreso por paciente id
     * @param {number} pacienteId 
     * @returns {Promise<import('./Admision').ResultSchema>}
     */
    static admisionById(pacienteId) {
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
                    });
                }
            });
        });
    }
}

export default Paciente;