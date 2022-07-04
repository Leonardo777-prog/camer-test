
export interface LoginResponseOk {
    status:  boolean;
    code:    number;
    date:    string;
    elapsed: string;
    message: string;
    data:    DataLoginResponseOk;
}

export interface DataLoginResponseOk {
    Bearer:          string;
    BearerFormat:    string;
    BearerCreation:  string;
    BearerExpiresIn: number;
    userData:        UserData;
}

export interface UserData {
    nombre_usuario:             string;
    nombre:                     string;
    tipo_usuario:               string;
    rol:                        string;
    marcar_ingreso:             string[];
    tipo_rol:                   string;
    rol_infocontrol:            string;
    id_usuarios:                string;
    permiso_visualiza_reporte:  boolean;
    permiso_registrar_ingresos: boolean;
    codigo_error:               number;
    mensaje_error:              MensajeError;
}

export interface MensajeError {
    titulo:  string;
    mensaje: string;
}

// Generated by https://quicktype.io

export interface LoginResponseFail {
    status:  boolean;
    code:    number;
    date:    string;
    elapsed: string;
    message: string;
}

export interface LoginData {
    taxId: string;
    password: string;
}